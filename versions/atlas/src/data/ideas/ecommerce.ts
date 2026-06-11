import type { AtlasIdea } from "../types";

export const ecommerceIdeas: AtlasIdea[] = [
  {
    slug: "adaptive-clothing-edit",
    title: "Adaptive Clothing Store for Older Adults",
    hook: "A curated store for magnetic-closure shirts, seated-fit pants, and easy-dress clothing — bought mostly by adult children for their parents.",
    category: "ecommerce",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "6–10 weeks",
    tags: ["adaptive", "seniors", "curation", "dtc"],
    summary:
      "Tens of millions of people with arthritis, limited mobility, or dementia struggle with buttons and zippers daily, and the adaptive clothing that exists is scattered, clinical-looking, and hard to find. A curated, dignified storefront — merchandised like a normal clothing brand, searchable by need — serves buyers who are usually shopping for someone they love.",
    analysis: {
      market:
        "The 65+ population is the fastest-growing demographic in most Western countries, and adaptive apparel is projected as a $400B+ global category yet has no beloved consumer brand. The actual purchaser is often a 45–60-year-old adult child or a care facility — digitally fluent buyers with high intent and low price sensitivity. Existing players skew medical-supply in look and experience; merchandising dignity is the differentiation.",
      monetization:
        "Curated dropship/light-inventory retail at 40–55% margins, with average orders of $80–150 (people buy multi-packs of what works). Care facilities and home-care agencies become B2B repeat accounts. Content (dressing guides, caregiver checklists) drives organic acquisition; email re-engagement drives reorders as needs progress.",
      firstSteps: [
        "Interview ten caregivers about the last clothing purchase that failed and why.",
        "Source 30 SKUs from existing adaptive manufacturers and shoot them on real older models, not mannequins.",
        "Launch with need-based navigation ('one-handed dressing', 'seated comfort', 'post-stroke') instead of garment categories.",
        "Build caregiver-facing SEO content and partner with two home-care agencies for referrals.",
      ],
      risks: [
        "Inventory and returns dynamics of apparel are unforgiving; start dropship-heavy and earn into stock positions.",
        "Amazon carries adaptive lines; you must win on curation, guidance, and trust rather than price.",
        "Sensitive marketing: get tone wrong and the brand reads as patronizing.",
      ],
      whoThisIsFor:
        "A founder with caregiving experience or healthcare adjacency who wants a mission-aligned commerce brand with demographic tailwinds.",
    },
  },
  {
    slug: "scrub-embroidery-lab",
    title: "Same-Week Embroidered Scrubs & Workwear",
    hook: "Personalized scrubs, lab coats, and clinic-branded workwear with five-day turnaround — sold to clinics by the team, not to nurses one at a time.",
    category: "ecommerce",
    difficulty: 3,
    capital: "5k-plus",
    timeToFirstDollar: "4–8 weeks",
    tags: ["healthcare", "customization", "b2b", "apparel"],
    summary:
      "Healthcare and clinic teams want name-and-credential embroidery plus practice branding, but traditional uniform vendors demand bulk minimums and three-week turnarounds. A digitized storefront where a practice manager builds a team order in ten minutes — each member picking size and style under one brand template — wins on speed and zero minimums.",
    analysis: {
      market:
        "Medical apparel is a multi-billion-dollar category (FIGS built a $1B+ brand on scrubs alone) but the personalization/team-order layer remains fragmented among slow local embroiderers. Veterinary clinics, dental groups, med-spas, and home-health agencies all buy 5–50 sets at a time with recurring replacement cycles. The buying experience — a shareable team-order link — is the actual product.",
      monetization:
        "Blank-plus-embroidery margins run 50–60% on $45–75 finished garments; team orders average $400–1,500. Recurring revenue arrives naturally via new-hire onboarding orders — make a 'team closet' reorder page each clinic can return to. 100 active clinics reordering twice yearly is a healthy seven-figure-revenue trajectory.",
      firstSteps: [
        "Partner with a local embroidery shop for fulfillment before buying machines; validate flow first.",
        "Build the team-order link: manager sets logo and colorway, staff self-select sizes, one invoice.",
        "Land five local clinics through direct outreach; deliver fast and photograph the teams.",
        "Buy your first embroidery machine ($15–25K, or used) once volume covers it — margins jump immediately.",
      ],
      risks: [
        "Order accuracy is brutal: a misspelled name on embroidered garments is unsellable waste.",
        "FIGS and large uniform programs own big health systems; stay in the SMB clinic segment they ignore.",
        "Capital tied up in blanks inventory as you scale popular sizes.",
      ],
      whoThisIsFor:
        "An operator who enjoys physical-product logistics and B2B repeat relationships more than brand-building theatrics.",
    },
  },
  {
    slug: "returns-photo-gate",
    title: "Photo-Verified Returns App for Shopify",
    hook: "Makes customers snap a photo of the item before approving a return label — cutting fraud and 'wardrobing' for apparel merchants in one step.",
    category: "ecommerce",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["shopify", "returns", "fraud", "merchant-tools"],
    summary:
      "Returns fraud and abuse cost retailers over $100B a year, and small apparel brands feel every fake 'defective' claim. A Shopify app that inserts a photo-evidence step into the returns flow — verifying condition, tags, and the actual item before a label is issued — pays for itself with the first prevented scam.",
    analysis: {
      market:
        "Shopify hosts millions of merchants, and apparel/footwear brands suffer 20–30% return rates with meaningful abuse mixed in. Returns-management apps (Loop, AfterShip) optimize logistics and exchanges but treat verification thinly — the fraud-prevention wedge is narrow, sharp, and easy to explain. Image models can now auto-check 'tags attached, unworn, matches SKU' cheaply.",
      monetization:
        "Standard Shopify-app tiering: $29–199/month by return volume, with the AI auto-verification on higher tiers. Merchants compare the cost to a single fraudulent $120 return per month. The app store provides discovery; 400 merchants at $59 average is ~$283K ARR.",
      firstSteps: [
        "Interview ten apparel merchants in Shopify communities about their worst returns-abuse stories and current policy hacks.",
        "Build the returns flow insert: photo capture, checklist prompts, merchant review queue.",
        "Add AI pre-screening (item match, tag detection) after manual-review mode proves the workflow.",
        "Launch in the Shopify App Store with a fraud-savings calculator as the listing hook.",
      ],
      risks: [
        "Big returns platforms could add photo verification natively; speed and depth (fraud scoring, serial-abuser flags) are your defense.",
        "Friction trade-off: honest customers hate hoops, so design must feel like 'help us help you faster', not an accusation.",
        "Shopify platform dependency, with its review cycles and API changes.",
      ],
      whoThisIsFor:
        "An app developer who wants the Shopify-ecosystem playbook with a wedge merchants emotionally care about.",
    },
  },
  {
    slug: "photo-paint-kits",
    title: "Custom Paint-by-Numbers from Your Photos",
    hook: "Turns a customer's pet portrait or wedding photo into a premium paint-by-numbers kit — a giftable, Instagrammable craft with 70% margins.",
    category: "ecommerce",
    difficulty: 2,
    capital: "500-5k",
    timeToFirstDollar: "3–6 weeks",
    tags: ["personalization", "gifts", "crafts", "dtc"],
    summary:
      "Custom paint-by-numbers kits hit three durable trends at once: personalization, anxiety-reducing crafts, and giftability. The conversion from photo to numbered canvas is now largely automatable, the kits cost $8–15 landed and sell for $45–70, and pet photos alone are an inexhaustible demand well.",
    analysis: {
      market:
        "The craft-kit market boomed and stabilized well above pre-2020 levels, and personalized gifting is a proven multi-billion-dollar behavior. Existing custom-kit sellers compete on price with slow overseas fulfillment and inconsistent canvas quality — leaving the premium, fast, quality-guaranteed position open in most Western markets. Pet owners and milestone gifts (weddings, new babies, memorials) are the core segments.",
      monetization:
        "Kits at $49–69 with bundle upsells (framing kit, extra brush set, 'paint date night' double kit). Margins of 60–70% after fulfillment partner costs. TikTok and Instagram process videos (photo → painted result) are the organic engine; influencer gifting in the pet niche converts strongly. Q4 and Valentine's spikes reward planning.",
      firstSteps: [
        "Test the photo-to-template pipeline on 20 varied photos; quality of the numbered template is the whole product.",
        "Source two fulfillment partners and order competing samples; stress-test canvas, paint pots, and shipping damage.",
        "Launch with pet portraits only — sharpest niche, strongest sharing behavior.",
        "Film the process content loop: customer photo, template reveal, finished painting timelapse.",
      ],
      risks: [
        "Photo quality varies wildly; bad inputs make bad kits, so set expectations and offer template previews pre-payment.",
        "Low barrier to entry and ad-cost competition; brand, speed, and template quality must carry you.",
        "Fulfillment partner dependency for a physical, giftable, deadline-sensitive product.",
      ],
      whoThisIsFor:
        "A marketer-builder comfortable with paid and organic social who wants a tangible product with built-in shareability.",
    },
  },
  {
    slug: "trade-consumables-club",
    title: "Consumables Subscription for Studios & Shops",
    hook: "Auto-replenishes the nitrile gloves, ink caps, and barrier film a tattoo studio burns through weekly — one box, right quantities, never a supply run again.",
    category: "ecommerce",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "4–8 weeks",
    tags: ["subscription", "b2b", "consumables", "niche-market"],
    summary:
      "Tattoo studios, nail salons, detailers, and groomers all burn predictable consumables and all buy them badly — emergency Amazon orders and weekend cash-and-carry runs. A vertical replenishment subscription that learns a shop's burn rate and auto-ships a consolidated box converts chaotic purchasing into retention-heavy recurring revenue.",
    analysis: {
      market:
        "Pick tattoo studios as the beachhead: ~30,000 in the US, spending $500–2,000/month on consumables with strong opinions about specific brands. Distributors in these verticals are old-school (phone orders, clunky sites) and Amazon is unmanaged chaos. The subscription mechanic — burn-rate-calibrated, single consolidated delivery — is the service layer nobody offers.",
      monetization:
        "Standard distribution margins (20–35% on consumables) improve with private-label basics like gloves and barrier film (45–60%). Average studio account: $400–900/month recurring. 80 subscribed studios is a $400–800K/year revenue base with high retention, since switching back to chaos is the alternative.",
      firstSteps: [
        "Spend a day in three studios cataloging exactly what they consume, which brands are non-negotiable, and what runs out.",
        "Negotiate wholesale accounts with two existing suppliers; resell before holding inventory.",
        "Launch a 'studio standing order' with simple monthly adjust-by-text service for ten local studios.",
        "Introduce private-label gloves and paper goods once trust and volume justify it.",
      ],
      risks: [
        "Thin distribution margins until private label kicks in; pricing discipline matters from day one.",
        "Brand loyalty cuts both ways — you must stock what artists demand, complicating inventory.",
        "Incumbent distributors may match on price; service quality and consolidation are your wedge, not discounts.",
      ],
      whoThisIsFor:
        "An operations-loving founder with credibility in (or curiosity about) body-art, beauty, or detailing subcultures.",
    },
  },
  {
    slug: "bulky-local-exchange",
    title: "Pickup-Only Marketplace for Bulky Secondhand",
    hook: "Furniture, gym equipment, and appliances — sold within 15 miles with scheduled-pickup logistics built in, because nobody ships a couch.",
    category: "ecommerce",
    difficulty: 4,
    capital: "500-5k",
    timeToFirstDollar: "2–4 months",
    tags: ["marketplace", "local", "secondhand", "logistics"],
    summary:
      "Facebook Marketplace is where couches go to attract flaky strangers; the no-show rate is the product gap. A bulky-goods marketplace with binding pickup windows, deposit-backed reservations, and optional muscle-with-a-van delivery makes the local secondhand transaction actually completable.",
    analysis: {
      market:
        "Furniture is among the largest secondhand categories by value and the worst-served by existing platforms, because shipping is impossible and coordination is miserable. Sellers' core pain is flakes; buyers' is trust and transport. A deposit mechanic (small card hold to book a pickup window) plus a delivery-partner option attacks both — and earns the take rate FB Marketplace can't charge.",
      monetization:
        "5–10% transaction fee justified by deposit-secured reservations, plus delivery booking margin ($30–80 per job routed to vetted van operators). Estate-cleanout and staging companies become power sellers with subscription tools at $49–99/month. One metro at modest liquidity can clear $20–40K/month in combined fees.",
      firstSteps: [
        "Run the model manually in one neighborhood: list 30 items for sellers, manage bookings via a simple form and card holds.",
        "Recruit three man-with-van operators with revenue share for the delivery option.",
        "Build listing + reservation + deposit flow; ruthlessly optimize the pickup-completion rate as the north-star metric.",
        "Seed supply through estate-sale companies and apartment-building move-out partnerships.",
      ],
      risks: [
        "Marketplace liquidity is hard mode; hyperlocal density (one zip code at a time) is the only honest path.",
        "Facebook's free and infinite inventory is the gravity well; your wedge is completion certainty, not selection.",
        "Damage and dispute handling on heavy items requires clear policy design early.",
      ],
      whoThisIsFor:
        "A gritty operator who enjoys solving physical-world coordination and is patient enough for marketplace math.",
    },
  },
  {
    slug: "maker-linesheet-store",
    title: "Wholesale Storefronts for Indie Makers",
    hook: "Gives a candle maker or ceramicist a password-protected wholesale site — line sheets, MOQs, net-30 terms — so they can sell to boutiques like a real brand.",
    category: "ecommerce",
    difficulty: 3,
    capital: "under-500",
    timeToFirstDollar: "6–10 weeks",
    tags: ["wholesale", "makers", "b2b-tools", "saas"],
    summary:
      "Indie makers earn retail revenue on Etsy but the step up to wholesale — line sheets, tiered pricing, minimums, payment terms — still happens over PDFs and email. A tool that turns their existing catalog into a professional, password-gated wholesale storefront unlocks the boutique channel without Faire's 15–25% commissions on their own relationships.",
    analysis: {
      market:
        "Faire built a $12B valuation proving boutiques want to buy indie wholesale online — but makers resent the commission on buyers they sourced themselves. Hundreds of thousands of makers sell on Etsy/Shopify at wholesale-ready volume; their direct-wholesale tooling is genuinely missing in the affordable tier. Import from Etsy/Shopify in one click is the adoption unlock.",
      monetization:
        "SaaS at $29–79/month (no commission on direct relationships — the anti-Faire positioning is the marketing). Payment processing margin on net-30 invoicing adds upside, and optional trade-credit checks ($5–10 each) monetize trust. 1,000 makers at $39 average is ~$470K ARR.",
      firstSteps: [
        "Interview 15 makers doing any wholesale today; collect their line-sheet PDFs and pricing-tier spreadsheets.",
        "Build catalog import plus a clean gated storefront with wholesale pricing, MOQs, and order minimums.",
        "Add invoice/net-terms checkout via a payments provider with built-in B2B invoicing.",
        "Launch through maker communities and wholesale-education influencers who teach the 'get into boutiques' playbook.",
      ],
      risks: [
        "Faire could ship a 'direct relationships, zero commission' tier and squash the positioning.",
        "Makers churn when wholesale efforts stall; education content is retention infrastructure, not marketing fluff.",
        "Net-terms facilitation touches credit risk — partner, don't underwrite.",
      ],
      whoThisIsFor:
        "A builder in the maker/craft world who understands both Etsy culture and how boutique buying actually works.",
    },
  },
  {
    slug: "dorm-landing-kit",
    title: "College Move-In Kits, Delivered to the Dorm",
    hook: "Pre-assembled dorm essentials — bedding, bath, desk, sized to the actual dorm's specs — ordered by parents in July, waiting at the residence hall in August.",
    category: "ecommerce",
    difficulty: 3,
    capital: "5k-plus",
    timeToFirstDollar: "Seasonal (one cycle)",
    tags: ["seasonal", "students", "bundles", "logistics"],
    summary:
      "Move-in week is a logistics panic: parents overbuy at Target, half of it doesn't fit the dorm, and international students arrive with nothing. Curated kits matched to specific universities' dorm specs (bed sizes, what's banned, what's provided), delivered to or near campus for arrival day, sell certainty to anxious parents at bundle margins.",
    analysis: {
      market:
        "Roughly 4 million students start at US residential colleges each year, with back-to-college spending well over $1,000 per student. The kit model wins hardest with international students (can't transport bedding across an ocean) and out-of-state families. The data layer — per-dorm specs and rules, painstakingly compiled — is the defensible asset that generic retailers don't bother with.",
      monetization:
        "Kits at $149–399 (essentials to deluxe) carrying 35–50% margins on bulk-sourced goods. Per-university landing pages convert via parent Facebook groups and admitted-student portals; university partnerships (official vendor status, orientation mailings) are the scale channel. One mid-size university at 300 kits averages ~$75K revenue in a six-week window.",
      firstSteps: [
        "Pick two universities with large international cohorts and compile their exact dorm specs and policies.",
        "Assemble three kit tiers from wholesale suppliers; test pack-and-ship economics end to end.",
        "Market in admitted-student and parent Facebook groups starting in May; international-student offices are receptive allies.",
        "Arrange delivery: local storage plus move-in-day distribution beats parcel shipping on cost and experience.",
      ],
      risks: [
        "Extreme seasonality — revenue lives in June–August, and unsold inventory waits a full year.",
        "Per-university operational complexity; depth at a few schools beats shallow national coverage.",
        "Amazon and Target dorm lists compete on price; your product is fit-certainty and arrival-day logistics.",
      ],
      whoThisIsFor:
        "An operator who likes seasonal sprint businesses and can charm university administrators between cycles.",
    },
  },
  {
    slug: "obsolete-parts-foundry",
    title: "3D-Printed Parts for Discontinued Appliances",
    hook: "The dishwasher-rack clip and dryer knob the manufacturer stopped making a decade ago — reverse-engineered, printed on demand, and ranked #1 for the part number.",
    category: "ecommerce",
    difficulty: 3,
    capital: "500-5k",
    timeToFirstDollar: "4–8 weeks",
    tags: ["3d-printing", "long-tail", "repair", "seo"],
    summary:
      "Millions of perfectly good appliances get junked over a $4 plastic part that no longer exists. A catalog of reverse-engineered, 3D-printed replacement parts for discontinued models — each with its own SEO page targeting the exact part number people desperately Google — is a long-tail commerce machine where every SKU is a tiny monopoly.",
    analysis: {
      market:
        "Right-to-repair momentum, sustainability sentiment, and appliance prices all push people to fix rather than replace. Searches for obsolete part numbers show desperate, zero-competition intent — eBay listings of salvaged parts at scalper prices are the only alternative. Each part you model and list compounds: the catalog is an asset that earns indefinitely.",
      monetization:
        "Parts priced $12–35 against material costs under $2 — margins above 80% before labor. Print on demand kills inventory risk. A catalog of 300 parts averaging two sales/week each is ~$45K/month at scale; even 50 parts is a meaningful side income. Custom reverse-engineering requests ($75–150) monetize the long tail you haven't modeled yet.",
      firstSteps: [
        "Mine appliance-repair forums and r/fixit for the most-begged-for discontinued parts; build a demand-ranked list.",
        "Model and print your first 20 parts; validate fit via the requesting forum members in exchange for photos and testimonials.",
        "Launch one SEO-optimized page per part number with fit/compatibility tables.",
        "Choose materials carefully (heat- and moisture-appropriate: ABS, PETG, nylon) and document limits honestly.",
      ],
      risks: [
        "Liability boundaries matter: never reproduce safety-critical or electrical components; stick to clips, knobs, brackets, and trays.",
        "Patent/design-right exposure is generally low on obsolete parts but warrants basic diligence per item.",
        "Print farms copying your catalog — the SEO pages and fit-data trust are the moat, not the STL files.",
      ],
      whoThisIsFor:
        "A tinkerer with CAD skills and SEO patience who delights in the world's most grateful customers.",
    },
  },
];
