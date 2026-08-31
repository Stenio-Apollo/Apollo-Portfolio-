import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt, SlVolume2, SlVolumeOff } from "react-icons/sl";

const APP_STORE_URL = "https://apps.apple.com/us/app/rhodie/id6762026555";

// public/ assets keep their original camera-roll names, spaces and all.
const asset = (dir, file) => `/${dir}/${encodeURIComponent(file)}`;

const SHOWREEL = asset("video", "rh.rhodie.mp4");
const SHOWREEL_POSTER = asset("images", "IMG_0547 2.jpg");

// Ordered as a product tour: the five nav tabs, then the side-rail features.
const SHOTS = [
  {
    id: "home",
    file: "IMG_0547 2.jpg",
    label: "Home",
    caption: "Quote of the day, weekly goal, gratitude and what's due — one glance.",
  },
  {
    id: "plan",
    file: "IMG_0545.jpg",
    label: "Plan",
    caption: "The whole day blocked out, hour by hour.",
  },
  {
    id: "journal",
    file: "IMG_0543.jpg",
    label: "Journal",
    caption: "A stoic quote, a daily prompt, three good things.",
  },
  {
    id: "calendar",
    file: "IMG_0544.jpg",
    label: "Calendar",
    caption: "Tap any day to filter what's actually due.",
  },
  {
    id: "connect",
    file: "IMG_0551 2.PNG",
    label: "Connect",
    // Only shot captured with the iOS status bar showing — crop it so the
    // device frame reads consistently across the rail.
    trimTop: "5.4%",
    caption: "Post a prompt response, gratitude, or a note to your peers.",
  },
  {
    id: "tasks",
    file: "IMG_0550 2.jpg",
    label: "Tasks",
    caption: "Title, due date, priority — capture fast, close it out faster.",
  },
  {
    id: "goals",
    file: "IMG_0553.jpg",
    label: "Goals",
    caption: "A weekly focus, with points and badges for hitting it.",
  },
  {
    id: "memory",
    file: "IMG_0554.jpg",
    label: "Memory",
    caption: "Search, revisit and reflect on everything you've written.",
  },
  {
    id: "reason",
    file: "IMG_0549 2.jpg",
    label: "My Reason",
    caption: "The images that keep you going, pinned where you'll see them.",
  },
];

const STACK = ["React Native", "Expo", "Supabase", "Node.js", "iOS"];

const SCREEN_RATIO = "828 / 1696";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canPinRail = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches &&
  !prefersReducedMotion();

/* Reusable hardware shell so the video and every screenshot read as one device family. */
const PhoneShell = ({ children, className = "", glow = "" }) => (
  <div className={`rh-phone ${className}`}>
    <div className={`rh-phone__aura ${glow}`} aria-hidden="true" />
    <div className="rh-phone__body">
      <div className="rh-phone__notch" aria-hidden="true" />
      <div className="rh-phone__screen" style={{ aspectRatio: SCREEN_RATIO }}>
        {children}
      </div>
      <div className="rh-phone__sheen" aria-hidden="true" />
    </div>
  </div>
);

/* Screenshot that degrades to a labelled plate instead of a broken-image icon. */
const Shot = ({ shot }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="rh-shot-missing">
        <span className="rh-shot-missing__label">{shot.label}</span>
        <span className="rh-shot-missing__hint">asset pending</span>
      </div>
    );
  }

  return (
    <img
      src={asset("images", shot.file)}
      alt={`Rhodie ${shot.label} screen`}
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className="w-full object-cover object-top"
      style={
        shot.trimTop
          ? { height: `calc(100% + ${shot.trimTop})`, marginTop: `-${shot.trimTop}` }
          : { height: "100%" }
      }
    />
  );
};

const ProjectsScreen = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const heroRef = useRef(null);
  const railWrapRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const videoRef = useRef(null);

  const [pinned, setPinned] = useState(canPinRail);
  const [showreelReady, setShowreelReady] = useState(false);
  const [muted, setMuted] = useState(true);

  // Keep the pinned/native-scroll decision in sync with viewport + motion prefs.
  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const sync = () => setPinned(canPinRail());
    queries.forEach((q) => q.addEventListener("change", sync));
    return () => queries.forEach((q) => q.removeEventListener("change", sync));
  }, []);

  // 120MB showreel: stay off the network until it is actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Try with sound first; browsers that block unmuted autoplay get a muted
    // retry plus the on-frame toggle, which counts as a user gesture.
    const playWithAudio = async () => {
      video.muted = false;
      try {
        await video.play();
        setMuted(false);
      } catch {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowreelReady(true);
          if (video.src) playWithAudio();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- title + underline (unchanged) ---
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "Power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none noe Reverse",
          },
        },
      );

      gsap.fromTo(
        titleLineRef.current,
        {
          width: "0%",
          opacity: 0,
        },
        {
          width: "100%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // --- hero reveal: copy staggers up, the device counter-rotates in ---
      const heroLines = heroRef.current?.querySelectorAll("[data-hero-line]");
      if (heroLines?.length) {
        gsap.from(heroLines, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const heroDevice = heroRef.current?.querySelector("[data-hero-device]");
      if (heroDevice) {
        gsap.from(heroDevice, {
          y: 90,
          rotateY: -22,
          rotateX: 10,
          autoAlpha: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // --- pinned coverflow rail (desktop, motion allowed) ---
      if (!pinned) return;

      const track = trackRef.current;
      const wrap = railWrapRef.current;
      if (!track || !wrap) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const rail = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Driven straight to the DOM — no React re-render per frame.
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: Math.max(0.02, self.progress) });
            }
            if (counterRef.current) {
              const index = Math.min(
                SHOTS.length,
                Math.floor(self.progress * SHOTS.length) + 1,
              );
              counterRef.current.textContent = String(index).padStart(2, "0");
            }
          },
        },
      });

      // Each card swings through the centre: tilted + dimmed on the way in,
      // square-on and fully lit at centre, tilted the other way on the way out.
      gsap.utils.toArray(".rh-card", track).forEach((card) => {
        const media = card.querySelector(".rh-card__media");
        const meta = card.querySelector(".rh-card__meta");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: card,
            containerAnimation: rail,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });

        tl.fromTo(
          media,
          { rotateY: 34, scale: 0.78, y: 60, opacity: 0.25 },
          { rotateY: 0, scale: 1, y: 0, opacity: 1, duration: 0.5 },
        ).to(media, {
          rotateY: -34,
          scale: 0.78,
          y: 60,
          opacity: 0.25,
          duration: 0.5,
        });

        tl.fromTo(
          meta,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.32 },
          0.34,
        ).to(meta, { autoAlpha: 0, y: -24, duration: 0.32 }, 0.68);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pinned]);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-black py-20">
      <style>{`
        /* index.css sets a global .pin-spacer{height:200vh}. GSAP sizes its own
           spacer, so neutralise that rule for this section's pin only. */
        #projects .pin-spacer { height: auto; }

        .rh-phone { position: relative; }
        .rh-phone__aura {
          position: absolute; inset: -14%;
          border-radius: 999px; filter: blur(60px);
          opacity: 0.5; pointer-events: none;
        }
        .rh-phone__body {
          position: relative;
          border-radius: 2.4rem;
          padding: 0.55rem;
          background: linear-gradient(150deg, #3a3632 0%, #0d0c0b 45%, #24211e 100%);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.09),
            0 30px 70px -20px rgba(0, 0, 0, 0.95),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }
        .rh-phone__notch {
          position: absolute; top: 0.95rem; left: 50%;
          transform: translateX(-50%);
          width: 32%; height: 0.55rem;
          border-radius: 999px;
          background: #000; z-index: 3;
        }
        .rh-phone__screen {
          position: relative; overflow: hidden;
          border-radius: 2rem; background: #060606;
        }
        .rh-phone__sheen {
          position: absolute; inset: 0; z-index: 2;
          border-radius: 2.4rem; pointer-events: none;
          background: linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 38%);
        }

        .rh-shot-missing {
          height: 100%; width: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.4rem;
          background:
            repeating-linear-gradient(135deg, #101010 0 10px, #0a0a0a 10px 20px);
        }
        .rh-shot-missing__label {
          font-size: 0.95rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #c8915f;
        }
        .rh-shot-missing__hint {
          font-size: 0.7rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #4b4b4b;
        }

        .rh-rail { perspective: 1600px; }
        .rh-card__media { transform-style: preserve-3d; will-change: transform, opacity; }

        .rh-rail--native {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .rh-rail--native::-webkit-scrollbar { display: none; }
        .rh-rail--native .rh-card { scroll-snap-align: center; }

        @keyframes rh-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .rh-float { animation: rh-float 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rh-float { animation: none; }
        }
      `}</style>

      {/* ambient copper wash pulled from the app's own palette */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-[12%] h-[34rem] w-[34rem] rounded-full bg-[#c8915f]/10 blur-[140px]" />
        <div className="absolute bottom-[8%] right-[10%] h-[30rem] w-[30rem] rounded-full bg-[#8a8f9c]/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
            maskImage:
              "radial-gradient(ellipse at 50% 40%, #000 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 40%, #000 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 mb-16 relative z-10">
        <h2
          ref={titleRef}
          className="Classico text-2xl md:text-3xl lg:text-4xl font-bold
              text-white text-center mb-4 opacity-0"
        >
          Featured Projects
        </h2>
        <div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r
        from-white to-gray-900 mx-auto opacity-0 rounded"
        ></div>
      </div>

      {/* ---------- project identity + showreel ---------- */}
      <div
        ref={heroRef}
        className="container relative mx-auto grid items-center gap-14 px-4
          lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
      >
        <div className="order-2 lg:order-1">
          <div
            data-hero-line
            className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#c8915f]"
          >
            <span className="h-px w-10 bg-[#c8915f]/60" />
            01 — iOS Application
          </div>

          <h3
            data-hero-line
            className="ClassicoBold mb-5 text-4xl leading-[1.05] text-white md:text-5xl lg:text-6xl"
          >
            Rhodie
          </h3>

          <p
            data-hero-line
            className="mb-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            A daily operating system for the people who take their own growth
            seriously. Plan the day hour by hour, journal against a prompt,
            track weekly goals, and keep the reason you started in view — all in
            one quiet, deliberately dark interface.
          </p>

          <ul data-hero-line className="mb-9 flex flex-wrap gap-2.5">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5
                  text-xs tracking-wide text-gray-300 backdrop-blur-sm"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div data-hero-line className="flex flex-wrap items-center gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-[#c8915f]/50
                bg-[#c8915f]/10 px-7 py-3 text-sm tracking-wide text-[#e8c39c]
                transition-colors duration-300 hover:bg-[#c8915f]/20 hover:text-white"
            >
              View on the App Store
              <SlShareAlt className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <span className="text-xs uppercase tracking-[0.28em] text-gray-600">
              Live · Many features
            </span>
          </div>
        </div>

        <div
          data-hero-device
          className="order-1 mx-auto w-full max-w-[300px] lg:order-2 lg:max-w-[340px]"
          style={{ perspective: "1400px" }}
        >
          <PhoneShell className="rh-float" glow="bg-[#c8915f]/25">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={showreelReady ? SHOWREEL : undefined}
              poster={SHOWREEL_POSTER}
              preload="none"
              loop
              playsInline
              autoPlay
              aria-label="Rhodie app walkthrough"
            />
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute walkthrough" : "Mute walkthrough"}
              className="absolute bottom-4 right-4 z-[4] flex h-10 w-10 items-center
                justify-center rounded-full border border-white/20 bg-black/60 text-white
                backdrop-blur-md transition-colors duration-300 hover:bg-black/80"
            >
              {muted ? <SlVolumeOff /> : <SlVolume2 />}
            </button>
          </PhoneShell>
        </div>
      </div>

      {/* ---------- screen rail ---------- */}
      <div ref={railWrapRef} className="relative mt-24 lg:mt-32 lg:h-screen">
        <div className="flex h-full flex-col justify-center">
          <div className="container mx-auto mb-8 flex items-end justify-between px-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gray-600">
                Screen by screen
              </p>
              <p className="Classico mt-2 text-xl text-white md:text-2xl">
                Inside the app
              </p>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <span className="font-mono text-sm text-[#c8915f]">
                <span ref={counterRef}>01</span>
                <span className="text-gray-600">
                  {" "}
                  / {String(SHOTS.length).padStart(2, "0")}
                </span>
              </span>
              <div className="h-px w-40 overflow-hidden bg-white/10">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#c8915f] to-white"
                />
              </div>
            </div>
          </div>

          <div className={`rh-rail ${pinned ? "overflow-hidden" : "rh-rail--native"}`}>
            <div
              ref={trackRef}
              className={`flex w-max items-center gap-6 py-10 md:gap-10 ${
                pinned
                  ? "px-[calc(50vw-9rem)]"
                  : "px-[calc(50vw-7rem)] md:px-[calc(50vw-8rem)]"
              }`}
            >
              {SHOTS.map((shot, index) => (
                <article
                  key={shot.id}
                  className="rh-card w-[14rem] shrink-0 md:w-[16rem] lg:w-[18rem]"
                >
                  <div className="rh-card__media">
                    <PhoneShell glow="bg-[#c8915f]/15">
                      <Shot shot={shot} />
                    </PhoneShell>
                  </div>

                  <div className="rh-card__meta mt-7 text-center">
                    <p className="font-mono text-[0.7rem] tracking-[0.28em] text-[#c8915f]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="Classico mt-2 text-lg text-white md:text-xl">
                      {shot.label}
                    </h4>
                    <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-gray-500">
                      {shot.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {!pinned && (
            <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.28em] text-gray-700">
              Swipe to explore
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsScreen;
