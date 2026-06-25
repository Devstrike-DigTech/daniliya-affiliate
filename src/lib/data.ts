// Placeholder content for the public site. Copy, prices and images are
// stand-ins pending client confirmation — edit here and everything updates.
// Images live in /public/images; replace a file (same name) to swap it in.

/** A heading with a gold-accented word: {pre} <gold> {post} */
export type Accent = { pre?: string; gold?: string; post?: string };

export type Vertical = {
  slug: string;
  name: string;
  tagline: string;
  hero: { line1: string; line2: Accent; text: string; cta: string };
  /** Services index page entry — heading line 2's gold part renders italic */
  index: {
    line1: string;
    line2: Accent;
    text: string;
    bullets: string[];
    comingSoon?: boolean;
  };
  badges: string[];
  about: {
    title: Accent;
    text: string;
    stat: { value: string; label: string };
  };
  why: { title: Accent; text: string };
  features: { title: Accent; text: string }[];
  process: { title: Accent };
  steps: { title: string; text: string }[];
  cta: { title: string; text: string; button: string };
};

export const verticals: Vertical[] = [
  {
    slug: "laundry",
    name: "Laundry",
    tagline: "Laundry done right.",
    hero: {
      line1: "PREMIUM CLEANING.",
      line2: { pre: "AVAILABLE ", gold: "NOW" },
      text: "From boardrooms to bedrooms, Daniliya's certified teams deliver consistently high standards across Lagos and Abuja.",
      cta: "Book Service",
    },
    index: {
      line1: "Laundry",
      line2: { pre: "done ", gold: "right." },
      text: "We pick up, wash, dry, fold, and return your laundry with care. No more laundry day stress — just crisp, clean results delivered to your door.",
      bullets: [
        "Same-day express service available",
        "Pickup from your doorstep",
        "Hypoallergenic detergent option",
      ],
    },
    badges: [
      "Trusted Professionals.",
      "Flexible Scheduling.",
      "Eco-Friendly Products.",
      "Affordable Pricing.",
    ],
    about: {
      title: { pre: "A serious standard for cleaning in ", gold: "Nigeria." },
      text: "Daniliya Cleaning Services Limited was built to bring international-grade hygiene practices to Nigerian homes and businesses. Every team is vetted, uniformed and trained — so what you book is what arrives.",
      stat: {
        value: "250+",
        label: "Satisfied clients who trust us with their home or workspace.",
      },
    },
    why: {
      title: { pre: "Cleaning that goes ", gold: "beyond", post: " expectations." },
      text: "We combine experience, reliability, and attention to detail to deliver exceptional cleaning services. Our team is dedicated to making every home and workspace spotless, on time, and with complete customer satisfaction.",
    },
    features: [
      {
        title: { pre: "Fast ", gold: "service" },
        text: "We respond quickly and finish on time, keeping your space clean when you need it.",
      },
      {
        title: { pre: "Experienced ", gold: "team" },
        text: "Vetted, uniformed professionals who treat your home and workspace with respect.",
      },
      {
        title: { pre: "Natural ", gold: "Products" },
        text: "We use eco-friendly supplies that protect your home, your family, and the planet.",
      },
      {
        title: { pre: "Affordable ", gold: "pricing" },
        text: "Transparent rates with no hidden charges. Pay for exactly what you get.",
      },
    ],
    process: {
      title: { pre: "Get cleaner space in just three ", gold: "steps." },
    },
    steps: [
      {
        title: "Book your service",
        text: "Choose your cleaning service, pick a date and time, and tell us your needs — it only takes a few minutes.",
      },
      {
        title: "We do the cleaning",
        text: "Our professional team arrives on time with everything needed to clean your space thoroughly and carefully.",
      },
      {
        title: "Enjoy a fresh space",
        text: "Relax and enjoy a spotless, refreshed, and healthier environment while we handle the hard work.",
      },
    ],
    cta: {
      title: "Ready for a serious clean?",
      text: "Get a tailored quote within 24 hours — or book a one-off service right now.",
      button: "Get a Quote",
    },
  },
  {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    tagline: "Dry cleaning mastery.",
    hero: {
      line1: "DRY CLEANING.",
      line2: { gold: "MASTERED." },
      text: "Suits, agbadas, gowns and delicate fabrics handled by specialists — collected and returned at your door, ready to wear.",
      cta: "Schedule Pickup",
    },
    index: {
      line1: "Dry Cleaning",
      line2: { gold: "mastery." },
      text: "Your finest garments deserve the finest care. Our dry cleaning process uses professional-grade solvents and techniques developed for Nigerian climate conditions.",
      bullets: [
        "Suits, blazers & formal wear",
        "Delicates, silk & chiffon",
        "Agbada & traditional wear care",
      ],
      comingSoon: true,
    },
    badges: [
      "Garment-Safe Process.",
      "Pickup & Delivery.",
      "Stain Specialists.",
      "On-Time, Every Time.",
    ],
    about: {
      title: { pre: "Care your wardrobe can ", gold: "feel." },
      text: "Your finest garments deserve the finest care. Each piece is assessed and processed according to its fabric — with garment-safe processes developed for Nigerian climate conditions.",
      stat: { value: "48hr", label: "Standard turnaround on every order." },
    },
    why: {
      title: { pre: "Dry cleaning with ", gold: "obsessive", post: " attention." },
      text: "From stain mastery to finishing, every garment is handled by specialists who treat your wardrobe like their own — crisp, careful and always on schedule.",
    },
    features: [
      {
        title: { pre: "Stain ", gold: "mastery" },
        text: "Targeted treatment for oil, ink and palm-oil stains that regular washing can't touch.",
      },
      {
        title: { pre: "Fabric-first ", gold: "process" },
        text: "Each garment is assessed and processed according to its fabric, not a one-size cycle.",
      },
      {
        title: { pre: "Pickup & ", gold: "delivery" },
        text: "We collect and return at your door, on your schedule.",
      },
      {
        title: { pre: "Pressed to ", gold: "perfection" },
        text: "Every item returned crisp, folded or hung exactly how you want it.",
      },
    ],
    process: {
      title: { pre: "Fresh garments in three ", gold: "steps." },
    },
    steps: [
      {
        title: "Schedule a pickup",
        text: "Tell us what you have and when to collect it — it only takes a minute.",
      },
      {
        title: "We clean with care",
        text: "Specialist cleaning, stain treatment and finishing, fabric by fabric.",
      },
      {
        title: "Delivered back fresh",
        text: "Your wardrobe returned ready to wear, on time, every time.",
      },
    ],
    cta: {
      title: "Give your garments expert care.",
      text: "Book a pickup or request a quote today — we'll respond within 24 hours.",
      button: "Get a Quote",
    },
  },
  {
    slug: "interior-decoration",
    name: "Interior Decoration",
    tagline: "Where spaces come alive.",
    hero: {
      line1: "SPACES THAT",
      line2: { pre: "COME ", gold: "ALIVE" },
      text: "Finish by Daniliya — interior and exterior design, home automation and connectivity, delivered with quiet luxury.",
      cta: "Book Consultation",
    },
    index: {
      line1: "Interiors that",
      line2: { pre: "come ", gold: "alive." },
      text: "Finish by Daniliya turns houses into homes and offices into statements — interior and exterior design, smart automation and premium finishing, managed end to end.",
      bullets: [
        "Design consultation & concepts",
        "Smart home automation & connectivity",
        "Premium finishing & furniture sourcing",
      ],
    },
    badges: [
      "Design Consultation.",
      "Home Automation.",
      "Premium Finishing.",
      "Project Management.",
    ],
    about: {
      title: { pre: "Finish by ", gold: "Daniliya." },
      text: "From a single room refresh to a full architectural finish, we design and deliver spaces that feel as good as they look — homes, offices and commercial spaces.",
      stat: { value: "100%", label: "Design-led delivery, from concept to handover." },
    },
    why: {
      title: { pre: "Interiors that feel ", gold: "considered", post: "." },
      text: "One team accountable from concept to handover — design consultation, curated materials and smart-home integration without the contractor roulette.",
    },
    features: [
      {
        title: { pre: "Design ", gold: "consultation" },
        text: "Sit with a senior designer and turn your taste into a concrete plan and budget.",
      },
      {
        title: { pre: "Smart ", gold: "automation" },
        text: "Lighting, security and internet connectivity designed into the space, not bolted on.",
      },
      {
        title: { pre: "Premium ", gold: "materials" },
        text: "Curated finishes and furniture sourced for durability and elegance.",
      },
      {
        title: { pre: "Managed ", gold: "delivery" },
        text: "One team accountable from concept to handover — no contractor roulette.",
      },
    ],
    process: {
      title: { pre: "A transformed space in three ", gold: "steps." },
    },
    steps: [
      {
        title: "Share your vision",
        text: "Send us your space, inspiration and budget — we'll take it from there.",
      },
      {
        title: "Approve the design",
        text: "We present concepts, materials and a clear quote before any work starts.",
      },
      {
        title: "Watch it come alive",
        text: "We build, finish and hand over your transformed space, on schedule.",
      },
    ],
    cta: {
      title: "Let's transform your space.",
      text: "Book a design consultation or request a quote — we'll respond within 24 hours.",
      button: "Get a Quote",
    },
  },
  {
    slug: "construction",
    name: "Construction",
    tagline: "Built to last. Built by Daniliya.",
    hero: {
      line1: "BUILT TO LAST.",
      line2: { pre: "BUILT BY ", gold: "DANILIYA" },
      text: "Residential and commercial construction delivered with engineering discipline, honest timelines and materials that endure.",
      cta: "Brief Our Engineers",
    },
    index: {
      line1: "Construction",
      line2: { pre: "built to ", gold: "last." },
      text: "From foundations to finishing, we build with engineering discipline, verified materials and documented milestones — so you always know where your project stands.",
      bullets: [
        "Residential & commercial builds",
        "Transparent bills of quantity",
        "Stage-by-stage milestone reports",
      ],
    },
    badges: [
      "Certified Engineers.",
      "Transparent Costing.",
      "Quality Materials.",
      "On-Schedule Delivery.",
    ],
    about: {
      title: { pre: "Construction with ", gold: "integrity." },
      text: "From foundations to finishing, Daniliya Construction manages your build with documented milestones, verified materials and site supervision you can trust.",
      stat: { value: "10+", label: "Years of combined site experience on our teams." },
    },
    why: {
      title: { pre: "Building done ", gold: "properly", post: "." },
      text: "Structural decisions made by professionals, bills of quantity you can read, and progress reports at every stage — wherever you are.",
    },
    features: [
      {
        title: { pre: "Honest ", gold: "engineering" },
        text: "Structural decisions made by professionals, documented and explained.",
      },
      {
        title: { pre: "Transparent ", gold: "costing" },
        text: "Bills of quantity you can read, with no surprise variations.",
      },
      {
        title: { pre: "Verified ", gold: "materials" },
        text: "We buy and test materials openly — what's specified is what's used.",
      },
      {
        title: { pre: "Milestone ", gold: "reporting" },
        text: "Photo and progress reports at every stage, wherever you are.",
      },
    ],
    process: {
      title: { pre: "From land to keys in three ", gold: "steps." },
    },
    steps: [
      {
        title: "Brief us on the project",
        text: "Land, drawings or just an idea — start the conversation with our engineers.",
      },
      {
        title: "Agree scope & milestones",
        text: "Clear costing, timeline and supervision plan before work starts.",
      },
      {
        title: "We build, you verify",
        text: "Stage-by-stage delivery with photo reports until handover.",
      },
    ],
    cta: {
      title: "Planning a build?",
      text: "Talk to our engineers and get a realistic quote within 24 hours.",
      button: "Get a Quote",
    },
  },
];

export type Product = {
  slug: string;
  title: string;
  category: string;
  /** Small pill shown on the card, e.g. "Digital" / "Marketplace" */
  chip: string;
  price: number;
  /** Struck-through compare-at price */
  oldPrice?: number;
  /** Optional "Save ₦x" badge on the card image */
  badge?: string;
  blurb: string;
  description: string;
  image: string;
};

// NOTE: names and prices are placeholders pending client confirmation
// (intake form says the book is "Builder Handbook" at ₦50,000; the designs
// show "The Daniliya Method" at ₦5,000 — to be resolved with the client).
export const products: Product[] = [
  {
    slug: "the-daniliya-method",
    title: "The Daniliya Method",
    category: "Books",
    chip: "Digital",
    price: 5000,
    oldPrice: 15000,
    blurb:
      "A complete guide to building multiple service businesses and unlocking affiliate income in Nigeria.",
    description:
      "A practical look at standards, discipline and growth — how to build service businesses that Nigerians trust. 240 pages of field-tested methods from Samuel Nuhu Iliya.",
    image: "/images/products/the-daniliya-method.jpg",
  },
  {
    slug: "premium-laundry-starter-kit",
    title: "Laundry Starter Bundle",
    category: "Bundles",
    chip: "Marketplace",
    price: 19000,
    oldPrice: 25000,
    blurb: "Everything you need to launch a dry cleaning side income",
    description:
      "A curated bundle of professional-grade laundry essentials, picked by the Daniliya team for anyone starting a home laundry or dry-cleaning side business.",
    image: "/images/products/premium-laundry-starter-kit.jpg",
  },
  {
    slug: "executive-hygiene-bundle",
    title: "Executive Hygiene Bundle",
    category: "Bundles",
    chip: "Marketplace",
    price: 25000,
    oldPrice: 35000,
    badge: "Save ₦10,000",
    blurb:
      "One 90-minute professional interior consultation with a senior Daniliya designer.",
    description:
      "A premium selection of hygiene and home-care products for executives and busy households, curated and quality-checked by Daniliya.",
    image: "/images/products/executive-hygiene-bundle.jpg",
  },
  {
    slug: "branded-uniform-set",
    title: "Branded Uniform Set",
    category: "Merch",
    chip: "Marketplace",
    price: 12000,
    blurb: "Premium black & gold uniforms for service teams.",
    description:
      "Durable, comfortable branded workwear in the Daniliya black and yellow. Made to handle real work and still look sharp.",
    image: "/images/products/branded-uniform-set.jpg",
  },
  {
    slug: "affiliate-success-course",
    title: "Affiliate Success Course",
    category: "Courses",
    chip: "Digital",
    price: 15000,
    blurb: "Master link sharing, conversions and weekly payouts.",
    description:
      "A step-by-step video course on promoting Daniliya products effectively — from your first shared link to consistent weekly payouts.",
    image: "/images/products/affiliate-success-course.jpg",
  },
  {
    slug: "ghost-boys",
    title: "Ghost Boys",
    category: "Books",
    chip: "Digital",
    price: 4500,
    blurb: "A gripping read from the Daniliya shelf.",
    description:
      "Part of the curated Daniliya bookshelf — stories and ideas worth your time, selected for our community of readers.",
    image: "/images/products/ghost-boys.jpg",
  },
];

export type Testimonial = { name: string; role: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Adaeze O.",
    role: "Affiliate, Abuja",
    quote:
      "I made ₦147,000 in my first month sharing links. The Monday payout is a real thing.",
  },
  {
    name: "Tunde A.",
    role: "Marketplace customer",
    quote: "Cleanest delivery I've had in Lagos. Packaging was top-tier",
  },
  {
    name: "Chioma E.",
    role: "Cleaning client",
    quote:
      "Booked a fumigation in two clicks. Team arrived in uniforms. Very serious people.",
  },
];

export const affiliateSteps = [
  {
    title: "Register & submit KYC",
    text: "Create your account and verify your identity with your NIN and bank details. It keeps the network safe and your payouts smooth.",
  },
  {
    title: "Complete the training",
    text: "A short, practical tutorial on how the programme works and how to promote products honestly and effectively.",
  },
  {
    title: "Pass the assessment",
    text: "A quick quiz to confirm you're ready. Score the pass mark and you're activated instantly.",
  },
  {
    title: "Get your links",
    text: "Receive your unique payment links for every product. Share them anywhere — WhatsApp, Instagram, your status.",
  },
  {
    title: "Earn every Monday",
    text: "Every confirmed sale earns you a fixed commission. Payouts go out every Monday — watch the countdown on your dashboard.",
  },
];

export const affiliateFeatures = [
  {
    title: "Weekly Monday Payouts",
    text: "No waiting months for your earnings. Every Monday, your confirmed commissions are disbursed directly to your bank account.",
  },
  {
    title: "KYC-Verified & Secure",
    text: "All affiliates go through NIN/BVN verification, making this a trusted, fraud-free network. Your identity and earnings are always protected.",
  },
  {
    title: "Full Dashboard Visibility",
    text: "Track every click, every sale, and every naira in real time. Your dashboard shows earnings, pending payouts, and a live countdown to Monday.",
  },
  {
    title: "Free Training Programme",
    text: "Get access to a full affiliate training course with videos, content, and marketing tips. Learn exactly how to sell effectively.",
  },
  {
    title: "Per-Product Payment Links",
    text: "You get a unique payment link for every product — not just a referral code. Customers click your link and pay directly. Every sale is attributed to you.",
  },
  {
    title: "No Earning Cap",
    text: "Your commission scales with your sales. There is no ceiling on what you can earn. The more you refer, the more you make — simple.",
  },
];

/** Horizontal stepper on the affiliates landing page.
 * Icons are full-colour SVG slots in /public/icons. */
export const affiliateStepper = [
  { icon: "stepper-register", title: "Register", text: "Sign up free — takes 3 minutes" },
  { icon: "stepper-kyc", title: "KYC", text: "NIN/BVN verification via Smile ID" },
  { icon: "stepper-train", title: "Train", text: "Complete the affiliate training course" },
  { icon: "stepper-links", title: "Get Links", text: "Unique links per product, ready to share" },
  { icon: "stepper-paid", title: "Get Paid", text: "Every Monday, no exceptions" },
];

export type HowStep = { title: Accent; text: string; img: string };
export type HowTab = {
  key: string;
  label: string;
  /** "grid" = 2×2 checkerboard cards · "timeline" = alternating center-line */
  layout: "grid" | "timeline";
  steps: HowStep[];
};

export const howItWorksTabs: HowTab[] = [
  {
    key: "customers",
    label: "For Customers",
    layout: "grid",
    steps: [
      {
        title: { pre: "Browse & discover" },
        text: "Explore all five Daniliya service verticals from the homepage or navigate directly to the service you need. Each vertical has its own page with portfolio, pricing, and CTA.",
        img: "/images/how-it-works/customer-step-1.jpg",
      },
      {
        title: { pre: "Book or buy" },
        text: "Submit a service booking, request a tailored quote, or purchase a product directly from the store. Checkout is powered by Paystack — fast, secure, and Nigerian-native.",
        img: "/images/how-it-works/customer-step-2.jpg",
      },
      {
        title: { pre: "Get confirmation" },
        text: "You receive an instant confirmation via email and WhatsApp. For service bookings, we follow up within 2 hours. For orders, you get a tracking reference immediately.",
        img: "/images/how-it-works/customer-step-3.jpg",
      },
      {
        title: { pre: "Track & receive" },
        text: "Track your order or service status in real time. From Pending → Confirmed → In Progress → Delivered. We keep you updated at every stage via WhatsApp and email.",
        img: "/images/how-it-works/customer-step-4.jpg",
      },
    ],
  },
  {
    key: "affiliates",
    label: "For Affiliates",
    layout: "timeline",
    steps: [
      {
        title: { pre: "Register & submit ", gold: "KYC" },
        text: "Create your account and verify your identity with your NIN and bank details. It keeps the network safe and your payouts smooth.",
        img: "/images/how-it-works/affiliate-step-1.jpg",
      },
      {
        title: { pre: "Complete the ", gold: "training" },
        text: "A short, practical tutorial on how the programme works and how to promote products honestly and effectively.",
        img: "/images/how-it-works/affiliate-step-2.jpg",
      },
      {
        title: { pre: "Pass the ", gold: "assessment" },
        text: "A quick quiz to confirm you're ready. Score the pass mark and you're activated instantly.",
        img: "/images/how-it-works/affiliate-step-3.jpg",
      },
      {
        title: { pre: "Get your ", gold: "links" },
        text: "Receive your unique payment links for every product. Share them anywhere — WhatsApp, Instagram, your status.",
        img: "/images/how-it-works/affiliate-step-4.jpg",
      },
      {
        title: { pre: "Earn every ", gold: "Monday" },
        text: "Every confirmed sale earns you a fixed commission. Payouts go out every Monday — watch the countdown on your dashboard.",
        img: "/images/how-it-works/affiliate-step-5.jpg",
      },
    ],
  },
  {
    key: "influencers",
    label: "For Influencers",
    layout: "timeline",
    steps: [
      {
        title: { pre: "Apply as an ", gold: "influencer" },
        text: "Tell us about your platform, niche and audience. Our team reviews and approves influencers personally.",
        img: "/images/how-it-works/influencer-step-1.jpg",
      },
      {
        title: { pre: "Get ", gold: "approved" },
        text: "The Daniliya admin team reviews your profile and approves or requests more information. You'll be notified via email and SMS within 48 hours.",
        img: "/images/how-it-works/influencer-step-2.jpg",
      },
      {
        title: { pre: "Receive campaign ", gold: "assignments" },
        text: "Admin creates campaigns and assigns you to those that match your niche and audience. Each assignment comes with a full content brief, brand assets, and your unique UTM link or promo code.",
        img: "/images/how-it-works/influencer-step-3.jpg",
      },
      {
        title: { pre: "Post & ", gold: "track" },
        text: "Create your content and post using your unique link or code. Your dashboard shows real-time clicks, conversions, and earnings per campaign.",
        img: "/images/how-it-works/influencer-step-4.jpg",
      },
      {
        title: { pre: "Get paid ", gold: "Monday" },
        text: "Influencer earnings follow the same Monday payout cycle as affiliates. Flat-rate or commission-based — configured per campaign by admin.",
        img: "/images/how-it-works/influencer-step-5.jpg",
      },
    ],
  },
  {
    key: "vendors",
    label: "For Vendors",
    layout: "grid",
    steps: [
      {
        title: { pre: "Register as a vendor" },
        text: "Submit your business details — name, contact, bank account, and product categories. The registration is free and takes under 5 minutes.",
        img: "/images/how-it-works/vendor-step-1.jpg",
      },
      {
        title: { pre: "List your products" },
        text: "Add your products with titles, descriptions, prices, and up to 6 images each. Listings are saved as drafts until admin review.",
        img: "/images/how-it-works/vendor-step-2.jpg",
      },
      {
        title: { pre: "Admin approves & goes live" },
        text: "The Daniliya team reviews your listing and approves it for the marketplace. Once live, your product is immediately available for affiliates and influencers to promote.",
        img: "/images/how-it-works/vendor-step-3.jpg",
      },
      {
        title: { pre: "Track sales & revenue" },
        text: "Your vendor dashboard shows all orders, fulfilment status, gross revenue, and commission deducted. Export reports anytime.",
        img: "/images/how-it-works/vendor-step-4.jpg",
      },
    ],
  },
];

/** Demo order shared by the order-success and track-order screens.
 * Replaced by real order data once the commerce API is wired up. */
export const demoOrder = {
  reference: "DNL-1Z5X5B",
  customerFirstName: "Dave",
  receiptName: "Dex",
  receiptPhone: "+234 838 38383",
  shipName: "A252 Galadimawa",
  shipArea: "FCT Abuja",
  estimatedDelivery: "Sunday, 14 June",
  courier: "GIG Logistics",
  trackingNumber: "GIGHH3G1ME6",
  items: [{ product: products[1], qty: 1 }],
  deliveryFee: 8500,
  tax: 2500,
  /** Fulfilment timeline — `done` drives the green/grey state */
  timeline: [
    { title: "Order placed", text: "Payment confirmed via Paystack", at: "11 Jun 2026, 01:15", done: true },
    { title: "Packed at hub", text: "Items packed at Daniliya hub, Lagos", at: "11 Jun 2026, 09:40", done: true },
    { title: "Out for delivery", text: "With GIG Logistics, heading to you.", at: "—", done: false },
    { title: "Delivered", text: "Order has reached its destination.", at: "—", done: false },
  ],
  /** Current headline status shown as a pill */
  status: "Packed at the Hub",
};

/* ── Affiliate onboarding flow ─────────────────────────────────────────
   Spec confirmed by client: flat ₦10,000 per book sale, 60% pass mark,
   10 retakes, links on daniliya.com. */

export const COMMISSION_PER_BOOK = 10000;
export const ASSESSMENT_PASS_MARK = 60; // percent
export const ASSESSMENT_RETAKES = 10;

export const onboardingRoles = [
  {
    key: "customer",
    icon: "cart",
    title: "Customer",
    text: "Shop the marketplace & book services.",
    dark: true,
  },
  {
    key: "affiliate",
    icon: "affiliate-links",
    title: "Affiliate",
    text: "Earn weekly by sharing links",
    dark: false,
  },
  {
    key: "influencer",
    icon: "affiliate-dashboard",
    title: "Influencer",
    text: "Run campaigns on your socials",
    dark: false,
  },
  {
    key: "vendor",
    icon: "package",
    title: "Vendors",
    text: "Sell your products on Daniliya",
    dark: true,
  },
];

/** Nigerian banks for the KYC payout-account selector. */
export const nigerianBanks = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Kuda Microfinance Bank",
  "Moniepoint MFB",
  "Opay",
  "Palmpay",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
];

/** KYC banner highlights — corrected to the flat-commission spec. */
export const kycHighlights = [
  { icon: "truck", title: "Weekly payouts", text: "Every Monday, straight to your bank." },
  { icon: "affiliate-payouts", title: "₦10,000 per sale", text: "Flat commission on every book sold." },
  { icon: "shield-check", title: "Verified & secure", text: "Light KYC keeps the network trusted." },
];

export type TutorialLesson = {
  title: string;
  text: string;
  /** YouTube video id — drop the client's id in to enable playback */
  videoId: string;
  /** lesson-specific right-rail panel (heading + bullets) */
  aside: { heading: Accent; bullets: string[] };
};

export const tutorialLessons: TutorialLesson[] = [
  {
    title: "Welcome to Daniliya Affiliates",
    text: "How the programme works in under 60 seconds. Train, get verified, share your links, and earn every Monday.",
    videoId: "",
    aside: {
      heading: { pre: "Welcome to Daniliya ", gold: "Affiliates" },
      bullets: [
        "How the programme works in under 60 seconds.",
        "Watch every lesson to unlock the assessment.",
        "Weekly Monday payouts make the difference.",
      ],
    },
  },
  {
    title: "Your payment links explained",
    text: "You get a unique payment link for every product — not just a referral code. Every sale through your link is attributed to you.",
    videoId: "",
    aside: {
      heading: { pre: "Your payment links ", gold: "explained" },
      bullets: [
        "Every product gives you a unique referral link.",
        "Anyone who buys via your link earns you commission.",
        "Track clicks and conversions in your dashboard.",
      ],
    },
  },
  {
    title: "How your commission works",
    text: "You earn a flat ₦10,000 on every book sale you drive. No tiers, no caps — ten sales, ten commissions.",
    videoId: "",
    aside: {
      heading: { pre: "How your commission ", gold: "works" },
      bullets: [
        "You earn a flat ₦10,000 on every book sale.",
        "Commission moves Pending → Confirmed → Disbursed.",
        "Refunded orders reverse the commission entry.",
      ],
    },
  },
  {
    title: "Sharing the right way",
    text: "Acceptable vs. unacceptable sharing practices. Promote honestly on WhatsApp, Instagram and your status — no spam.",
    videoId: "",
    aside: {
      heading: { pre: "Sharing the right ", gold: "way" },
      bullets: [
        "Promote honestly — no spam or fake claims.",
        "Your WhatsApp status & socials are your best channels.",
        "Misuse can pause your payouts, so play fair.",
      ],
    },
  },
  {
    title: "Getting paid every Monday",
    text: "The commission lifecycle: Pending → Confirmed → Disbursed. Confirmed earnings are paid out every Monday.",
    videoId: "",
    aside: {
      heading: { pre: "Getting paid every ", gold: "Monday" },
      bullets: [
        "Confirmed earnings are paid out every Monday.",
        "Payouts go straight to your verified bank account.",
        "Watch the countdown to payout on your dashboard.",
      ],
    },
  },
];

export type AssessmentQuestion = {
  q: string;
  options: string[];
  /** index of the correct option */
  answer: number;
};

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    q: "How often does Daniliya pay out affiliate commissions?",
    options: ["Daily", "Every Friday", "Every Monday", "End of the Month"],
    answer: 2,
  },
  {
    q: "How much do you earn on each book sale you drive?",
    options: ["5% of the price", "₦10,000 flat", "₦5,000 flat", "It varies by tier"],
    answer: 1,
  },
  {
    q: "What do you share with customers to get credited for a sale?",
    options: [
      "Just your name",
      "A screenshot of the product",
      "Your unique per-product payment link",
      "The Daniliya office address",
    ],
    answer: 2,
  },
  {
    q: "What must you complete before your account is activated?",
    options: [
      "Nothing, it's instant",
      "KYC, the tutorial and this assessment",
      "A paid subscription",
      "Ten sales",
    ],
    answer: 1,
  },
  {
    q: "Which documents are required for KYC?",
    options: [
      "Passport photo only",
      "NIN, BVN, bank details and a government-issued ID",
      "Just your email",
      "A utility bill",
    ],
    answer: 1,
  },
  {
    q: "What is the order of the commission lifecycle?",
    options: [
      "Disbursed → Confirmed → Pending",
      "Pending → Confirmed → Disbursed",
      "Confirmed → Pending → Disbursed",
      "Pending → Disbursed → Confirmed",
    ],
    answer: 1,
  },
  {
    q: "What happens to your commission if a customer gets a refund?",
    options: [
      "Nothing, you keep it",
      "The related commission is reversed",
      "You pay a penalty",
      "Your account is closed",
    ],
    answer: 1,
  },
  {
    q: "Is there a cap on how much you can earn?",
    options: [
      "Yes, ₦100,000 per month",
      "Yes, after 10 sales",
      "No, commission scales with your sales",
      "Only on weekends",
    ],
    answer: 2,
  },
  {
    q: "Which is an acceptable way to share your link?",
    options: [
      "Spamming strangers' DMs",
      "Posting on your WhatsApp status and socials",
      "Impersonating Daniliya staff",
      "Promising fake discounts",
    ],
    answer: 1,
  },
  {
    q: "What pass mark do you need to activate your affiliate account?",
    options: ["40%", "50%", "60%", "80%"],
    answer: 2,
  },
];

export const assessmentImproveTopics = [
  "Commission lifecycle (Pending → Confirmed → Disbursed).",
  "Acceptable vs. unacceptable sharing practices.",
  "Payout schedule & how refunds affect commissions.",
];

export const contactInfo = {
  whatsapp: "+234 800 DANILIYA",
  email: "hello@daniliya.com",
  location: "Abuja, Nigeria",
  responseTime: "Within 2 hours (8am–8pm WAT)",
};
