export interface Category {
  slug: string;
  /** Short name, e.g. "Developer Tools". */
  name: string;
  /** Noun used in "Best … tools" headings. */
  plural: string;
  intro: string;
  /** What to look at when comparing tools of this kind — feeds the page's FAQ. */
  criteria: string;
}

// Order = display order. `other` is last and is never shown as a hub.
export const categories: Category[] = [
  {
    slug: "ai-image-video",
    name: "AI Image & Video",
    plural: "AI image and video tools",
    intro:
      "AI image and video tools turn prompts, photos or scripts into visuals: headshots, product shots, short videos, avatars and voice-overs. Most work in the browser and charge by credits, so a free tier is the easiest way to judge output quality before paying.",
    criteria:
      "Compare output quality on your own inputs, the models offered, export resolution, watermarks on the free plan, commercial-use rights and how credits are counted.",
  },
  {
    slug: "ai-writing",
    name: "AI Writing",
    plural: "AI writing tools",
    intro:
      "AI writing tools draft, rewrite, translate or humanize text: blog posts, emails, scripts, podcasts and social copy. They save the most time when they keep your tone and let you edit before publishing.",
    criteria:
      "Check how well it keeps your voice, which languages it handles, whether it cites sources, and how much editing its drafts still need.",
  },
  {
    slug: "ai-agents",
    name: "AI Agents & Assistants",
    plural: "AI agents and assistants",
    intro:
      "AI agents and assistants handle multi-step work on your behalf: answering questions, running workflows across apps, browsing, or chatting with customers. The useful ones connect to the tools you already use and let you review what they do.",
    criteria:
      "Look at the integrations available, how actions are logged and approved, which models power it, data handling, and pricing per run or per seat.",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    plural: "developer tools",
    intro:
      "Developer tools cover APIs, hosting, MCP servers, testing, boilerplates and everything that helps you ship code faster. Many are open source or have a generous free tier for side projects.",
    criteria:
      "Weigh documentation quality, SDK and language support, self-hosting options, rate limits, and how pricing scales with usage.",
  },
  {
    slug: "no-code",
    name: "No-Code & Builders",
    plural: "no-code and website builders",
    intro:
      "No-code and vibe-coding builders let you create websites, apps, forms and workflows without writing code, or by describing them to an AI. They are the fastest path from idea to a live page.",
    criteria:
      "Check whether you can export or own the code, custom domain support, SEO controls, integrations, and limits on the free plan.",
  },
  {
    slug: "marketing-seo",
    name: "Marketing & SEO",
    plural: "marketing and SEO tools",
    intro:
      "Marketing and SEO tools help people find your product: keyword research, backlinks, AI search visibility, ads, email campaigns and lead generation. The right one depends on which channel already brings you customers.",
    criteria:
      "Compare data sources and freshness, tracking of AI search engines, reporting, integrations with your CMS or CRM, and cost per tracked keyword or contact.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    plural: "social media tools",
    intro:
      "Social media tools schedule posts, analyze performance, download or clean up content and manage creator pages across X, Instagram, TikTok, LinkedIn, Threads and Bluesky.",
    criteria:
      "Check which networks are supported, whether it uses official APIs (safer for your account), analytics depth, team features and post limits.",
  },
  {
    slug: "sales-crm",
    name: "Sales & CRM",
    plural: "sales and CRM tools",
    intro:
      "Sales and CRM tools keep track of leads, deals and conversations, and automate outreach and follow-ups. For small teams, a simple CRM that people actually update beats a complex one.",
    criteria:
      "Look at pipeline customization, email and calendar sync, automation, enrichment data, reporting and per-seat pricing.",
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    plural: "customer support tools",
    intro:
      "Customer support tools bring help desk, live chat, AI answers and review management into one place, so customers get answers faster and nothing falls through the cracks.",
    criteria:
      "Compare channels covered (email, chat, WhatsApp), AI answer accuracy, human handover, knowledge-base features and pricing per agent or per resolution.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    plural: "productivity tools",
    intro:
      "Productivity tools help you organize notes, tasks, projects, files and time, alone or as a team. The best one is the one you open every day without friction.",
    criteria:
      "Check offline and mobile support, collaboration features, import/export, privacy and whether the free plan is enough for daily use.",
  },
  {
    slug: "design",
    name: "Design",
    plural: "design tools",
    intro:
      "Design tools cover UI and UX, logos, mockups, screenshots, fonts, and interior or architectural rendering. Many now add AI to go from a rough idea to a polished visual in minutes.",
    criteria:
      "Compare export formats, brand kit support, collaboration, AI features, and licensing of generated assets.",
  },
  {
    slug: "finance",
    name: "Finance",
    plural: "finance tools",
    intro:
      "Finance tools handle invoicing, accounting, payments, budgeting, investing, tax and crypto. They are worth choosing carefully: switching later means migrating your records.",
    criteria:
      "Check supported countries and currencies, bank and payment integrations, export for your accountant, security and fees per transaction.",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    plural: "e-commerce tools",
    intro:
      "E-commerce tools help you sell online: stores, marketplaces, Shopify and Amazon seller apps, KDP publishing and product content.",
    criteria:
      "Look at platform compatibility, impact on store speed, analytics, and whether pricing is a flat fee or a percentage of sales.",
  },
  {
    slug: "hr-recruiting",
    name: "HR & Careers",
    plural: "HR and career tools",
    intro:
      "HR and career tools cover both sides of hiring: job search, resumes and interview prep for candidates, and recruiting, payroll and people management for companies.",
    criteria:
      "Check data privacy, integrations with job boards or payroll, compliance in your country and pricing per employee or per hire.",
  },
  {
    slug: "education",
    name: "Education",
    plural: "education tools",
    intro:
      "Education tools help people learn: languages, courses, homework help, teacher planning, kids' content and reading. AI tutors are making personal practice much cheaper.",
    criteria:
      "Compare age range, accuracy of explanations, progress tracking, offline use and whether content is ad-free.",
  },
  {
    slug: "health",
    name: "Health & Wellness",
    plural: "health and wellness tools",
    intro:
      "Health and wellness tools cover fitness, nutrition, mental health and medical information. They support, but never replace, advice from a professional.",
    criteria:
      "Check where the information comes from, privacy of health data, and whether a clinician is involved where it matters.",
  },
  {
    slug: "calculators-utilities",
    name: "Calculators & Utilities",
    plural: "free calculators and online utilities",
    intro:
      "Single-purpose online utilities do one job well: calculators, converters, generators and printables that run in the browser, usually free and without sign-up.",
    criteria:
      "Prefer tools that show their formula, run locally in your browser, work on mobile and don't require an account.",
  },
  {
    slug: "directories",
    name: "Directories & Launch",
    plural: "directories and launch platforms",
    intro:
      "Directories and launch platforms help makers get their first users and backlinks. Listing on a handful of relevant, indexed directories is still one of the cheapest ways to start ranking.",
    criteria:
      "Check whether listings are indexed, if the backlink is dofollow, the audience size, and whether paid placement is worth it compared to free listing.",
  },
  {
    slug: "security-privacy",
    name: "Security & Privacy",
    plural: "security and privacy tools",
    intro:
      "Security and privacy tools protect accounts, data and traffic: bot detection, compliance, certificates, identity and privacy controls.",
    criteria:
      "Look at certifications, where data is stored, false-positive rates for detection tools, and how incidents are reported.",
  },
  {
    slug: "travel-lifestyle",
    name: "Travel & Lifestyle",
    plural: "travel and lifestyle apps",
    intro:
      "Travel and lifestyle apps help with trips, bookings, events, music, games, dating, home and everyday life.",
    criteria: "Check availability in your country, hidden fees, offline access and how your personal data is used.",
  },
  {
    slug: "business-services",
    name: "Business Services",
    plural: "business software and services",
    intro:
      "Business software and services cover operations: IT, field service, maintenance, real estate, legal and the agencies that run them for you.",
    criteria:
      "Compare onboarding effort, support quality, integrations with your existing stack and contract length.",
  },
  {
    slug: "other",
    name: "Other",
    plural: "other products",
    intro: "Products that don't fit a single category.",
    criteria: "Try the free plan or demo before committing.",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
export const categoryHref = (slug: string) => `/category/${slug}`;
