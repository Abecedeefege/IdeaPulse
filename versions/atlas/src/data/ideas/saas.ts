import type { AtlasIdea } from "../types";

export const saasIdeas: AtlasIdea[] = [
  {
    slug: "health-score-sentinel",
    title: "Health-Inspection Sentinel for Restaurants",
    hook: "Monitors municipal health-inspection scores and alerts restaurant owners before a bad grade hits Google and Yelp.",
    category: "saas",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["restaurants", "monitoring", "reputation", "public-data"],
    summary:
      "Health departments publish inspection results publicly, but most owners learn about a bad score when it shows up on review sites. A monitoring service that scrapes inspection databases, alerts owners instantly, and packages a remediation checklist turns public data into a retention-heavy subscription.",
    analysis: {
      market:
        "There are roughly one million restaurants in the US alone, and most metro health departments publish inspection data online in wildly inconsistent formats — which is exactly the moat. Yelp and Google increasingly surface health scores directly on listings, so a C-grade now has measurable revenue impact. Multi-location franchise operators are the best buyers: one regional director may be responsible for 40 locations across 6 counties.",
      monetization:
        "Charge $19–29/month per location for single operators and $12/location/month on annual contracts for groups of 10+. Add a $99 one-time 'inspection prep audit' checklist product as an upsell before scheduled inspections. A 200-location franchise group at $12/location is $28,800/year from a single sales conversation.",
      firstSteps: [
        "Pick one county with a clean public inspection portal and write a scraper that diffs scores weekly.",
        "Hand-build an email alert for 10 local restaurants for free and ask owners what they'd do with 48 hours of warning.",
        "Package the alert plus a remediation checklist into a simple dashboard with Stripe billing.",
        "Cold-call regional franchise managers — they feel score pain across dozens of stores and can buy in bulk.",
      ],
      risks: [
        "Scrapers break every time a county redesigns its portal; budget ongoing maintenance per jurisdiction.",
        "Some health departments lag weeks behind real inspections, weakening the 'early warning' pitch in those areas.",
        "Low willingness to pay among single-location independents; the economics really depend on multi-location deals.",
      ],
      whoThisIsFor:
        "A developer comfortable with scraping and data cleanup who is willing to do unglamorous sales calls to restaurant operators.",
    },
  },
  {
    slug: "permit-pulse",
    title: "Building-Permit Lead Alerts for Contractors",
    hook: "Turns public construction-permit filings into a daily lead feed for roofers, electricians, and HVAC companies.",
    category: "saas",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–6 weeks",
    tags: ["construction", "lead-gen", "public-data", "trades"],
    summary:
      "Every renovation leaves a paper trail: permits filed, contractors named, valuations listed. Trades businesses pay handsomely for warm leads, and a permit filed for a kitchen remodel signals a homeowner who will also need electrical, plumbing, and HVAC work — usually within weeks.",
    analysis: {
      market:
        "US contractors spend billions annually on leads from Angi and Thumbtack, where one lead is resold to five competitors at $30–80 each. Permit data is fresher and exclusive by comparison: a demolition permit today means a rebuild contract next month. The wedge is geographic — start with two or three counties where permit portals are scrapable and trades are competitive.",
      monetization:
        "Sell metro-area subscriptions at $99–199/month per trade category, with exclusivity pricing ($349/month) for one company per trade per territory. Annual prepay discounts smooth the seasonality of construction. Twenty subscribers in one metro is $2,000–4,000 MRR with near-zero marginal cost.",
      firstSteps: [
        "Scrape 90 days of permits from one county and manually tag which trades each permit implies.",
        "Email 20 local contractors a free week of leads and track who replies asking for more.",
        "Build the filter-and-alert layer: trade type, zip codes, project valuation threshold.",
        "Add enrichment — owner name, parcel data, contractor of record — as the premium tier.",
      ],
      risks: [
        "Permit data quality varies enormously; some jurisdictions are paper-only or weeks delayed.",
        "Established players (BuildZoom, Dodge) own the enterprise end; stay focused on small local trades.",
        "Contractors churn if they can't convert leads — onboarding must teach them how to pitch permit-sourced prospects.",
      ],
      whoThisIsFor:
        "Someone who enjoys data plumbing and selling simple ROI to blue-collar business owners who hate their current lead vendors.",
    },
  },
  {
    slug: "churn-autopsy",
    title: "Churn Autopsy — Cancellation Intelligence for SaaS",
    hook: "Replaces the useless 'why are you leaving?' dropdown with recorded exit interviews and AI-coded churn reasons.",
    category: "saas",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["b2b-saas", "retention", "analytics", "ai"],
    summary:
      "Most SaaS companies have no idea why customers actually leave — the cancellation survey gets 8% response and one-word answers. A tool that offers departing users a $25 gift card for a 10-minute async video interview, then clusters and codes the answers, gives founders the single most valuable dataset they don't have.",
    analysis: {
      market:
        "There are tens of thousands of B2B SaaS companies between $1M and $20M ARR where a one-point churn improvement is worth six figures, yet churn analysis is still a quarterly spreadsheet guess. Existing cancel-flow tools (offers, pause plans) treat the symptom; nobody owns the diagnosis layer. Founders already pay for user-interview tools at acquisition — the exit is strangely ignored.",
      monetization:
        "Price at $199–499/month based on cancellation volume, with incentive costs (gift cards) passed through at cost. Add a quarterly 'churn report' deliverable at the top tier — a written narrative a VP can forward to the board. At $299 average, 30 customers is roughly $107K ARR.",
      firstSteps: [
        "Run the service manually for two SaaS friends: intercept their cancellations, conduct five interviews each, deliver a coded summary.",
        "Validate that the summaries changed a roadmap decision — that's the testimonial that sells.",
        "Build the async-video intake flow and the AI clustering pipeline.",
        "Integrate with Stripe and Chargebee webhooks so interviews trigger automatically on cancellation.",
      ],
      risks: [
        "Response rates may stay low even with incentives for low-ACV products; works best above ~$100/month price points.",
        "Insight businesses face the 'we learned it, now we're done' churn problem themselves — recurring value must come from trend tracking.",
        "AI coding of qualitative data needs human spot-checks early or credibility dies on the first bad report.",
      ],
      whoThisIsFor:
        "A product-minded founder who has lived the pain of mystery churn and can talk credibly to other SaaS operators.",
    },
  },
  {
    slug: "hoa-board-os",
    title: "Operating System for Volunteer HOA Boards",
    hook: "Violations, votes, vendor bids, and reserve budgets in one place — built for the unpaid volunteers who run America's neighborhoods.",
    category: "saas",
    difficulty: 4,
    capital: "500-5k",
    timeToFirstDollar: "2–3 months",
    tags: ["proptech", "governance", "b2b", "boring-but-profitable"],
    summary:
      "Over 350,000 homeowner associations in the US are run by volunteer boards juggling email threads, PDFs, and one member's personal spreadsheet. Purpose-built software for meetings, violation tracking, and reserve planning replaces chaos that currently causes lawsuits and burned-out treasurers.",
    analysis: {
      market:
        "HOAs collect about $100B in assessments annually, and the small self-managed associations (under ~150 units) are too small for enterprise property-management platforms but too complex for spreadsheets. Board turnover every 1–2 years means institutional knowledge constantly evaporates — software becomes the institutional memory, which is a powerful retention story.",
      monetization:
        "Charge the association, not the volunteers: $49–149/month based on unit count, paid from HOA funds (boards are far less price-sensitive when spending association money). Add e-voting and architectural-request workflows as premium modules. Property-management companies that handle dozens of small HOAs are a multiplier channel.",
      firstSteps: [
        "Join or interview three local HOA boards and document their actual meeting-to-decision workflow.",
        "Ship a narrow wedge first: violation tracking with photo evidence and letter generation, since that's the most hated task.",
        "Get one association live and present at a community-association-institute (CAI) local chapter meeting.",
        "Layer in meeting minutes, votes, and reserve tracking based on what boards request.",
      ],
      risks: [
        "Sales cycles run through volunteer boards that meet monthly — expect slow, committee-driven decisions.",
        "State-by-state legal requirements for notices and votes add compliance surface area.",
        "Incumbents like AppFolio could move down-market, though small HOAs have historically been ignored.",
      ],
      whoThisIsFor:
        "A patient builder who likes unsexy, sticky verticals — bonus points if you've ever served on an HOA board and have the scars.",
    },
  },
  {
    slug: "slotfill-waitlist",
    title: "SlotFill — Cancellation Backfill for Appointment Businesses",
    hook: "When a client cancels, automatically texts the waitlist and fills the slot before the practitioner finishes their coffee.",
    category: "saas",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "3–6 weeks",
    tags: ["appointments", "sms", "service-businesses", "revenue-recovery"],
    summary:
      "A dentist, med-spa, or physical therapist loses $150–600 every time a slot goes unfilled, and front desks rarely have time to work the phone. A tool that watches the calendar, texts a ranked waitlist the moment a cancellation lands, and books the first yes recovers pure-margin revenue automatically.",
    analysis: {
      market:
        "No-shows and late cancellations cost US healthcare alone an estimated $150B a year, and the same dynamic hits salons, tattoo studios, vets, and tutors. Most scheduling systems have a waitlist feature that is little more than a list — the automation of outreach, ordering, and confirmation is the gap. ROI is brutally easy to demonstrate: one filled slot usually pays for the month.",
      monetization:
        "Flat $79–149/month per location, or performance pricing at $5–10 per filled slot for skeptical buyers (then migrate them to flat once they see volume). Integrations with common calendars (Square Appointments, Jane, Mindbody) define your serviceable market. Fifty locations at $99 is ~$60K ARR with very low support load.",
      firstSteps: [
        "Pick one scheduling platform with a public API and build the cancellation-webhook-to-SMS flow.",
        "Run a concierge pilot with two local clinics: you manage the waitlist manually via their calendar for two weeks.",
        "Track filled-slot revenue and turn it into a one-page ROI case study.",
        "Automate booking confirmation and self-serve onboarding, then expand to a second calendar integration.",
      ],
      risks: [
        "Platform dependence: scheduling vendors can build this natively (some have half-built versions).",
        "SMS compliance (A2P 10DLC registration, opt-outs) is mandatory homework, not optional.",
        "Businesses with thin waitlists see little value — qualify customers by demand, not just vertical.",
      ],
      whoThisIsFor:
        "A builder who wants a small, sharp tool with provable ROI and is comfortable living inside other platforms' APIs.",
    },
  },
  {
    slug: "grant-radar",
    title: "Grant Radar for Small Nonprofits",
    hook: "Tracks grant deadlines, required attachments, and reporting obligations so two-person nonprofits stop losing funded money to missed paperwork.",
    category: "saas",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["nonprofits", "compliance", "deadlines", "vertical-saas"],
    summary:
      "Small nonprofits win grants and then bleed: missed report deadlines jeopardize renewals, and discovery of new grants happens via luck. A simple system of record for grant deadlines, attachments, and funder reporting requirements — plus a curated feed of new opportunities — is worth real money to organizations that run on $200K budgets.",
    analysis: {
      market:
        "There are 1.5M+ registered nonprofits in the US, and the long tail under $1M in revenue can't afford enterprise grant-management suites like Fluxx or Instrumentl's full price. The executive director is the buyer, the bookkeeper is the user, and the alternative is a spreadsheet with no reminders. Renewal reporting is the wedge: losing a renewable $25K grant over a late report is an unforgettable pain.",
      monetization:
        "Price at $29–79/month — deliberately under the 'needs board approval' threshold. Offer an annual plan paid from grant admin budgets. A curated weekly grant-opportunity digest by cause area justifies the higher tier; 300 customers at $49 average is ~$176K ARR.",
      firstSteps: [
        "Interview five executive directors about how they track grant deadlines today; collect their actual spreadsheets.",
        "Build the tracker: grants, deadlines, attachments, reporting cadence, email reminders.",
        "Seed templates for the ten most common funders' reporting requirements in one cause area.",
        "Partner with one state nonprofit association for a member discount and instant distribution.",
      ],
      risks: [
        "Nonprofits are slow, budget-constrained buyers; keep CAC near zero via associations and word of mouth.",
        "Instrumentl and others could move down-market with a lite tier.",
        "Churn risk when the grant-writing volunteer leaves — make data export easy and multi-user from day one.",
      ],
      whoThisIsFor:
        "Someone with nonprofit-world empathy — ideally a former staffer or board member — who wants a calm, modest, durable SaaS.",
    },
  },
  {
    slug: "cert-expiry-guardian",
    title: "License & Certification Expiry Guardian",
    hook: "Tracks every employee license, certification, and insurance document across a company and screams before anything lapses.",
    category: "saas",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["compliance", "hr", "trades", "healthcare"],
    summary:
      "Clinics, electrical contractors, trucking firms, and daycares all share one quiet nightmare: an employee's license or required certification expiring unnoticed, voiding insurance and inviting fines. A dead-simple registry with document uploads, expiry alerts, and an auditor-ready report sells on fear and renews on habit.",
    analysis: {
      market:
        "Any regulated workforce qualifies — home health agencies tracking CNA certifications, contractors tracking journeyman licenses and OSHA cards, gyms tracking CPR certs. The buyer is an office manager currently running this in Excel, and the trigger event is a failed audit or a near-miss. Insurance brokers and franchise systems are natural referral channels because lapses hurt them too.",
      monetization:
        "Per-seat pricing punishes growth, so charge by tracked-record volume: $49/month up to 50 records, $99 to 200, $249 unlimited, with a 14-day free audit-prep trial. The 'audit-ready PDF export' is the feature people actually pay for. This is classic set-and-forget revenue with sub-3% monthly churn potential.",
      firstSteps: [
        "Choose one vertical (e.g., home health) and learn its exact certification taxonomy and audit format.",
        "Build upload + expiry-date + reminder-email in a weekend; that's genuinely 80% of v1.",
        "Offer free white-glove data migration from spreadsheets — onboarding friction is the only real objection.",
        "Get a testimonial tied to a passed audit, then approach an insurance broker about co-marketing.",
      ],
      risks: [
        "Horizontal HR suites (BambooHR, Rippling) include weak versions of this; verticalized depth is your defense.",
        "Low engagement product — customers may forget they have it; monthly digest emails fight invisible-tool churn.",
        "Multi-state regulatory nuance can creep scope; resist building rules engines early.",
      ],
      whoThisIsFor:
        "A pragmatic builder who likes boring compliance niches where the product is simple and the pain is existential.",
    },
  },
  {
    slug: "event-vendor-os",
    title: "Booking & Proposal OS for Wedding Vendors",
    hook: "Inquiry-to-contract pipeline for photographers, florists, and DJs — proposals, e-sign, deposits, and timelines in one branded flow.",
    category: "saas",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "6–10 weeks",
    tags: ["weddings", "vertical-saas", "payments", "freelancers"],
    summary:
      "The average wedding involves a dozen small vendors, each running their business on Instagram DMs, Google Forms, and PayPal requests. A vertical CRM that turns an inquiry into a branded proposal, signed contract, and scheduled payment plan makes a solo florist look like an agency — and takes a cut of every deposit.",
    analysis: {
      market:
        "The US wedding industry runs about $70B/year across hundreds of thousands of small vendors, most earning $50–250K with zero back office. HoneyBook proved the category at $1B+ valuation but went broad into all freelancers; a wedding-only product can win with industry-specific templates, timeline tools, and vendor-to-vendor referral features the generalists ignore.",
      monetization:
        "Subscription at $29–59/month plus payment processing margin (0.5–1% on top of Stripe) on deposits and installments. Payments revenue scales with customer success: a photographer processing $80K/year yields $400–800 in processing margin alone. Template marketplaces (contracts, questionnaires) add high-margin upsells.",
      firstSteps: [
        "Interview ten wedding vendors found via local venue preferred-vendor lists; map their inquiry-to-final-payment flow.",
        "Build the proposal + contract + deposit link as a single shareable page before any dashboard.",
        "Onboard five vendors personally and migrate their templates for them.",
        "Add the wedding-day timeline builder — it's the feature that makes vendors evangelize to other vendors on the same wedding.",
      ],
      risks: [
        "HoneyBook and Dubsado are entrenched; you must win on vertical depth and taste, not features lists.",
        "Seasonal cash flow in the industry means churn spikes each winter — annual plans and off-season pricing help.",
        "Payments compliance and disputes add operational load once volume grows.",
      ],
      whoThisIsFor:
        "A founder with design sensibility and proximity to the events world who wants a payments-attached vertical SaaS.",
    },
  },
  {
    slug: "shiftbid-internal",
    title: "Internal Shift Marketplace for Hourly Teams",
    hook: "Lets hourly employees swap and pick up open shifts from their phones, with manager rules — no more group-text chaos.",
    category: "saas",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "2–3 months",
    tags: ["scheduling", "hourly-work", "restaurants", "healthcare"],
    summary:
      "When a line cook calls out, managers blast a group text and pray. An internal shift marketplace — where open shifts get posted, qualified staff claim them under overtime and certification rules, and managers just approve — kills the most stressful 30 minutes of a shift lead's day.",
    analysis: {
      market:
        "Around 80 million US workers are hourly, and mid-size operators (3–30 locations: restaurant groups, senior-care facilities, vet clinics) are stuck between free group chats and enterprise workforce suites like Legion or UKG that start at six figures. Coverage gaps directly cost revenue (closed stations) or overtime (panic staffing), so the ROI math is concrete.",
      monetization:
        "Per-location pricing at $59–129/month beats per-seat for hourly headcount churn. Land single locations self-serve, expand to groups via the ops director. A 12-location restaurant group at $89/location is ~$12.8K/year; 40 such groups is a half-million-ARR business.",
      firstSteps: [
        "Shadow a restaurant manager for one Friday call-out and document the actual scramble.",
        "Build shift posting + claim + manager approval with SMS notifications; integrate with one scheduling tool (e.g., 7shifts export) later.",
        "Pilot free in two locations of one group for a month, measuring time-to-fill on open shifts.",
        "Add rule guards (overtime thresholds, role qualifications) before selling to healthcare, where they're mandatory.",
      ],
      risks: [
        "Scheduling incumbents (7shifts, Deputy, When I Work) all have partial versions; you win only where theirs is clunky or unbundled.",
        "Two-sided adoption problem: if staff don't open the app, managers revert to texting within a week.",
        "Healthcare expansion brings credential-verification requirements that triple scope.",
      ],
      whoThisIsFor:
        "Someone who has worked hourly jobs or managed hourly teams and wants a product whose value shows up the first Friday night.",
    },
  },
];
