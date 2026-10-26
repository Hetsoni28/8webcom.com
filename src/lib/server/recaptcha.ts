// Server-only: checks a Google reCAPTCHA v2 ("I'm not a robot") token with Google.
// Active only when both keys are set; until then the forms rely on the honeypot + rate limit.

const SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const RECAPTCHA_ERROR = 'Please tick “I’m not a robot” before sending.';

export function isRecaptchaEnabled(): boolean {
  // Both are needed: without the site key the form shows no checkbox, so requiring a token would block everyone
  return Boolean(SECRET && SITE_KEY);
}

/** true when the token is valid (or reCAPTCHA is not configured yet). Fails closed if Google can't be reached. */
export async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  if (!isRecaptchaEnabled()) return true;
  if (!token) return false;
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: SECRET!, response: token, ...(ip !== 'unknown' ? { remoteip: ip } : {}) }),
      cache: 'no-store',
    });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) console.warn('[recaptcha] rejected:', data['error-codes']);
    return data.success === true;
  } catch (err) {
    console.error('[recaptcha] could not reach Google:', err);
    return false;
  }
}
