// Server-only helpers shared by the form API routes.

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim and collapse a value to a single line (prevents header/subject injection). */
export function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

/** Same as clean() but keeps line breaks — for free-text messages. */
export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').trim().slice(0, max);
}

/** Validation rules mirror the client-side checks in the form components. */
export function validateContactBasics(input: { name: string; mobile: string; email: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name) errors.name = 'Please enter your full name.';
  if (!input.mobile) errors.mobile = 'Please enter your mobile number.';
  else if (!/^\d{10}$/.test(input.mobile)) errors.mobile = 'Mobile number must be exactly 10 digits.';
  if (!input.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(input.email) || input.email.length > 254) errors.email = 'Please enter a valid email address.';
  return errors;
}

/** Escape user input before putting it in an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Simple branded HTML table for submission emails. Pass raw values — they are escaped here. */
export function renderEmail(title: string, rows: [label: string, value: string][], footer?: string): { html: string; text: string } {
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eef1f3;color:#6b7280;font-size:13px;width:140px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eef1f3;color:#1F2429;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f8f9;padding:24px">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#1F2429;padding:18px 22px;border-top:3px solid #0799B3">
        <span style="color:#ffffff;font-size:16px;font-weight:bold">${escapeHtml(title)}</span>
      </div>
      <table style="width:100%;border-collapse:collapse">${htmlRows}</table>
      <div style="padding:14px 22px;color:#9ca3af;font-size:12px">${escapeHtml(footer ?? 'Sent from the website form at www.8webcom.com. Reply to this email to respond directly.')}</div>
    </div>
  </div>`;

  const text = `${title}\n\n${rows.map(([l, v]) => `${l}: ${v}`).join('\n')}\n`;
  return { html, text };
}

// ── Best-effort rate limit: 5 submissions / 10 min per IP per route ──────────
// In-memory, so it resets on redeploy and is per server instance. Enough to stop
// casual spam bursts; use a shared store (e.g. Upstash) if abuse becomes real.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown').trim();
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}
