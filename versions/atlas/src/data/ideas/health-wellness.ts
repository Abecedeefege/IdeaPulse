import type { AtlasIdea } from "../types";

export const healthWellnessIdeas: AtlasIdea[] = [
  {
    slug: "pt-homework-coach",
    title: "White-Label Home-Exercise Companion for PT Clinics",
    hook: "Patients actually do their physical-therapy homework when the clinic's app shows video form checks, streaks, and a therapist who can see they skipped Tuesday.",
    category: "health-wellness",
    difficulty: 4,
    capital: "500-5k",
    timeToFirstDollar: "2–3 months",
    tags: ["physical-therapy", "adherence", "b2b-health", "white-label"],
    summary:
      "Home-exercise adherence in physical therapy hovers around 30–50%, which quietly destroys outcomes and shortens treatment plans. A white-label companion app clinics give patients — exercise videos, reminders, pain-level logging, and adherence dashboards the therapist reviews between visits — sells better outcomes to clinics fighting for differentiation and reimbursement.",
    analysis: {
      market:
        "The US has ~40,000 outpatient PT clinics, mostly independent or small groups, competing increasingly with PT-tech startups while their core adherence problem stays unsolved. Existing HEP software (MedBridge, HEP2go) generates printable sheets and basic video links; the engagement layer — streaks, two-way feedback, dropout-risk flags — is a generation behind consumer fitness apps. Clinics buy outcomes differentiation and visit retention (patients who do homework finish their plan of care).",
      monetization:
        "Per-clinic SaaS at $149–399/month by clinician count, white-labeled with the clinic's brand. Adherence reporting that supports payer outcome documentation justifies the top tier. 200 clinics at $249 average is ~$598K ARR; group-practice deals (10–50 locations) change the curve.",
      firstSteps: [
        "Embed with two clinics and map the current homework workflow from eval to discharge, including the paper handouts.",
        "Build the patient loop first — assigned exercises, video demos, dead-simple logging — and the therapist dashboard second.",
        "Pilot with dropout-risk alerts ('patient hasn't logged in 5 days') as the therapist hook.",
        "Measure plan-of-care completion rates against the clinic's baseline; that delta is the entire sales deck.",
      ],
      risks: [
        "Health-data handling (HIPAA, BAAs) from day one, even for exercise logs.",
        "Patient-side engagement is the hard problem everyone before you also failed at; design honestly for 60-year-olds, not app-store screenshots.",
        "EMR integration requests will arrive immediately; resist until revenue justifies the integration tax.",
      ],
      whoThisIsFor:
        "A health-tech builder, ideally with rehab-world exposure, who understands that the buyer is the clinic but the user is a tired patient on a couch.",
    },
  },
  {
    slug: "new-parent-sleep-ops",
    title: "Sleep-Coaching Practice for New Parents",
    hook: "A structured two-week program that gets a six-month-old sleeping through the night — sold to parents who would currently pay any amount of money at 3am.",
    category: "health-wellness",
    difficulty: 1,
    capital: "under-500",
    timeToFirstDollar: "1–3 weeks",
    tags: ["parents", "coaching", "productized-service", "sleep"],
    summary:
      "Infant sleep is a desperation market with proven willingness to pay: exhausted parents buy courses, consultants, and apps in the middle of the night. A certified sleep-coaching practice with a productized two-week protocol — assessment, custom plan, nightly text support, and a follow-up week — earns consulting-grade fees from a renewable population of newly desperate customers.",
    analysis: {
      market:
        "Roughly 3.6 million babies are born annually in the US alone, and pediatric sleep consulting has matured into a real profession (certification programs exist) without consolidating — it remains local, referral-driven, and supply-constrained. Parents' alternatives are $40 courses (no accountability) or conflicting internet advice; the high-touch middle at $300–800 converts strongly with dual-income parents. Pediatrician and doula referral relationships compound over time.",
      monetization:
        "Packages at $350–750 (assessment call, written plan, two weeks of nightly support, follow-up), with a premium overnight-text tier and group workshops ($45/seat) as the funnel. Fifteen clients monthly is a $70–120K/year solo practice; adding certified sub-coaches under your brand scales past it. Corporate-benefit partnerships (parental-return programs) are an emerging B2B channel.",
      firstSteps: [
        "Complete a recognized certification (multiple programs run $1–3K — count it as capital) and coach five families free for outcomes and testimonials.",
        "Productize the protocol into fixed deliverables so the offer is a package, not hourly chaos.",
        "Build referral relationships with two pediatric practices and three doulas; they're asked about sleep daily.",
        "Post practical content in local parent groups — sleep questions dominate every one of them.",
      ],
      risks: [
        "Strong opinions surround sleep-training philosophies; choose evidence-based positioning and screen for fit to avoid public conflicts.",
        "Outcome variance with infants is real — promise process and support, not guarantees.",
        "Solo-practice ceiling until you certify sub-coaches; brand and protocol make that transition possible.",
      ],
      whoThisIsFor:
        "An empathetic coach-type — frequently a parent who lived the sleep crisis — who wants meaningful work with consulting margins.",
    },
  },
  {
    slug: "allergy-table-verified",
    title: "Verified Allergy-Safety Directory for Restaurants",
    hook: "The trust layer for the 33 million Americans with food allergies: restaurants verified for cross-contact protocols, not just menu footnotes.",
    category: "health-wellness",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "2–3 months",
    tags: ["food-allergies", "directory", "verification", "two-sided"],
    summary:
      "Families managing severe allergies plan every restaurant visit like a security operation, and existing apps rely on crowd reviews that can't verify kitchen practices. A directory where restaurants complete a real verification (protocol questionnaire, manager training, annual renewal) earns consumer trust that converts into bookings — and restaurants pay because allergy families are loyal, high-spend repeat customers who bring the whole table.",
    analysis: {
      market:
        "Food allergies affect ~33 million Americans (1 in 13 children) with prevalence rising, and an allergy family chooses the restaurant for every group meal — a disproportionate revenue influence existing review platforms ignore. AllergyEats and crowd reviews prove demand but stall at unverified opinion. The verification layer monetizes both sides: restaurants buy the badge and the training; families buy certainty.",
      monetization:
        "Restaurants pay $29–79/month for verified listing, staff-training modules, and the window badge; consumers get free search with a $4.99/month premium tier (travel guides, new-verification alerts, school/camp lists). 300 verified restaurants in a metro at $49 average is ~$176K/year per city; the training content scales nationally before the directory does.",
      firstSteps: [
        "Develop the verification rubric with an allergist or food-safety consultant for credibility.",
        "Verify 40 restaurants in one city free — density in one neighborhood beats sparseness everywhere.",
        "Launch to local allergy-parent Facebook groups (intensely organized communities) and measure bookings driven.",
        "Convert restaurants to paid with evidence: profile views, direction taps, 'allergy table' reservations.",
      ],
      risks: [
        "Safety stakes are real: verification must be defensible, renewed, and clearly scoped (process verification, not outcome guarantees).",
        "Two-sided cold start; the one-city, one-neighborhood density strategy is non-negotiable.",
        "Restaurant churn in the industry generally — annual verification renewals must survive staff turnover.",
      ],
      whoThisIsFor:
        "A founder with personal allergy-family experience and community-building instincts — authenticity is the unfair advantage here.",
    },
  },
  {
    slug: "desk-reset-contracts",
    title: "Corporate Movement-Break Programs",
    hook: "Fifteen-minute live mobility resets for desk teams, contracted by HR at $800 a month per team — the wellness perk people actually attend.",
    category: "health-wellness",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["corporate-wellness", "movement", "b2b", "recurring"],
    summary:
      "Wellness-app stipends go unused; what desk workers measurably attend is a scheduled, live, 15-minute movement break dropped into the team calendar. A contracted program — two or three live sessions weekly, mobility-focused, camera-optional, plus recorded library — sells to HR on participation rates that embarrass every other wellness line item.",
    analysis: {
      market:
        "Corporate wellness spend exceeds $50B globally while engagement with typical benefits sits in single-digit percentages — HR leaders are actively hunting for visible, participatory offerings. Remote and hybrid teams make delivery trivial (Zoom) and the format ('reset between meetings') matches real calendar culture. Musculoskeletal complaints are a top employer-health cost, giving the program a hard-dollar narrative beyond morale.",
      monetization:
        "Per-team contracts at $500–1,200/month for 2–3 weekly live sessions plus the on-demand library; company-wide tiers at $2,500–6,000/month. A solo instructor delivering 20 live sessions weekly across ten clients grosses $8–15K/month; contracting additional instructors scales it into an agency. Quarterly participation reports are the renewal engine.",
      firstSteps: [
        "Design three signature 15-minute formats (neck/shoulder reset, hip de-chairing, eye-and-breath break) that work camera-off in work clothes.",
        "Pilot free for two weeks with two companies; track attendance vs. their existing wellness-benefit usage.",
        "Sell HR with the participation delta and a one-page MSK-cost narrative.",
        "Record every format into the on-demand library that pads the contract value.",
      ],
      risks: [
        "Perk budgets are cut in downturns; anchor to ergonomics/MSK-cost outcomes, not vibes.",
        "Instructor-dependent delivery; formats and trained contractors are the scaling path.",
        "Differentiation from free YouTube content rests on liveness, scheduling, and accountability — protect those.",
      ],
      whoThisIsFor:
        "A movement professional (trainer, physio, yoga teacher) with B2B sales courage, or an operator who can hire them.",
    },
  },
  {
    slug: "stronger-after-sixty",
    title: "Strength Studio Program for Adults 60+",
    hook: "Small-group barbell and balance training designed for the 60+ body — selling independence, fall-proofing, and grandkid-lifting strength, not weight loss.",
    category: "health-wellness",
    difficulty: 3,
    capital: "5k-plus",
    timeToFirstDollar: "4–8 weeks",
    tags: ["fitness", "seniors", "strength-training", "local"],
    summary:
      "The research is unambiguous — strength training is the single highest-leverage health intervention for older adults — yet mainstream gyms intimidate them and 'senior fitness' classes patronize them with chair aerobics. A dedicated small-group strength program (4–8 people, progressive loading, balance work, functional testing) commands premium pricing from the wealthiest, most schedule-flexible, most loyal demographic in fitness.",
    analysis: {
      market:
        "The 60+ population is exploding in every developed country, controls the majority of disposable wealth, and increasingly arrives pre-sold by their doctors ('you need to lift weights'). Boutique fitness ignores them; physical therapy discharges them with nowhere to go. The post-PT bridge is a structural referral pipeline, and retention in this demographic routinely doubles industry averages — they come at 9am, pay annually, and bring friends.",
      monetization:
        "Small-group training at $200–350/month (2–3 sessions weekly) — premium to big-box, half of personal training. Sixty members at $275 is ~$198K/year from one modest space and two coaches. Quarterly functional assessments (grip, sit-to-stand, balance metrics) justify pricing and create shareable progress stories; PT-clinic partnerships keep the funnel full.",
      firstSteps: [
        "Get certified in older-adult strength protocols and intern under anyone already doing this well.",
        "Start inside an existing gym's off-peak hours (9am–2pm — exactly when this demographic prefers) before leasing space.",
        "Build the PT and physician referral network with a one-page outcomes summary and discharge-bridge offer.",
        "Run functional testing from day one; measurable 'I got off the floor unassisted' wins are the marketing.",
      ],
      risks: [
        "Medical-complexity screening and emergency protocols are operational requirements, not paperwork.",
        "Coach quality is everything and senior-specialist coaches are scarce; train your own.",
        "Real estate costs can sink it — the off-peak sublease start protects the downside.",
      ],
      whoThisIsFor:
        "A coach or gym operator who finds deep meaning in this population and can be patient building referral trust.",
    },
  },
  {
    slug: "crew-heat-guardian",
    title: "Heat-Safety Compliance Kit for Outdoor Crews",
    hook: "Hydration schedules, acclimatization tracking, and OSHA-aligned heat-illness documentation for landscaping, roofing, and construction crews — as regulation tightens every summer.",
    category: "health-wellness",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["occupational-health", "compliance", "construction", "b2b"],
    summary:
      "Heat is the deadliest weather hazard for outdoor workers, summers keep breaking records, and OSHA's heat-illness rulemaking plus existing state standards (California, Washington, Oregon) are turning informal water breaks into documented compliance programs. A simple system — forecast-triggered protocols, crew acclimatization tracking, break logging, and audit-ready records — sells to contractors who fear both the heat and the citation.",
    analysis: {
      market:
        "Millions of US workers in construction, landscaping, agriculture, and delivery face occupational heat exposure, and the regulatory direction is one-way: more states adopting standards, federal rulemaking advancing, citations rising. Small contractors (5–50 field workers) have no safety officer and currently 'comply' with a cooler of water and good intentions. The documentation burden — proving acclimatization schedules and break compliance after an incident — is precisely what software does well.",
      monetization:
        "$49–199/month by crew size, with the audit-ready export and incident-documentation features anchoring value. Workers'-comp insurers and trade associations are natural channels (heat claims cost them millions; some will subsidize member adoption). 500 contractors at $99 average is ~$594K ARR in a market regulation grows for you annually.",
      firstSteps: [
        "Master the strictest current standard (California's) and the federal proposed rule; build the protocol engine around them.",
        "Ship the foreman-facing flow first: weather-triggered alerts, break timers, two-tap logging from a phone in work gloves.",
        "Pilot with three landscaping companies in a hot-climate state through one full summer.",
        "Approach workers'-comp carriers about portfolio discounts for insured contractors using the system.",
      ],
      risks: [
        "Regulatory timelines shift; the state standards already in force keep the market real regardless of federal pace.",
        "Field adoption by crews is the honest hard part — if logging exceeds two taps, it won't happen.",
        "Safety-platform incumbents (Procore-adjacent) could add heat modules; small-contractor focus and simplicity is the lane.",
      ],
      whoThisIsFor:
        "A builder with construction-world credibility who wants a compliance business with demographic and regulatory tailwinds.",
    },
  },
  {
    slug: "meal-train-modern",
    title: "Modern Meal-Train Coordinator for Life Events",
    hook: "When someone has a baby, surgery, or a loss, one link coordinates who cooks what and when — with dietary needs, delivery windows, and a 'just send DoorDash' option built in.",
    category: "health-wellness",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "4–8 weeks",
    tags: ["community-care", "food", "consumer", "freemium"],
    summary:
      "Communities still rally around new parents and the grieving with home-cooked meals, but the coordination tools are a 2009-era website and a chaotic group text. A modern coordinator — dietary profiles, slot scheduling, duplicate prevention ('three lasagnas problem'), gift-card pooling, and delivery integration — owns an emotionally resonant utility with natural viral mechanics: every meal train invites 10–30 new users.",
    analysis: {
      market:
        "MealTrain.com and CaringBridge demonstrate decades of durable demand with minimal product evolution — the category leader still looks and works like the past. Every birth (3.6M/year US), major surgery, and bereavement in a connected community is a potential train, and each train onboards dozens of participants who later start their own. Churches, neighborhood groups, and workplaces are organizing hubs that adopt tools wholesale.",
      monetization:
        "Free core trains (growth engine); organizer premium at $9.99/train or $29/year for unlimited (photo updates, calendar sync, thank-you tracking); take a standard affiliate/processing margin on pooled gift cards and delivery orders — the 'I can't cook but here's $25' flow is where the money quietly is. Group plans for churches and HR teams ($199–499/year) formalize the hub behavior.",
      firstSteps: [
        "Build the train flow: recipient profile (diet, allergies, drop-off rules), slot calendar, reminders, duplicate-dish guard.",
        "Add the cash-contribution option with pooled gift cards from day one — it monetizes the majority who won't cook.",
        "Seed through three churches and two parent groups; measure participant-to-organizer conversion.",
        "Polish the recipient experience (one thank-you button, no guilt mechanics) — word of mouth comes from them.",
      ],
      risks: [
        "Incumbent inertia plus free alternatives means the product must be obviously, immediately better.",
        "Monetizing around grief and need requires taste; clumsy upsells are brand-fatal.",
        "Usage is episodic by nature — the organizer-subscription and hub (church/HR) models fight the one-and-done pattern.",
      ],
      whoThisIsFor:
        "A consumer-product builder who values warm utility over engagement tricks and understands community dynamics.",
    },
  },
  {
    slug: "waitlist-bridge-therapy",
    title: "Therapy Waitlist Concierge",
    hook: "Calls the 40 therapists in your insurance network so you don't have to — and books you with one who actually has an opening this month.",
    category: "health-wellness",
    difficulty: 2,
    capital: "under-500",
    timeToFirstDollar: "2–4 weeks",
    tags: ["mental-health", "concierge", "matching", "services"],
    summary:
      "Finding a therapist is a part-time job performed during a mental-health crisis: outdated directories, full caseloads, unreturned calls. A concierge service that does the calling — verifying real availability, insurance fit, and specialty match, then delivering three bookable options within days — sells relief at the exact moment people have none to spare.",
    analysis: {
      market:
        "Demand for therapy permanently outstrips supply, 'ghost networks' (insurance directories full of unavailable providers) are a documented, regulator-acknowledged failure, and the average search takes weeks of calls. Tech matching platforms (Zocdoc, Alma, Headway) cover their own networks only; nobody does the cross-network legwork. Buyers include individuals, parents seeking child therapists (the most desperate segment), and EAPs/employers who currently offer little beyond a directory link.",
      monetization:
        "Flat concierge fee of $99–199 per completed search (three verified, bookable options or a refund), with a parent/child-specialist tier at $249. Employer and EAP-supplement contracts ($2–5K/month for a covered population) are the scale path once the unit process is proven. A two-person team completing 60 searches monthly is a $100–150K/year service heading toward B2B leverage.",
      firstSteps: [
        "Run 10 searches manually end-to-end and document the real funnel math (calls placed → responses → true openings).",
        "Build the therapist-availability database as you go — every search enriches it and speeds the next.",
        "Define the deliverable precisely: three options with verified availability, insurance status, modality, and booking path.",
        "Test demand with a simple landing page in local parenting and ADHD communities, where search pain peaks.",
      ],
      risks: [
        "Labor-intensive unit economics until the availability database compounds; track minutes-per-search obsessively.",
        "Not a clinical service — scope and disclaimers must be unambiguous, with crisis-referral protocols in place.",
        "Therapist availability data decays in weeks; freshness systems are the long-term product.",
      ],
      whoThisIsFor:
        "A persistent, organized operator with healthcare-navigation empathy — the kind of person who already does this for friends.",
    },
  },
  {
    slug: "shift-worker-sleep-kit",
    title: "Sleep Program for Night-Shift Workers",
    hook: "A sleep-science program built for nurses, paramedics, and plant workers — light-timing protocols, rotating-shift survival plans, and an employer who pays for it.",
    category: "health-wellness",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["sleep", "shift-work", "b2b-wellness", "healthcare-workers"],
    summary:
      "Twenty percent of the workforce works shifts, shift-work sleep disruption drives accidents, errors, and chronic disease — and every sleep app on the market assumes you sleep at night. A program built specifically for shift schedules (light-exposure timing, strategic caffeine and nap protocols, rotating-pattern plans) serves desperate individuals and the employers liable for their fatigue.",
    analysis: {
      market:
        "Healthcare alone employs millions of night and rotating-shift workers, with fatigue directly tied to medication errors and nurse turnover — both board-level costs. Industrial and logistics employers face parallel safety math (fatigue is a factor in a large share of workplace accidents). Consumer sleep tech booms while structurally ignoring this population: circadian-misalignment protocols differ fundamentally from 'wind down at 10pm' advice, creating a genuine product gap rather than a marketing wedge.",
      monetization:
        "B2B-first: employer contracts at $3–15K per facility per year (program access, manager fatigue-training, schedule-design consults), with hospitals and 24/7 plants as anchor buyers. A direct-to-worker subscription ($9.99/month) builds evidence and word of mouth among nurses, the profession that shares survival tools fastest. Outcome reporting (self-reported alertness, schedule-adherence metrics) drives renewals.",
      firstSteps: [
        "Build the protocol engine with a circadian-science advisor: input a shift pattern, output a personalized light/sleep/caffeine plan.",
        "Beta with 50 nurses recruited through nursing communities; iterate on rotating-schedule chaos, the hardest case.",
        "Package the employer pilot: one unit, 90 days, pre/post fatigue and alertness measures.",
        "Pitch hospital nursing-retention leaders — fatigue sits adjacent to their biggest budget problem (turnover).",
      ],
      risks: [
        "Clinical boundaries: sleep disorders need physicians; the program must screen and refer, positioned as education not treatment.",
        "Behavior change under chaotic schedules is genuinely hard — protocol adherence will be the metric that decides everything.",
        "B2B wellness sales cycles run quarters; the direct-to-nurse subscription funds patience.",
      ],
      whoThisIsFor:
        "A health-science-literate founder — bonus for clinical or shift-work background — who wants an underserved niche with employer-scale economics.",
    },
  },
];
