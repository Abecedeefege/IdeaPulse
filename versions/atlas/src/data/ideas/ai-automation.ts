import type { AtlasIdea } from "../types";

export const aiAutomationIdeas: AtlasIdea[] = [
  {
    slug: "trades-phone-agent",
    title: "AI Phone Receptionist for the Trades",
    hook: "Answers a plumber's phone 24/7, qualifies the emergency, books the job, and texts the owner a summary — no more $400 jobs lost to voicemail.",
    category: "ai-automation",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "4–8 weeks",
    tags: ["voice-ai", "trades", "lead-capture", "agency-to-saas"],
    summary:
      "Trades businesses miss 25–40% of inbound calls because everyone's on a job site, and a missed call goes straight to the next Google result. Voice AI is now good enough to answer, triage urgency, quote arrival windows, and book directly into the calendar — and owners will pay because every captured call is provably worth hundreds.",
    analysis: {
      market:
        "There are several hundred thousand plumbing, HVAC, electrical, and locksmith businesses in the US, most under 10 employees and all phone-dependent. Generic AI-receptionist startups exist, but trades need vertical specifics: emergency triage scripts, service-area checks, and integration with ServiceTitan/Jobber/Housecall Pro. The after-hours and overflow use case avoids the 'replacing my front desk' objection entirely.",
      monetization:
        "Charge $199–399/month per business with a setup fee of $250–500 for script customization, or per-booked-job pricing ($15–25) for skeptics. A 40-customer book at $299 is ~$143K ARR, and voice-minute costs run well under 15% of revenue. White-labeling to trades marketing agencies multiplies distribution.",
      firstSteps: [
        "Build a demo agent on an off-the-shelf voice stack (e.g., a Twilio + realtime-model pipeline) trained on one plumber's FAQ and pricing.",
        "Call-shadow a real business for a day to capture actual caller language and edge cases.",
        "Run a two-week pilot answering only after-hours calls, reporting every captured job with dollar value.",
        "Integrate calendar booking with one field-service platform before signing customer five.",
      ],
      risks: [
        "Voice-AI failures are public and embarrassing; one mangled emergency call can lose the account.",
        "Platform pricing changes (telephony, model costs) can squeeze margins.",
        "Field-service incumbents are shipping native AI answering; differentiate on quality and white-glove setup, not existence.",
      ],
      whoThisIsFor:
        "A technical builder who enjoys conversational design and is happy selling face-to-face to trades owners who will judge the demo in 90 seconds.",
    },
  },
  {
    slug: "rfp-response-copilot",
    title: "RFP Response Drafting for Small Government Contractors",
    hook: "Ingests a 60-page government RFP, maps requirements to your past proposals, and drafts a compliant response skeleton in an afternoon.",
    category: "ai-automation",
    difficulty: 4,
    capital: "500-5k",
    timeToFirstDollar: "2–3 months",
    tags: ["govcon", "proposals", "b2b", "document-ai"],
    summary:
      "Small government contractors skip winnable bids because responding takes 40–80 unbillable hours. An AI workflow that shreds the RFP into a compliance matrix, retrieves matching boilerplate from past wins, and drafts each section cuts response time by more than half — in a market where one extra win pays for a decade of subscription.",
    analysis: {
      market:
        "US federal contracting alone exceeds $700B/year, with state/local adding hundreds of billions more, and set-aside programs guarantee small-business participation. The long tail of 8(a), veteran-owned, and woman-owned firms (tens of thousands of companies) can't afford proposal consultants at $150/hour, and enterprise tools like Responsive target bigger fish. Compliance-matrix generation is the killer feature — missing one 'shall' clause disqualifies a bid.",
      monetization:
        "Subscription at $299–799/month per company depending on proposal volume, plus onboarding at $1–2K to ingest their past-performance library. Per-proposal pricing ($500 flat) converts skeptics. Even 60 customers at $500 average is $360K ARR, and the buyers measure value in six-figure contract wins.",
      firstSteps: [
        "Partner with one small contractor and manually run their next RFP through your pipeline; deliver the compliance matrix and draft yourself.",
        "Measure hours saved and whether the bid scored better on compliance review.",
        "Productize the shred-to-matrix step first — it's mechanical and high-trust.",
        "Recruit from PTAC/APEX Accelerator events, where small contractors gather and trust is transferable.",
      ],
      risks: [
        "Hallucinated compliance claims are disqualifying; the product needs aggressive citation-to-source design.",
        "Long sales cycles and conservative buyers; pilots must be tied to a live bid to avoid stalling.",
        "Well-funded competitors are converging on proposal AI — vertical depth in small-business set-asides is the defensible corner.",
      ],
      whoThisIsFor:
        "A founder with document-AI chops and patience for a high-trust, high-ACV sale — prior govcon exposure is a major edge.",
    },
  },
  {
    slug: "superbill-appeals",
    title: "Insurance Superbills & Appeal Letters for Therapists",
    hook: "Generates clean superbills and fights claim denials for out-of-network therapists, recovering money clients didn't know they were owed.",
    category: "ai-automation",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["healthcare", "insurance", "therapists", "document-ai"],
    summary:
      "Millions of therapy clients pay out-of-network and could claim partial reimbursement, but superbills get rejected for trivial coding errors and nobody appeals. A service that generates correct superbills, tracks submissions, and auto-drafts appeal letters citing plan language turns a paperwork black hole into recovered cash.",
    analysis: {
      market:
        "Roughly half of US therapists don't accept insurance, creating a huge out-of-network reimbursement market that companies like Reimbursify and Thrizer have only begun to organize. The therapist is the channel (they want clients to effectively pay less without cutting rates), but the client is the beneficiary. Denial appeals are the underserved wedge — most clients give up after the first rejection even though appeals frequently succeed.",
      monetization:
        "Charge therapists $29–49/month to offer it as a practice perk, or take 5–10% of recovered reimbursements from clients (capped, success-based). A hybrid — free superbill generation, paid appeals — creates a clean funnel. A solo practice with 25 weekly sessions can route $30–60K/year of reimbursable claims through the system.",
      firstSteps: [
        "Learn the actual failure modes: collect 20 rejected superbills via therapist communities and categorize the denial reasons.",
        "Build the superbill generator with CPT/ICD validation rules — correctness is the entire product.",
        "Hand-write five appeal letters for real denials and track outcomes for case studies.",
        "Partner with two group practices for distribution before building self-serve.",
      ],
      risks: [
        "HIPAA compliance from day one — BAAs, encryption, and careful data handling are non-negotiable.",
        "Insurance processes vary wildly by payer; automation will hit a long tail of manual edge cases.",
        "Funded competitors exist; the appeals-automation angle and therapist-channel pricing are the differentiation.",
      ],
      whoThisIsFor:
        "Someone at the intersection of healthcare billing knowledge and software — or willing to acquire the billing knowledge the hard way.",
    },
  },
  {
    slug: "podcast-localization-studio",
    title: "AI Dubbing Studio for Podcast Back Catalogs",
    hook: "Turns an English podcast's 300-episode archive into Spanish and Portuguese feeds in the host's own cloned voice.",
    category: "ai-automation",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "4–8 weeks",
    tags: ["podcasts", "localization", "voice-cloning", "creators"],
    summary:
      "Voice cloning and translation are good enough that a podcaster can launch a Spanish-language feed without recording a word, and the LatAm podcast ad market is growing fast with thin supply. A productized service that localizes back catalogs, publishes the feeds, and splits new ad revenue makes expansion a no-brainer for mid-size shows.",
    analysis: {
      market:
        "There are hundreds of thousands of active podcasts but only the top few thousand monetize well in English — meanwhile Spanish-language podcast consumption is growing double digits annually with far less content competition. Mid-tier shows (10K–100K downloads/episode) have valuable archives earning nothing in other languages. Tooling exists (ElevenLabs et al.) but shows need an operator, not another tool subscription.",
      monetization:
        "Charge per finished minute ($1–3) for back-catalog conversion, or zero-upfront revenue-share deals (30–50% of new-language ad revenue) for shows with strong archives. A single 200-episode catalog at 40 minutes/episode is an $8–24K project. Revenue-share feeds become annuities if the content evergreens.",
      firstSteps: [
        "Localize three episodes of a willing mid-size show as a free pilot and measure listener retention on the new feed.",
        "Build the pipeline: transcription, translation with human spot-check, voice-clone synthesis, QC pass.",
        "Land one anchor show with a public case study (downloads + ad revenue from the new feed).",
        "Approach podcast networks — one deal can bring 20 shows.",
      ],
      risks: [
        "Translation quality on idioms and humor can damage a host's brand; human QC is a permanent cost line.",
        "Hosting platforms or ElevenLabs could productize the whole flow natively.",
        "Ad monetization in new languages takes months to materialize, straining revenue-share economics.",
      ],
      whoThisIsFor:
        "A podcast-world insider or audio-savvy builder who likes service-margin economics with software leverage underneath.",
    },
  },
  {
    slug: "maintenance-triage-ai",
    title: "Maintenance Request Triage for Property Managers",
    hook: "Reads every tenant maintenance email and photo, classifies urgency, dispatches the right vendor, and drafts the tenant reply — before the PM opens their inbox.",
    category: "ai-automation",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["proptech", "email-ai", "operations", "b2b"],
    summary:
      "A property manager with 300 doors drowns in 'my sink is leaking' emails where a burst pipe and a loose handle look identical in the inbox. An AI layer that triages requests by urgency and trade, checks lease responsibility, and pre-drafts vendor dispatches turns a reactive firefight into a queue — and PMs pay per door without blinking.",
    analysis: {
      market:
        "Third-party property managers handle tens of millions of US rental units, typically charging 8–10% of rent while operating on thin margins where labor is the biggest cost. Maintenance coordination is the single largest time sink, and dedicated coordination outsourcers charge $10–15/door/month — pricing air cover for an AI product at a third of that. AppFolio and Buildium have AI features, but the long tail uses email and spreadsheets.",
      monetization:
        "Per-door pricing at $2–5/month with a minimum, so a 300-door PM pays $600–1,500/month — comfortably under one part-time coordinator. Setup fee for vendor-list and lease-rules configuration. 40 mid-size PMs is a $500K–1M ARR business.",
      firstSteps: [
        "Embed with one property manager for a week and label 100 real maintenance emails by urgency and trade.",
        "Build the email-ingest classifier plus a simple queue UI; keep humans approving every dispatch initially.",
        "Measure response-time improvement and after-hours escalation accuracy for the case study.",
        "Integrate with one PM platform's work-order API, then sell into its user community.",
      ],
      risks: [
        "Misclassifying an emergency (gas smell, flooding) has real liability — conservative escalation defaults are essential.",
        "PM platforms are racing to bundle AI; speed and independence (works over plain email) are your edges.",
        "Buyers are operationally slammed; onboarding must take under an hour or deals die.",
      ],
      whoThisIsFor:
        "An operations-minded builder who wants a workflow-AI business with measurable labor savings and a clear per-unit pricing story.",
    },
  },
  {
    slug: "meeting-to-crm-agent",
    title: "Meeting-to-CRM Agent for Solo Consultants",
    hook: "Listens to a consultant's sales and client calls, then updates the CRM, drafts the follow-up email, and queues proposal tasks — the admin assistant they can't justify hiring.",
    category: "ai-automation",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "3–6 weeks",
    tags: ["consultants", "crm", "meeting-ai", "productivity"],
    summary:
      "Solo consultants and fractional executives live in back-to-back calls and lose deals to sloppy follow-up, not bad work. A focused agent that turns each call into CRM updates, a personalized follow-up draft, and next-step tasks — tuned for a services pipeline rather than a SaaS sales team — sells itself in one demo.",
    analysis: {
      market:
        "The fractional and independent-consulting wave is real: millions of solo professionals billing $150–400/hour with zero support staff. Tools like Gong and Attention target sales teams with per-seat enterprise pricing; meeting notetakers are commoditized but stop at the transcript. The gap is the action layer for a one-person services business — follow-ups, proposals, and a lightweight pipeline.",
      monetization:
        "Simple pricing at $39–79/month, self-serve, against an hourly rate that makes the math trivial (saving two hours a month pays for a year). An annual plan at $390 will convert well in this audience. 1,000 subscribers at $49 average is ~$590K ARR — reachable through content and communities where fractionals gather.",
      firstSteps: [
        "Recruit five consultants and process their calls manually for two weeks (with consent) to learn what follow-ups they actually send.",
        "Build on existing transcript APIs (calendar bot or upload) and ship the follow-up-draft + CRM-update loop.",
        "Support one lightweight CRM well (e.g., Pipedrive or a built-in pipeline) instead of ten badly.",
        "Launch in fractional-exec communities with a founder-led 'watch it work on my real call' demo.",
      ],
      risks: [
        "Crowded adjacent space; differentiation is the services-business workflow, and that must stay sharp.",
        "Call-recording consent rules vary by state and country — handle it in product, not fine print.",
        "Model and notetaker-API costs need watching at low price points.",
      ],
      whoThisIsFor:
        "An indie hacker who wants a self-serve product with a tight ICP they can reach directly through LinkedIn and communities.",
    },
  },
  {
    slug: "menu-engineering-analyst",
    title: "AI Menu Engineer for Independent Restaurants",
    hook: "Reads a restaurant's POS data and ingredient costs, then tells the owner which three menu changes add $2,000 a month.",
    category: "ai-automation",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "4–6 weeks",
    tags: ["restaurants", "analytics", "pricing", "pos-data"],
    summary:
      "Menu engineering — repricing, repositioning, and culling dishes by margin and popularity — reliably lifts restaurant profit 3–7%, but consultants charge $5K+ and independents never do it. An AI service that ingests POS exports and invoice data, then delivers a quarterly menu-action report, democratizes a proven playbook.",
    analysis: {
      market:
        "Independent restaurants run on 3–5% net margins, making a few points of menu optimization existential rather than nice-to-have. POS systems (Toast, Square) hold the sales data but their analytics stop at dashboards — nobody tells the owner what to do. The quarterly-report format fits how owners think: a document they can hand the chef, not another dashboard login.",
      monetization:
        "Productized analysis at $149–299/quarter per location, or $79/month with continuous monitoring and a price-change alert when ingredient costs move. Sell through restaurant bookkeepers and food distributors' rep networks, who gain client goodwill from the savings. 150 locations at $99/month average is ~$178K ARR.",
      firstSteps: [
        "Do three manual menu-engineering analyses for local restaurants using their POS exports and a spreadsheet; charge $200 each.",
        "Codify the methodology (margin/popularity quadrants, anchoring, layout psychology) into a repeatable pipeline.",
        "Automate the POS-export ingestion for Toast and Square first.",
        "Publish before/after case studies with real dollar figures — restaurant owners trust peers, not pitches.",
      ],
      risks: [
        "Ingredient-cost data is messy (invoices, not APIs); recipe costing may need owner input that creates onboarding friction.",
        "POS vendors could ship a native version, though their incentive is dashboards, not opinionated advice.",
        "Recommendations must be right: one bad repricing call ends the relationship in a market that talks.",
      ],
      whoThisIsFor:
        "A data-comfortable builder with restaurant empathy — ex-industry people will close deals on credibility alone.",
    },
  },
  {
    slug: "accounting-doc-chaser",
    title: "Document-Chasing Agent for Accounting Firms",
    hook: "Automatically nags clients for the missing bank statements and receipts, checks what arrived, and updates the workpaper checklist — ending the accountant's worst chore.",
    category: "ai-automation",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["accounting", "workflow", "b2b", "document-ai"],
    summary:
      "Accounting firms spend an absurd share of busy season chasing clients for documents — polite emails, reminders, checking PDFs against checklists. An agent that sends sequenced requests, verifies received documents against the engagement checklist (right year? right account? all pages?), and escalates only true exceptions gives firms back hundreds of hours.",
    analysis: {
      market:
        "There are 40,000+ CPA firms in the US, mostly small, all facing a staffing crisis that makes labor-saving automation an easy conversation. Practice-management tools (Karbon, Canopy) send reminders but can't verify what came back — the document-understanding step is the new unlock. Busy-season pain makes Q4 the natural sales window.",
      monetization:
        "Per-firm pricing at $199–499/month based on client count, with January–April peak usage justifying annual contracts. Position against the cost of one seasonal admin hire ($15–20K). 100 small firms at $299 is ~$359K ARR, and accountants churn rarely once a tool survives one busy season.",
      firstSteps: [
        "Sit with one small firm and catalog their PBC (provided-by-client) lists and actual chase-email threads.",
        "Build sequenced request campaigns plus document verification against a checklist for the top ten document types.",
        "Pilot during an off-season deadline (extensions, quarterly filings) before betting on busy season.",
        "Integrate with one practice-management tool and get listed in its marketplace.",
      ],
      risks: [
        "Misidentifying a document as complete when it isn't erodes trust instantly; verification must favor false negatives.",
        "Security expectations are high — financial documents demand SOC 2-grade posture earlier than most startups.",
        "Practice-management incumbents will move here; firm-specific verification depth is the moat to dig.",
      ],
      whoThisIsFor:
        "A builder who loves unglamorous workflow problems and can win the trust of conservative professional-services buyers.",
    },
  },
  {
    slug: "freight-quote-bot",
    title: "Instant Quote Bot for Small Freight Brokers",
    hook: "Answers shippers' quote-request emails in 90 seconds with a priced, margin-checked offer — while competing brokers take four hours.",
    category: "ai-automation",
    difficulty: 4,
    capital: "500-5k",
    timeToFirstDollar: "2–3 months",
    tags: ["logistics", "email-ai", "pricing", "b2b"],
    summary:
      "Freight brokering is a speed game: the first credible quote wins a large share of spot loads, yet small brokerages quote manually from inboxes. A bot that parses quote-request emails, pulls market lane rates, applies the broker's margin rules, and drafts the reply turns response time into a weapon for the little guys.",
    analysis: {
      market:
        "The US has ~20,000 licensed freight brokerages, most tiny, intermediating a $90B+ brokerage market that still runs on email and phone. Market-rate data is purchasable (DAT, Greenscreens), and the marginal value of speed is well documented in spot freight. Big digital brokers (Uber Freight) automated this internally years ago — the long tail has nothing.",
      monetization:
        "Per-seat at $150–300/month or per-quote pricing (~$0.50–1) with a platform minimum, plus setup for margin-rule configuration. A 5-person brokerage paying $1,000/month is cheap against one extra won load per week. 50 brokerages is a ~$600K ARR business with strong expansion as desks grow.",
      firstSteps: [
        "Shadow a broker's inbox for a week and measure current quote turnaround and win rates.",
        "Build the email parser for the messy reality: partial info, attachments, multi-stop requests.",
        "Integrate one rate source and the broker's margin matrix; keep human-approve mode as default.",
        "Run a 30-day pilot measuring quote speed and win rate, then publish the delta.",
      ],
      risks: [
        "A wrong quote that the broker honors costs real money; guardrails and approval flows are product-critical.",
        "Rate-data licensing costs and terms constrain pricing flexibility.",
        "TMS vendors and rate platforms are building adjacent features; speed-to-trust with small brokers is the window.",
      ],
      whoThisIsFor:
        "A founder who likes gritty B2B verticals and ideally knows logistics — this sells fastest broker-to-broker.",
    },
  },
];
