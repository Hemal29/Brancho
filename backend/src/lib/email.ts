import nodemailer from "nodemailer";
import crypto from "crypto";

export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export function createOtpTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** Send the OTP login email. Falls back to a console log in dev if SMTP is not configured. */
export async function sendOtpEmail(to: string, name: string, otp: string): Promise<void> {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@brancho.in";
  const appName = "Brancho";

  const subject = `Your ${appName} login code: ${otp}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0f172a;">
      <h2 style="margin:0 0 8px;">Your ${appName} login code</h2>
      <p style="font-size:14px;line-height:1.6;color:#475569;">Hi ${name},</p>
      <p style="font-size:14px;line-height:1.6;color:#475569;">
        Use the code below to sign in. It expires in 10 minutes.
      </p>
      <div style="margin:20px 0;padding:20px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:12px;text-align:center;">
        <span style="font-size:32px;font-weight:700;letter-spacing:12px;">${otp}</span>
      </div>
      <p style="font-size:12px;line-height:1.6;color:#94a3b8;">
        If you didn't request this code, you can safely ignore this email.
      </p>
    </div>
  `;

  // If SMTP is not configured, we can't deliver a real email.
  // Log the OTP to the server console so the flow still works while testing.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[EMAIL:DEV] SMTP not configured. OTP for ${to} is: ${otp}`);
    return;
  }

  try {
    await createOtpTransport().sendMail({ from, to, subject, html });
  } catch (err) {
    console.warn("[EMAIL:ERROR] Failed to send OTP email for", to, "-", (err as Error).message);
    console.log(`[EMAIL:DEV] OTP for ${to} is: ${otp}`);
  }
}
