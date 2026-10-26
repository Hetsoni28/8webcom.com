// Resume upload rules, shared by the Careers form (browser check) and /api/careers (server check).

// Vercel rejects request bodies over 4.5 MB before our code runs; 4 MB leaves room for the other fields
export const MAX_RESUME_MB = 4;
export const MAX_RESUME_BYTES = MAX_RESUME_MB * 1024 * 1024;

export const ALLOWED_RESUME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const;

export type ResumeExt = keyof typeof ALLOWED_RESUME;

export const resumeExt = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? '';

/** Error message for an invalid resume file, or null when it is fine. */
export function resumeError(file: { name: string; size: number } | null | undefined): string | null {
  if (!file || file.size === 0) return 'Please upload your resume (PDF/DOC).';
  if (!(resumeExt(file.name) in ALLOWED_RESUME)) return 'Resume must be a PDF, DOC or DOCX file.';
  if (file.size > MAX_RESUME_BYTES) return `Resume must be smaller than ${MAX_RESUME_MB} MB.`;
  return null;
}
