import type { AtlasIdea } from "../types";

export const sideProjectIdeas: AtlasIdea[] = [
  {
    slug: "vet-relocation-jobs",
    title: "Job Board for Veterinary Professionals",
    hook: "A job board where clinics compete for scarce vet techs with relocation packages, sign-on bonuses, and real salary numbers up front.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["job-board", "veterinary", "niche-market", "recruiting"],
    summary:
      "Veterinary medicine has one of the worst staffing shortages in healthcare, with clinics desperate enough to pay five-figure sign-on bonuses. A job board that forces salary transparency and showcases relocation support flips the dynamic: candidates browse, clinics pay to compete.",
    analysis: {
      market:
        "The US has ~120,000 veterinarians and ~230,000 vet techs, with tech turnover above 20% annually and burnout pushing constant churn. Corporate consolidators (Mars, NVA) and independents alike pay recruiters $5–15K per placement, so a $299 job post is a rounding error. Generalist boards bury vet roles; the niche signal — salary shown, relocation flagged — is the product.",
      monetization:
        "Charge $199–349 per 60-day post, with featured placement at $499 and a 5-post bundle for hospital groups. A candidate-side email digest creates the audience moat that justifies prices. Thirty posts a month is roughly $90K/year, which a focused side project can absolutely reach in a desperate-demand niche.",
      firstSteps: [
        "Scrape and hand-curate 100 live vet jobs (with salaries where findable) to launch a useful board on day one.",
        "Build a weekly 'best vet jobs' email and grow it in vet-tech Facebook groups and subreddits.",
        "Email 50 practice managers offering a free first post; convert to paid when posts get applicants.",
        "Add a salary-transparency requirement — it's the shareable hook the niche press will cover.",
      ],
      risks: [
        "Job boards are two-sided cold-start problems; the curated-listings trick only buys you a few months.",
        "Corporate vet groups have internal recruiting and may bypass you; independents are the realistic core.",
        "Indeed's free distribution is the gravity you fight — your edge is curation and trust, not reach.",
      ],
      whoThisIsFor:
        "Someone with audience-building patience — and a major head start if you're a vet tech, vet, or married to one.",
    },
  },
  {
    slug: "wedding-speech-studio",
    title: "Wedding Speech Studio",
    hook: "A guided web app that interviews a nervous best man and produces a structured, personal speech — plus a phone teleprompter for the big moment.",
    category: "side-project",
    difficulty: 1,
    capital: "under-500",
    timeToFirstDollar: "1–3 weeks",
    tags: ["weddings", "consumer", "one-time-purchase", "ai-writing"],
    summary:
      "Every weekend, thousands of terrified best men and maids of honor Google 'wedding speech examples' three days before the wedding. A focused tool that interviews them about real memories, structures a speech with a proven arc, and rehearses them with a teleprompter is a clean $29–49 one-time purchase with built-in urgency.",
    analysis: {
      market:
        "Around 2 million US weddings a year, each with 2–5 speeches, means millions of one-time buyers annually with high emotional stakes and zero price sensitivity in the final week. Generic AI chat produces generic speeches; the value is the guided interview that extracts specific stories and the rehearsal tooling. SEO around 'best man speech' terms has huge volume and weak product competition.",
      monetization:
        "One-time pricing at $29 (speech) and $49 (speech + teleprompter + rehearsal timing feedback). Affiliate or bundle deals with wedding-planning platforms add distribution. At even 15 sales/day from SEO and TikTok, this is a six-figure-a-year side project with no support burden.",
      firstSteps: [
        "Write the interview flow first: 12 questions that reliably extract two stories, one heartfelt line, and one safe joke.",
        "Ship a single-page app: interview → draft → edit → teleprompter mode, with Stripe checkout.",
        "Publish 20 SEO pages targeting speech-type keywords ('father of the bride speech template', etc.).",
        "Post before/after speech glow-ups on TikTok — wedding content distributes itself.",
      ],
      risks: [
        "Trivially copyable; win on SEO accumulation and the rehearsal experience rather than the generation.",
        "One-time purchases mean you're always hunting new buyers — traffic is the whole game.",
        "Seasonality: revenue concentrates May–October in most markets.",
      ],
      whoThisIsFor:
        "A weekend builder who wants a small, finished product with real revenue and is willing to play the SEO long game.",
    },
  },
  {
    slug: "estate-sale-router",
    title: "Estate-Sale Route Planner for Resellers",
    hook: "Pulls every estate sale and auction in a 50-mile radius, scores them by reseller keywords, and builds the optimal Saturday route.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["resellers", "maps", "scraping", "consumer-tools"],
    summary:
      "Furniture flippers and eBay resellers spend Friday nights manually cross-referencing EstateSales.net listings against Google Maps. A tool that aggregates sales, flags listings matching their niches ('mid-century', 'tools', 'vintage audio'), and outputs a time-ordered route is a $10/month no-brainer for anyone doing this weekly.",
    analysis: {
      market:
        "Reselling is a massive participatory economy — millions of Americans sell on eBay, Poshmark, and Facebook Marketplace, with a serious-hobbyist core that treats weekend sourcing like a job. Estate-sale listing sites have terrible search and no routing. The buyer already spends hundreds weekly on inventory; $10–15/month for better sourcing is trivially justified.",
      monetization:
        "Subscription at $9.99/month or $79/year with a free tier limited to one route per month. Power-up: keyword alerts that ping when a new listing mentions 'Pyrex' or 'Snap-on'. 800 subscribers — realistic via reseller YouTube and TikTok — is ~$95K/year.",
      firstSteps: [
        "Scrape listings for one metro from the major estate-sale sites and build keyword matching.",
        "Generate routes with a simple traveling-salesman heuristic plus sale opening times.",
        "Post the tool in three reseller communities and offer founding-member pricing.",
        "Add saved keyword profiles and Saturday-morning alert emails — the retention feature.",
      ],
      risks: [
        "Scraping fragility and potential pushback from listing sites; an official-feeling partnership would de-risk it.",
        "Niche ceiling: this is a great $100K side project, probably not a venture business.",
        "Geographic data quality varies — rural users may see thin results and churn.",
      ],
      whoThisIsFor:
        "A builder who is (or knows) a weekend reseller and wants a small product with a passionate, reachable audience.",
    },
  },
  {
    slug: "visa-checklist-engine",
    title: "Visa Paperwork Checklist Engine",
    hook: "Answers ten questions about your situation and generates the exact document checklist, timeline, and fee schedule for your specific visa path.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "3–6 weeks",
    tags: ["immigration", "consumer", "checklists", "seo"],
    summary:
      "Visa applicants drown in forum posts and outdated blog advice, while lawyers charge $300 just to explain the checklist. A rules-based engine that turns official requirements into a personalized document checklist with deadlines — sold per application — monetizes clarity in one of the internet's most desperate search markets.",
    analysis: {
      market:
        "Millions of applications flow annually through high-volume routes alone (US K-1/CR-1 and family visas, UK spouse visas, Schengen national visas, digital-nomad visas). Search volume is enormous and intent is white-hot. Competitors are either $2,000+ legal services, DIY forums, or stale content sites — a $39 interactive checklist sits in an empty middle.",
      monetization:
        "Per-checklist pricing at $29–59 including timeline reminders and document templates (cover letters, sponsor letters). Affiliate revenue from adjacent needs — translations, travel insurance, photo services — stacks meaningfully. Two routes done well (say, US spouse visas and one EU digital-nomad visa) can clear $5–10K/month from SEO alone.",
      firstSteps: [
        "Pick ONE visa route you know personally and encode its full requirement tree from official sources.",
        "Ship the questionnaire → checklist → email-reminders flow with Stripe.",
        "Write 25 long-tail SEO articles answering exact questions from that route's forums.",
        "Add a 'rules last verified' date and a change-log — trust is the conversion lever.",
      ],
      risks: [
        "Requirements change; stale advice is harmful, so verification cadence is a real operating cost.",
        "Unauthorized-practice-of-law lines vary by country — stay firmly on checklists and official-source citations, not advice.",
        "Each new visa route is a mini product; resist breadth until one route prints.",
      ],
      whoThisIsFor:
        "Someone who has survived an immigration process and wants to convert that suffering into a content-plus-tool business.",
    },
  },
  {
    slug: "rec-league-scheduler",
    title: "Rec-League Scheduler That Handles the Chaos",
    hook: "Builds round-robin schedules around field permits, team blackout dates, and rainouts — the spreadsheet nightmare every volunteer league commissioner dreads.",
    category: "side-project",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["sports", "scheduling", "community", "b2b2c"],
    summary:
      "Volunteer commissioners of adult softball, youth soccer, and pickleball leagues spend entire weekends building schedules that explode the moment it rains. A scheduler that understands shared field permits, fairness constraints, and one-click rainout rescheduling earns its $200/season instantly — and leagues run forever.",
    analysis: {
      market:
        "There are tens of thousands of recreational leagues in the US run by parks departments, churches, breweries, and volunteers, most using spreadsheets or aging tools (LeagueLobster, TeamSideline) with clunky constraint handling. The constraint engine is the moat — 'Team A can't play before 7pm, fields 1–2 share a permit Tuesdays, no team plays twice in a row' is genuinely hard and genuinely valued. Seasonal renewals create natural recurring revenue.",
      monetization:
        "Per-season pricing at $99–299 per league by team count, or $499/year for multi-sport organizations. Parks & rec departments are slow but sticky buyers with budget. 200 leagues at $150/season twice a year is $60K — and the rainout-rescheduler feature alone drives word of mouth between commissioners.",
      firstSteps: [
        "Volunteer to schedule one real league this season and catalog every constraint they throw at you.",
        "Build the constraint-solver core (an OR-tools weekend project) before any UI polish.",
        "Nail one sport's vocabulary first; softball and soccer commissioners speak differently.",
        "Demo the rainout rescheduler — it's the moment buyers convert.",
      ],
      risks: [
        "Strong seasonality and volunteer turnover mean re-selling each year to a possibly new commissioner.",
        "Incumbents are entrenched in registration/payments; you may eventually need those features to fully displace them.",
        "Constraint edge cases are endless; scope discipline keeps this a side project instead of a swamp.",
      ],
      whoThisIsFor:
        "An algorithms-inclined developer who plays in a rec league and has watched a commissioner suffer.",
    },
  },
  {
    slug: "custom-puzzle-press",
    title: "Custom Crossword Press for Events",
    hook: "Personalized crossword and puzzle books for weddings, retirements, and reunions — upload your inside jokes, get a printable keepsake.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "1–3 weeks",
    tags: ["personalization", "events", "print", "consumer"],
    summary:
      "People pay surprising money for personalized event ephemera, and a crossword built from a couple's inside jokes is both an activity and a keepsake. A generator that turns a form of names, dates, and stories into a beautifully typeset puzzle PDF (or printed booklet) is a tidy one-time-purchase machine with Etsy-proven demand.",
    analysis: {
      market:
        "Etsy sellers already move thousands of semi-custom puzzle templates at $15–40 with manual fulfillment and multi-day turnaround — proof of demand and a quality ceiling you can beat with real generation. Weddings, milestone birthdays, retirements, baby showers, and corporate offsites all buy. Instant delivery and genuinely solvable, well-constructed grids are the differentiators.",
      monetization:
        "Tiered one-time pricing: $19 digital PDF, $39 deluxe pack (crossword + word search + trivia), $79+ printed booklets via print-on-demand integration. Bulk pricing for event planners and corporate teams lifts order values. Etsy and direct SEO both work; 10 orders/day at $30 average is a six-figure run rate.",
      firstSteps: [
        "Build the grid-construction engine or adapt an open-source filler; quality of fill is the product.",
        "Design two beautiful print templates — typography sells the keepsake feeling.",
        "List on Etsy immediately for demand validation while building the direct site.",
        "Add an event-planner bulk flow after the first 50 consumer orders.",
      ],
      risks: [
        "Etsy competition on price; you win on instant delivery and puzzle quality, and must communicate both.",
        "User-provided clues can be unusable; the flow needs smart suggestions and an editing pass.",
        "Print-on-demand quality issues land on your brand — vet vendors carefully.",
      ],
      whoThisIsFor:
        "A builder who enjoys algorithmic toys (grid filling is a fun problem) and wants charming, low-stakes consumer revenue.",
    },
  },
  {
    slug: "babysitter-circle",
    title: "Babysitter Booking Circle for Neighborhoods",
    hook: "A private, parent-vouched sitter directory for one neighborhood at a time — with availability, rates, and instant booking, minus the marketplace creepiness.",
    category: "side-project",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["parents", "local", "marketplace", "trust"],
    summary:
      "Parents don't want a national marketplace of strangers; they want the sitter the family two doors down already uses. A neighborhood-scoped app where sitters join by parent invitation, show real availability, and get booked in two taps digitizes the trust network that already exists in group texts.",
    analysis: {
      market:
        "Care.com and Sittercity monetize anxiety with subscriptions and background-check upsells, yet most actual babysitting flows through word-of-mouth — a market structurally invisible to incumbents. Dense suburbs and urban family neighborhoods are the beachhead; each neighborhood is a self-contained network of 50–300 families. The vouching mechanic (sitters only join when an existing parent vouches) is the product and the moat.",
      monetization:
        "Free for sitters; parents pay $5–8/month per family or $2 per confirmed booking. A neighborhood of 150 paying families is ~$10K/year, and the model replicates neighborhood by neighborhood with local network effects. Optional add-ons: CPR-certification badges and date-night reminder bookings.",
      firstSteps: [
        "Launch in YOUR neighborhood with a simple shared availability calendar and 10 vouched sitters.",
        "Get 30 families using it through one school's parent group or one block's group chat.",
        "Add booking requests with SMS notifications — keep it lighter than an app store app at first (PWA).",
        "Document the playbook, then let a parent in an adjacent neighborhood replicate it as 'circle captain'.",
      ],
      risks: [
        "Safety incidents, even off-platform, are existential reputation risk; the vouching model and clear positioning ('we digitize your trust network, we don't verify strangers') must be airtight.",
        "Neighborhood-by-neighborhood growth is slow by design; this compounds, it doesn't explode.",
        "Teen sitters age out every few years, so sitter-side supply needs constant gentle replenishment.",
      ],
      whoThisIsFor:
        "A parent-founder embedded in a real neighborhood network who wants a community product with honest, local economics.",
    },
  },
  {
    slug: "deck-checker-pro",
    title: "Pitch-Deck Checker for First-Time Founders",
    hook: "Upload your deck, get a slide-by-slide teardown against the patterns of 500 funded decks — in five minutes, for the price of a pizza.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["founders", "ai-analysis", "one-time-purchase", "fundraising"],
    summary:
      "First-time founders pay $150–500 for human deck reviews with week-long turnarounds, or get nothing but generic advice. An automated reviewer that checks narrative arc, slide-level clarity, missing investor questions, and design red flags — calibrated against what funded decks actually look like — sells at $29–49 with instant delivery.",
    analysis: {
      market:
        "Hundreds of thousands of startups raise or attempt to raise annually worldwide, and accelerator application season creates recurring demand spikes. Deck-review marketplaces and consultants validate willingness to pay; the gap is speed and price. Distribution is unusually easy: founders congregate in known places (YC forums, LinkedIn, Twitter/X) and love sharing tools.",
      monetization:
        "$29 single review, $79 for three iterations plus an investor-FAQ generator, $199 white-label tier for accelerators reviewing applicant decks in bulk. Accelerators are the sleeper B2B channel — one cohort partnership beats a thousand tweets. 200 reviews/month at $40 average is ~$96K/year.",
      firstSteps: [
        "Codify the rubric: study public teardowns and funded-deck patterns into 40 concrete checks.",
        "Build PDF/slides ingestion plus the analysis pipeline; output a polished, slide-anchored report.",
        "Give 20 free reviews in founder communities in exchange for testimonials and before/after permission.",
        "Pitch three accelerators a bulk-review tier for application screening.",
      ],
      risks: [
        "Generic AI feedback is the failure mode; the rubric's specificity is the entire product.",
        "Anyone can prompt-engineer a competitor; brand, testimonials, and the funded-deck calibration are the defense.",
        "Demand is cyclical with fundraising seasons.",
      ],
      whoThisIsFor:
        "A startup-scene-adjacent builder who has seen enough decks to encode taste into a rubric.",
    },
  },
  {
    slug: "heirloom-recipe-vault",
    title: "Heirloom Recipe Vault & Cookbook Printer",
    hook: "Digitize grandma's handwritten recipe cards into a family archive, then print them as a hardcover heirloom cookbook everyone orders for the holidays.",
    category: "side-project",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "3–6 weeks",
    tags: ["family", "print", "ocr", "gifts"],
    summary:
      "Every family has a shoebox of stained, handwritten recipe cards and a quiet fear of losing them. A service that scans and transcribes the cards (preserving the handwriting as images alongside clean text), organizes them into a family vault, and prints hardcover cookbooks hits the gift market's sweetest spot: sentiment plus utility.",
    analysis: {
      market:
        "The personalized-gift market is enormous and proven (photo books alone are a multi-billion-dollar category), and recipe preservation has deep emotional pull with zero dominant brand. Vision models now handle messy handwriting transcription that made this impractical five years ago. Holiday season concentrates demand: one matriarch's archive becomes 8–15 cookbook orders from one family.",
      monetization:
        "Free or cheap digitization funnel ($0 for 10 cards, then $0.50/card), with money made on printed books at $49–89 each (40–60% margins via print-on-demand) and family-vault subscriptions at $19/year. Average family order: one archive, six books — roughly $350. Q4 can carry the year.",
      firstSteps: [
        "Build the card-photo → transcription → editable-recipe flow with the handwriting image preserved beside the text.",
        "Design one gorgeous cookbook template; the spread layout sells the product.",
        "Do 10 family archives end-to-end manually to learn the messy parts (duplicates, 'a pinch of', missing steps).",
        "Launch a TikTok/Instagram push in October — 'I turned grandma's recipe box into this' is natively viral content.",
      ],
      risks: [
        "Heavy Q4 seasonality demands disciplined cash management and pre-holiday ops readiness.",
        "Transcription errors in a sentimental product cut deep; human-in-the-loop review is worth the margin hit early.",
        "Print partner quality and shipping deadlines are reputational single points of failure at Christmas.",
      ],
      whoThisIsFor:
        "A maker who enjoys consumer delight and physical products, and can market with story-driven short video.",
    },
  },
];
