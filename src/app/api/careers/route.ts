import { isMailConfigured, sendMail } from '@/lib/server/mailer';
import {
  clean,
  clientIp,
  isRateLimited,
  json,
  renderEmail,
  validateContactBasics,
} from '@/lib/server/forms';
import { ALLOWED_RESUME, resumeError, resumeExt, type ResumeExt } from '@/lib/resume';

// POST /api/careers — job application with resume → info@8webcom.com
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot (see contact route)
  if (clean(form.get('website'), 200)) return json({ ok: true });

  if (isRateLimited(`careers:${clientIp(request)}`)) {
    return json({ ok: false, error: 'Too many submissions. Please try again in a few minutes.' }, 429);
  }

  const data = {
    name: clean(form.get('name'), 100),
    mobile: clean(form.get('mobile'), 20),
    email: clean(form.get('email'), 254),
    position: clean(form.get('position'), 100),
  };

  const errors = validateContactBasics(data);
  if (!data.position) errors.position = 'Please select a position for application.';

  const resume = form.get('resume');
  const resumeProblem = resumeError(resume instanceof File ? resume : null);
  if (resumeProblem) errors.resume = resumeProblem;

  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  if (!isMailConfigured()) {
    console.error('[careers] SMTP is not configured (SMTP_USER / SMTP_PASS missing).');
    return json({ ok: false, error: 'Our form is temporarily unavailable.' }, 503);
  }

  const file = resume as File;
  const ext = resumeExt(file.name) as ResumeExt;
  // Safe attachment name: "Resume - Name.pdf"
  const safeName = data.name.replace(/[^\w\s.-]/g, '').trim() || 'Applicant';
  const { html, text } = renderEmail('New job application', [
    ['Name', data.name],
    ['Mobile', `+91 ${data.mobile}`],
    ['Email', data.email],
    ['Position', data.position],
    ['Resume', `${file.name} (${Math.round(file.size / 1024)} KB, attached)`],
  ]);

  try {
    await sendMail({
      subject: `Job application: ${data.position} — ${data.name}`,
      html,
      text,
      replyTo: data.email,
      attachments: [
        {
          filename: `Resume - ${safeName}.${ext}`,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: ALLOWED_RESUME[ext],
        },
      ],
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[careers] Failed to send email:', err);
    return json({ ok: false, error: 'We could not send your application right now.' }, 500);
  }
}
