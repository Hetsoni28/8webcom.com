import { getContactContent } from '@/sanity/content';
import { isMailConfigured, sendMail } from '@/lib/server/mailer';
import {
  clean,
  cleanMultiline,
  clientIp,
  isRateLimited,
  json,
  renderEmail,
  validateContactBasics,
} from '@/lib/server/forms';
import { RECAPTCHA_ERROR, verifyRecaptcha } from '@/lib/server/recaptcha';

// POST /api/contact — "Need Expert Help?" enquiry form → info@8webcom.com
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: real users never see or fill this field; bots do. Pretend success.
  if (clean(body.website, 200)) return json({ ok: true });

  if (isRateLimited(`contact:${clientIp(request)}`)) {
    return json({ ok: false, error: 'Too many submissions. Please try again in a few minutes.' }, 429);
  }

  const data = {
    name: clean(body.name, 100),
    mobile: clean(body.mobile, 20),
    email: clean(body.email, 254),
    service: clean(body.service, 100),
    message: cleanMultiline(body.message, 5000),
  };

  const errors = validateContactBasics(data);
  // Allowed options are the dropdown list edited in Sanity → Contact Page
  const { formServices } = await getContactContent();
  if (!data.service || !formServices.includes(data.service)) {
    errors.service = 'Please select a service you need.';
  }
  if (!data.message) errors.message = 'Please write a brief description of your project.';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  // Checked last: Google tokens are single-use, so only spend one on an otherwise valid submission
  if (!(await verifyRecaptcha(clean(body.recaptchaToken, 4000), clientIp(request)))) {
    return json({ ok: false, errors: { captcha: RECAPTCHA_ERROR } }, 400);
  }

  if (!isMailConfigured()) {
    console.error('[contact] SMTP is not configured (SMTP_USER / SMTP_PASS missing).');
    return json({ ok: false, error: 'Our form is temporarily unavailable.' }, 503);
  }

  const { html, text } = renderEmail('New website enquiry', [
    ['Name', data.name],
    ['Mobile', `+91 ${data.mobile}`],
    ['Email', data.email],
    ['Service', data.service],
    ['Message', data.message],
  ]);

  try {
    await sendMail({
      subject: `New enquiry: ${data.service} — ${data.name}`,
      html,
      text,
      replyTo: data.email,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[contact] Failed to send email:', err);
    return json({ ok: false, error: 'We could not send your message right now.' }, 500);
  }
}
