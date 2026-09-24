// LANDING DE CAMPAÑA (no SEO): aterrizaje de la secuencia de email "Campaña CC Europa"
// (automatización 36 de ActiveCampaign). Solo WiFi/Connect, con un bloque final que
// enseña el resto de casos de uso de Flame. Va con noindex y fuera del sitemap.
import { SectorConfig } from "./page-content";
import { IC } from "./sector-preview-configs";
import { uc } from "./sector-configs-en";

export const WIFI_MALLS_CFG_EN: SectorConfig = {
  metaTitle: "Guest WiFi for Shopping Malls · Flame Analytics",
  metaDescription: "Turn the WiFi your mall already has into a visitor database and a marketing channel. No new hardware, GDPR compliant.",

  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg",
  heroBgPosition: "center center",
  heroTitle: "Your mall's WiFi already knows who visits.",
  heroTitleHl: "Now make it tell you.",
  heroSub:
    "Flame Connect turns the WiFi network you already have into a visitor database and a marketing channel: a branded captive portal, consent-based data capture and real-time campaigns. No new hardware, no rip and replace, and fully GDPR compliant.",
  heroBullets: ["No new hardware", "100% GDPR", "Works with your current network", "CRM, ERP and BI ready"],
  sections: [],

  // ---------- Los problemas del director de centro ----------
  painPointsTitle: "The day-to-day of your visitor data.",
  painPointsIntro:
    "Before we talk about a platform, let's talk about what you already deal with every week running your mall.",
  painPoints: [
    {
      svg: IC.door,
      title: "You lose the visitor at the door",
      desc: "Thousands of people walk through your mall every day and leave no trace. The moment they step out, you have no way to reach them again.",
    },
    {
      svg: IC.share,
      title: "Your tenants own the shopper, you don't",
      desc: "The relationship with the end customer sits with each operator. You manage the building, but you can't talk to the people who fill it.",
    },
    {
      svg: IC.people,
      title: "Your database barely grows",
      desc: "Campaigns, events and loyalty schemes all depend on a contact list that hardly moves, while buying audiences gets more expensive every year.",
    },
    {
      svg: IC.bars,
      title: "You can't prove footfall when it matters",
      desc: "In leasing and renewal negotiations you defend rents with estimates instead of the real visitor trends and profile.",
    },
  ],

  // ---------- Todo lo que hace el WiFi conectado a Flame ----------
  capsTitle: "Everything your WiFi can do once it runs on Flame",
  capsSub: "One network you are already paying for. Ten ways to turn it into data, contacts and campaigns.",
  capabilities: [
    {
      span: 7,
      featured: true,
      img: "/wp-content/uploads/2026/01/guest_wifi-2-scaled-1.png",
      svg: IC.wifi,
      title: "A captive portal that looks like your mall",
      desc: "Design the login experience with your own brand: email or social login, sponsor slots, promotions, consent management and multi-language detection. The first screen every visitor sees becomes a marketing asset instead of a technical form.",
    },
    {
      span: 5,
      svg: IC.people,
      title: "Consent-based data capture",
      desc: "Build your own first-party database: contact details, language, profile and visit history, with granular consent given by the visitor. Typical capture rates run between 25% and 40% when the portal offers a clear incentive.",
    },
    {
      span: 6,
      svg: IC.target,
      title: "Campaigns by email, SMS and in-portal",
      desc: "Automated workflows triggered by behaviour, visit frequency or location. Reach the visitor while they are still inside the mall, or bring them back weeks later, from the same platform.",
    },
    {
      span: 6,
      svg: IC.heatmap,
      title: "The profile of who really visits you",
      desc: "Frequency, recency, dwell time, first visit or returning, preferred zone and time slot, plus anonymous age and gender distribution. The real profile of your visitor, not an estimate from a sample.",
    },
    {
      span: 5,
      svg: IC.grid,
      title: "One portal for your whole portfolio",
      desc: "Manage every mall from a single cloud platform, with content and design customised per site. From one centre to hundreds, without a team on the ground at each location.",
    },
    {
      span: 7,
      featured: true,
      img: "/wp-content/uploads/2026/01/Guest_wifi.png",
      svg: IC.bars,
      title: "Reporting that answers to the board",
      desc: "Unique connections, captured contacts, dwell time, demographics, returning visitors and conversion per campaign. The numbers you need to show what the mall's own channel is worth.",
    },
    {
      span: 6,
      svg: IC.share,
      title: "It plugs into what you already use",
      desc: "Sync profiles and consents with your CRM (HubSpot, Salesforce, Brevo), your ERP or PMS and your BI tools (Power BI, Looker). Open APIs and webhooks for everything else, so the data lands where your team already works.",
    },
    {
      span: 6,
      svg: IC.activity,
      title: "Inside your own app, with an SDK",
      desc: "Embed WiFi access in your mall's app with the iOS and Android SDK: returning visitors are recognised automatically, connect without friction and can be activated in real time.",
    },
    {
      span: 6,
      svg: IC.shield,
      title: "Consent and GDPR, handled",
      desc: "Granular purposes, optional double opt-in, automatic deletion on request and a full audit trail. No biometrics and no personal data processing beyond what the visitor agreed to.",
    },
    {
      span: 6,
      svg: IC.building,
      title: "A new asset for your tenants",
      desc: "Offer your operators visibility on the portal, segmented campaigns to the mall's audience and integration with your digital signage. WiFi stops being a cost line and starts being a service you can monetise.",
    },
  ],

  // ---------- Otros casos de uso (el bloque que pide JR) ----------
  useCasesEyebrow: "Beyond WiFi",
  useCasesTitle: "Other use cases you can work on with Flame",
  useCasesSub:
    "WiFi is where the relationship with the visitor starts. The same platform measures what happens inside your mall, using the cameras you already have.",
  useCases: [
    uc("conteo", "Measure total footfall and footfall per entrance, and compare days, time slots and campaigns."),
    uc("conversion", "Cross traffic with tenant sales to know the real conversion by zone and operator."),
    uc("comportamiento", "Heatmaps and paths to optimise tenant mix, signage and common areas."),
    uc("ocupacion", "Control occupancy in real time by zone, with alerts for events and peak hours."),
    uc("colas", "Detect waiting times at entrances, car parks and the food court."),
    uc("aseos", "Schedule restroom cleaning by real use instead of a fixed timetable."),
  ],
  showUseCases: true,
  useCasesLayout: "numbers",
  useCasesBeforeCases: true,
  hideProducts: true,

  // ---------- Prueba ----------
  casesTitle: "They already turn their WiFi into a relationship with the visitor",
  casesSub: "Shopping centres and operators that stopped treating connectivity as a utility.",
  // Los tres casos de CENTRO COMERCIAL con Connect/Marketing WiFi mejor valorados
  // en el CMS (data/case-studies-tags.json y su gemelo en Storage), con su artículo
  // en inglés: CBRE (prioridad 5), Merlin (4) y El Ingenio (3).
  caseStudies: [
    {
      href: "https://www.flameanalytics.com/en/case-study-enhancing-customer-loyalty-in-shopping-centers-with-cbre-spain-and-connect-mall-edition/",
      img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/09/cbre-en-mu2dqx8k.png",
      title: "CBRE Spain builds visitor loyalty with Connect Mall Edition",
      excerpt:
        "CBRE Spain rolls out Connect across the shopping centres it manages to turn WiFi into loyalty and a better visitor experience.",
      date: "8 November 2024",
    },
    {
      href: "https://www.flameanalytics.com/en/driving-digital-transformation-flame-analytics-success-story-with-merlin-properties/",
      img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/09/merlin-properties-es-2-mu2egfci.png",
      title: "Driving digital transformation with Merlin Properties",
      excerpt:
        "Merlin Properties leans on Flame to turn the connectivity of its shopping centres into visitor knowledge and digital transformation.",
      date: "3 June 2024",
    },
    {
      href: "https://www.flameanalytics.com/en/success-in-el-ingenio-recognition-for-the-igenio-project-of-flame-analytics/",
      img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/09/el-ingenio-en-mu2ih1e9.png",
      title: "El Ingenio: the iGenio project earns industry recognition",
      excerpt:
        "El Ingenio shopping centre uses data and connectivity to stand out, and its iGenio project with Flame is recognised by the industry.",
      date: "3 May 2024",
    },
  ],

  productsTitle: "", productsTitleHl: "", productsSub: "", products: [],
  // Los testimonios de TESTIMONIALS_ALL están en español: en una landing inglesa se ocultan.
  testimonialsIdx: [],
  hideTestimonials: true,

  // ---------- Las dos objeciones reales: red y RGPD ----------
  faqs: [
    { q: "Is it compatible with the WiFi infrastructure we already have?", a: "Yes. Flame Connect works with the main network vendors (Cisco, Aruba, Ruckus, Cambium, Ubiquiti and others) through standard RADIUS, WPA Enterprise or HTTP redirect protocols. There is no need to replace access points or add hardware." },
    { q: "What capture rate can we expect?", a: "With a well designed portal and a clear incentive (free WiFi, a coupon, exclusive content), capture rates typically run between 25% and 40%. Without an incentive, between 8% and 15%." },
    { q: "How is GDPR consent handled?", a: "Consent is granular and given in the portal: the visitor chooses what to share and for which purposes. Double opt-in is optional, and the right to be forgotten is handled with automatic deletion on request." },
    { q: "Does it work in several languages?", a: "Yes. The portal detects the device language and supports configurable translation into more than 20 languages, with copy localised per language." },
    { q: "What about MAC randomisation?", a: "Flame is optimised for environments with MAC randomisation (iOS 14 and later, Android 11 and later). Returning visitors are identified through the registered email and behavioural patterns, not the device address." },
    { q: "How long does it take to go live?", a: "The portal and the integration with your network are configured without civil works or new devices. The timeline depends on your IT team and your network vendor, and we agree it in the first call." },
  ],

  ctaStripBold: "Your WiFi is already installed and already paid for.",
  ctaStripLight: "Book a 15-minute call and see what it can give back.",
};
