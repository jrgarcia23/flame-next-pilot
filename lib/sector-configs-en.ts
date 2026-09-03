// EN new-model sector configs. Mirror of sector-preview-configs.ts (ES) translated to English.
// Reuses the same icon SVGs (IC) and images; product links point to the EN product pages.
import { SectorConfig } from "./page-content";
import { getFaqs } from "./live-faqs";
import { IC } from "./sector-preview-configs";

// --- Real Flame case studies (EN copy; links go to the existing case articles) ---
const CASES: Record<string, { href: string; img: string; title: string; excerpt: string; date: string }> = {
  multiopticas: { href: "https://www.flameanalytics.com/es/multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/07/multiopticas-hero-6a5df7da.png", title: "How MultiÓpticas turns in-store traffic into business decisions", excerpt: "MultiÓpticas launches an advanced in-store analytics project with Flame Analytics to turn physical data into network intelligence.", date: "20 July 2026" },
  afflelou: { href: "https://www.flameanalytics.com/es/alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/alain-afflelou-hero.png", title: "Alain Afflelou trusts Flame Analytics for people counting across its stores in Spain", excerpt: "Alain Afflelou deploys Flame Analytics' people-counting solution across its stores in Spain to measure footfall, optimise management and make data-driven decisions.", date: "16 June 2026" },
  caixaforum: { href: "https://www.flameanalytics.com/es/transformando-la-experiencia-en-caixaforum-con-videoanalitica/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/02/CASOS-DE-EXITO-EN.jpg", title: "Transforming the CaixaForum experience with video analytics", excerpt: "The \"la Caixa\" Foundation runs the CaixaForum network of cultural centres across Spain, spaces that blend art, science and culture to give visitors unique experiences.", date: "12 February 2025" },
  repsol: { href: "https://www.flameanalytics.com/es/caso-de-exito-repsol-y-flame-analytics-transforman-la-experiencia-en-1000-gasolineras/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/04/flame-en-repsol.jpg", title: "Repsol and Flame Analytics transform the experience across 1,000 service stations", excerpt: "Repsol and Flame transform the experience and management at 1,000 service stations, leaning on traffic analytics and connectivity.", date: "9 April 2025" },
  pompeii: { href: "https://www.flameanalytics.com/es/pompeii-uso-del-big-data-en-el-sector-retail/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2020/02/analitica-retail-pompeii.png", title: "Pompeii transforms its retail strategy with accurate traffic data", excerpt: "In the competitive world of retail, understanding the customer is key. Pompeii relies on Flame's in-store traffic analytics to stay ahead of its customers.", date: "24 August 2025" },
};
const pickCases = (keys: string[]) => keys.map((k) => CASES[k]);

// --- Products (identical across sectors; EN links) ---
const PRODUCTS = [
  { name: "Traffic", title: "Traffic", desc: "Measure indoor and outdoor traffic, monitor occupancy in real time and calculate conversion, all from a single platform.", href: "/en/traffic-insights/", cta: "Learn more", iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png" },
  { name: "Customer Journey", title: "Customer Journey", desc: "Analyse people's journeys and interactions to understand their behaviour and optimise the experience at every touchpoint.", href: "/en/customer-journey/", cta: "Learn more", iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png", img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png" },
  { name: "Connect", title: "Connect", desc: "Collect visitor data through guest WiFi and launch personalised marketing campaigns based on location, profile and behaviour.", href: "/en/connect/", cta: "Learn more", iconImg: "/wp-content/uploads/2026/01/Group-1.png", img: "/wp-content/uploads/2026/01/Group-1.png" },
];

const HERO_BULLETS: [string, string, string, string] = ["99% accuracy", "No biometrics · 100% GDPR", "Real-time data", "AI on your existing CCTV"];
const PRODUCTS_TITLE = "Complete products,";
const PRODUCTS_TITLE_HL = "multiple solutions";
const PRODUCTS_SUB = "Measure and improve space performance, understand how people behave and connect with your visitors.";
const PRODUCTS_BULLETS = ["Measure and improve space performance", "Understand how people behave", "Connect with your visitors"];

// --- Use-case catalog (real menu icons) for the new-model module ---
const UCM: Record<string, { img: string; title: string; href: string }> = {
  conteo:         { img: "/wp-content/uploads/2025/09/people_counting1.png",     title: "People counting",        href: "/en/people-counting/" },
  conversion:     { img: "/wp-content/uploads/2025/09/Conversion_analytics1.png", title: "Conversion analytics",   href: "/en/conversion-analytics/" },
  comportamiento: { img: "/wp-content/uploads/2025/09/Customer_bahavior1.png",    title: "Behaviour and heatmaps", href: "/en/customer-behavior/" },
  ocupacion:      { img: "/wp-content/uploads/2025/09/Occupancy_management1.png",  title: "Occupancy management",   href: "/en/occupancy-management/" },
  colas:          { img: "/wp-content/uploads/2025/09/Queue1.png",                 title: "Queue management",       href: "/en/queue-analytic/" },
  aseos:          { img: "/wp-content/uploads/2025/09/Restroom1.png",              title: "Restroom management",    href: "/en/restroom-management/" },
  wifiInv:        { img: "/wp-content/uploads/2025/09/guest_wifi1.png",            title: "Guest WiFi marketing",   href: "/en/guest-wifi-marketing/" },
  wifiCorp:       { img: "/wp-content/uploads/2025/09/corporate_wifi1.png",        title: "Corporate WiFi",         href: "/en/corporate-wifi-access/" },
  recorrido:      { img: "/wp-content/uploads/2025/09/road-route-map-icon.png",    title: "Customer journey",       href: "/en/customer-journey/" },
};
export const uc = (k: keyof typeof UCM | string, desc: string) => ({ ...UCM[k], desc });
export const UC_COMMON = { showUseCases: true, useCasesLayout: "numbers" as const, useCasesBeforeCases: true, hideProducts: true, hideTestimonials: true, useCasesEyebrow: "Use cases" };

// ============================ RETAIL ============================
export const RETAIL_CFG_EN: SectorConfig = {
  metaTitle: "Retail · Flame Analytics", metaDescription: "Physical retail analytics with AI.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data Intelligence for Retail",
  heroSub: "Flame turns the cameras you already have in your store into actionable data: how many people come in, how they move and what converts. Physical retail analytics with artificial intelligence, no biometrics and fully GDPR-compliant, to decide layout, staffing, product placement and your campaigns with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your data.",
  painPointsIntro: "Before we talk about a platform, let's talk about what you already deal with every week running your stores.",
  painPoints: [
    { svg: IC.alert, title: "You decide without understanding what happens in-store", desc: "Layout, staffing and product placement are defined without really knowing how the customer behaves inside the store." },
    { svg: IC.activity, title: "You can't pin down the cause of a drop", desc: "When sales fall, you don't know whether fewer customers came in or they bought less, so you end up acting on the wrong problem." },
    { svg: IC.door, title: "You lose the customer when they leave the store", desc: "The moment they walk out the door, you have no way to reach them again or turn that visit into a lasting relationship." },
    { svg: IC.grid, title: "You don't know which stores perform best", desc: "Each store is managed on its own, with no shared view to compare performance or spot what the best-performing one does better." },
  ],
  capsTitle: "Everything Flame measures and activates in your store",
  capsSub: "From footfall to loyalty: eight real capabilities to run your retail with data.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.people, title: "Footfall and in-store flow", desc: "Accurately count indoor and outdoor traffic and understand how the customer moves through the store: journeys, cold and hot zones. Adjust opening hours, staff and layout with data, not intuition." },
    { span: 5, svg: IC.staff, title: "Staffing", desc: "Optimise and adapt shifts to the real traffic of each time slot and find the ideal ratio between staff and visits. Cut poorly allocated hours and costs without hurting service." },
    { span: 6, svg: IC.cart, title: "Conversion (visit to purchase)", desc: "Cross-reference traffic with your sales systems (POS, ERP…) to know the real conversion rate of each store and your whole network. Discover how much of your footfall ends up buying." },
    { span: 6, svg: IC.heatmap, title: "Behaviour and heatmaps", desc: "Visualise paths, dwell times and heatmaps. See how the customer moves to improve layout, signage and product placement." },
    { span: 5, svg: IC.eye, title: "Storefront and capture", desc: "Measure how your storefront performs: how many passers-by go by, how many come in and your real capture rate. Discover the pulling power of each store and each location." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg", svg: IC.bars, title: "Compare and optimise your stores", desc: "Measure each store's KPIs (outdoor and indoor traffic, capture, conversion…) and compare them. Identify best and worst practices by location and replicate what works across your network." },
    { span: 6, svg: IC.target, title: "Marketing attribution", desc: "Analyse the footfall generated by each campaign, event or promotion and calculate the real cost per visit of each channel. Stop investing in actions that don't bring customers into the store." },
    { span: 6, svg: IC.wifi, title: "Capture and loyalty via WiFi", desc: "Turn customer WiFi into capture: campaigns personalised by location and behaviour, segmentation by profile (age, gender, postcode) and a connection with your CRM to build loyalty." },
  ],
  casesTitle: "Brands already turning their traffic into decisions",
  casesSub: "Retailers and chains that measure with Flame what used to be decided on intuition.",
  caseStudies: pickCases(["multiopticas", "afflelou", "pompeii"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [2, 4, 6], faqs: getFaqs("retail", "en"),
  ctaStripBold: "Every store is unique. Your data should prove it.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every retail challenge",
  useCasesSub: "Footfall, conversion, queues, occupancy, behaviour or WiFi: whatever your store's priority, Flame already has a use case to solve it. Pick yours and see how.",
  useCases: [
    uc("conteo", "Accurately measure how many people come in and how they spread across time slots and store zones."),
    uc("conversion", "Cross-reference traffic with your POS to know what share of visits ends up buying in each store."),
    uc("comportamiento", "Paths, dwell time and cold and hot zones to improve layout and signage."),
    uc("recorrido", "Reconstruct the full visitor journey, from the storefront to the checkout."),
    uc("colas", "Measure checkout waits and open new positions before the customer abandons the purchase."),
    uc("wifiInv", "Turn store WiFi into contact capture and segmented loyalty campaigns."),
  ],
};

// ========================= SUPERMARKETS =========================
export const SUPERMERCADOS_CFG_EN: SectorConfig = {
  metaTitle: "Supermarkets · Flame Analytics", metaDescription: "Supermarket analytics with AI.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Supermarket-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for supermarkets",
  heroSub: "Flame turns the cameras you already have in your supermarket into actionable data: footfall by zone, checkout queues, conversion and basket. Supermarket analytics with artificial intelligence, no biometrics and fully GDPR-compliant, to optimise assortment, cashier staffing and layout with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your supermarket.",
  painPointsIntro: "These are the problems that recur in any grocery store and that you still manage today without real data.",
  painPoints: [
    { svg: IC.clock, title: "Queues cut your sales", desc: "When the wait grows, the customer abandons the purchase or shrinks their basket. Without footfall data by time slot and alerts, you react late and without knowing when to add checkouts." },
    { svg: IC.staff, title: "Cashiers poorly sized at peak times", desc: "Too many staff in off-peak hours and too few during the peaks. Planning shifts without knowing the real traffic of each slot creates unnecessary costs and lost sales." },
    { svg: IC.heatmap, title: "Aisles and sections that underperform", desc: "There are cold zones almost nobody walks through and promotions almost nobody sees. Without heatmaps you don't know whether the problem is the product or its placement." },
    { svg: IC.cart, title: "You don't know your real conversion", desc: "Counting tickets isn't enough: without cross-referencing real visits with sales, you don't know what share buys. And counting carts, children or staff distorts the figure." },
  ],
  capsTitle: "Everything Flame measures and activates in your supermarket",
  capsSub: "Eight capabilities that work on the CCTV cameras you already have, tailored to a supermarket's operations.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg", svg: IC.building, title: "Section optimisation and cashier planning", desc: "Cross-reference each section's flow with sales to improve assortment and space, and adapt the cashier roster to each time slot. Put staff where and when the store needs them, without overspending or queues." },
    { span: 5, svg: IC.people, title: "Footfall and flow by zone", desc: "Measure entries and exits and analyse how the customer moves through the supermarket. Compare days, slots and campaigns to know real traffic and spot the busiest zones." },
    { span: 6, svg: IC.cart, title: "Visit-to-purchase conversion", desc: "Cross-reference real traffic with your POS or ERP to calculate real conversion and average basket. Discover how many customers enter the supermarket and leave without buying." },
    { span: 6, svg: IC.heatmap, title: "Heatmaps and behaviour", desc: "Visualise paths, hot spots and dwell time in each aisle. Discover which sections attract, which are ignored and how to improve layout and gondola ends." },
    { span: 5, svg: IC.activity, title: "Real-time occupancy", desc: "Track how many people are present at any moment and by zone, with alerts when a section or the checkout line saturates. Act before crowding turns into a bad experience." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.clock, title: "Queue and restroom management", desc: "Measure wait time and abandonment at the checkout line to open positions right when needed. Also track restroom usage to plan cleaning by real use, not a fixed schedule." },
    { span: 6, svg: IC.wifi, title: "Capture and loyalty via WiFi", desc: "The WiFi captive portal turns visits into contacts and feeds them into your CRM (such as Mailchimp, Salesforce or HubSpot). Build a database to launch promotions and increase repeat visits with the customer's consent." },
    { span: 6, svg: IC.share, title: "Data for daily operations", desc: "Plan cleaning, restocking and shifts based on the real flow of each time slot. Turn data into concrete decisions on staff, stock and maintenance." },
  ],
  casesTitle: "Brands that already decide with data, not intuition",
  casesSub: "Large networks and chains that measure real traffic, queues and conversion with Flame.",
  caseStudies: pickCases(["repsol", "multiopticas", "afflelou"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 1, 7], faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Fewer queues, better assortment, more conversion.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every supermarket challenge",
  useCasesSub: "Footfall by zone, conversion, queues, occupancy, behaviour or WiFi: whatever your supermarket's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure footfall by section and time slot to know the real traffic of each zone."),
    uc("conversion", "Cross-reference traffic with your POS to know what share buys and the real average basket."),
    uc("comportamiento", "Heatmaps and aisle paths to improve layout, gondola ends and restocking."),
    uc("ocupacion", "Control real-time occupancy with alerts when a section or the checkout line saturates."),
    uc("colas", "Measure checkout waits and open positions before the customer abandons the purchase."),
    uc("wifiInv", "Turn supermarket WiFi into contact capture and segmented promotions."),
  ],
};

// ============================ HOSPITALITY ============================
export const HOTELES_CFG_EN: SectorConfig = {
  metaTitle: "Hospitality · Flame Analytics", metaDescription: "Occupancy analytics for hotels.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Hospitality-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for hotels",
  heroSub: "Flame turns the cameras and WiFi you already have in your hotel into actionable data: footfall and occupancy of the lobby, the restaurant or the spa. Hotel analytics with artificial intelligence, no biometrics and fully GDPR-compliant, to adjust staff, control occupancy and justify every installation with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your hotel.",
  painPointsIntro: "You run a hotel with many areas and shifting schedules, but you decide on intuition rather than data. These are the problems Flame solves by measuring what really happens in each space.",
  painPoints: [
    { svg: IC.grid, title: "You don't know which areas your guests use", desc: "The lobby, the restaurant or the spa fill and empty without you knowing when or why. Without real occupancy data, any decision about these spaces rests on guesswork." },
    { svg: IC.staff, title: "Staffing doesn't match footfall", desc: "At some moments there's too much staff at reception and at others queues form. Planning shifts without real data raises costs and hurts the guest experience." },
    { svg: IC.alert, title: "You don't know real-time occupancy", desc: "At events, dining rooms and common areas you need to know how many people are present at each moment. Without reliable counting, you can't control occupancy or guarantee safety." },
    { svg: IC.bars, title: "You don't know which facilities are profitable", desc: "Refurbishing the spa, expanding the restaurant or renovating the gym takes investment. Without measuring the real use of each space, you can't justify improvements or prove which facilities work." },
  ],
  capsTitle: "Everything Flame measures and activates in your hotel",
  capsSub: "Eight capabilities designed for the reality of a hotel, on the cameras and WiFi you already have and always without biometrics.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Hospitality-1.jpg", svg: IC.building, title: "Optimise occupancy and staffing", desc: "Measure footfall in the lobby, the restaurant, the spa or the event rooms by time slot. Match staff to real occupancy, cut unnecessary shifts and avoid waits caused by understaffing." },
    { span: 5, svg: IC.people, title: "Guest footfall and flow", desc: "Measure entries, exits and movement between the hotel's different areas. Discover how many guests pass through each space and at what times to make better operational decisions." },
    { span: 6, svg: IC.cart, title: "Service usage and conversion", desc: "Cross-reference footfall with your PMS or POS data in spaces such as the restaurant or the spa. Discover what share of guests ends up spending and where you're losing business opportunities." },
    { span: 6, svg: IC.heatmap, title: "Behaviour and heatmaps", desc: "Visualise paths and dwell time in common areas with heatmaps. Discover which corners attract your guests and which go unnoticed to redistribute furniture and services." },
    { span: 5, svg: IC.clock, title: "Queue and restroom management", desc: "Detect waits at reception and check-in to open more positions when needed. Also schedule restroom cleaning by real use rather than a fixed timetable." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.activity, title: "Real-time occupancy by zone", desc: "Check how many people are in the lobby, the dining room or the spa and get alerts before reaching the limit. Anticipate saturation and act before it affects the guest experience." },
    { span: 6, svg: IC.wifi, title: "Guest WiFi: capture and build loyalty", desc: "Turn your guest WiFi into your direct marketing channel: a captive portal that captures contacts for your CRM, communicates during the stay and launches segmented loyalty campaigns. The lever chains like Hotels VIVA already use to know and retain everyone who passes through their hotels." },
    { span: 6, svg: IC.share, title: "Real data for operations", desc: "Plan cleaning, staff, energy and maintenance based on the use of each space. Turn on climate control and lighting when needed and allocate resources where they're really required." },
  ],
  casesTitle: "Spaces that already manage the experience with data",
  casesSub: "Large spaces and networks that measure real footfall and occupancy with Flame.",
  caseStudies: pickCases(["caixaforum", "repsol", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [3, 5, 8], faqs: getFaqs("hospitality", "en"),
  ctaStripBold: "Every area of your hotel, measured and under control.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every challenge in your hotel",
  useCasesSub: "Occupancy by zone, queues, restrooms, footfall, behaviour or WiFi: whatever your hotel's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure footfall in the lobby, the restaurant or the spa by time slot to adjust staff and services."),
    uc("ocupacion", "Control real-time occupancy of common areas and event rooms, with saturation alerts."),
    uc("comportamiento", "Heatmaps of common areas to redistribute furniture, services and flows."),
    uc("colas", "Detect waits at reception and check-in to open more positions when needed."),
    uc("aseos", "Schedule restroom cleaning by real use, not a fixed timetable."),
    uc("wifiInv", "Turn guest WiFi into capture for your CRM and loyalty campaigns during the stay."),
  ],
};

// ======================= PUBLIC VENUES =======================
export const ESPACIOS_CFG_EN: SectorConfig = {
  metaTitle: "Public venues · Flame Analytics", metaDescription: "Occupancy, safety and flows in public venues.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for public venues",
  heroSub: "Flame turns your venue's cameras into useful data on footfall, occupancy, safety and the use of each zone. AI analytics for public venues, no biometrics and GDPR-compliant, to improve safety, plan events and justify decisions to the authorities with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your public venue.",
  painPointsIntro: "Running a public venue means balancing safety, visitor experience and budget, often without data. Without knowing occupancy or people flows, decisions on staff, openings and events end up based on intuition.",
  painPoints: [
    { svg: IC.alert, title: "You don't know the real occupancy of each space", desc: "Without reliable data on how many people are in each hall or entrance, occupancy control depends on manual counts. By the time you spot saturation, the safety risk is already there." },
    { svg: IC.heatmap, title: "You don't know how people move", desc: "You don't know where people enter, what routes they follow or where they gather. This lack of information hampers crowd management, access design and event planning." },
    { svg: IC.bars, title: "Justifying use to the authorities is hard", desc: "Councils, boards and funding bodies demand objective data. Without reliable visitor and occupancy figures, justifying an event, an investment or a budget ends up relying on perceptions." },
    { svg: IC.activity, title: "Cleaning and energy with no usage criteria", desc: "Cleaning runs on a schedule and climate control on habit, not real occupancy. The result is neglected restrooms at peak times and energy spend in zones and slots that are almost empty." },
  ],
  capsTitle: "Everything Flame measures and activates in your public venue",
  capsSub: "Eight capabilities to run your public venue with real data: from occupancy control to justification before the authorities. All without biometrics and fully GDPR-compliant.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg", svg: IC.shield, title: "Occupancy and safety in real time", desc: "Check total and per-zone occupancy and get alerts before reaching the limit. Analyse pedestrian flows to anticipate crowds and safely plan events, openings and high-footfall moments." },
    { span: 5, svg: IC.people, title: "Footfall and people flow", desc: "Measure entries and exits and analyse traffic by entrance, zone and hall. Discover how many people visit the space, when peak hours occur and how they spread across the different services." },
    { span: 6, svg: IC.target, title: "Impact of events and activities", desc: "Measure the footfall each exhibition, event or activity generates and compare it with the usual programme. Discover which content really draws crowds and justify cultural investment with objective data." },
    { span: 6, svg: IC.bars, title: "Usage analysis by zone and service", desc: "Identify which halls, exhibitions or services attract the most visitors and which are underused. Use this data to schedule content, adjust hours and decide where to concentrate investment." },
    { span: 5, svg: IC.heatmap, title: "Heatmaps and pedestrian routes", desc: "Analyse paths, dwell times and the zones with the highest concentration of visitors. Detect bottlenecks, underused spaces and the real routes the public takes." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.share, title: "Data to justify operations", desc: "Plan cleaning, staff and energy based on real occupancy. Prove to councils, boards and funders the use of each space and the impact of events with objective data." },
    { span: 6, svg: IC.wifi, title: "Capture and communication via WiFi", desc: "Offer WiFi through a captive portal that informs, guides and creates a direct communication channel. Use every connection to share activities, notices and services without using sensitive personal data." },
    { span: 6, svg: IC.clock, title: "Queue and restroom management", desc: "Control waits at entrances, ticket offices and information points, and plan restroom cleaning by real use. Cut queues at peak times and keep facilities ready when they're needed most." },
  ],
  casesTitle: "Public venues that already manage with data",
  casesSub: "Cultural centres and large networks that use Flame to control occupancy, analyse flows and know the real use of each space.",
  caseStudies: pickCases(["caixaforum", "repsol", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 6, 2], faqs: getFaqs("public-venues", "en"),
  ctaStripBold: "Occupancy, safety and flows, in real time.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every challenge in your venue",
  useCasesSub: "Occupancy, safety, queues, restrooms, behaviour or WiFi: whatever your public venue's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure how many people visit the space, by entrance and zone, and when peak hours occur."),
    uc("ocupacion", "Control total and per-zone occupancy in real time, with alerts to anticipate crowds."),
    uc("comportamiento", "Analyse paths and heatmaps to detect bottlenecks and underused zones."),
    uc("colas", "Control waits at entrances, ticket offices and information points at peak times."),
    uc("aseos", "Plan restroom cleaning by real use and keep facilities ready."),
    uc("wifiInv", "Offer WiFi through a captive portal and turn it into a channel to share activities and services."),
  ],
};

// ============================ BANKING ============================
export const BANCOS_CFG_EN: SectorConfig = {
  metaTitle: "Banking · Flame Analytics", metaDescription: "Footfall and queue analytics for branch networks.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Banking-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for banks and branches",
  heroSub: "Flame turns your branches' cameras into useful data on footfall, queues and the real use of each branch. Analytics for banking with artificial intelligence, no biometrics and GDPR-compliant, to size tellers and advisers, cut waits and optimise the whole network with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your branch network.",
  painPointsIntro: "Running a branch network without knowing what happens in each office forces you to decide on intuition. These are the problems that most affect the customer experience and the efficiency of the whole network.",
  painPoints: [
    { svg: IC.clock, title: "Queues and waits at the branch", desc: "Customers queue at the counter, personal service or to see an adviser without you knowing when the peaks happen. Waits damage the experience and push the customer towards digital channels." },
    { svg: IC.staff, title: "Staffing in the dark", desc: "You assign tellers and advisers by habit or outdated data. In off-peak hours there's too much staff and, during footfall peaks, too few to meet demand." },
    { svg: IC.bars, title: "You don't know the real use of each office", desc: "You decide hours, closures or refurbishments without objective data on each branch's traffic. Without this information, it's hard to justify any investment or adjustment to management." },
    { svg: IC.shield, title: "Privacy as an essential requirement", desc: "The financial sector demands solutions that don't identify people. Any analytics system must respect GDPR and exclude the use of biometric data by design." },
  ],
  capsTitle: "Everything Flame measures and activates in your branch",
  capsSub: "Eight Flame capabilities to optimise each branch and run your whole network using existing CCTV, without biometrics, without identifying anyone and fully GDPR-compliant.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.staff, title: "Optimise queues and staffing", desc: "Cross-reference the real footfall of each slot with the available staff to size tellers and advisers. Reinforce the busiest moments, cut staff in off-peak hours and avoid waits without over-sizing the team." },
    { span: 5, svg: IC.people, title: "Footfall and people flow", desc: "Measure entries, exits and traffic across the different zones of each branch. Identify the busiest and quietest slots to plan the office's operations with real data." },
    { span: 7, svg: IC.wifi, title: "WiFi for customers and a secure corporate network", desc: "Offer WiFi to customers through a captive portal and provide secure corporate networks for employees. Turn the connection into a channel to inform about products and services while the customer waits or is being served at the office." },
    { span: 5, svg: IC.activity, title: "Real-time occupancy", desc: "Check how many people are in each zone of the office and control the occupancy of the waiting and personal-service areas. Anticipate saturation before it hurts the customer experience." },
    { span: 6, svg: IC.cart, title: "Conversion and service usage", desc: "Discover what share of visitors uses personal service, consults an adviser or goes to the ATM. Identify the most in-demand services at each office and allocate resources by their real use." },
    { span: 6, svg: IC.heatmap, title: "Behaviour and heatmaps", desc: "Use heatmaps to visualise the waiting, self-service and personal-service areas. Detect concentrations, bottlenecks and underused spaces to improve each office's layout." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.bars, title: "Data for operations and network", desc: "Compare all your branches with the same objective indicators. Use each office's real data to justify hours, adjust staffing and make decisions on closures or refurbishments without relying on estimates." },
    { span: 5, svg: IC.clock, title: "Real-time queue management", desc: "Monitor queue length at the counter, customer service and advisers, and get alerts when the wait exceeds the set limit. React before the experience deteriorates or the customer leaves the office." },
  ],
  casesTitle: "Banks and institutions that already manage with data",
  casesSub: "Large distributed networks that measure footfall, queues and the real use of each point with Flame.",
  caseStudies: pickCases(["repsol", "multiopticas", "afflelou"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [1, 5, 7], faqs: [],
  ctaStripBold: "Fewer waits, better team sizing, network under control.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every challenge in your branch network",
  useCasesSub: "Queues, occupancy, footfall, behaviour, service usage or WiFi: whatever your branch's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure each branch's footfall by time slot to plan operations with real data."),
    uc("colas", "Control waits at the counter, personal service and advisers, with alerts when the limit is exceeded."),
    uc("ocupacion", "Check the occupancy of waiting and service areas in real time and anticipate saturation."),
    uc("comportamiento", "Heatmaps of waiting, self-service and personal-service areas to improve the layout."),
    uc("conversion", "Discover which services each visitor uses (counter, adviser, ATM) to allocate resources by demand."),
    uc("wifiCorp", "Guest WiFi with a captive portal and secure corporate networks for branch employees."),
  ],
};

// ==================== TRANSPORT AND AIRPORTS ====================
export const TRANSPORTE_CFG_EN: SectorConfig = {
  metaTitle: "Transport and airports · Flame Analytics", metaDescription: "Passenger flows, occupancy and queues in airports and stations.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Transport-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for transport and airports",
  heroSub: "Flame turns your terminal's cameras into useful data on passenger flows, occupancy, queues and the use of each zone, and offers WiFi so travellers stay connected throughout their time in the venue. Analytics for airports and stations with artificial intelligence, no biometrics and GDPR-compliant, to anticipate crowds, plan staff and optimise the commercial area with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your terminal.",
  painPointsIntro: "Every rush hour tests operations: thousands of passengers converge at the same points, queues grow without warning and decisions are made without information. These are the problems Flame solves with real-time data.",
  painPoints: [
    { svg: IC.clock, title: "Queues that damage the user experience", desc: "Waits at security, check-in and boarding raise complaints and the risk of missed journeys. Without real data, you can't open new positions or adjust staff in time." },
    { svg: IC.activity, title: "Crowds that catch you off guard", desc: "Passengers concentrate before you can react. Managing access and shifts without data causes platforms and halls to saturate just when you need more control." },
    { svg: IC.bars, title: "You don't know the traffic of commercial areas", desc: "Without knowing how many people pass each shop, restaurant or car park, you can't optimise the offer or justify rents to operators. The venue's commercial potential goes to waste." },
    { svg: IC.wifi, title: "Passengers wait with no connectivity", desc: "Travellers spend long waits in the terminal and want to stay connected. Without easy, reliable WiFi, their experience suffers and you lose a direct channel to inform them about incidents, delays and services." },
  ],
  capsTitle: "Everything Flame measures and activates in your terminal",
  capsSub: "Eight Flame capabilities to optimise airports, stations and interchanges using the existing camera infrastructure, without identifying anyone and fully GDPR-compliant.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.wifi, title: "WiFi for passengers", desc: "Offer free WiFi so travellers stay connected throughout their time in the venue. The captive portal also becomes a channel to inform about incidents, delays and services, and provides aggregated data on network use, without identifying anyone." },
    { span: 5, svg: IC.shield, title: "Pedestrian flows, crowd management and safety", desc: "Analyse the occupancy and flows of each zone to anticipate crowds before they form. Plan access, staff and reinforcements during footfall peaks and improve safety in real time." },
    { span: 6, svg: IC.people, title: "Passenger footfall and flow", desc: "Measure entries and exits and analyse traffic by terminal, entrance and platform. Discover how many passengers move through each point and at what times to plan operations with real data." },
    { span: 6, svg: IC.activity, title: "Real-time occupancy", desc: "Check the occupancy of waiting rooms, concourses and platforms and get alerts when a zone approaches its limit. Act before saturation affects safety or the passenger experience." },
    { span: 5, svg: IC.heatmap, title: "Behaviour and heatmaps", desc: "Visualise how passengers move and identify the points that slow transit. Measure travel times between key zones to improve signage and optimise circulation flows." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg", svg: IC.clock, title: "Queue management and restroom cleaning", desc: "Measure waits at security, check-in, ticket offices and boarding to open new positions before queues grow. Also plan restroom cleaning by real use, not fixed schedules." },
    { span: 6, svg: IC.bars, title: "Use of zones and services", desc: "Analyse the traffic of VIP lounges, shops, restaurants and car parks. Identify which spaces perform best and which are underused to optimise the offer and make decisions on the venue's operation." },
    { span: 6, svg: IC.share, title: "Data for operations and commercial revenue", desc: "Plan cleaning, staff and energy based on the real use of each space. Cut overspend and use each unit's traffic to value spaces and justify rents with objective data." },
  ],
  casesTitle: "Large venues that already manage with data",
  casesSub: "Distributed networks and high-footfall spaces that use Flame to control traffic, cut queues and know the real use of each zone.",
  caseStudies: pickCases(["repsol", "caixaforum", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 4, 8], faqs: [],
  ctaStripBold: "Flows, occupancy and queues under control in real time.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every challenge in your terminal",
  useCasesSub: "Passenger flows, occupancy, queues, restrooms, behaviour or WiFi: whatever your terminal's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure passenger traffic by terminal, entrance and platform, and when it concentrates."),
    uc("ocupacion", "Control the occupancy of waiting rooms, concourses and platforms in real time, with alerts."),
    uc("colas", "Measure waits at security, check-in and boarding to open positions before they grow."),
    uc("comportamiento", "Analyse paths and times between zones to improve signage and circulation."),
    uc("aseos", "Plan restroom cleaning by real use, not fixed schedules."),
    uc("wifiInv", "Offer WiFi via captive portal and turn it into a channel for incident, delay and service notices."),
  ],
};

// ======================= SHOPPING MALLS =======================
export const CENTROS_CFG_EN: SectorConfig = {
  metaTitle: "Shopping malls · Flame Analytics", metaDescription: "Tenant-mix optimisation and customer experience.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg", heroBgPosition: "center center",
  heroTitle: "Data intelligence for shopping malls",
  heroSub: "Flame turns the cameras you already have in your mall into actionable data: footfall, occupancy, conversion and visitor behaviour. Shopping-mall analytics with artificial intelligence, no biometrics and fully GDPR-compliant, to manage the tenant mix, operations and experience with real data.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "The day-to-day of your data.",
  painPointsIntro: "Before we talk about a platform, let's talk about what you already deal with every week running your mall.",
  painPoints: [
    { svg: IC.shield, title: "You decide on intuition, not data", desc: "The tenant mix and leasing strategy are decided without really seeing how your visitor behaves inside the mall." },
    { svg: IC.clock, title: "You see occupancy when it's already too late", desc: "Without real-time visibility by floor and zone, saturation is detected when it's already a problem, and your tenants have no data to rely on." },
    { svg: IC.door, title: "You lose the visitor at the door", desc: "The moment they leave the mall, you have no way to reach them again or turn that visit into a lasting relationship." },
    { svg: IC.grid, title: "You can't compare your malls with each other", desc: "Each mall in the portfolio is managed on its own, with no shared dashboard to compare real performance or justify strategic and management decisions." },
  ],
  capsTitle: "Everything Flame measures and activates in your mall",
  capsSub: "From footfall to loyalty: eight real capabilities to run your shopping mall with data.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.people, title: "Footfall and visitor flow", desc: "Accurately count entries and exits of the mall and each access, and understand how traffic spreads across floors and zones. Compare days and time slots and measure campaign performance to identify your busiest hours and days." },
    { span: 5, svg: IC.activity, title: "Real-time occupancy", desc: "Know the real-time occupancy of the whole mall and each zone, with automatic alerts when capacity thresholds are exceeded. Anticipate saturation at peaks and events and improve management (cleaning, marketing, tenant mix or security) with data." },
    { span: 6, svg: IC.cart, title: "Conversion (visit to purchase)", desc: "Cross-reference visitor traffic with your sales systems (POS, ERP…) to know the real conversion rate of each unit and the whole mall. Discover which zones and campaigns really convert and stop deciding on intuition." },
    { span: 6, svg: IC.heatmap, title: "Behaviour and heatmaps", desc: "Discover the most common paths, dwell time by zone and the mall's heatmaps. Understand how the visitor really moves to optimise layout, signage and the placement of each brand." },
    { span: 5, svg: IC.wifi, title: "Capture and loyalty via WiFi", desc: "Turn visitor WiFi into capture: captive portals, personalised campaigns and a connection with your CRM (Mailchimp, Salesforce, HubSpot…) to build loyalty beyond the visit." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg", svg: IC.building, title: "Rents and tenant mix", desc: "Traffic data by unit and zone to value each space by its real performance, justify rents and decide the tenant mix with criteria. Mall analytics as a revenue lever." },
    { span: 6, svg: IC.clock, title: "Queue and restroom management", desc: "Measure wait times and abandonment at checkouts, and schedule restroom cleaning by real use, not a fixed timetable. Improve the experience exactly at the points that most damage it." },
    { span: 6, svg: IC.share, title: "Data for tenants and operations", desc: "Share real-time visitor data with your tenants and strengthen the relationship with data that helps them sell. Plan cleaning, maintenance and security based on the mall's real flow." },
  ],
  casesTitle: "Brands already turning their footfall into decisions",
  casesSub: "Retailers, chains and large spaces that measure with Flame what used to be decided on intuition.",
  caseStudies: pickCases(["multiopticas", "afflelou", "caixaforum"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 1, 7], faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Turn footfall into value for tenants and visitors.", ctaStripLight: "Personalised demo in 20 minutes.",  useCasesTitle: "A use case for every challenge in your mall",
  useCasesSub: "Footfall, conversion, occupancy, queues, behaviour or WiFi: whatever your mall's priority, Flame already has a use case to solve it.",
  useCases: [
    uc("conteo", "Measure the mall's total footfall and by entrance, and compare days, time slots and campaigns."),
    uc("conversion", "Cross-reference traffic with tenant sales to know the real conversion by zone and operator."),
    uc("comportamiento", "Heatmaps and paths to optimise the tenant mix, signage and common areas."),
    uc("ocupacion", "Control real-time occupancy by zone, with alerts for events and peak hours."),
    uc("colas", "Detect waits at entrances, car parks and food-court areas to improve the experience."),
    uc("wifiInv", "Turn the mall's WiFi into contact capture and communication with the visitor."),
  ],
};
