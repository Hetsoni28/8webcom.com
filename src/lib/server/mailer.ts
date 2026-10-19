// Server-only: sends form submissions to the company inbox over SMTP.
// 8webcom.com mail is Google Workspace and its SPF record is strict
// (`include:_spf.google.com -all`), so mail MUST go out through Google's SMTP
// as a real @8webcom.com mailbox — any other sender would land in spam.
import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const MAIL_TO = process.env.MAIL_TO || SMTP_USER;

let transporter: Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS && MAIL_TO);
}

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Mail.Attachment[];
}) {
  await getTransporter().sendMail({
    from: `"8webcom.com Website" <${SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  });
}
