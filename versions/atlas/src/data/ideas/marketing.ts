import type { AtlasIdea } from "../types";

export const marketingIdeas: AtlasIdea[] = [
  {
    slug: "gbp-optimization-desk",
    title: "Google Business Profile Desk for Dental Practices",
    hook: "Owns one thing for dentists: their Google Business Profile — posts, photos, Q&A, review responses, and local-rank tracking — for $400 a month.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["local-seo", "dental", "productized-service", "recurring"],
    summary:
      "For a dental practice, the Google Business Profile is the most valuable marketing asset they own and the most neglected — outdated photos, unanswered reviews, zero posts. A productized service that owns just this surface, with monthly proof of map-pack ranking movement, is an easy yes at $300–500/month against a $30K-lifetime-value patient flow.",
    analysis: {
      market:
        "There are ~180,000 dental practices in the US, most spending $2–10K/month on marketing while their highest-converting channel (local map results) sits unmanaged. General local-SEO agencies bundle GBP into bloated retainers; the single-surface focus makes pricing legible and results attributable. One new patient covers a year of fees — the ROI math sells itself in one sentence.",
      monetization:
        "Flat $300–500/month per location with a 90-day minimum, deliberately scoped to GBP only (posts, photo cadence, review responses, Q&A seeding, category and service optimization, monthly rank-grid report). Forty practices at $400 is $192K/year, manageable solo with systems, comfortably a $500K+ business with two VAs trained on your SOPs.",
      firstSteps: [
        "Audit 20 local dental profiles and send each a personalized two-minute Loom showing exactly what's broken.",
        "Build the monthly SOP: post calendar, photo requests, review-response templates with HIPAA-safe language.",
        "Use a rank-grid tool to produce before/after map-pack visuals — the retention artifact.",
        "Ask every client for one referral to a non-competing practice outside their radius (no conflict, easy yes).",
      ],
      risks: [
        "Single-channel dependency: a Google interface or algorithm change reshapes the service overnight.",
        "HIPAA awareness in review responses is mandatory — templated compliance is part of the product.",
        "Results take 60–90 days; the rank-grid reporting cadence is what carries clients through the gap.",
      ],
      whoThisIsFor:
        "A local-SEO-literate freelancer who wants recurring revenue and the discipline to stay narrowly scoped.",
    },
  },
  {
    slug: "triggered-postcards",
    title: "Triggered Direct-Mail API for E-commerce",
    hook: "Sends a physical postcard with a discount code when a high-value cart is abandoned — programmatic direct mail for brands whose emails go unopened.",
    category: "marketing",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "6–10 weeks",
    tags: ["direct-mail", "ecommerce", "retention", "api"],
    summary:
      "Email open rates keep sliding while physical mailboxes are emptier than they've been in decades — a postcard gets handled, read, and stuck on the fridge. A service that plugs into Shopify and Klaviyo flows to trigger personalized postcards for abandoned carts, win-backs, and VIP moments brings programmatic logic to a channel with 90% open rates.",
    analysis: {
      market:
        "Print-and-mail APIs (Lob, PostGrid) provide the infrastructure but sell to developers; the gap is the marketer-facing layer with templates, trigger logic, and attribution baked in. Postcard economics work for brands with $80+ AOV: a $0.75–1.20 mailed piece recovering even 3–5% of high-value abandoned carts beats most paid-media ROAS. Mid-size DTC brands ($1–20M revenue) are the sweet spot — big enough to have flows, small enough to lack a direct-mail program.",
      monetization:
        "Per-piece pricing at $1.25–2.00 (covering print/postage with 40–60% margin) plus platform fees of $49–199/month by volume. Attribution via unique codes and QR landing pages makes the ROI report write itself. A brand mailing 3,000 pieces/month is worth $4–6K/month; twenty such brands is a real business.",
      firstSteps: [
        "Build the Shopify/Klaviyo trigger integration on top of an existing print API — weeks, not months.",
        "Run pilots with three brands on win-back campaigns (cleaner attribution than abandoned cart).",
        "Obsess over the attribution report: code redemptions, QR scans, holdout-group lift.",
        "Publish the case studies with real ROAS numbers; performance marketers share what works.",
      ],
      risks: [
        "Postage cost inflation squeezes the economics; pricing must pass it through.",
        "Klaviyo or the print APIs could ship marketer-facing versions; speed plus attribution depth is the window.",
        "Address quality and mail delays vary; expectation-setting on 3–7 day delivery windows matters.",
      ],
      whoThisIsFor:
        "A retention-marketing nerd with API skills who likes selling measurable ROI to DTC operators.",
    },
  },
  {
    slug: "case-study-factory",
    title: "Case-Study Production Studio for B2B",
    hook: "Interviews your customer, writes the case study, designs the PDF, and cuts the video testimonial — a finished sales asset in three weeks for $3,500.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["b2b", "content", "productized-service", "sales-enablement"],
    summary:
      "Every B2B company knows case studies are their highest-converting content, and almost none produce them — because it requires interviewing customers, which sits in everyone's someday pile. A productized studio that handles outreach, interviews, writing, design, and a cut-down video delivers the asset sales teams beg for, at a price marketing managers can approve without procurement.",
    analysis: {
      market:
        "B2B buyers rank customer proof among the most influential content in purchase decisions, yet mid-market software and services companies typically have two stale case studies from 2022. The blocker is operational, not budgetary — marketing teams happily pay $2,500–5,000 per finished story when someone else drives the process. Every B2B company with 20+ customers is a prospect, and they need refreshes forever.",
      monetization:
        "Per-story pricing at $2,500–4,500 (written + designed + 90-second video cut), or retainers at $6–10K/quarter for a story-per-month program. A solo operator with an editor and designer on contract can deliver 6–8 stories monthly — a $250–400K/year studio with 50%+ margins. The retainer model smooths the famine cycles of project work.",
      firstSteps: [
        "Produce two spec case studies for companies you know, free, to build the portfolio and process.",
        "Systematize the customer-interview kit: outreach templates, 25-minute interview script, release forms.",
        "Pitch marketing leaders with the painful truth: 'When did you last publish a case study?'",
        "Bundle the video cut from the same interview call — double the asset, marginal extra cost.",
      ],
      risks: [
        "Process depends on clients' customers showing up; build scheduling buffers and backup candidates into every engagement.",
        "AI writing pressure on perceived value — the moat is the interview craft and customer-wrangling, not the prose.",
        "Service-business scaling limits; contractors and rigid process are the answer, or stay deliberately boutique.",
      ],
      whoThisIsFor:
        "A strong interviewer-writer who likes talking to happy customers and turning conversations into revenue assets.",
    },
  },
  {
    slug: "review-velocity-engine",
    title: "Review-Velocity Service for Home-Services Companies",
    hook: "Automated post-job SMS flows that turn happy plumbing and roofing customers into a steady drumbeat of five-star Google reviews — the local-SEO signal that actually moves rankings.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["reviews", "local-seo", "home-services", "sms"],
    summary:
      "Review recency and velocity are heavyweight local-ranking factors, and home-services companies finish dozens of jobs weekly while collecting almost no reviews. A service that integrates with their field-software job completions and fires perfectly timed, technician-personalized SMS requests reliably 5–10x's review velocity — with rankings and call volume following.",
    analysis: {
      market:
        "Home services is a $600B+ industry where the Google map pack decides who gets the emergency call, and review count plus recency is the most controllable input. Generic reputation tools (Birdeye, Podium) cost $300–500/month and are bloated CRM suites; a focused, done-for-you review engine at half the price wins the sub-10-truck companies they overserve. Job-completion triggers from Jobber/Housecall Pro/ServiceTitan make timing automatic.",
      monetization:
        "$199–349/month per location, fully managed: flow setup, message copy, technician leaderboards, monthly review-growth report. Fifty clients at $249 is ~$150K/year, highly automatable after setup. Upsell: review-response writing and negative-review interception (dissatisfied customers routed to a feedback form before they reach Google).",
      firstSteps: [
        "Pick one field-service platform and build the job-completion-to-SMS trigger flow.",
        "Run a 30-day free pilot with two companies; screenshot the before/after review velocity.",
        "Add technician attribution — leaderboards create internal competition that compounds results.",
        "Sell with a one-line audit: 'You completed ~80 jobs last month and got 3 reviews. Here's what that costs you.'",
      ],
      risks: [
        "Review-gating (filtering who gets asked) violates Google policy — the negative-interception flow must be designed compliantly.",
        "SMS compliance (consent, opt-out) is table stakes.",
        "Reputation-suite incumbents discount aggressively when threatened; stay cheaper, narrower, and more done-for-you.",
      ],
      whoThisIsFor:
        "A marketer who understands local SEO mechanics and wants a simple, repeatable offer for an enormous buyer pool.",
    },
  },
  {
    slug: "content-decay-rescue",
    title: "Content-Decay Rescue for SaaS Blogs",
    hook: "Finds the 30 blog posts quietly losing rankings on a SaaS site, refreshes them with updated data and intent-matched rewrites, and recovers traffic the company already paid for.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["seo", "saas", "content", "productized-service"],
    summary:
      "Most SaaS companies sit on hundreds of aging posts whose rankings decay 10–30% yearly while the team chases net-new content. Refreshing decayed posts is the highest-ROI move in content marketing — faster, cheaper, and more reliable than new posts — and almost nobody owns it. A productized decay-audit-plus-refresh service sells recovered traffic, not words.",
    analysis: {
      market:
        "Content marketing budgets at B2B SaaS routinely run $10–50K/month, with measurable decay sitting in every Search Console account as ignored evidence. AI-era search rewards freshness and depth signals, making refresh cycles more valuable, not less. Agencies sell new-content retainers because that's what they've always sold — the refresh-specialist position is strangely vacant.",
      monetization:
        "Decay audit at $1,500 (often free as the sales tool once systemized), refresh packages at $400–700 per post in batches of 10, or $4–8K/month ongoing programs. Traffic-recovery reporting from Search Console makes renewal conversations trivial. Six retainer clients at $5K is a $360K/year practice.",
      firstSteps: [
        "Build the decay-detection workflow from Search Console exports: position drops, CTR drops, content age.",
        "Run free mini-audits for ten SaaS marketing leaders — the chart of their own decaying traffic closes deals.",
        "Develop the refresh SOP: intent re-check, data updates, structure upgrades, internal links, schema.",
        "Report obsessively: per-post recovery curves are your renewal engine and referral asset.",
      ],
      risks: [
        "SEO volatility means some refreshes won't recover; price on portfolio outcomes, not per-post guarantees.",
        "AI-search disruption to blog traffic overall — position the service around revenue pages and rankable assets, not vanity traffic.",
        "In-housing risk once you prove the playbook; the audit tooling and speed are your retention.",
      ],
      whoThisIsFor:
        "An SEO practitioner who'd rather sell a measurable, repeatable outcome than another vague content retainer.",
    },
  },
  {
    slug: "influencer-rights-vault",
    title: "Usage-Rights Manager for Influencer Content",
    hook: "Tracks which creator content a brand can legally use, where, and until when — before the screenshot of an expired ad turns into an invoice or a lawsuit.",
    category: "marketing",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["influencer-marketing", "compliance", "saas", "legal-ops"],
    summary:
      "Brands license influencer content with expiry dates, channel restrictions, and whitelisting terms — then lose track entirely, running expired creative in paid ads. A system of record that links every asset to its contract terms and alerts before rights lapse sells real risk reduction to every brand and agency running creator programs at scale.",
    analysis: {
      market:
        "Influencer marketing exceeds $30B globally and usage-rights disputes are a growing, documented pain — creators increasingly invoice for expired usage, and agencies manage rights in spreadsheets named 'FINAL_v3'. Influencer platforms (CreatorIQ, GRIN) handle campaign workflow but treat rights as a contract attachment, not a living system tied to where assets actually run. Agencies managing 20+ brand accounts feel this most acutely.",
      monetization:
        "$199–599/month for brands by asset volume; agency tier at $499–1,500/month across client accounts. The killer feature — scanning live ad accounts against the rights database to flag expired creative in-flight — justifies the top tier. 100 customers at $350 average is $420K ARR.",
      firstSteps: [
        "Interview ten influencer-marketing managers about their last rights scare; collect their tracking spreadsheets.",
        "Build the asset-plus-terms registry with expiry alerts and a clean approvals trail.",
        "Add contract parsing (AI extraction of usage clauses) to remove the data-entry objection.",
        "Integrate Meta ad-account scanning for the 'expired creative currently live' alert — the demo moment that sells.",
      ],
      risks: [
        "Influencer platforms could build this; the wedge is being the cross-platform, agency-friendly neutral layer.",
        "Garbage-in problem: value depends on contracts entering the system, so parsing automation is existential.",
        "Legal-adjacent positioning requires careful 'we're not your lawyer' framing.",
      ],
      whoThisIsFor:
        "A builder who has worked inside influencer marketing or brand legal-ops and knows where the bodies are buried.",
    },
  },
  {
    slug: "teardown-subscription",
    title: "Monthly Conversion Teardowns by Subscription",
    hook: "Every month, a 20-minute recorded expert teardown of your funnel — landing page to checkout — with a ranked fix list your team can ship that sprint.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "1–3 weeks",
    tags: ["cro", "productized-service", "subscription", "ux"],
    summary:
      "Full CRO agencies start at $5K/month and demand traffic volumes most companies don't have; free advice from Twitter threads is generic. The middle is a productized subscription: an expert records a monthly screen-share teardown of your actual funnel with a prioritized, sprint-sized fix list — high-perceived-value, asynchronous, and brutally efficient to deliver.",
    analysis: {
      market:
        "Every DTC brand, SaaS, and course creator suspects their funnel leaks, and conversion improvements compound revenue directly. Teardown-style content already dominates marketing Twitter and YouTube because watching an expert react to real pages is inherently compelling — the subscription simply privatizes it. Deliverability is the magic: a skilled reviewer produces a teardown in 45–60 minutes, priced at $300–500.",
      monetization:
        "$299–499/month per brand for one teardown plus a follow-up Q&A thread; $999/month tier adds a re-review of shipped fixes. Thirty subscribers at $400 is $144K/year for roughly 30 hours of monthly delivery work. Public free teardowns of volunteer brands are the content-marketing flywheel that fills the funnel.",
      firstSteps: [
        "Record five free public teardowns of volunteer brands; post them where their peers will see.",
        "Define the deliverable format: 20-minute video, ranked fix list with effort/impact scores, one-page summary.",
        "Open ten founding-member slots at $249 to build testimonials and recurring base.",
        "Track and publish subscriber wins ('checkout change from month 2 lifted conversion 14%') as the proof engine.",
      ],
      risks: [
        "Personal-expertise business: revenue caps at your hours unless you add reviewers, which dilutes the brand promise.",
        "Subscribers churn once obvious fixes are shipped; the re-review tier and fresh-campaign coverage extend lifetime.",
        "Credibility is the entry ticket — this works after you have CRO receipts, not before.",
      ],
      whoThisIsFor:
        "An experienced CRO or growth practitioner who wants leveraged, recurring income from skills they already have.",
    },
  },
  {
    slug: "nearbound-partner-desk",
    title: "Partnership & Co-Marketing Desk for SaaS",
    hook: "Finds, negotiates, and runs co-marketing campaigns (webinars, integrations spotlights, newsletter swaps) between complementary SaaS companies — the channel everyone praises and nobody staffs.",
    category: "marketing",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["partnerships", "b2b-saas", "co-marketing", "agency"],
    summary:
      "Partner-sourced leads close faster and cheaper than cold ones, but sub-$20M SaaS companies can't justify a partnerships hire — so the channel sits at zero. A fractional partnership desk that builds the partner map, books the co-marketing calendar, and runs the campaigns delivers a proven channel as a service.",
    analysis: {
      market:
        "Thousands of B2B SaaS companies share audiences with non-competing tools (the email platform and the survey tool both sell to the same marketer) yet run no systematic partner motion. Co-marketing inventory — joint webinars, integration launches, newsletter swaps, marketplace listings — is abundant and nearly free; what's scarce is the operator who brokers and executes. Fractional executive models have normalized exactly this buying behavior.",
      monetization:
        "Retainers at $2,500–5,000/month per client for partner-map development, outreach, and 2–3 executed campaigns monthly. Lead-based bonuses align incentives. Five clients is a $150–300K/year solo practice; a small team takes it past $500K. Network effects are real — every client makes you more valuable to the next, since you broker among them.",
      firstSteps: [
        "Broker one free partnership between two companies you know: a joint webinar with shared registrants.",
        "Document the playbook (partner scoring, outreach scripts, campaign run-books) as the productized core.",
        "Sell results from the pilot: registrant counts, pipeline generated, CAC comparison vs. paid channels.",
        "Build your cross-client partner graph — the proprietary asset that compounds with each engagement.",
      ],
      risks: [
        "Outcomes depend on partners' follow-through; multi-campaign retainers diversify against any single flop.",
        "Conflict-of-interest management as your client roster grows in adjacent niches.",
        "Long-feedback channel: set expectations on 60–90 day pipeline lag or churn follows.",
      ],
      whoThisIsFor:
        "A connector with B2B marketing chops who enjoys deal-making more than dashboard-tweaking.",
    },
  },
  {
    slug: "comparison-page-lab",
    title: "Comparison-Page Lab for High-Stakes Keywords",
    hook: "Builds honest, conversion-engineered 'X vs Y vs Z' comparison pages for SaaS companies — the highest-intent keywords they're currently losing to G2 and affiliate spam.",
    category: "marketing",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["seo", "saas", "comparison-content", "conversion"],
    summary:
      "Searches like 'Webflow vs Framer' are the most purchase-ready queries in SaaS, and most vendors cede them to review aggregators and thin affiliate posts. A specialist studio producing rigorous, genuinely useful comparison pages — feature-tested, honestly framed, conversion-engineered — owns a narrow craft with direct pipeline attribution.",
    analysis: {
      market:
        "Every SaaS company has 5–20 competitors generating comparison-search volume, and the pages that exist are either competitor hit-pieces (which fail trust) or aggregator templates (which fail depth). AI-generated content flooding has raised the value of pages with real product testing, screenshots, and honest trade-off framing — exactly what's hard to fake. Buyers convert from these pages at multiples of blog-traffic rates, making attribution unusually clean.",
      monetization:
        "Per-page pricing at $2,000–3,500 including actual product testing, comparison-table design, and conversion elements; programs of 6–12 pages at $15–30K. Quarterly maintenance retainers ($500/month) keep pages accurate as products change — recurring revenue on every past project. A two-person studio shipping six pages monthly clears $300K/year.",
      firstSteps: [
        "Build two spec comparison pages in a niche you know, doing real hands-on product testing.",
        "Rank them or use them purely as portfolio; either way they demonstrate the craft difference.",
        "Pitch SaaS marketing leaders with their own losing SERPs: 'Here's who owns your highest-intent keyword.'",
        "Systematize the testing-and-evidence workflow — screenshots, feature matrices, pricing-change monitoring.",
      ],
      risks: [
        "Products change constantly; stale comparisons damage client trust, making the maintenance retainer operationally necessary, not optional.",
        "Legal sensitivity around competitor claims requires evidence discipline and careful framing.",
        "SERP volatility on commercial keywords; diversify deliverable value into sales-enablement use of the same pages.",
      ],
      whoThisIsFor:
        "A detail-driven content strategist who enjoys product evaluation and wants premium pricing for genuinely rigorous work.",
    },
  },
];
