export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-do-dental-implants-cost",
    title: "How Much Do Dental Implants Really Cost?",
    description:
      "A breakdown of what drives dental implant pricing — implant tier, location, number of teeth, and the add-ons clinics often quote separately.",
    category: "Cost Guide",
    publishedAt: "2026-02-10",
    updatedAt: "2026-06-18",
    readingMinutes: 7,
    content: [
      {
        type: "p",
        text: "A single dental implant is rarely a single line item on a quote. The final number a clinic gives you is usually the sum of several separate fees: the implant post itself, the abutment that connects it to the crown, the crown, the surgical placement fee, and often imaging or bone grafting if your jaw needs preparation first. Understanding each piece makes it much easier to compare two quotes that look wildly different at first glance.",
      },
      { type: "h2", text: "The main cost drivers" },
      {
        type: "ul",
        items: [
          "Implant brand and material tier — economy, standard, and premium titanium or zirconia systems price very differently",
          "Location — country, and even city within the same country, changes clinic overhead and therefore price",
          "Number of implants and whether you need a full-arch solution like All-on-4 or All-on-6",
          "Bone grafting or sinus lifts if you don't have enough bone density to support an implant yet",
          "Sedation type — local anesthesia is usually included, but IV sedation or general anesthesia is often billed separately",
        ],
      },
      { type: "h2", text: "Why quotes vary so much between clinics" },
      {
        type: "p",
        text: "Two clinics quoting the same patient for the same tooth can differ by thousands of dollars, and it's rarely because one is a scam. Differences usually come down to which implant brand is used, whether the quote is itemized or bundled, whether follow-up visits are included, and simple cost-of-living differences between regions. This is exactly why we built a calculator that shows its itemized reasoning rather than a single number — so you can see which specific input is driving the difference.",
      },
      { type: "h2", text: "Getting a real number for your situation" },
      {
        type: "p",
        text: "Use our calculator to get a starting itemized estimate based on your location, treatment type, and implant preference, then bring that breakdown into your consultation as a benchmark for comparing the clinic's actual written quote.",
      },
    ],
  },
  {
    slug: "single-implant-vs-all-on-4",
    title: "Single Tooth Implant vs. All-on-4: Cost and Timeline Compared",
    description:
      "How single-tooth implants and full-arch All-on-4 treatment differ in upfront cost, number of appointments, and total treatment time.",
    category: "Treatment Comparison",
    publishedAt: "2026-03-04",
    updatedAt: "2026-06-18",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "If you're missing just one tooth, a single implant is usually the simpler and cheaper path. If you're missing most or all of the teeth in an arch, replacing each one individually stops making financial or clinical sense — that's where full-arch solutions like All-on-4 or All-on-6 come in.",
      },
      { type: "h2", text: "Single tooth implant" },
      {
        type: "ul",
        items: [
          "Typically 1 implant post, 1 abutment, 1 crown",
          "Usually 2-3 appointments spread over a few months to allow osseointegration (the implant fusing with your jawbone)",
          "Lower upfront cost, since it's a single unit",
        ],
      },
      { type: "h2", text: "All-on-4 / All-on-6" },
      {
        type: "ul",
        items: [
          "4-6 implants support an entire arch of prosthetic teeth, rather than one implant per missing tooth",
          "Often includes a temporary prosthesis on the same day as surgery, with the final prosthesis fitted months later",
          "Higher total upfront cost than a single implant, but typically far lower than replacing every tooth individually",
          "Total treatment time is often longer overall due to healing and fitting stages, even though the surgical day itself is a single visit",
        ],
      },
      { type: "h2", text: "Which one is right for you" },
      {
        type: "p",
        text: "This depends on how many teeth you're missing, your bone density, and your budget — and it's a decision that requires an in-person exam, not a calculator. Our tool lets you model both scenarios side by side using the treatment-type selector, and the Compare Estimates page lets you save both to look at next to each other.",
      },
    ],
  },
  {
    slug: "does-insurance-cover-dental-implants",
    title: "Does Dental Insurance Cover Implants? What to Expect",
    description:
      "Why implants are treated differently from routine dental care by most insurance plans, and what coverage patterns are common.",
    category: "Insurance",
    publishedAt: "2026-04-02",
    updatedAt: "2026-06-18",
    readingMinutes: 5,
    content: [
      {
        type: "p",
        text: "Many dental insurance plans historically classified implants as a cosmetic or elective procedure, which meant little or no coverage. That's changed somewhat as implants have become a standard-of-care replacement for missing teeth, but coverage still varies enormously between insurers, plans, and even specific procedure codes within the same plan.",
      },
      { type: "h2", text: "Common coverage patterns" },
      {
        type: "ul",
        items: [
          "Some plans cover the crown portion but exclude the implant post and surgical placement",
          "Many plans apply an annual maximum benefit that implants can quickly exceed on their own",
          "Waiting periods of 6-12 months are common before major-procedure coverage like implants kicks in",
          "Medical insurance (rather than dental) may cover implants if tooth loss resulted from an accident or medically necessary extraction",
        ],
      },
      { type: "h2", text: "What to do before treatment" },
      {
        type: "p",
        text: "Always request a pre-treatment estimate directly from your insurer using the specific procedure codes your dentist plans to bill, rather than assuming a percentage. Our calculator's insurance step lets you enter your actual coverage percentage and annual maximum so the estimate reflects your specific plan rather than a generic average.",
      },
    ],
  },
  {
    slug: "financing-dental-implants",
    title: "Financing Dental Implants: Payment Plans, APR, and What to Watch For",
    description:
      "How dental implant financing typically works, what APR ranges to expect, and questions worth asking before you sign.",
    category: "Financing",
    publishedAt: "2026-05-14",
    updatedAt: "2026-06-18",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Because implants are often paid out of pocket or only partially covered by insurance, financing is common — through the clinic's in-house payment plan, a third-party medical financing company, or a general personal loan or credit card.",
      },
      { type: "h2", text: "Questions worth asking before you commit" },
      {
        type: "ul",
        items: [
          "Is the rate fixed or promotional (e.g., 0% for 12 months, then a much higher deferred-interest rate applied retroactively)?",
          "Is there a penalty for paying the loan off early?",
          "What happens if a payment is missed — does the promotional rate get revoked?",
          "Does the total cost include any origination or processing fee on top of the treatment price?",
        ],
      },
      { type: "h2", text: "Modeling your monthly payment" },
      {
        type: "p",
        text: "Our calculator's financing step lets you enter a term length and APR to see an estimated monthly payment against your specific treatment cost. It's a planning tool, not a loan offer — always confirm the actual terms in writing directly from the lender before signing.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
