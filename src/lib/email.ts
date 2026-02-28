import { Resend } from "resend";
import { signActionPayload, actionUrl } from "./signed-links";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
const from = process.env.EMAIL_FROM || "IdeaPulse <onboarding@resend.dev>";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;

function getBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!u || LOCALHOST_PATTERN.test(u)) {
      console.error("email: NEXT_PUBLIC_APP_URL missing or localhost in production; cannot build email links");
      throw new Error("NEXT_PUBLIC_APP_URL must be set in production");
    }
    return u;
  }
  return u || "http://localhost:3000";
}

type IdeaRow = { id: string; idea_json: Record<string, unknown> };

export async function sendBatchEmail(
  to: string,
  ideas: IdeaRow[],
  userId: string
): Promise<void> {
  const baseUrl = getBaseUrl();
  const links = await Promise.all(
    ideas.map(async (row) => {
      const [likeToken, dislikeToken, feedbackToken, analyzeToken] = await Promise.all([
        signActionPayload(row.id, "like", userId),
        signActionPayload(row.id, "dislike", userId),
        signActionPayload(row.id, "feedback", userId),
        signActionPayload(row.id, "analyze", userId),
      ]);
      return {
        ideaId: row.id,
        like: actionUrl(baseUrl, row.id, "like", userId, likeToken),
        dislike: actionUrl(baseUrl, row.id, "dislike", userId, dislikeToken),
        feedback: `${baseUrl}/api/idea/${row.id}/feedback?token=${encodeURIComponent(feedbackToken)}`,
        analyze: `${baseUrl}/api/idea/${row.id}/analyze?token=${encodeURIComponent(analyzeToken)}`,
      };
    })
  );

  const listHtml = ideas
    .map((row, i) => {
      const l = links[i];
      const j = row.idea_json as Record<string, unknown>;
      return `
        <tr>
          <td style="padding: 0 0 20px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
              <tr>
                <td style="padding: 20px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #111827;">${escapeHtml(String(j.title ?? "Idea"))}</h3>
                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">${escapeHtml(String(j.one_sentence_hook ?? ""))}</p>
                  <p style="margin: 0 0 12px 0; font-size: 13px; color: #9ca3af;"><strong style="color: #6b7280;">First step:</strong> ${escapeHtml(String(j.first_step_under_30min ?? ""))}</p>
                  <p style="margin: 0; font-size: 13px;">
                    <a href="${l.like}" style="color: #7c3aed; text-decoration: none; margin-right: 12px;">👍 Like</a>
                    <a href="${l.dislike}" style="color: #7c3aed; text-decoration: none; margin-right: 12px;">👎 Dislike</a>
                    <a href="${l.feedback}" style="color: #7c3aed; text-decoration: none; margin-right: 12px;">💬 Feedback</a>
                    <a href="${l.analyze}" style="color: #7c3aed; text-decoration: none;">📊 Analyze</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join("");

  const dashboardUrl = `${baseUrl}/dashboard`;
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(to)}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">💡 IdeaPulse</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.85);">Your fresh batch of ideas is ready</p>
            </td>
          </tr>
          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 24px 16px 24px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151; line-height: 1.6;">Hey there! 👋</p>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">We've generated <strong style="color: #374151;">10 tailored business ideas</strong> just for you. React to any idea below to help us learn your taste, or view them all on your dashboard.</p>
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 28px 0;">
                    <a href="${dashboardUrl}" style="display: inline-block; background: #7c3aed; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 16px; font-weight: 600; letter-spacing: -0.2px;">Check out your ideas →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Ideas list -->
          <tr>
            <td style="padding: 0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${listHtml}
              </table>
            </td>
          </tr>
          <!-- Secondary CTA -->
          <tr>
            <td style="padding: 16px 24px 32px 24px;" align="center">
              <a href="${dashboardUrl}" style="display: inline-block; background: #7c3aed; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 600;">View all on dashboard →</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #9ca3af;">Like or dislike ideas so we can tailor the next batch to you.</p>
              <p style="margin: 0; font-size: 12px; color: #d1d5db;">
                <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> from IdeaPulse emails
              </p>
            </td>
          </tr>
        </table>
        <!-- Brand footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <tr>
            <td style="padding: 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">💡 IdeaPulse — Spark one lightbulb moment at a time.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await getResend().emails.send({
      from,
      to: [to],
      subject: "💡 Your 10 fresh ideas from IdeaPulse",
      html,
    });
  } catch (e) {
    console.error("sendBatchEmail: Resend send failed", e);
    throw e;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
