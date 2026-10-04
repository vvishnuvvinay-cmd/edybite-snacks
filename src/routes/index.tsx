import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Leaf, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import heroAsset from "../assets/edible-cups-hero.jpg.asset.json";
import lifestyleAsset from "../assets/edible-cups-lifestyle.jpg.asset.json";
import packagingAsset from "../assets/edible-cups-packaging.jpg.asset.json";
import logoAsset from "../assets/edybite-logo.jpg.asset.json";
import greenerCupAsset from "../assets/edybite-greener-cup-tomorrow.png.asset.json";
import { Button } from "../components/Button";

const heroImage = heroAsset.url;
const lifestyleImage = lifestyleAsset.url;
const packagingImage = packagingAsset.url;
const logoImage = logoAsset.url;
const greenerCupImage = greenerCupAsset.url;

const metaDescription =
  "Natural edible tea and coffee cups for cafés, caterers and businesses in Bengaluru. Request a sample pack or a volume-based quote.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edybite | Edible Cups for Cafés in Bengaluru" },
      { name: "description", content: metaDescription },
      { property: "og:title", content: "Edybite | India's bite-sized swap for single-use cups" },
      { property: "og:description", content: metaDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const proofPoints = [
  "FSSAI-tested",
  "100% natural ingredients",
  "No plastic, no paper waste",
  "Lab-certified nutrition report",
];

const audiences = [
  "Specialty & sustainability-focused cafés",
  "Corporate offices & cafeterias",
  "Event planners & caterers",
  "Hotels & hospitality venues",
];

const faqs = [
  [
    "Are these cups really edible?",
    "Yes — made from FSSAI-classified bakery-category ingredients including wheat flour, corn flour, soy protein and tapioca starch. They're safe to eat after use.",
  ],
  [
    "What if a customer doesn't want to eat it?",
    "The cup composts naturally and is safe as cattle feed, unlike plastic-lined paper cups.",
  ],
  [
    "What sizes do you offer?",
    "Currently 90ml and 110ml cups, ideal for tea, coffee and other hot beverages.",
  ],
  [
    "How do I place a bulk order?",
    "Send an enquiry through the form. We'll help you choose the right size and volume tier, starting with a sample pack if you'd like to trial first.",
  ],
  [
    "Is there a minimum order?",
    "Small trial packs are available. Contact us for current carton quantities and minimum order details.",
  ],
];

function DemoForm({ kind }: { kind: "quote" | "contact" }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const details = Array.from(fd.entries())
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join("\n");
    window.location.href = `mailto:info@edybite.com?subject=${encodeURIComponent("Edybite website enquiry")}&body=${encodeURIComponent(details)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-3xl">Enquiry received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thanks — we've received your enquiry and will get back to you soon.
        </p>
        <Button className="mt-6" type="button" variant="secondary" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <form className="grid gap-5 sm:grid-cols-2" onSubmit={submit}>
      <label className="text-sm font-semibold">
        Name
        <input required name="name" className={inputClass} placeholder="Your name" />
      </label>
      <label className="text-sm font-semibold">
        Business name
        <input required name="business" className={inputClass} placeholder="Café or company" />
      </label>
      <label className="text-sm font-semibold">
        City{kind === "quote" ? " area" : ""}
        <input required name="city" className={inputClass} placeholder="Bengaluru" />
      </label>
      {kind === "quote" ? (
        <label className="text-sm font-semibold">
          Cup size interested in
          <select required name="size" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a size
            </option>
            <option>90ml</option>
            <option>110ml</option>
            <option>Both sizes</option>
          </select>
        </label>
      ) : (
        <label className="text-sm font-semibold">
          Phone
          <input
            required
            type="tel"
            name="phone"
            className={inputClass}
            placeholder="Your phone number"
          />
        </label>
      )}
      {kind === "quote" ? (
        <label className="text-sm font-semibold">
          Estimated monthly volume
          <input required name="volume" className={inputClass} placeholder="e.g. 1,000 cups" />
        </label>
      ) : (
        <label className="text-sm font-semibold sm:col-span-2">
          Email
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            placeholder="you@business.com"
          />
        </label>
      )}
      {kind === "quote" ? (
        <label className="text-sm font-semibold">
          Phone or email
          <input
            required
            name="contact"
            className={inputClass}
            placeholder="How should we reach you?"
          />
        </label>
      ) : (
        <label className="text-sm font-semibold sm:col-span-2">
          Message
          <textarea
            required
            name="message"
            rows={4}
            className={inputClass}
            placeholder="Tell us about your requirements"
          />
        </label>
      )}
      <Button className="sm:col-span-2" type="submit">
        {kind === "quote" ? "Get a tailored quote" : "Request my sample"}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ["Why edible", "#why"],
    ["The cups", "#cups"],
    ["Packaging", "#packaging"],
    ["For business", "#business"],
    ["FAQ", "#faq"],
  ];

  return (
    <main className="overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Edybite home">
            <img
              src={logoImage}
              alt="Edybite logo"
              width={40}
              height={40}
              className="size-10 rounded-full"
            />
            <span className="font-display text-xl font-bold">Edybite</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Request a sample</a>
          </Button>
          <Button
            className="size-11 p-0 md:hidden"
            variant="secondary"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-border bg-background px-5 py-5 md:hidden"
            aria-label="Mobile navigation"
          >
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border py-3 font-semibold"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="relative min-h-[92svh] bg-secondary pt-18">
        <div className="mx-auto grid min-h-[calc(92svh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.04fr_.96fr] lg:px-8 lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-primary">
              <Leaf className="size-4" aria-hidden="true" /> Baked to be better
            </p>
            <h1 className="font-display text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl xl:text-8xl">
              India's bite-sized swap for single-use cups
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              100% natural, 100% edible tea cups — made from wheat, corn and tapioca starch. Drink
              your chai, then eat the cup. Zero waste, zero compromise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href="#contact">
                  Order for Your Cafe <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="#cups">
                  See the Cups <ArrowDown className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -left-5 top-10 hidden rounded-md bg-foreground px-4 py-3 text-background shadow-xl sm:block">
              <p className="text-xs font-bold uppercase">Serve. Sip. Snack.</p>
            </div>
            <img
              src={heroImage}
              alt="Stacked golden-brown edible cups with one filled with chai"
              width={1200}
              height={1504}
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-md object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 right-4 rounded-md bg-accent px-5 py-4 text-accent-foreground shadow-xl">
              <p className="font-display text-2xl font-bold">90ml + 110ml</p>
              <p className="text-xs font-semibold">Built for chai & coffee</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-5 py-5 text-xs font-bold uppercase lg:justify-between lg:px-8">
          {proofPoints.map((point) => (
            <span key={point} className="flex items-center gap-2">
              <Check className="size-4 text-accent" />
              {point}
            </span>
          ))}
        </div>
      </div>

      <section id="why" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Why edible cups</p>
          <div className="mt-4 grid gap-12 lg:grid-cols-2">
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              A tiny cup for a very big waste problem.
            </h2>
            <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
              <div>
                <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                  The problem with disposable cups
                </h3>
                <p>
                  Every cup of chai served in paper or plastic becomes landfill within minutes. In a
                  city serving lakhs of cups of tea and coffee a day, that's an enormous, invisible
                  waste problem — one that “biodegradable” paper cups, most of which are
                  plastic-lined, don't actually solve.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                  The edible alternative
                </h3>
                <p>
                  Our cups are baked from wheat flour, corn flour, soy protein and natural starch —
                  the same category of ingredients as a cracker or biscuit. Serve tea, coffee or ice
                  cream in it, then eat the cup or let it compost naturally. Either way, nothing
                  goes to landfill.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Independently lab-tested for nutrition and safety",
              "FSSAI-classified as a bakery product",
              "Zero bacterial contamination on testing",
              "Safe even as cattle feed if discarded",
            ].map((item, i) => (
              <div key={item} className="bg-background p-6">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <p className="mt-4 text-sm font-semibold leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cups" className="scroll-mt-20 bg-secondary px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our cup range</p>
              <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
                Two sizes. Endless second looks.
              </h2>
            </div>
            <p className="max-w-xl text-muted-foreground lg:justify-self-end">
              Golden-brown, food-safe and sturdy enough for hot liquids — without the lining, lid or
              landfill.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="group overflow-hidden rounded-md bg-background">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={heroImage}
                  alt="90ml edible chai cup"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="size-full object-cover object-right-bottom transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-4xl font-bold">90ml</h3>
                  <span className="text-xs font-bold uppercase text-primary">Quick serve</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Perfect for:</strong> chai, filter coffee, hot
                  chocolate and small ice cream servings. Ideal for cafés serving quick,
                  single-serve hot beverages.
                </p>
              </div>
            </article>
            <article className="group overflow-hidden rounded-md bg-background">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={lifestyleImage}
                  alt="110ml edible cups served with hot chai"
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-4xl font-bold">110ml</h3>
                  <span className="text-xs font-bold uppercase text-primary">Most popular</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Perfect for:</strong> standard tea or coffee
                  servings, milk and hot chocolate. Our most popular size for cafés and
                  quick-service outlets.
                </p>
              </div>
            </article>
          </div>
          <div className="mt-6 grid gap-6 rounded-md bg-foreground p-7 text-background lg:grid-cols-[.7fr_1.3fr] lg:p-10">
            <h3 className="font-display text-3xl font-bold">How it's made</h3>
            <p className="leading-relaxed text-background/70">
              Made from tapioca starch, wheat flour, corn flour, soy protein and a touch of sugar
              and salt — no chemical preservatives. Naturally golden-brown, food-safe and sturdy
              enough to hold hot liquids.
            </p>
          </div>
        </div>
      </section>

      <section id="packaging" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-md shadow-xl">
            <img
              src={packagingImage}
              alt="Edible cups packed in kraft cardboard tubes with paper lids inside a shipping carton"
              loading="lazy"
              width={1600}
              height={1008}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Packaging</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Packed to arrive perfect.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Your cups travel in sturdy kraft cardboard tubes, each sealed with a paper lid to keep
              them clean and protected — then nested snugly inside a shipping carton, just like the
              sample pack we send out.
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {[
                "Sealed kraft tubes with paper lids",
                "Protective carton for safe transit",
                "Sample packs ship the same way",
                "Contact us for current carton sizes",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-background p-5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm font-semibold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8">
              <a href="#contact">
                Get a Sample Pack <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="business" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">For businesses</p>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
              Give your customers something to talk about.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Whether you run a specialty café, cater weddings and corporate events, or manage an
              office cafeteria with sustainability goals — edible cups turn a routine cup of chai
              into a story your customers share. No extra waste bins, no plastic guilt, just a
              better cup.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-y border-border">
            {[
              [
                "01",
                "Sample it",
                "Request a trial pack with mixed 90ml and 110ml cups to test with your team and customers.",
              ],
              [
                "02",
                "Order in bulk",
                "Choose a carton size that fits your monthly volume, with better pricing at higher volumes.",
              ],
              [
                "03",
                "Recurring supply",
                "Set up a standing monthly order once you're happy, with priority pricing for regular clients.",
              ],
            ].map(([n, title, copy]) => (
              <div
                key={n}
                className="grid grid-cols-[3rem_1fr] gap-5 border-b border-border py-7 last:border-b-0"
              >
                <span className="font-display text-2xl font-bold text-primary">{n}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              </div>
            ))}
            <Button asChild className="mb-8 mt-2">
              <a href="#contact">
                Request a Sample Pack <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-accent px-5 py-20 text-accent-foreground lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Sustainability / impact</p>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
              Every cup that doesn't hit a landfill counts.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-accent-foreground/20 bg-accent-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["0", "single-use plastic"],
              ["100%", "fully compostable"],
              ["No", "change to your service style"],
              ["One", "tangible ESG talking point"],
            ].map(([value, label]) => (
              <div key={label} className="bg-accent p-6">
                <p className="font-display text-5xl font-bold">{value}</p>
                <p className="mt-3 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-5 py-20 text-background lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div className="order-2 overflow-hidden rounded-md shadow-2xl lg:order-1">
            <img
              src={greenerCupImage}
              alt="Edybite brand poster showing edible cups, a customer eating the cup, and the line 'A Greener Cup, A Brighter Tomorrow'"
              loading="lazy"
              width={1536}
              height={1024}
              className="w-full"
            />
          </div>
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <Leaf className="mx-auto size-8 text-accent lg:mx-0" aria-hidden="true" />
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight sm:text-6xl">
              Small cup. Big change.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/70 lg:mx-0">
              Good drinks, a kinder planet — every Edybite cup served is one less cup heading to a
              landfill.
            </p>
            <Button asChild variant="inverse" className="mt-8">
              <a href="#contact">
                Be part of the change <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Good to know</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Questions, answered.</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold">
                  <span>{q}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-primary px-5 py-20 text-primary-foreground lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Sparkles className="size-8" />
            <h2 className="mt-5 font-display text-5xl font-bold sm:text-6xl">
              Ready to swap your cups?
            </h2>
            <p className="mt-5 max-w-md text-primary-foreground/75">
              Get a free sample pack and see why your customers will notice.
            </p>
          </div>
          <div className="rounded-md bg-background p-6 text-foreground sm:p-8">
            <DemoForm kind="contact" />
          </div>
        </div>
      </section>

      <footer className="bg-foreground px-5 py-10 text-background lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex items-center gap-4">
            <img
              src={logoImage}
              alt="Edybite logo"
              width={48}
              height={48}
              loading="lazy"
              className="size-12 rounded-full"
            />
            <div>
              <p className="font-display text-2xl font-bold">Edybite</p>
              <p className="mt-1 text-sm text-background/60">
                Serving cafés and businesses across Bengaluru.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-background/60 md:items-end">
            <a
              href="https://wa.me/918143170833"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-background"
            >
              WhatsApp: +91 81431 70833
            </a>
            <a
              href="https://www.instagram.com/edybite"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-background"
            >
              Instagram: @edybite
            </a>
            <a href="mailto:info@edybite.com" className="transition hover:text-background">
              Email: info@edybite.com
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-background/15 pt-6 text-xs text-background/40">
          <span>Small cups. A brighter tomorrow.</span>
          <span>© 2026 Edybite. All rights reserved.</span>
          <ShieldCheck className="size-5" aria-label="Food safety focused" />
        </div>
      </footer>
    </main>
  );
}
