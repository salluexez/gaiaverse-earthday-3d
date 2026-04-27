import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  actionChallenges,
  footerLinks,
  heroHighlights,
  impactMetrics,
  introQuotes,
  problemCards,
  solutionCards,
  storyPhases,
  type StoryPhase
} from "./content/gaiaVerse";

const EarthScene = lazy(async () => {
  const module = await import("./components/EarthScene");
  return { default: module.EarthScene };
});

gsap.registerPlugin(ScrollTrigger);

const quoteRotationMs = 4500;

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reducedMotion;
}

function useCountUp(target: number, start: boolean, duration = 1.8) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    const proxy = { value: 0 };
    const tween = gsap.to(proxy, {
      value: target,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        setValue(proxy.value);
      }
    });

    return () => {
      tween.kill();
    };
  }, [duration, start, target]);

  return value;
}

function formatTrees(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function ImpactCard({
  label,
  value,
  unit,
  trend,
  progress,
  accent,
  detail
}: (typeof impactMetrics)[number]) {
  return (
    <article className={`glass-card accent-${accent} reveal-card`}>
      <div className="metric-topline">
        <span className="eyebrow">GLOBAL SIGNAL</span>
        <span className="metric-value">{value}</span>
      </div>
      <h3>{label}</h3>
      <p className="metric-unit">{unit}</p>
      <div className="metric-track">
        <span style={{ width: `${progress * 100}%` }} />
      </div>
      <p className="metric-trend">{trend}</p>
      <p className="metric-detail">{detail}</p>
    </article>
  );
}

function TiltCard({
  title,
  body,
  icon,
  accent,
  interactionCopy
}: (typeof problemCards)[number] | (typeof solutionCards)[number]) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = cardRef.current;

    if (!element || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 10;
      const rotateX = (((y / bounds.height) - 0.5) * -1) * 10;
      element.style.setProperty("--rotate-x", `${rotateX}deg`);
      element.style.setProperty("--rotate-y", `${rotateY}deg`);
    };

    const onLeave = () => {
      element.style.setProperty("--rotate-x", "0deg");
      element.style.setProperty("--rotate-y", "0deg");
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`glass-card tilt-card accent-${accent} reveal-card`}
    >
      <div className="card-symbol">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <button type="button" className="ghost-inline">
        {interactionCopy}
      </button>
    </article>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [introActive, setIntroActive] = useState(true);
  const [exploreActive, setExploreActive] = useState(false);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [timelinePhase, setTimelinePhase] = useState<StoryPhase["id"]>("past");
  const [actionChallengeSelection, setActionChallengeSelection] = useState(actionChallenges[0].id);
  const [impactTriggered, setImpactTriggered] = useState(false);
  const [footprintMode, setFootprintMode] = useState<"awareness" | "actions">("awareness");
  const [treeCountReady, setTreeCountReady] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const finalEarthRef = useRef<HTMLDivElement>(null);

  const treeCount = useCountUp(1248302, treeCountReady, 2.2);

  const selectedChallenge = useMemo(
    () => actionChallenges.find((item) => item.id === actionChallengeSelection) ?? actionChallenges[0],
    [actionChallengeSelection]
  );

  useEffect(() => {
    const randomStart = Math.floor(Math.random() * introQuotes.length);
    setActiveQuoteIndex(randomStart);
  }, []);

  useEffect(() => {
    if (!introActive) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveQuoteIndex((current) => (current + 1) % introQuotes.length);
    }, quoteRotationMs);

    return () => window.clearInterval(interval);
  }, [introActive]);

  useEffect(() => {
    if (!exploreActive) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExploreActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [exploreActive]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from(".hero-copy > *", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15
        });

        gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((element, index) => {
          gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.04,
            scrollTrigger: {
              trigger: element,
              start: "top 88%"
            }
          });
        });
      } else {
        gsap.set(".hero-copy > *, .reveal-card", { clearProps: "all" });
      }

      if (timelineRef.current) {
        storyPhases.forEach((phase, index) => {
          ScrollTrigger.create({
            trigger: timelineRef.current,
            start: `${index * 22 + 10}% center`,
            end: `${index * 22 + 28}% center`,
            onEnter: () => setTimelinePhase(phase.id),
            onEnterBack: () => setTimelinePhase(phase.id)
          });
        });
      }

      if (impactRef.current) {
        ScrollTrigger.create({
          trigger: impactRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => setImpactTriggered(true)
        });
      }

      ScrollTrigger.create({
        trigger: ".action-shell",
        start: "top 72%",
        once: true,
        onEnter: () => setTreeCountReady(true)
      });

      if (finalEarthRef.current && !reducedMotion) {
        gsap.fromTo(
          finalEarthRef.current,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: finalEarthRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    }, appRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  const handleEnterExperience = () => {
    const introNode = introRef.current;
    const heroNode = heroRef.current;

    if (!introNode) {
      setIntroActive(false);
      return;
    }

    if (reducedMotion) {
      setIntroActive(false);
      window.requestAnimationFrame(() => {
        heroNode?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        setIntroActive(false);
        window.setTimeout(() => heroNode?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
      }
    });

    timeline
      .to(".intro-quote", {
        opacity: 0,
        y: -18,
        duration: 0.35,
        ease: "power2.in"
      })
      .to(
        ".intro-earth-shell",
        {
          scale: 1.32,
          filter: "blur(10px)",
          duration: 1.15,
          ease: "power3.inOut"
        },
        0
      )
      .to(
        introNode,
        {
          opacity: 0,
          duration: 0.85,
          ease: "power2.out"
        },
        0.35
      );
  };

  const earthFallback = <div className="canvas-fallback" aria-hidden="true" />;

  return (
    <div className="app-shell" ref={appRef}>
      {exploreActive ? (
        <div className="explore-overlay" role="dialog" aria-modal="true" aria-label="Explore Earth">
          <div className="explore-backdrop" onClick={() => setExploreActive(false)} />
          <div className="explore-shell glass-card">
            <div className="explore-copy">
              <span className="eyebrow">Interactive Earth Viewer</span>
              <h2>Explore Earth</h2>
              <p>Drag to rotate the globe. Use the mouse wheel or trackpad to zoom. Press Esc or close to return.</p>
            </div>
            <button
              type="button"
              className="explore-close"
              onClick={() => setExploreActive(false)}
              aria-label="Close Earth viewer"
            >
              Close
            </button>
            <div className="explore-canvas-shell">
              <Suspense fallback={earthFallback}>
                <EarthScene mode="explore" timelinePhase={timelinePhase} className="canvas-panel explore-canvas" />
              </Suspense>
            </div>
          </div>
        </div>
      ) : null}

      {introActive ? (
        <div className="intro-overlay" ref={introRef}>
          <div className="space-gradient" />
          <div className="intro-earth-shell">
            <Suspense fallback={earthFallback}>
              <EarthScene mode="intro" className="canvas-panel intro-canvas" />
            </Suspense>
          </div>
          <div className="intro-copy">
            <div className="hud-line">
              <span>GaiaVerse</span>
              <span>Earth Day Interactive Experience</span>
            </div>
            <div className="intro-quote">
              <p>{introQuotes[activeQuoteIndex].text}</p>
              <span>
                {introQuotes[activeQuoteIndex].author}
                {" / "}
                {introQuotes[activeQuoteIndex].tag}
              </span>
            </div>
            <button type="button" className="primary-button" onClick={handleEnterExperience}>
              Enter Experience
            </button>
          </div>
        </div>
      ) : null}

      <header className="site-hud">
        <span>GaiaVerse</span>
        <div>
          <span>CO2 421 PPM</span>
          <span>Warming +1.2 C</span>
          <span>Earth Day 2026</span>
        </div>
      </header>

      <main>
        <section className="hero-section" id="hero" ref={heroRef}>
          <div className="hero-backdrop">
            <div className="hero-rings" />
            <Suspense fallback={earthFallback}>
              <EarthScene mode="hero" timelinePhase={timelinePhase} className="canvas-panel hero-canvas" />
            </Suspense>
          </div>
          <div className="hero-content container">
            <div className="hero-copy">
              <span className="eyebrow">Futuristic Earth conservation experience</span>
              <h1>Protect Our Planet</h1>
              <p className="hero-subheadline">One Earth. One Future.</p>
              <p className="hero-description">
                GaiaVerse blends cinematic planetary visuals with climate storytelling, sustainability signals,
                and action prompts designed to make environmental change feel immediate, human, and possible.
              </p>
              <div className="hero-actions">
                <button type="button" className="primary-button" onClick={() => setExploreActive(true)}>
                  Explore Earth
                </button>
                <a href="#action" className="secondary-button">
                  Take Action
                </a>
              </div>
              <div className="hero-highlights">
                {heroHighlights.map((item) => (
                  <div key={item} className="highlight-pill">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="story-section container" id="story" ref={timelineRef}>
          <div className="section-intro">
            <span className="eyebrow">Earth storytelling timeline</span>
            <h2>From living balance to climate risk to regeneration</h2>
            <p>
              Scroll through the planetary arc to see how ecological stability has shifted and what recovery can
              look like when energy, ecosystems, and everyday behavior move together.
            </p>
          </div>
          <div className="story-grid">
            <aside className="story-orbit glass-card">
              <div className={`timeline-orb state-${timelinePhase}`} />
              <div className="story-phase-label">Current Earth state</div>
              <strong>{storyPhases.find((item) => item.id === timelinePhase)?.title}</strong>
              <p>{storyPhases.find((item) => item.id === timelinePhase)?.description}</p>
            </aside>
            <div className="story-cards">
              {storyPhases.map((phase) => (
                <article
                  key={phase.id}
                  className={`glass-card reveal-card story-card ${timelinePhase === phase.id ? "active" : ""}`}
                >
                  <span className="eyebrow">{phase.era}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="impact-section container" id="impact" ref={impactRef}>
          <div className="section-intro">
            <span className="eyebrow">Global impact signals</span>
            <h2>Metrics that frame the urgency</h2>
            <p>
              These curated indicators act as atmospheric telemetry for the experience, translating complex
              climate pressure into clean, readable signals.
            </p>
          </div>
          <div className="impact-grid">
            {impactMetrics.map((metric) => (
              <ImpactCard key={metric.id} {...metric} />
            ))}
          </div>
          <div className={`impact-pulse ${impactTriggered ? "live" : ""}`} />
        </section>

        <section className="problems-section container">
          <div className="section-intro">
            <span className="eyebrow">Environmental problems</span>
            <h2>Interconnected systems under pressure</h2>
            <p>
              Each challenge compounds the others. The design treats these not as isolated issues but as linked
              stress patterns inside one shared planetary system.
            </p>
          </div>
          <div className="card-grid problems-grid">
            {problemCards.map((card) => (
              <TiltCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className="solutions-section container" id="solutions">
          <div className="section-intro">
            <span className="eyebrow">Solutions</span>
            <h2>Actions that compound toward recovery</h2>
            <p>
              The strongest climate response is layered: restore ecosystems, redesign waste, reduce demand, and
              accelerate clean infrastructure at the same time.
            </p>
          </div>
          <div className="card-grid">
            {solutionCards.map((card) => (
              <TiltCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-particles" />
          <div className="container quote-shell">
            <span className="eyebrow">Earth quote</span>
            <blockquote>
              "The Earth is not an asset class. It is the living system that makes every human future possible."
            </blockquote>
            <p>GaiaVerse Manifesto</p>
          </div>
        </section>

        <section className="action-section container" id="action">
          <div className="action-shell glass-card">
            <div className="action-copy">
              <span className="eyebrow">Action hub</span>
              <h2>Turn awareness into visible momentum</h2>
              <p>
                Small repeated choices are easier to believe in when the interface makes them concrete,
                trackable, and emotionally rewarding.
              </p>
            </div>

            <div className="action-panels">
              <div className="action-panel">
                <span className="panel-label">Tree planting counter</span>
                <strong>{formatTrees(treeCount)}</strong>
                <p>Community trees visualized as a growing restoration signal.</p>
              </div>

              <div className="action-panel">
                <span className="panel-label">Eco challenge</span>
                <div className="challenge-tabs">
                  {actionChallenges.map((challenge) => (
                    <button
                      key={challenge.id}
                      type="button"
                      className={challenge.id === selectedChallenge.id ? "active" : ""}
                      onClick={() => setActionChallengeSelection(challenge.id)}
                    >
                      {challenge.label}
                    </button>
                  ))}
                </div>
                <p>{selectedChallenge.statusText}</p>
                <span className="challenge-reward">{selectedChallenge.reward}</span>
                <div className="mini-track">
                  <span style={{ width: `${(selectedChallenge.progress ?? 0) * 100}%` }} />
                </div>
              </div>

              <div className="action-panel">
                <span className="panel-label">Carbon footprint awareness</span>
                <div className="toggle-row">
                  <button
                    type="button"
                    className={footprintMode === "awareness" ? "active" : ""}
                    onClick={() => setFootprintMode("awareness")}
                  >
                    Awareness
                  </button>
                  <button
                    type="button"
                    className={footprintMode === "actions" ? "active" : ""}
                    onClick={() => setFootprintMode("actions")}
                  >
                    Next actions
                  </button>
                </div>
                <p>
                  {footprintMode === "awareness"
                    ? "Food, mobility, home energy, and buying habits each leave a measurable systems footprint."
                    : "Start with transit, electricity, home insulation, and reducing high-waste consumption patterns."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-shell">
            <div className="final-earth" ref={finalEarthRef} />
            <span className="eyebrow">Final call</span>
            <h2>There is No Planet B.</h2>
            <p>
              The planet does not need more passive concern. It needs coordinated action, durable design, and a
              generation willing to build differently.
            </p>
            <a href="#hero" className="primary-button">
              Join the Movement
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>GaiaVerse</strong>
            <p>Cinematic Earth storytelling for awareness, sustainability, and action.</p>
          </div>
          <nav>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
