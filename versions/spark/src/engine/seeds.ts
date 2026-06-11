import type { FullIdea, Industry, Tier } from "./types";

export type AudienceSeed = { id: string; label: string; industries: Industry[] };
export type ProblemSeed = { id: string; label: string; industries: Industry[] };
export type ModelSeed = {
  id: string;
  label: string;
  budgetTier: Tier;
  effortTier: Tier;
  rationales: string[];
  firstSteps: string[];
};

// ─── Audiences (24) ────────────────────────────────────────────────────────────

export const audiences: AudienceSeed[] = [
  { id: "coffee-shops", label: "independent coffee shops", industries: ["local", "ecommerce", "community"] },
  { id: "new-parents", label: "new parents", industries: ["health", "ecommerce", "community"] },
  { id: "indie-game-devs", label: "indie game devs", industries: ["devtools", "content", "community"] },
  { id: "wedding-photographers", label: "wedding photographers", industries: ["local", "content", "saas"] },
  { id: "freelance-designers", label: "freelance designers", industries: ["saas", "content", "fintech"] },
  { id: "hoa-boards", label: "HOA boards", industries: ["local", "community", "saas"] },
  { id: "solo-physical-therapists", label: "solo physical therapists", industries: ["health", "local", "saas"] },
  { id: "etsy-sellers", label: "Etsy sellers", industries: ["ecommerce", "content", "fintech"] },
  { id: "bootstrapped-founders", label: "bootstrapped SaaS founders", industries: ["saas", "devtools", "ai"] },
  { id: "high-school-teachers", label: "high school teachers", industries: ["education", "ai", "content"] },
  { id: "food-truck-owners", label: "food truck owners", industries: ["local", "ecommerce", "fintech"] },
  { id: "remote-eng-teams", label: "remote engineering teams", industries: ["devtools", "saas", "ai"] },
  { id: "yoga-instructors", label: "yoga instructors", industries: ["health", "local", "content"] },
  { id: "twitch-streamers", label: "Twitch streamers", industries: ["content", "community", "ai"] },
  { id: "small-landlords", label: "small landlords", industries: ["local", "fintech", "saas"] },
  { id: "personal-trainers", label: "personal trainers", industries: ["health", "content", "saas"] },
  { id: "college-students", label: "college students", industries: ["education", "fintech", "community"] },
  { id: "real-estate-agents", label: "real estate agents", industries: ["local", "ai", "content"] },
  { id: "volunteer-coordinators", label: "nonprofit volunteer coordinators", industries: ["community", "saas", "education"] },
  { id: "course-creators", label: "online course creators", industries: ["education", "content", "ai"] },
  { id: "barbershops", label: "barbershops and salons", industries: ["local", "saas", "community"] },
  { id: "junior-devs", label: "junior developers", industries: ["devtools", "education", "community"] },
  { id: "financial-coaches", label: "financial coaches", industries: ["fintech", "education", "content"] },
  { id: "running-clubs", label: "neighborhood running clubs", industries: ["community", "health", "local"] },
];

// ─── Problems (24) — compose as "<audience> who <problem>" ─────────────────────

export const problems: ProblemSeed[] = [
  { id: "no-shows", label: "lose money to no-show appointments", industries: ["local", "health", "saas"] },
  { id: "pricing-confidence", label: "can't price their work confidently", industries: ["content", "local", "ecommerce", "fintech"] },
  { id: "repetitive-questions", label: "drown in repetitive customer questions", industries: ["ecommerce", "local", "saas", "ai"] },
  { id: "no-time-marketing", label: "have no time to market themselves", industries: ["local", "content", "health", "ecommerce"] },
  { id: "repeat-customers", label: "struggle to turn one-time buyers into regulars", industries: ["ecommerce", "local", "fintech"] },
  { id: "chasing-payments", label: "waste hours on invoicing and chasing late payments", industries: ["fintech", "saas", "local", "content"] },
  { id: "community-engagement", label: "can't keep their community engaged between events", industries: ["community", "content", "education", "health"] },
  { id: "inventory-chaos", label: "lose track of inventory across channels", industries: ["ecommerce", "local"] },
  { id: "marketing-attribution", label: "have no idea which marketing channel actually works", industries: ["ecommerce", "content", "saas", "local"] },
  { id: "timezone-scheduling", label: "burn out coordinating schedules across time zones", industries: ["saas", "devtools", "education", "community"] },
  { id: "leads-in-spreadsheets", label: "lose track of leads in messy spreadsheets", industries: ["local", "saas", "fintech"] },
  { id: "content-consistency", label: "struggle to publish content consistently", industries: ["content", "ai", "education", "community"] },
  { id: "measuring-progress", label: "can't prove their clients are actually improving", industries: ["education", "health", "fintech"] },
  { id: "feedback-overload", label: "get buried in unstructured user feedback", industries: ["saas", "devtools", "ai"] },
  { id: "tool-overspend", label: "overpay for a stack of tools they barely use", industries: ["fintech", "saas", "devtools"] },
  { id: "vendor-trust", label: "can't find trustworthy vendors without endless research", industries: ["local", "community", "ecommerce"] },
  { id: "weekend-bookkeeping", label: "spend weekends on bookkeeping instead of growth", industries: ["fintech", "local", "ecommerce"] },
  { id: "confusing-onboarding", label: "watch new members get lost in week one", industries: ["community", "saas", "education", "devtools"] },
  { id: "missed-grants", label: "miss out on grants and programs they qualify for", industries: ["fintech", "community", "education", "local"] },
  { id: "no-portfolio-proof", label: "can't showcase results to win their next client", industries: ["content", "health", "local", "saas"] },
  { id: "accountability", label: "can't stay accountable to their own goals", industries: ["health", "education", "community", "content"] },
  { id: "first-week-churn", label: "lose new users in the first week", industries: ["saas", "devtools", "ai", "ecommerce"] },
  { id: "report-formatting", label: "spend hours formatting reports nobody reads", industries: ["saas", "ai", "education", "fintech"] },
  { id: "volunteer-wrangling", label: "coordinate helpers through endless group chats", industries: ["community", "local", "education", "health"] },
];

// ─── Business models (12) ──────────────────────────────────────────────────────

export const models: ModelSeed[] = [
  {
    id: "micro-saas",
    label: "a $29/mo micro-SaaS",
    budgetTier: 1,
    effortTier: 2,
    rationales: [
      "Recurring revenue compounds even with a tiny customer base — 100 customers is a real salary.",
      "A narrow promise is easy to explain, easy to ship, and easy to defend against bigger players.",
      "At $29/mo the buying decision happens in one sitting, with no procurement committee in sight.",
      "Vertical tools win because generic software always leaves the last mile of the workflow unsolved.",
    ],
    firstSteps: [
      "Write the landing page headline first, then DM 10 people in the niche and ask if it hits a real pain.",
      "Build a Figma click-through of the core screen and show it to 5 potential users this week.",
      "Spin up a one-question waitlist page tonight and post it in two communities where the niche hangs out.",
    ],
  },
  {
    id: "productized-service",
    label: "a productized service",
    budgetTier: 1,
    effortTier: 2,
    rationales: [
      "Fixed scope and fixed price remove the two things buyers hate most about agencies: surprises and hourly meters.",
      "You can sell it before building anything — delivery can be 100% manual on day one.",
      "Repeating the same playbook every week creates margins that look like software over time.",
    ],
    firstSteps: [
      "Define one deliverable, one price, and one turnaround time, then pitch it to 5 prospects by email today.",
      "Do the service manually for one real client at half price in exchange for a testimonial.",
      "Write a one-page 'what you get' doc with before/after examples and share it where the audience complains.",
    ],
  },
  {
    id: "paid-community",
    label: "a paid community",
    budgetTier: 1,
    effortTier: 1,
    rationales: [
      "People pay for the room, not the content — curated peers are the product and they retain themselves.",
      "Membership revenue is predictable and the marginal cost of each new member is nearly zero.",
      "Niche communities thrive precisely where big social platforms feel too noisy to be useful.",
    ],
    firstSteps: [
      "Invite 10 hand-picked people into a free private group and run one great weekly thread for a month.",
      "Host a single live session on the niche's hottest problem and pitch the membership at the end.",
      "Write the 'who this is for / who it isn't for' page before anything else — clarity sells communities.",
    ],
  },
  {
    id: "niche-newsletter",
    label: "a niche newsletter",
    budgetTier: 1,
    effortTier: 1,
    rationales: [
      "Owning the inbox of a specific niche is a distribution asset every sponsor in that niche wants to rent.",
      "It costs almost nothing to start, and consistency beats production value in newsletters.",
      "Every issue compounds: archives become SEO, readers become referrals, and trust becomes pricing power.",
    ],
    firstSteps: [
      "Write issue #1 today and send it to 15 people in the niche with a one-line ask: 'worth subscribing?'",
      "Collect the 10 best links the niche shared this week and turn them into a 5-minute digest.",
      "Set up a free signup page and commit publicly to a weekly cadence for 8 weeks.",
    ],
  },
  {
    id: "curated-marketplace",
    label: "a curated marketplace",
    budgetTier: 2,
    effortTier: 3,
    rationales: [
      "Curation solves the trust problem that keeps both sides of a niche transaction stuck on word-of-mouth.",
      "Marketplaces get stronger with every transaction — liquidity is a moat nobody can copy quickly.",
      "Starting hyper-narrow lets you fake the backend with spreadsheets until demand is proven.",
    ],
    firstSteps: [
      "List 20 supply-side candidates in a spreadsheet and call 5 of them to learn how they get customers today.",
      "Broker one transaction completely by hand — concierge-style — and write down every step.",
      "Build a simple directory page of vetted providers and measure who clicks 'request intro'.",
    ],
  },
  {
    id: "ai-assistant",
    label: "an AI-powered assistant",
    budgetTier: 2,
    effortTier: 2,
    rationales: [
      "The job was always too expensive to delegate to a human — AI just changed that math overnight.",
      "Workflows full of reading, summarizing, and drafting are exactly where current models already excel.",
      "Buyers don't want 'AI', they want the chore gone — selling the outcome keeps churn low.",
    ],
    firstSteps: [
      "Do the task manually with an off-the-shelf chatbot for one real user and time how much you save them.",
      "Map the workflow into steps and mark which ones a model can do today versus which need a human.",
      "Prototype a single prompt chain and show the raw output to 3 people in the niche for honest reactions.",
    ],
  },
  {
    id: "dfy-agency",
    label: "a done-for-you agency",
    budgetTier: 2,
    effortTier: 3,
    rationales: [
      "Busy operators happily pay a premium for 'never think about this again' over any DIY tool.",
      "Service revenue funds itself from week one — clients pay before you scale anything.",
      "Working hands-on with clients surfaces the playbook a future software product can automate.",
    ],
    firstSteps: [
      "Offer the full service free to one well-known name in the niche in exchange for a case study.",
      "Write a 3-tier pricing page and pitch the middle tier to 10 prospects this week.",
      "Document your delivery checklist after the first client so the second one takes half the time.",
    ],
  },
  {
    id: "template-pack",
    label: "a no-code template pack",
    budgetTier: 1,
    effortTier: 1,
    rationales: [
      "Templates sell because they collapse a week of staring at a blank page into a 10-minute setup.",
      "Digital products have zero marginal cost and sell while you sleep.",
      "One great free template is a marketing engine that fills the funnel for the paid bundle.",
    ],
    firstSteps: [
      "Build the single most-needed template first and give it away to collect 50 emails.",
      "Study the 5 best-selling packs in adjacent niches and list what they include and charge.",
      "Package 3 templates with a Stripe payment link and a plain one-page sales page tonight.",
    ],
  },
  {
    id: "booking-app",
    label: "a mobile-first booking app",
    budgetTier: 2,
    effortTier: 2,
    rationales: [
      "Whoever owns the booking owns the customer relationship — and the recurring payment that follows.",
      "Most niche operators still run scheduling through DMs and missed calls, which loses real revenue.",
      "Deposits and reminders attack the no-show problem directly, so the ROI is measurable in week one.",
    ],
    firstSteps: [
      "Shadow one operator for a day and count every minute spent on scheduling back-and-forth.",
      "Set up a generic booking tool for one business free and track no-show changes for two weeks.",
      "Sketch the 3-tap booking flow on paper and test it with 5 real customers of the niche.",
    ],
  },
  {
    id: "cohort-course",
    label: "a cohort-based course",
    budgetTier: 1,
    effortTier: 2,
    rationales: [
      "Deadlines and peers fix the completion problem that kills self-paced courses.",
      "You can pre-sell the cohort before recording a single lesson — validation and cashflow in one move.",
      "Each cohort produces testimonials, alumni referrals, and a sharper curriculum for the next one.",
    ],
    firstSteps: [
      "Outline 4 weekly sessions, set a price, and pre-sell 5 seats before building any material.",
      "Teach the first session free as a live workshop and pitch the full cohort at the end.",
      "Interview 5 people who tried to learn this alone and list exactly where they got stuck.",
    ],
  },
  {
    id: "usage-api",
    label: "a usage-based API",
    budgetTier: 2,
    effortTier: 3,
    rationales: [
      "Developers pay for anything that deletes an unpleasant build-vs-buy decision from their roadmap.",
      "Usage-based pricing grows your revenue automatically as your best customers grow.",
      "An API is the rare product where docs, a free tier, and reliability do most of the selling.",
    ],
    firstSteps: [
      "Write the README and example request/response first, then ask 5 developers if they'd integrate it.",
      "Wrap the hardest 20% of the problem behind one clean endpoint and stub the rest.",
      "Post a 'fake door' docs page and measure how many devs request an API key.",
    ],
  },
  {
    id: "white-label",
    label: "a white-label platform",
    budgetTier: 3,
    effortTier: 3,
    rationales: [
      "Selling through partners who already own the customer relationship multiplies distribution overnight.",
      "Partners churn far less than end users because their own brand is on the product.",
      "One platform, many logos — engineering effort amortizes across every new partner you sign.",
    ],
    firstSteps: [
      "Pitch 5 agencies or associations serving the niche and ask what they wish they could sell under their brand.",
      "Mock up the same dashboard with two different partner logos to make the pitch tangible.",
      "Draft a simple rev-share one-pager and get one partner to sign a letter of intent.",
    ],
  },
];

// ─── Twists (16) ───────────────────────────────────────────────────────────────

export const twists: string[] = [
  "with an AI copilot baked in",
  "that runs entirely over WhatsApp",
  "priced as a one-time lifetime deal",
  "with a built-in referral engine",
  "that plugs straight into the calendar they already use",
  "with a public accountability leaderboard",
  "bundled with a weekly expert office hour",
  "that they can white-label under their own brand",
  "with a results-or-refund guarantee",
  "powered by a vetted peer network",
  "designed to take under ten minutes a week to run",
  "with a marketplace where users sell their own templates",
  "launched as a private beta for the first 50 customers",
  "that turns their data into a shareable scorecard",
  "with concierge onboarding over a 15-minute video call",
  "that works offline-first for on-the-go days",
];

// ─── Curated ideas (40) — hand-written, complete ───────────────────────────────

const c = (
  slug: string,
  title: string,
  hook: string,
  whyItWorks: string,
  firstStep: string,
  industry: Industry,
  budgetTier: Tier,
  effortTier: Tier
): FullIdea => ({
  id: `c-${slug}`,
  title,
  hook,
  whyItWorks,
  firstStep,
  industry,
  budgetTier,
  effortTier,
  curated: true,
});

export const curatedIdeas: FullIdea[] = [
  // ── SaaS ──
  c(
    "cancel-flow-rescue",
    "Cancel-Flow Rescue Widget",
    "A drop-in cancel flow that offers pause, downgrade, or a tailored discount the moment a SaaS user hits 'cancel'.",
    "Saving an existing customer is 5x cheaper than acquiring a new one, and most small SaaS teams ship a bare 'are you sure?' button. A widget that recovers even 10% of cancels pays for itself in the first week.",
    "Add a one-question exit survey plus a 'pause for 2 months' option to one product and measure the save rate for 30 days.",
    "saas",
    1,
    2
  ),
  c(
    "ghost-seat-auditor",
    "Ghost Seat Auditor",
    "Connects to a company's SaaS stack and flags paid seats nobody has logged into for 60+ days, then drafts the downgrade emails.",
    "Companies waste roughly a third of their software spend on unused licenses, and finance teams have no easy visibility. Charging a slice of recovered spend makes the ROI undeniable.",
    "Manually audit one friendly company's Google Workspace and Slack admin panels and present the savings in a one-page report.",
    "saas",
    2,
    2
  ),
  c(
    "onboarding-replays",
    "Onboarding Replay Digest",
    "A weekly email showing founders three session replays of real users getting stuck in their first ten minutes.",
    "Founders know activation is leaking but never make time to watch replays. Curating just the painful moments turns an ignored analytics tool into a Monday-morning ritual.",
    "Watch 10 replays of one startup's onboarding using a free analytics trial and send the founder a 3-clip teardown.",
    "saas",
    1,
    2
  ),
  c(
    "compliance-countdown",
    "Compliance Countdown for Tiny Teams",
    "A checklist-as-a-service that turns SOC 2 and GDPR prep into a weekly 30-minute task list for startups without a security hire.",
    "Enterprise deals stall on security questionnaires, and full compliance platforms are overkill at the seed stage. A guided countdown sells the outcome — 'pass the questionnaire' — not the paperwork.",
    "Collect three real security questionnaires from founder friends and map the 20 questions that appear in all of them.",
    "saas",
    2,
    3
  ),

  // ── AI & Automation ──
  c(
    "inbox-to-invoice",
    "Inbox-to-Invoice Agent",
    "An AI agent that reads a freelancer's sent mail, detects finished work, and drafts the invoice before they remember to.",
    "Freelancers leave thousands on the table to forgotten billables, and the data trail already exists in email. Drafting — not auto-sending — keeps the human in control and trust intact.",
    "Search your own sent folder for last month's delivered work and count the unbilled items you find in 15 minutes.",
    "ai",
    2,
    2
  ),
  c(
    "meeting-debrief-bot",
    "Meeting Debrief Bot for Client Services",
    "Joins client calls, then auto-drafts the recap email, action list, and updated project doc in the agency's tone of voice.",
    "Account managers spend their evenings writing recaps, and generic notetakers stop at a transcript. The deliverable clients actually receive — the polished recap — is the part worth paying for.",
    "Take one recorded client call, hand-write the perfect recap email, and time how long an AI prompt takes to match it.",
    "ai",
    1,
    2
  ),
  c(
    "review-reply-autopilot",
    "Review Reply Autopilot",
    "Watches Google and Yelp for new reviews of a local business and queues on-brand replies — grateful, apologetic, or both — for one-tap approval.",
    "Reply rate and speed measurably affect local ranking and walk-ins, but owners check reviews weekly at best. One tap in a morning text beats logging into three dashboards.",
    "Offer to handle one restaurant's review replies by hand for two weeks and track rating and response-time changes.",
    "ai",
    1,
    1
  ),
  c(
    "rfp-first-draft",
    "RFP First-Draft Machine",
    "Upload a request-for-proposal PDF; get a structured first draft assembled from the firm's past winning proposals.",
    "Small agencies and contractors skip winnable RFPs because the first draft takes a full day. Mining their own past wins keeps the output authentic and the legal risk near zero.",
    "Ask one agency for two past proposals and one open RFP, and assemble a draft manually to prove the time savings.",
    "ai",
    2,
    3
  ),

  // ── E-commerce ──
  c(
    "post-purchase-poll",
    "One-Question Post-Purchase Poll",
    "A tiny script that asks 'How did you hear about us?' on the thank-you page and reconciles answers against ad-platform claims.",
    "Attribution tools overcomplicate what one honest question answers. Merchants routinely discover a podcast or group chat driving sales no pixel ever saw.",
    "Add a hard-coded poll to one store's thank-you page and compare a week of answers against its ad dashboard.",
    "ecommerce",
    1,
    1
  ),
  c(
    "bundle-brain",
    "Bundle Brain for Shopify",
    "Analyzes order history to suggest the three highest-margin product bundles, then builds the bundle pages automatically.",
    "Bundles raise average order value 10-30% but merchants guess at combinations. Mining real co-purchase data turns a hunch into a one-click experiment.",
    "Export one store's last 500 orders to a spreadsheet and find the top 3 co-purchased pairs by hand.",
    "ecommerce",
    2,
    2
  ),
  c(
    "returns-relove",
    "Returns Re-Love Storefront",
    "A plug-and-play 'open box' section where merchants resell returned items at a discount instead of writing them off.",
    "Returns quietly destroy 15-20% of small-merchant margin, and liquidators pay pennies. A branded outlet recovers value and attracts deal-hunting new customers.",
    "Ask three merchants what they currently do with returns and what percentage of value they recover.",
    "ecommerce",
    2,
    3
  ),
  c(
    "drop-alert-club",
    "Restock Alert Club",
    "Turns 'back in stock' notifications into a VIP club with early access, building hype lists for perpetually sold-out small brands.",
    "Scarcity already exists for handmade and small-batch brands — they just waste it. A waitlist with early access converts at several times the rate of a cold email blast.",
    "Set up a manual 'first dibs' email list for one sold-out product and measure sell-through on the next restock.",
    "ecommerce",
    1,
    1
  ),

  // ── Content & Creators ──
  c(
    "clip-miner",
    "Clip Miner for Long-Form Creators",
    "A service that turns every podcast episode into 10 vertical clips, ranked by hook strength, with captions in the creator's style.",
    "Short clips are the discovery engine for long-form shows, but editing is the chore creators procrastinate most. Selling a monthly bundle per episode beats per-clip pricing on both sides.",
    "Clip one episode of a mid-size podcast for free, send 5 clips, and ask for a revenue-share trial month.",
    "content",
    1,
    2
  ),
  c(
    "sponsor-kit-builder",
    "Sponsor Kit Builder",
    "Generates a live media kit — audience stats, past results, rate card — that updates itself from a creator's connected accounts.",
    "Creators lose sponsor deals to stale PDFs and slow replies. A self-updating link answers the sponsor's first five questions before the first call.",
    "Build one creator's media kit as a simple webpage by hand and A/B it against their PDF for inbound replies.",
    "content",
    1,
    2
  ),
  c(
    "evergreen-recycler",
    "Evergreen Recycler",
    "Scans a creator's archive, finds top posts older than 90 days, and queues refreshed versions for republishing on a calendar.",
    "Back catalogs are dormant assets; the audience that follows you today never saw last year's best work. Reposting proven winners outperforms new gambles with a tenth of the effort.",
    "Pick one creator's 5 best posts from last year, refresh the hooks, and repost over two weeks while tracking engagement.",
    "content",
    1,
    1
  ),
  c(
    "ugc-rights-locker",
    "UGC Rights Locker",
    "One link where brands request, creators approve, and both sides store usage rights for user-generated content — receipts included.",
    "UGC disputes are exploding as brands run creator content in paid ads. A neutral rights ledger removes the awkward DM negotiation both sides dread.",
    "Interview three creators and two brand marketers about their last UGC licensing exchange and where it got uncomfortable.",
    "content",
    2,
    3
  ),

  // ── Local Business ──
  c(
    "dead-hours-pass",
    "Dead Hours Pass",
    "A city-wide pass that fills gyms, cafés, and studios during their slowest hours with locals paying a flat monthly fee.",
    "Empty 2pm slots cost a venue almost nothing to serve, so any revenue is found money. Members get variety, venues get foot traffic, and the pass owns the demand.",
    "Sign three nearby venues onto a paper-punch-card pilot and sell 10 passes to remote workers in local groups.",
    "local",
    2,
    3
  ),
  c(
    "storefront-window-network",
    "Storefront Window Ad Network",
    "Matches local businesses that want hyperlocal ads with shop windows on busy streets, managed through a simple booking calendar.",
    "Foot-traffic attention is real and underpriced, and empty window space earns shops nothing today. Booking and standardized poster sizes turn favors into a market.",
    "Broker one month of window space between two neighboring businesses by hand and document the price both accept.",
    "local",
    1,
    2
  ),
  c(
    "shift-fill-bench",
    "Last-Minute Shift Bench",
    "A vetted on-call bench of baristas, line cooks, and stylists that local owners can ping when someone calls in sick.",
    "A missed shift can wipe out a day's profit, and staffing apps ignore small independents. Starting as a neighborhood WhatsApp bench keeps trust high and overhead near zero.",
    "Recruit 10 experienced part-timers in one neighborhood and offer the bench to 5 business owners for a trial month.",
    "local",
    1,
    2
  ),
  c(
    "local-legend-pages",
    "Local Legend Pages",
    "Done-for-you Google Business Profile management — photos, posts, Q&A, hours — for owners who haven't logged in since 2022.",
    "The profile is the new homepage; most owners don't know posts and photos move ranking. A before/after map-pack screenshot sells the service in one image.",
    "Audit 10 nearby businesses' profiles, send each owner one specific fix, and offer to do everything for a flat monthly fee.",
    "local",
    1,
    1
  ),

  // ── Health & Wellness ──
  c(
    "rehab-homework-app",
    "Rehab Homework Companion",
    "Physical therapists assign exercise videos with rep counters and check-in nudges; patients stop guessing and clinics see adherence.",
    "Home-program adherence hovers near 30%, and outcomes — plus repeat referrals — depend on it. Clinics will pay because adherent patients finish their plans of care.",
    "Ask one PT to send exercises via a structured weekly text to 5 patients and compare adherence to their usual handout.",
    "health",
    2,
    2
  ),
  c(
    "sleep-streak-circles",
    "Sleep Streak Circles",
    "Small accountability pods where five strangers commit to a bedtime window and keep a shared streak alive together.",
    "Sleep is the highest-leverage health habit and the least social one. Borrowed accountability — not data dashboards — is what actually changes bedtime behavior.",
    "Run one pod of 5 friends in a group chat for two weeks with a shared streak spreadsheet and collect what kept them in.",
    "health",
    1,
    1
  ),
  c(
    "trainer-progress-reels",
    "Client Progress Reels for Trainers",
    "Turns a personal trainer's session logs and check-in photos into polished monthly progress recaps clients actually share.",
    "Clients quit when progress feels invisible, and shared recaps are the trainer's best ad. One tool fixes retention and referral in the same artifact.",
    "Build one client's monthly recap by hand in Canva for a trainer and watch whether the client posts it.",
    "health",
    1,
    2
  ),
  c(
    "quiet-clinic-finder",
    "Sensory-Friendly Care Finder",
    "A directory of dentists, salons, and clinics offering low-stimulation appointments, verified by neurodivergent reviewers.",
    "Millions of families plan every errand around sensory load and currently rely on scattered group-chat folklore. Verified listings create trust no generic review site offers.",
    "List 15 verified sensory-friendly providers in one city by calling them, and share the list in three parent communities.",
    "health",
    1,
    2
  ),

  // ── Fintech ──
  c(
    "deposit-guard",
    "Deposit Guard for Service Pros",
    "Booking deposits, milestone payments, and automatic reminders for tattoo artists, detailers, and contractors who get ghosted.",
    "Service pros lose entire days to ghost clients but feel awkward demanding money up front. A neutral tool makes deposits the policy, not a personal confrontation.",
    "Set up payment-link deposits for one tattoo artist and measure no-show changes over a month.",
    "fintech",
    2,
    2
  ),
  c(
    "freelancer-tax-envelope",
    "Tax Envelope Autopilot",
    "Watches a freelancer's incoming payments and auto-moves the right tax slice into a separate stash, with a quarterly one-tap filing reminder.",
    "The April tax bill is the most predictable financial disaster in freelancing. Automating the set-aside — not the advice — is the simple wedge banks ignore.",
    "Interview 10 freelancers about last year's tax bill surprise and what percentage they failed to set aside.",
    "fintech",
    3,
    3
  ),
  c(
    "split-rent-ledger",
    "Roommate Money Ledger",
    "One shared ledger for rent, utilities, and chores-with-stakes, designed for the messy reality of 3-5 person households.",
    "Splitting apps handle dinners, not ongoing households with deposits, shared subscriptions, and someone always late. The household — not the transaction — is the right unit of product.",
    "Run one 4-person household's monthly finances in a shared spreadsheet template and note every dispute it prevents.",
    "fintech",
    1,
    2
  ),
  c(
    "grant-radar",
    "Grant Radar for Main Street",
    "Monitors federal, state, and utility programs and alerts small businesses when they qualify for money they didn't know existed.",
    "Billions in small-business incentives go unclaimed yearly because discovery requires reading government PDFs. Charging a success fee aligns perfectly with the value delivered.",
    "Compile every active program for one city's restaurants into a single page and email it to 20 owners with a reply-rate test.",
    "fintech",
    2,
    3
  ),

  // ── Education ──
  c(
    "parent-progress-texts",
    "Parent Progress Texts",
    "Tutors and music teachers send structured after-lesson texts — win, struggle, homework — that parents actually read and forward.",
    "Parents pay the bill but only hear about progress when something's wrong. A 60-second ritual that proves value is the cheapest retention tool a tutor can buy.",
    "Write a 3-line after-lesson template and have one tutor use it for two weeks, then ask parents if they noticed.",
    "education",
    1,
    1
  ),
  c(
    "syllabus-to-flashcards",
    "Syllabus-to-Flashcards Pipeline",
    "Students upload lecture slides and readings; out come spaced-repetition decks aligned to the actual exam schedule.",
    "Spaced repetition works but deck-building is the barrier that stops 90% of students. Aligning decks to each course's real calendar beats every generic flashcard app.",
    "Build complete decks for one course at one university by hand and sell access to classmates for $10.",
    "education",
    1,
    2
  ),
  c(
    "teacher-side-gig-hub",
    "Lesson Marketplace for Teacher Creators",
    "Teachers sell their best worksheets and unit plans with school-friendly licensing, AI-assisted differentiation, and real revenue splits.",
    "Teachers already create exceptional material nights and weekends; existing marketplaces take huge cuts and ignore differentiation needs. Better economics attract the best sellers first.",
    "Recruit 5 teachers, list their 3 best resources on a simple storefront, and split first-month proceeds transparently.",
    "education",
    2,
    3
  ),
  c(
    "career-switch-sprints",
    "Career-Switcher Proof Sprints",
    "Two-week guided projects where career changers build one portfolio artifact — with feedback — that interviews actually ask about.",
    "Bootcamps oversell and self-study undersells; the missing unit is one reviewed, finished artifact. Small scope means high completion, testimonials, and word of mouth.",
    "Run one free sprint with 5 aspiring data analysts and track how many land interviews citing the project.",
    "education",
    1,
    2
  ),

  // ── Dev Tools ──
  c(
    "flaky-test-bouncer",
    "Flaky Test Bouncer",
    "A CI bot that detects flaky tests, quarantines them with an expiry date, and nags the owning team before the quarantine rots.",
    "Flaky tests silently train engineers to ignore CI, which is how real bugs ship. Quarantine-with-expiry fixes the incentive problem, not just the symptom.",
    "Write a script that re-runs failed tests in one repo's CI and label a week of failures as flaky or real.",
    "devtools",
    1,
    2
  ),
  c(
    "env-var-doctor",
    "Env Var Doctor",
    "Scans a codebase, finds every environment variable it actually reads, and generates the always-up-to-date .env.example and docs.",
    "'Works on my machine' is usually a missing env var, and every team's example file is stale. Tiny scope, universal pain, perfect for bottom-up adoption.",
    "Write a grep-based prototype for one language, run it on 5 open-source repos, and count the undocumented variables.",
    "devtools",
    1,
    1
  ),
  c(
    "pr-storytime",
    "PR Storytime",
    "Turns a merged pull request into a reviewer-friendly narrative: what changed, why, in what order to read the files.",
    "Review latency is the hidden tax on team velocity, and most of it is reviewers reconstructing intent. Authors approve because better-told PRs get merged faster.",
    "Hand-write reading guides for 5 real PRs on one team and measure review turnaround against their baseline.",
    "devtools",
    1,
    2
  ),
  c(
    "webhook-replay-vault",
    "Webhook Replay Vault",
    "Captures every inbound webhook, makes it searchable, and lets developers replay any payload against local or staging with one click.",
    "Debugging webhooks today means begging Stripe or GitHub to resend events. Capture-and-replay turns a frustrating black box into a normal debugging loop.",
    "Build a single capture endpoint that stores payloads and a replay button, and dogfood it on one side project.",
    "devtools",
    2,
    3
  ),

  // ── Community ──
  c(
    "lurker-ladder",
    "Lurker Ladder",
    "Analyzes a Discord or Slack community and gives each silent member one tiny personalized prompt to make their first post.",
    "Communities die from the 99% who never speak, not the 1% who argue. First-post activation is measurable, and managers already track it as their north star.",
    "Manually DM 20 lurkers in one community with personalized openers and report the activation rate to the owner.",
    "community",
    1,
    2
  ),
  c(
    "alumni-embers",
    "Alumni Embers",
    "Rekindles dormant alumni groups — bootcamps, fellowships, teams — with monthly curated intros based on what members are working on now.",
    "Alumni networks decay into job-posting ghost towns despite being the highest-trust groups people belong to. One good intro per month is a retention engine nobody else delivers.",
    "Run hand-matched monthly intros for one 50-person alumni group for two months and survey who got real value.",
    "community",
    1,
    1
  ),
  c(
    "event-buddy-matcher",
    "Event Buddy Matcher",
    "Meetup organizers send attendees a pre-event match — one person to look for when they walk in — so nobody hovers by the snacks alone.",
    "The fear of standing alone is the top reason first-timers no-show. Organizers pay for retention because returning attendees are what sponsors buy.",
    "Pair attendees by hand for one local meetup using the RSVP list and count how many matched pairs return next month.",
    "community",
    1,
    1
  ),
  c(
    "mod-shift-scheduler",
    "Mod Shift Scheduler",
    "Coverage calendars, handoff notes, and burnout alerts for the volunteer moderator teams behind large online communities.",
    "Mod burnout is the silent killer of big communities, and coordination still happens in pinned messages. Treating mods like an on-call team is an obvious upgrade owners will fund.",
    "Interview mod teams from three large servers about coverage gaps and sketch the schedule view they describe.",
    "community",
    1,
    2
  ),
];
