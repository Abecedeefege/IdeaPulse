const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function main() {
  const res = await fetch(`${base}/api/cron/send`, {
    headers: process.env.CRON_SECRET ? { Authorization: `Bearer ${process.env.CRON_SECRET}` } : {},
  });
  const data = await res.json().catch(() => ({}));
  console.log(res.status, data);
  process.exit(res.ok ? 0 : 1);
}

main();
