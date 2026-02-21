import { Resend } from "resend";
import { signActionPayload, actionUrl } from "./signed-links";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
const from = process.env.EMAIL_FROM || "IdeaPulse <onboarding@resend.dev>";
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type IdeaRow = { id: string; idea_json: Record<string, unknown> };

export async function sendBatchEmail(
  to: string,
  ideas: IdeaRow[],
  userId: string
): Promise<void> {
  const links: { ideaId: string; like: string; dislike: string; feedback: string; analyze: string }[] = [];
  for (const row of ideas) {
    const likeToken = await signActionPayload(row.id, "like", userId);
    const dislikeToken = await signActionPayload(row.id, "dislike", userId);
    const feedbackToken = await signActionPayload(row.id, "feedback", userId);
    const analyzeToken = await signActionPayload(row.id, "analyze", userId);
    links.push({
      ideaId: row.id,
      like: actionUrl(baseUrl, row.id, "like", userId, likeToken),
      dislike: actionUrl(baseUrl, row.id, "dislike", userId, dislikeToken),
      feedback: `${baseUrl}/api/idea/${row.id}/feedback?token=${encodeURIComponent(feedbackToken)}`,
      analyze: `${baseUrl}/api/idea/${row.id}/analyze?token=${encodeURIComponent(analyzeToken)}`,
    });
  }

  const listHtml = ideas
    .map((row, i) => {
      const l = links[i];
      const j = row.idea_json as Record<string, unknown>;
      return `
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0;">${escapeHtml(String(j.title ?? "Idea"))}</h3>
          <p style="margin: 0 0 8px 0; color: #4b5563;">${escapeHtml(String(j.one_sentence_hook ?? ""))}</p>
          <p style="margin: 0 0 12px 0; font-size: 14px;"><strong>First step:</strong> ${escapeHtml(String(j.first_step_under_30min ?? ""))}</p>
          <p style="margin: 0;">
            <a href="${l.like}" style="margin-right: 8px;">👍 Like</a>
            <a href="${l.dislike}" style="margin-right: 8px;">👎 Dislike</a>
            <a href="${l.feedback}" style="margin-right: 8px;">💬 Feedback</a>
            <a href="${l.analyze}" style="margin-right: 8px;">📊 Analyze</a>
          </p>
        </div>
      `;
    })
    .join("");

  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(to)}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="margin: 0 0 16px 0;">Your 10 ideas</h1>
        <p style="margin: 0 0 24px 0; color: #6b7280;">Click any link to react or open the idea on the site.</p>
        ${listHtml}
        <p style="margin-top: 32px; font-size: 12px; color: #9ca3af;">
          <a href="${unsubscribeUrl}">Unsubscribe</a> from IdeaPulse emails.
        </p>
      </body>
    </html>
  `;

  await getResend().emails.send({ from, to: [to], subject: "Your 10 ideas from IdeaPulse", html });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
