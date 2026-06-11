import type { AtlasIdea } from "../types";

export const contentCreatorIdeas: AtlasIdea[] = [
  {
    slug: "city-hall-intel",
    title: "City-Hall Intelligence Newsletter for Investors",
    hook: "Reads every zoning hearing, council agenda, and development application in one metro and tells real-estate investors what it means — weekly, for $49/month.",
    category: "content-creator",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["newsletter", "real-estate", "local-government", "paid-media"],
    summary:
      "Municipal decisions move property values months before the market notices, but the source material is buried in PDF agendas and three-hour meeting videos. A paid newsletter that distills one metro's planning pipeline — rezonings, variances, infrastructure votes — into investor-relevant intelligence charges B2B prices for journalism-shaped work.",
    analysis: {
      market:
        "Every metro has thousands of agents, developers, and small landlords whose deals depend on land-use decisions, while local newspapers have gutted city-hall coverage. Comparable products exist in the biggest markets, but the model is barely exploited in mid-size metros (500K–2M population). AI transcription and summarization collapse the production cost that used to make this a full-time beat.",
      monetization:
        "Subscriptions at $39–79/month for individuals and $200+/month team licenses for brokerages and development firms. Sponsorships from title companies, lenders, and land-use attorneys layer on once you have 1,000 readers. 400 paid subscribers at $49 is ~$235K/year — for one well-run metro.",
      firstSteps: [
        "Pick your metro and build the ingestion pipeline: agenda scrapers plus meeting-video transcription.",
        "Publish four free weekly issues and personally recruit 200 subscribers from real-estate meetups and investor Facebook groups.",
        "Turn on paid with a 'deal radar' section — specific parcels and applications — as the paywall hook.",
        "Sell the first three sponsorship slots directly to title companies you already named in coverage.",
      ],
      risks: [
        "Consistency is the product; this is a relentless weekly publishing commitment, automated or not.",
        "Accuracy errors on legal matters (what a vote actually means) erode the premium positioning fast.",
        "Each metro is a separate build; expansion needs playbooks or local partners.",
      ],
      whoThisIsFor:
        "A writer-analyst hybrid who likes civic plumbing and wants media revenue without chasing scale-at-all-costs.",
    },
  },
  {
    slug: "trade-broll-market",
    title: "Stock B-Roll Marketplace for the Trades",
    hook: "Authentic footage of real plumbers, welders, and electricians at work — licensed to the thousands of contractor marketing agencies stuck using fake stock video.",
    category: "content-creator",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "6–10 weeks",
    tags: ["video", "marketplace", "trades", "licensing"],
    summary:
      "Search any stock site for 'plumber' and you get actors in spotless overalls pointing at pipes. Meanwhile thousands of agencies make ads, recruiting videos, and social content for trades businesses and home-services franchises. A marketplace of genuinely authentic trade footage — shot by tradespeople — fills a visible gap with licensing economics.",
    analysis: {
      market:
        "Home-services marketing is a real industry (dedicated agencies, franchise marketing departments, manufacturer co-op budgets) that buys video constantly. Generic stock libraries fail on authenticity, and custom shoots cost $3–10K/day. The supply side is novel: tradespeople with phone cameras and GoPros can earn passive income from footage of work they're doing anyway.",
      monetization:
        "Per-clip licensing at $49–149 and subscriptions at $99–299/month for agencies, with 50% paid through to contributors. A 'request a shot' bounty board (agency posts need, tradesperson films it) commands premium pricing. 150 agency subscribers at $150 average is ~$270K/year before clip sales.",
      firstSteps: [
        "Recruit 10 tradespeople via trade-Twitter and YouTube to seed 500 clips with simple shooting guidelines.",
        "Hand-curate ruthlessly — 200 great clips beat 5,000 mediocre ones at launch.",
        "Cold-email 50 home-services marketing agencies with a free trial pack.",
        "Build the bounty board once the first agencies start asking for specific shots.",
      ],
      risks: [
        "Marketplace cold start on both sides; the bounty model partially converts it into a managed service early on.",
        "AI video generation is improving fast — authenticity and 'real business, real worker' provenance is the long-term positioning.",
        "Release forms and jobsite-permission logistics need a clean, foolproof flow for contributors.",
      ],
      whoThisIsFor:
        "Someone with a video or agency background who sees that 'authentic beats polished' is now a purchasable asset class.",
    },
  },
  {
    slug: "sponsor-rate-index",
    title: "Creator Sponsorship Rate Index",
    hook: "Glassdoor for sponsorship deals: creators anonymously share what brands actually paid, and everyone stops negotiating blind.",
    category: "content-creator",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "2–3 months",
    tags: ["creator-economy", "data", "community", "transparency"],
    summary:
      "Every creator's most-asked question is 'what should I charge?' and the answer lives in private DMs. A structured, anonymized database of real sponsorship deals — niche, audience size, platform, deliverables, rate — becomes the industry's pricing reference, monetized through pro access and brand-side intelligence.",
    analysis: {
      market:
        "Brand spending on creator marketing exceeds $30B globally, spread across millions of creators with zero pricing transparency below the celebrity tier. Levels.fyi proved the contribute-to-see model works for sensitive compensation data. Mid-tier creators (10K–500K followers) are the desperate core: big enough to get offers, too small for agents.",
      monetization:
        "Free access via deal contribution; $15–29/month pro tier for filters, trend data, and negotiation templates. The bigger prize is brand-side: agencies and brands pay $200–500/month for market-rate benchmarking. 1,500 creator subscribers plus 50 brand seats is roughly $500K/year.",
      firstSteps: [
        "Manually collect 300 verified deal datapoints via creator communities, trading early access for submissions.",
        "Publish a free 'State of Sponsorship Rates' report — the data flywheel's ignition and a guaranteed share magnet.",
        "Ship the contribute-to-unlock database with tight anonymization.",
        "Recruit niche-community moderators (YouTube finance, parenting Instagram, gaming) as data ambassadors.",
      ],
      risks: [
        "Data quality and fake submissions need verification mechanics (screenshot proof flows, statistical outlier detection).",
        "Chicken-and-egg until ~1,000 datapoints; the annual report strategy bridges the gap.",
        "Platforms or large creator tools could clone it; community trust and data depth are the moat.",
      ],
      whoThisIsFor:
        "A creator-economy insider with community credibility who enjoys building data products people argue about on Twitter.",
    },
  },
  {
    slug: "youtube-packaging-lab",
    title: "Productized Thumbnail & Title Testing Service",
    hook: "A subscription service that designs, A/B tests, and iterates a channel's thumbnails and titles — selling click-through rate, not graphic design.",
    category: "content-creator",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["youtube", "productized-service", "design", "growth"],
    summary:
      "YouTube now supports native thumbnail testing, and packaging (title + thumbnail) is the highest-leverage variable on the platform — yet most 50K–500K-subscriber channels still make thumbnails themselves at midnight. A productized service that owns the full packaging loop, reports CTR lifts, and iterates monthly sells a metric, not art.",
    analysis: {
      market:
        "There are hundreds of thousands of YouTube channels earning real money ($2K–50K/month) in the awkward middle: big enough that a 1% CTR lift is worth thousands, too small for a full-time designer. Freelance thumbnail designers sell static images; the testing-and-iteration loop is the unclaimed premium tier. Channel results compound your case-study library monthly.",
      monetization:
        "Tiers at $400/month (4 videos, design + test setup) to $1,200/month (8 videos, full packaging strategy with title variants and retention-informed revisions). Ten clients at the mid-tier is ~$84K/year for what becomes, with systems and one contractor designer, a 20-hour week. Performance bonuses tied to CTR milestones align everyone.",
      firstSteps: [
        "Pick one niche (e.g., personal finance or DIY) and redesign five recent thumbnails from mid-size channels, unsolicited, as outreach.",
        "Land two clients and run rigorous tests via YouTube's native A/B tool; document every CTR delta.",
        "Build the monthly report template — the artifact that makes this a service, not freelancing.",
        "Systematize with a design contractor once you have five clients, keeping strategy in-house.",
      ],
      risks: [
        "It's a service business; revenue stops when you stop — systemize early or stay small deliberately.",
        "AI thumbnail tools are improving; your moat is taste plus the testing discipline, not pixels.",
        "Client concentration: at 8–10 clients, losing two hurts. Keep a waitlist warm.",
      ],
      whoThisIsFor:
        "A design-literate YouTube nerd who can talk CTR and retention with creators as a peer.",
    },
  },
  {
    slug: "private-podcast-internal",
    title: "Private Podcast Studio for Company Comms",
    hook: "Turns a CEO's monthly all-hands and strategy memos into a private, employees-only podcast feed people actually consume during commutes.",
    category: "content-creator",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["b2b-content", "podcasts", "internal-comms", "productized-service"],
    summary:
      "Nobody reads the internal newsletter, and frontline or remote employees skip recorded all-hands entirely. Private podcast feeds — authenticated, per-employee, measurable — turn internal comms into commute-friendly audio, and a studio that handles production end-to-end charges agency rates for a few hours of editing per episode.",
    analysis: {
      market:
        "Internal communications is a budgeted function at every company above ~200 employees, and engagement with written comms is famously dismal. Private-podcast infrastructure (per-listener authenticated feeds with analytics) is mature and cheap to license, but HR and comms teams don't know it exists — distribution of the concept itself is the opportunity. Deskless-workforce companies (retail, logistics, healthcare) are the sharpest fit.",
      monetization:
        "Retainers at $1,500–4,000/month per company for 2–4 episodes covering interview production, editing, hosting, and listenership reporting. Setup fee of $2K for launch and feed infrastructure. Eight clients at $2,500 average is $240K/year — a one-or-two-person studio with healthy margins.",
      firstSteps: [
        "Produce a pilot 'internal pod' for one friendly company: interview the CEO, edit tight, publish to a private feed.",
        "Capture listen-through data and one frontline-employee quote — that's the whole sales deck.",
        "Pitch comms and HR leaders on LinkedIn with the engagement comparison: newsletter open rates vs. episode completion.",
        "Build repeatable episode formats (leadership Q&A, customer-story retellings, change-rollout explainers).",
      ],
      risks: [
        "Champion-dependent retainers: when your comms-director sponsor leaves, the contract wobbles.",
        "Companies may in-house it once shown the playbook; lock value in production quality and the format library.",
        "Procurement cycles at larger companies test patience; mid-market (200–2,000 employees) moves fastest.",
      ],
      whoThisIsFor:
        "A podcast producer or content marketer who'd rather earn B2B retainers than fight the consumer attention war.",
    },
  },
  {
    slug: "profession-template-studio",
    title: "Notion Template Studio for One Profession",
    hook: "Not another aesthetic dashboard — a complete practice-management system in Notion for one profession, sold at software prices.",
    category: "content-creator",
    difficulty: 1,
    capital: "under-500",
    timeToFirstDollar: "1–3 weeks",
    tags: ["digital-products", "notion", "templates", "niche-market"],
    summary:
      "Generic Notion templates sell for $10 in a saturated market; deep, profession-specific systems sell for $150–400 because they replace software subscriptions. Pick one profession — solo therapists, freelance interior designers, independent college counselors — and build the complete operating system for their practice, then own that niche's search results.",
    analysis: {
      market:
        "Top Notion creators clear $500K+/year, but the aesthetic-template segment is brutally saturated. The defensible position is workflow depth in a profession you understand: a therapist practice OS (intake, session notes structure, sliding-scale tracker, supervision log) competes with $60/month vertical SaaS, not with $9 templates. Each profession is a fresh, winnable SEO and community landscape.",
      monetization:
        "Flagship system at $149–349, with a $29 starter version as the funnel and a $19/quarter update subscription for template maintenance. Bundles with Loom walkthroughs and setup calls ($150) raise average order value. Selling 40 flagship units/month in one profession is a six-figure pace.",
      firstSteps: [
        "Choose a profession you have real access to and interview five practitioners about their daily admin stack.",
        "Build the system to replace named tools they currently pay for — list the subscriptions it kills on the sales page.",
        "Launch in the profession's communities with a free starter template as the lead magnet.",
        "Publish workflow-focused SEO content ('how to run X in Notion') that the generic template crowd can't write.",
      ],
      risks: [
        "Platform risk: Notion pricing or feature changes can disrupt the category overnight.",
        "Templates are copyable; the moat is niche trust, updates, and the educational content around them.",
        "One-profession depth caps the market — that's the strategy, but it means expansion = new vertical from scratch.",
      ],
      whoThisIsFor:
        "A systems-thinker with insider knowledge of one profession and the patience to build genuinely deep tooling.",
    },
  },
  {
    slug: "guest-booking-matchmaker",
    title: "Podcast Guest Matchmaking Desk",
    hook: "A curated booking desk that places expert guests on mid-size podcasts — paid by the guest, loved by the host, and immune to the spam that ruined cold pitching.",
    category: "content-creator",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["podcasts", "matchmaking", "b2b-services", "pr"],
    summary:
      "Podcast guesting is the highest-converting content channel for consultants and founders, but cold pitches now drown hosts in AI-generated spam. A human-curated desk that maintains real host relationships and places only vetted, genuinely interesting guests charges $300–600 per placement and wins precisely because the spam wave made curation valuable.",
    analysis: {
      market:
        "Existing guest-booking agencies charge $2,500–5,000/month retainers serving executives; below that sits a huge unserved tier of consultants, authors, and startup founders who'd pay per placement. Host-side pain is acute — show producers openly complain about pitch spam — so a trusted source of pre-vetted guests gets a yes-fast lane. Your host network is the compounding asset.",
      monetization:
        "Per-placement pricing at $300–600 based on show size, or a 3-placement package at $1,200. Flip side: charge hosts nothing, ever — they're your supply moat. Twenty placements a month, achievable with systemized vetting and one VA, is $8–10K/month.",
      firstSteps: [
        "Build relationships with 30 mid-size shows (5K–50K downloads) in two verticals by referring great guests free for a month.",
        "Create a guest-vetting rubric: story quality, audio setup, promotion commitment.",
        "Land 10 paying guests from LinkedIn consultant circles and founder communities.",
        "Track post-episode results (leads, sales) for guests — the case studies that justify premium pricing.",
      ],
      risks: [
        "It's relationship-ops, not software; margins are healthy but scale requires process and people.",
        "One bad guest placement damages a host relationship worth dozens of future placements — vet ruthlessly.",
        "AI-pitch spam could eventually make hosts pay for curation instead; watch for the model flip.",
      ],
      whoThisIsFor:
        "A connector personality with podcast-world fluency who likes service businesses with network effects.",
    },
  },
  {
    slug: "ugc-portfolio-engine",
    title: "Portfolio & Booking Engine for UGC Creators",
    hook: "Gives the 'UGC creator' wave — people who make ads, not audiences — a professional portfolio, rate card, and booking flow that replaces their Linktree-and-DMs chaos.",
    category: "content-creator",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["ugc", "creator-tools", "portfolio", "saas"],
    summary:
      "UGC creators sell content to brands without needing followers, and the segment has exploded — but their toolkit is a Google Drive of videos, a Canva rate card, and Instagram DMs. A purpose-built portfolio with video showcases, usage-rights-aware packages, and contracts-plus-payment booking professionalizes a market that's begging for a standard.",
    analysis: {
      market:
        "The UGC segment grew from nothing to hundreds of thousands of active creators in a few years, with brands buying short-form ad content at $150–500 per video plus usage fees. General portfolio tools don't handle the category's specifics: usage rights tiers, raw-vs-edited deliverables, whitelisting fees. A vertical tool can also become the directory where brands shop — the two-sided endgame.",
      monetization:
        "Creator subscriptions at $12–25/month, plus 3–5% on booked payments processed through the platform. The brand-side directory ($99+/month for search and shortlisting) is phase two once creator density exists. 2,000 creator subscribers at $15 average is $360K/year before payments revenue.",
      firstSteps: [
        "Interview 15 working UGC creators about their inquiry-to-payment flow; collect their current rate cards.",
        "Ship the portfolio + rate card + inquiry form as a beautiful single link they'll put in every bio.",
        "Seed adoption in UGC communities (Discords, TikTok 'UGC journey' creators) with lifetime founding deals.",
        "Add contracts with usage-rights templates and Stripe-powered deposits — the lock-in features.",
      ],
      risks: [
        "The UGC label may evolve or consolidate into broader creator marketplaces; stay close to where brands actually buy.",
        "Fiverr, Billo, and brand-side UGC marketplaces approach from the demand side with ad budgets.",
        "Creators are price-sensitive; the free tier must be genuinely useful without giving away the booking flow.",
      ],
      whoThisIsFor:
        "A product-minded builder close to the creator scene who can move fast while the category is still standardizing.",
    },
  },
  {
    slug: "niche-wiki-network",
    title: "Owned-Niche Encyclopedia Sites",
    hook: "Build the definitive reference site for one obsessive hobby — the wiki for mechanical keyboards or home espresso that every search and every AI answer cites.",
    category: "content-creator",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "3–6 months",
    tags: ["seo", "content-site", "hobbies", "affiliate"],
    summary:
      "Obsessive hobbies — espresso, mechanical keyboards, aquarium keeping, 3D printing — have passionate communities but fragmented, forum-buried knowledge. A meticulously structured reference site (spec databases, compatibility tables, maintained buying guides) becomes the citation-of-record for both Google and AI assistants, monetized through affiliates and direct sponsors.",
    analysis: {
      market:
        "Hobbyist purchase funnels are research-heavy and affiliate-friendly: an espresso setup is a $1,500–5,000 decision chain. Generic content farms are dying in AI-era search, but structured, factual, maintained reference data is exactly what survives — and what AI answers cite and link. One winning niche site historically reaches $5–30K/month; the durable versions are databases, not blog posts.",
      monetization:
        "Affiliate revenue (Amazon plus direct programs at 5–10% on high-ticket gear), direct sponsorships from niche brands ($500–2,000/month placements), and a premium tier for tools like compatibility checkers or maintenance schedules. Database-shaped content also licenses well to retailers.",
      firstSteps: [
        "Pick a hobby where you can name the ten unanswered reference questions from memory — that's the insider test.",
        "Build the structured core first: a spec/compatibility database, not articles.",
        "Publish 30 reference pages targeting comparison and compatibility queries.",
        "Engage the niche's Reddit and Discord as a contributor, not a marketer; reference sites grow on community trust.",
      ],
      risks: [
        "AI search reduces clicks even when cited; revenue durability depends on tools and database utility, not pageviews alone.",
        "Maintenance debt: stale specs kill credibility, so the database needs an update discipline.",
        "Months of unpaid work before meaningful revenue; this rewards genuine obsession with the niche.",
      ],
      whoThisIsFor:
        "A patient, detail-obsessed hobbyist who wants to convert deep niche knowledge into a durable media asset.",
    },
  },
];
