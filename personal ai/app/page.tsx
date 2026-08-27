"use client";

import { useState } from "react";
import AiClone from "./components/ai-clone";

const experiences = [
  {
    year: "2022 — now",
    role: "Ecommerce Executive",
    company: "Base Camp Data Solutions",
    location: "Hyderabad",
    description:
      "Keeping customer-facing workflows moving: high-volume transactions, support, case tracking, CRM hygiene, and the operational details that make a great experience feel effortless.",
    tags: ["Operations", "CRM", "Customer support"],
  },
  {
    year: "2021 — now",
    role: "Production Manager",
    company: "BLINKSWAG",
    location: "United States",
    description:
      "Leading production from schedule to quality. I optimize productivity, coach teams, monitor the numbers, and build the cross-functional rhythm required to deliver consistently.",
    tags: ["Production", "People leadership", "Quality"],
  },
  {
    year: "2019 — 2021",
    role: "Amazon Product Manager",
    company: "Mashr@.CO",
    location: "Hyderabad District, Pakistan",
    description:
      "Managed product lifecycles from concept to launch, translating market signals and customer feedback into coordinated work across engineering, marketing, and sales.",
    tags: ["Product", "Go-to-market", "Research"],
  },
];

const capabilities = [
  "Customer onboarding & implementation",
  "Account management & Zoho CRM",
  "Cross-functional coordination",
  "Data analysis & reporting",
  "Process optimization",
  "Escalation handling",
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Ahsanali Samejo home">
          AS<span>/</span>01
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
          <a href="#clone" onClick={closeMenu}>AI clone</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight /></a>
        </div>
      </nav>

      <section className="hero section-shell" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow reveal"><span className="status-dot" /> Available for the next opportunity</div>
          <h1 className="hero-title reveal reveal-delay-1">
            Operations<br />
            <span>in motion<span className="accent-dot">.</span></span>
          </h1>
          <p className="hero-intro reveal reveal-delay-2">
            I&apos;m <strong>Ahsanali Samejo</strong> — an Implementation &amp; Operations Coordinator who turns complex customer journeys into clear, repeatable systems.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <a className="button button-accent" href="#journey">Explore the journey <ArrowRight /></a>
            <a className="text-link" href="https://www.linkedin.com/in/ahsanali-samejo-18bb47176" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
          </div>
        </div>

        <div className="hero-panel reveal reveal-delay-2">
          <div className="panel-orbit orbit-one" />
          <div className="panel-orbit orbit-two" />
          <div className="panel-topline"><span>FIELD NOTES / 01</span><span>HYD — PK</span></div>
          <div className="monogram">AS</div>
          <div className="panel-caption">Built around the details<br />that move the work forward.</div>
          <div className="panel-coordinates">17°23&apos;N<br />78°28&apos;E</div>
        </div>

        <div className="hero-footer reveal reveal-delay-3">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
          <span>01 / 05</span>
        </div>
      </section>

      <section className="proof-strip">
        <div className="proof-item"><span className="proof-number">4+</span><span className="proof-label">years in motion</span></div>
        <div className="proof-item"><span className="proof-number">100<span className="proof-sup">+</span></span><span className="proof-label">daily operations</span></div>
        <div className="proof-item"><span className="proof-number">95<span className="proof-sup">%</span></span><span className="proof-label">customer satisfaction</span></div>
        <div className="proof-item"><span className="proof-number">25<span className="proof-sup">%</span></span><span className="proof-label">workflow efficiency gain</span></div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-marker"><span>02</span><span>About the operator</span></div>
        <div className="about-content">
          <div className="section-heading-wrap">
            <p className="eyebrow">The throughline</p>
            <h2 className="section-heading">Make the moving parts <em>move together.</em></h2>
          </div>
          <div className="about-text">
            <p className="lead-copy">The best operations work is almost invisible. It&apos;s the handoff that lands, the escalation that gets resolved, and the customer who never has to ask what happens next.</p>
            <p>I work at that intersection of people, process, and product — coordinating across teams, translating data into decisions, and improving the systems behind customer-facing work.</p>
            <a className="text-link dark-link" href="mailto:ahsanalisamejo@gmail.com">Start a conversation <ArrowUpRight /></a>
          </div>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <div className="capability" key={capability}>
              <span className="capability-index">0{index + 1}</span>
              <span>{capability}</span>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </section>

      <section className="journey section-shell" id="journey">
        <div className="section-marker light-marker"><span>03</span><span>Career journey</span></div>
        <div className="journey-intro">
          <p className="eyebrow">A pattern of progression</p>
          <h2 className="section-heading light-heading">From product<br /><em>to process.</em></h2>
          <p className="journey-note">Different environments. Same instinct: find the friction, then make the path clearer.</p>
        </div>
        <div className="timeline">
          {experiences.map((experience, index) => (
            <article className="timeline-item" key={experience.company}>
              <div className="timeline-rail"><span>0{index + 1}</span><i /></div>
              <div className="timeline-content">
                <div className="timeline-meta"><span>{experience.year}</span><span>{experience.location}</span></div>
                <h3>{experience.role}</h3>
                <p className="company-name">{experience.company}</p>
                <p className="timeline-description">{experience.description}</p>
                <div className="tag-row">{experience.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section-shell" id="portfolio">
        <div className="section-marker"><span>04</span><span>Selected direction</span></div>
        <div className="portfolio-head">
          <div>
            <p className="eyebrow">Next chapter</p>
            <h2 className="section-heading">Work worth<br /><em>bookmarking.</em></h2>
          </div>
          <p className="portfolio-note">A portfolio is taking shape. These are the kinds of systems, experiments, and customer stories I&apos;m building toward.</p>
        </div>
        <div className="project-grid">
          <a className="project-card project-card-lime" href="#contact">
            <div className="project-number">01 / FIELD STUDY</div>
            <div className="project-art art-grid"><span>ONBOARDING<br />OS</span><i /></div>
            <div className="project-bottom"><span>Customer onboarding</span><ArrowUpRight /></div>
          </a>
          <a className="project-card project-card-coral" href="#contact">
            <div className="project-number">02 / FIELD STUDY</div>
            <div className="project-art art-signal"><span>OPS<br />INTELLIGENCE</span><i /><i /><i /></div>
            <div className="project-bottom"><span>Process &amp; reporting</span><ArrowUpRight /></div>
          </a>
          <a className="project-card project-card-blue" href="#contact">
            <div className="project-number">03 / FIELD STUDY</div>
            <div className="project-art art-type"><span>JOURNEY<br />LAB</span><b>→</b></div>
            <div className="project-bottom"><span>Customer experience</span><ArrowUpRight /></div>
          </a>
        </div>
      </section>

      <AiClone />

      <section className="contact section-shell" id="contact">
        <div className="contact-text">
          <div className="section-marker light-marker"><span>06</span><span>Open channel</span></div>
          <p className="eyebrow">Have a complex thing to untangle?</p>
          <h2 className="contact-heading">Let&apos;s make<br /><em>it move.</em></h2>
        </div>
        <div className="contact-action">
          <p>For implementation, customer success, and operations opportunities — or just a good conversation about making work work better.</p>
          <a className="button button-accent" href="mailto:ahsanalisamejo@gmail.com">ahsanalisamejo@gmail.com <ArrowUpRight /></a>
          <div className="contact-links"><a href="https://www.linkedin.com/in/ahsanali-samejo-18bb47176" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><span>Hyderabad, Pakistan</span></div>
        </div>
      </section>

      <footer className="site-footer"><span>AS<span>/</span>01</span><span>© 2025 Ahsanali Samejo</span><span>Designed for forward motion</span></footer>
    </main>
  );
}
