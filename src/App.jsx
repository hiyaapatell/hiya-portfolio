import gachaArt from "../public/assets/gacha.svg?raw";
import React, { useState, useEffect, useRef } from "react";
const A = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const projects = [
  {
    slug: "paquet",
    name: "Paquet",
    title: "See packaging before it exists.",
    desc: "An AR app for visualizing packaging before production.",
    color: "#1E8A4C",
    light: "#2FA866",
    year: "2024",
    metric: "AR",
    unit: "PACKAGING",
    image: "paquet.jpg",
    link: "https://www.behance.net/gallery/195126017/Paquet-Packaging-App",
    role: "Product & interaction design",
    problem:
      "Packaging is difficult to judge from a flat drawing. Paquet explores how an AR preview can help people understand a package before production.",
    process:
      "Designed user flows, wireframes, and an interactive high-fidelity Figma prototype for previewing packaging in augmented reality.",
    outcome:
      "An app concept that makes packaging easier to visualize, compare, and discuss.",
  },
  {
    slug: "panthere",
    name: "Panthère",
    title: "A clearer way to discover.",
    desc: "Website navigation and interfaces, redesigned around browsing.",
    color: "#29445B",
    light: "#3D6684",
    year: "2024–25",
    metric: "WEB",
    unit: "REDESIGN",
    image: "panthere.png",
    link: "https://www.behance.net/gallery/224989343/Panthere-Website-Redesign",
    role: "UI/UX designer · Le Panthère",
    problem:
      "Browsing should feel intuitive. This redesign addressed navigation and interface usability issues on the Le Panthère website.",
    process:
      "Developed Figma wireframes and high-fidelity interfaces informed by usability testing and stakeholder feedback.",
    outcome:
      "A redesigned website experience with clearer navigation and a more consistent interface.",
  },
  {
    slug: "hiddenboston",
    name: "HiddenBoston",
    title: "Find a different side of Boston.",
    desc: "Interactive search for hidden places and local experiences.",
    color: "#E5484F",
    light: "#F7767B",
    year: "2026",
    metric: "2",
    unit: "WEEKS",
    image: "hiddenboston.png",
    link: "https://www.behance.net/gallery/256933871/hiddenboston",
    role: "Design & frontend development",
    problem:
      "A city has more to offer than its familiar landmarks. HiddenBoston helps people discover less obvious places and local experiences.",
    process:
      "Designed and developed a responsive discovery website in two weeks using Figma, HTML, and CSS, with interactive search.",
    outcome:
      "A working discovery website that connects visual browsing with search.",
  },
  {
    slug: "synesthesia",
    name: "Synesthesia",
    title: "Create. Remix. Make it yours.",
    desc: "A collaborative space for discovering and remixing artwork.",
    color: "#2D5BE3",
    light: "#4C82F2",
    year: "2025",
    metric: "APP",
    unit: "DESIGN",
    image: "synesthesia.jpg",
    link: "https://www.behance.net/gallery/242654747/Synesthesia-App-Design",
    role: "Product & interaction design",
    problem:
      "Creative work can be a conversation. Synesthesia explores how people can discover, remix, and contribute to collaborative artwork.",
    process:
      "Designed information architecture and user flows for discovering artwork, remixing it, and contributing to a shared creative experience.",
    outcome:
      "A collaborative creativity app concept with connected discovery and contribution flows.",
  },
];
const jobs = [
  ["ADOBE", "Adobe Student Ambassador", "JUL 2026–NOW"],
  ["MASSART", "Graduate Research Assistant", "SEP 2025–NOW"],
  ["NYSERDA", "Social Media Designer Intern", "JUN–AUG 2026"],
  ["LE PANTHÈRE", "UI/UX Designer", "DEC 2024–APR 2025"],
  ["UPWORK", "Graphic Designer & UX Researcher", "2022–24"],
  ["SOLIDSALT", "Graphic Design Intern", "JUN–AUG 2024"],
  ["BLUE CHISEL", "Branding & Concept Designer", "JUN–JUL 2023"],
];
const items = [
  ["paper", 200, 195, 600, 0, 1, "Packing paper. There is more underneath."],
  [
    "bubble",
    510,
    215,
    260,
    12,
    2,
    "Bubble wrap. A little pause before the work.",
  ],
  [
    "gunpla",
    235,
    335.5,
    170,
    -10,
    8,
    "A model kit. Thinking about how things fit together.",
  ],
  [
    "book",
    431,
    251.5,
    118,
    14,
    9,
    "A mystery. Every good research project starts with a question.",
  ],
  ["pot", 225, 232.5, 150, -6, 10, "A little colour in the box."],
  ["chai", 573, 348.5, 78, 0, 14, "Chai. Taking a moment between projects."],
  [
    "stamps",
    415,
    368.5,
    210,
    -4,
    15,
    "From Ahmedabad to Boston. A design journey.",
  ],
  ["crane", 355, 201, 130, -8, 13, "Paper, folded into a new possibility."],
  [
    "receipt",
    663,
    182.5,
    84,
    -14,
    11,
    "A receipt. The career one is further down.",
  ],
  ["ears", 455, 239, 210, 10, 12, "Headphones. Back to focusing."],
];
const topics = [
  [
    "Design Innovation",
    "MassArt · MDes",
    "Research, systems, and services. I’m pursuing my Master of Design in Design Innovation at Massachusetts College of Art & Design, graduating in May 2027.",
  ],
  [
    "User Research",
    "Questions before answers",
    "My work includes interviews, competitive analysis, journey mapping, and usability testing. I translate findings into design recommendations.",
  ],
  [
    "Visual Communication",
    "Nirma University · BDes",
    "My communication design background shapes how I use hierarchy, typography, and visual systems to make complex information easier to understand.",
  ],
  [
    "Making & Prototyping",
    "Figma · HTML/CSS",
    "I work across user flows, wireframes, interactive prototypes, responsive interfaces, and design systems.",
  ],
  [
    "Creative Community",
    "Adobe Student Ambassador",
    "I share Adobe Creative Cloud tools and resources through student engagement and social media initiatives.",
  ],
];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
function useScroll() {
  const [state, set] = useState({ y: 0, w: innerWidth, h: innerHeight });
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        set({ y: scrollY, w: innerWidth, h: innerHeight }),
      );
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return state;
}
function jump(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "start",
  });
}
function Logo() {
  return (
    <a className="logo" href="#top" onClick={() => jump("top")}>
      hp.<i>FRAGILE</i>
    </a>
  );
}
function App() {
  const scroll = useScroll(),
    mobile = scroll.w < 760;
  const [route, setRoute] = useState(
    location.hash.startsWith("#project/") ? location.hash.split("/")[1] : null,
  );
  const [menu, setMenu] = useState(false),
    [settings, setSettings] = useState(false),
    [said, say] = useState("There is a whole portfolio in here. Open the box."),
    [companion, setCompanion] = useState(() => {
      try {
        return (
          JSON.parse(localStorage.getItem("hiya-pixel")) || {
            on: true,
            shape: 0,
            material: 1,
            color: 4,
            mood: 0,
          }
        );
      } catch {
        return { on: true, shape: 0, material: 1, color: 4, mood: 0 };
      }
    });
  const [gift, setGift] = useState(null),
    [gifts, setGifts] = useState(3),
    [sound, setSound] = useState(true),
    [book, setBook] = useState(null),
    [flip, setFlip] = useState(false),
    [page, setPage] = useState(0),
    [expanded, setExpanded] = useState(null),
    [removed, setRemoved] = useState([]),
    [tour, setTour] = useState(null);
  const readerDrag = useRef(null);
  useEffect(() => {
    const keys = (e) => {
      if (
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.target.closest("input,textarea,[contenteditable]") ||
        route ||
        gift !== null
      )
        return;
      const index = ["b", "r", "d", "s"].indexOf(e.key.toLowerCase());
      if (index >= 0) {
        setExpanded((value) => (value === index ? null : index));
        jump("slip");
      }
    };
    const outside = (e) => {
      if (!e.target.closest("header")) {
        setSettings(false);
        setMenu(false);
      }
    };
    document.addEventListener("keydown", keys);
    document.addEventListener("click", outside);
    return () => {
      document.removeEventListener("keydown", keys);
      document.removeEventListener("click", outside);
    };
  }, [route, gift]);
  const pointer = useRef({ x: scroll.w - 150, y: scroll.h - 190 });
  const companionRef = useRef();
  const finalHeadingRef = useRef();
  const [toastVisible, setToastVisible] = useState(true);
  const [dispensing, setDispensing] = useState(false);
  useEffect(() => {
    setToastVisible(true);
    const timer = setTimeout(() => setToastVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [said]);
  useEffect(() => {
    const f = () => {
      const value = location.hash.startsWith("#project/")
        ? location.hash.split("/")[1]
        : null;
      setRoute(value);
      setMenu(false);
      setSettings(false);
      if (value) window.scrollTo(0, 0);
    };
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    localStorage.setItem("hiya-pixel", JSON.stringify(companion));
  }, [companion]);
  useEffect(() => {
    let frame;
    let x = innerWidth - 140,
      y = innerHeight - 190;
    const move = (e) =>
      (pointer.current = { x: e.clientX + 24, y: e.clientY + 24 });
    const run = () => {
      x += (pointer.current.x - x) * 0.065;
      y += (pointer.current.y - y) * 0.065;
      if (companionRef.current)
        companionRef.current.style.transform = `translate(${clamp(x, 8, innerWidth - 70)}px,${clamp(y, 70, innerHeight - 75)}px)`;
      frame = requestAnimationFrame(run);
    };
    addEventListener("pointermove", move);
    run();
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") {
        setGift(null);
        setBook(null);
        setSettings(false);
        setMenu(false);
      }
    };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  const project = projects.find((p) => p.slug === route);
  const sections = ["top", "slip", "till", "inside"];
  let current = 0;
  for (let i = 1; i < sections.length; i++) {
    const el = document.getElementById(sections[i]);
    if (el && el.getBoundingClientRect().top < scroll.h * 0.5) current = i;
  }
  const names = ["The box", "Packing slip", "Receipt", "Also inside"];
  const raw = clamp((scroll.y - 62) / (scroll.h * 2.6 + 62));
  const opening = smooth(clamp((raw - 0.03) / 0.22));
  const clearing = smooth(clamp((raw - 0.27) / 0.35));
  const spreading = smooth(clamp((raw - 0.64) / 0.18));
  const viewportHeight = scroll.h - 62;
  const closedScale = Math.min(
    (scroll.w * (mobile ? 0.98 : 0.86)) / 1000,
    viewportHeight / 1000,
  );
  const zoom = Math.min(
    (scroll.w * (mobile ? 1.18 : 0.98)) / 860,
    viewportHeight * 0.0018,
  );
  const gridBandHeight = mobile ? 734 : 650;
  const headingHeight =
    (finalHeadingRef.current?.offsetHeight || (mobile ? 95 : 110)) +
    (mobile ? 14 : 22);
  const bottomSpace = mobile ? 92 : 108;
  const finalScale = Math.min(
    (scroll.w * 0.94) / (mobile ? 544 : 940),
    (viewportHeight - headingHeight - bottomSpace - 12) / gridBandHeight,
  );
  const remainingSpace =
    viewportHeight - headingHeight - gridBandHeight * finalScale;
  const headingTop = Math.max(
    8,
    Math.min(remainingSpace / 2, remainingSpace - bottomSpace),
  );
  const finalSceneTop =
    headingTop + headingHeight - (mobile ? 6 : 12) * finalScale;
  const scale = lerp(lerp(closedScale, zoom, opening), finalScale, spreading);
  const initialSceneTop =
    viewportHeight * (mobile ? 0.84 : 0.9) - 450 * closedScale;
  const zoomSceneTop = viewportHeight * 0.53 - 345 * zoom;
  const sceneTop = lerp(
    lerp(initialSceneTop, zoomSceneTop, opening),
    finalSceneTop,
    spreading,
  );
  useEffect(() => {
    if (raw > 0.82) say("Four projects worth exploring. Click one.");
    else if (raw > 0.25) say("It’s open. Mind the clutter.");
  }, [raw > 0.82, raw > 0.25]);
  const frame = Math.min(12, Math.floor(opening * 12));
  const automatic = Math.floor(clearing * 10);
  const visibleCount = items.filter(
    (item, i) => i < automatic || removed.includes(item[0]),
  ).length;
  const copyOpacity = 1 - smooth(clamp((raw - 0.04) / 0.16));
  const semiImage = `pixel-${companion.shape}-${companion.material}-${companion.mood}-${companion.color}.png`;
  function nav(id) {
    setMenu(false);
    if (route) {
      location.hash = id;
      setTimeout(() => jump(id), 50);
    } else jump(id);
  }
  function openProject(slug) {
    location.hash = "project/" + slug;
    say("Let’s look at the decisions behind this project.");
  }
  function dispense() {
    if (!gifts || dispensing) return;
    const index = 3 - gifts;
    setGifts(gifts - 1);
    setDispensing(true);
    setTimeout(() => {
      setDispensing(false);
      setGift(index);
    }, 850);
    say("A little something to take with you.");
    if (sound) {
      try {
        const ctx = new AudioContext(),
          o = ctx.createOscillator(),
          g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.setValueAtTime(420, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.2);
        g.gain.setValueAtTime(0.06, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        o.start();
        o.stop(ctx.currentTime + 0.4);
        o.onended = () => ctx.close();
      } catch {}
    }
  }
  return (
    <>
      <header>
        <div className="nav-inner">
          <button
            className="back"
            aria-label="Previous section"
            disabled={!route && current === 0}
            onClick={() =>
              route ? (location.hash = "top") : nav(sections[current - 1])
            }
          >
            ‹
          </button>
          <Logo />
          <nav>
            {[
              ["Home", "top"],
              ["Work", "work"],
              ["Career", "till"],
              ["About me", "inside"],
            ].map(([label, id]) => (
              <a
                key={id}
                className={
                  (route && id === "work") ||
                  (!route &&
                    current === ["top", "work", "till", "inside"].indexOf(id))
                    ? "active"
                    : ""
                }
                href={"#" + id}
                onClick={(e) => {
                  e.preventDefault();
                  id === "work" && !route
                    ? window.scrollTo({
                        top: scroll.h * 2.42,
                        behavior: "smooth",
                      })
                    : nav(id === "work" ? "top" : id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className="settings-trigger"
            aria-label="Pixel settings"
            aria-expanded={settings}
            onClick={() => setSettings(!settings)}
          >
            <img src={A(semiImage)} alt="" />
            <span>Pixel</span> ▾
          </button>
          <a
            className="hi"
            href="#siteFooter"
            onClick={(e) => {
              e.preventDefault();
              nav("siteFooter");
            }}
          >
            Say hi
          </a>
          <button
            className="menu-trigger"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            Menu
          </button>
        </div>
        {menu && (
          <div className="mobile-menu">
            {[
              ["Home", "top"],
              ["Work", "work"],
              ["Career", "till"],
              ["About me", "inside"],
              ["Say hi", "siteFooter"],
            ].map(([x, id]) => (
              <a
                key={id}
                href={"#" + id}
                onClick={(e) => {
                  e.preventDefault();
                  id === "work"
                    ? (setMenu(false),
                      window.scrollTo({
                        top: scroll.h * 2.42,
                        behavior: "smooth",
                      }))
                    : nav(id);
                }}
              >
                {x}
                <small>
                  0
                  {["top", "work", "till", "inside", "siteFooter"].indexOf(id) +
                    1}
                </small>
              </a>
            ))}
            <a href="Hiya-Patel-Resume.pdf" target="_blank">
              Résumé ↗
            </a>
          </div>
        )}
        {settings && (
          <aside className="settings">
            <div className="settings-head">
              <img src={A(semiImage)} alt="Your Pixel" />
              <div>
                <b>Pick your Pixel</b>
                <p>It came in the box. It has opinions. Make it yours.</p>
              </div>
            </div>
            <div className="setting-toggle">
              Pixel follows me
              <button
                role="switch"
                aria-checked={companion.on}
                aria-label="Pixel follows me"
                onClick={() =>
                  setCompanion({ ...companion, on: !companion.on })
                }
              />
            </div>
            {[
              ["shape", "SHAPE", ["Round", "Clover", "Flower", "Square"]],
              ["material", "MATERIAL", ["Fabric", "Glass", "Glow", "Plastic"]],
              [
                "color",
                "COLOUR",
                [
                  "Haldi",
                  "Kesar",
                  "Gulmohar",
                  "Mehendi",
                  "Sky blue",
                  "Jamun",
                  "Chai",
                ],
              ],
              ["mood", "MOOD", ["Idle", "Working (specs on)", "Sleeping"]],
            ].map(([key, label, options]) => (
              <div key={key}>
                <small>{label}</small>
                <div className="segments">
                  {options.map((opt, i) => (
                    <button
                      key={opt}
                      aria-pressed={companion[key] === i}
                      onClick={() => setCompanion({ ...companion, [key]: i })}
                    >
                      {key === "color" && (
                        <i
                          style={{
                            background: [
                              "#ffc94a",
                              "#ff8a1f",
                              "#f2542d",
                              "#78923c",
                              "#3f86d1",
                              "#7b5cf0",
                              "#ac7c47",
                            ][i],
                          }}
                        />
                      )}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="random"
              onClick={() =>
                setCompanion({
                  ...companion,
                  shape: Math.floor(Math.random() * 4),
                  material: Math.floor(Math.random() * 4),
                  color: Math.floor(Math.random() * 7),
                  mood: Math.floor(Math.random() * 3),
                })
              }
            >
              Surprise me
            </button>
          </aside>
        )}
      </header>
      {project ? (
        <main className="case-study" style={{ "--accent": project.color }}>
          <div className="wrap">
            <small>
              CASE STUDY · {project.name} · {project.year}
            </small>
            <h1>{project.title}</h1>
            <div className="case-facts">
              {[
                ["PROBLEM", project.problem],
                ["ROLE", project.role],
                ["PROCESS", project.process],
                ["OUTCOME", project.outcome],
              ].map(([k, v]) => (
                <div key={k}>
                  <small>{k}</small>
                  <p>{v}</p>
                </div>
              ))}
            </div>
            <div className="case-actions">
              <button
                className="pill dark"
                onClick={() => {
                  setTour(0);
                  jump("case-image");
                }}
              >
                <img src={A("semi.png")} alt="" />
                Take the project tour
              </button>
              <a
                className="pill"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Full project on Behance ↗
              </a>
            </div>
            <img
              id="case-image"
              className="case-image"
              src={A(project.image)}
              alt={`${project.name} project cover`}
            />
            <section id="case-process">
              <small>THE DESIGN WORK</small>
              <h2>From the question to the experience.</h2>
              <p>{project.process}</p>
              <p>{project.outcome}</p>
              <a
                className="pill yellow"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Explore the full case study ↗
              </a>
            </section>
            <div className="next-project">
              <small>NEXT IN THE BOX</small>
              <button
                onClick={() =>
                  openProject(
                    projects[(projects.indexOf(project) + 1) % 4].slug,
                  )
                }
              >
                {projects[(projects.indexOf(project) + 1) % 4].name} →
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main id="top">
          <section className="unboxing" style={{ height: "360vh" }}>
            <div className="pin">
              <div
                className="hero-copy"
                style={{
                  opacity: copyOpacity,
                  transform: `translateY(${-opening * 40}px)`,
                  pointerEvents: copyOpacity < 0.1 ? "none" : "auto",
                }}
              >
                <small>PRODUCT DESIGNER · BOSTON</small>
                <h1>Hiya Patel, unboxed.</h1>
                <p>
                  I turn research into clear, useful experiences.
                  <br className="desktop-break" /> MDes at MassArt. Apps,
                  websites, and service design.
                </p>
                <div className="hero-buttons">
                  <button
                    className="pill"
                    onClick={() =>
                      window.scrollTo({
                        top: scroll.h * 0.65,
                        behavior: "smooth",
                      })
                    }
                  >
                    Open the box
                  </button>
                  <button
                    className="pill yellow"
                    onClick={() =>
                      window.scrollTo({
                        top: scroll.h * 2.42,
                        behavior: "smooth",
                      })
                    }
                  >
                    Skip to the work ↓
                  </button>
                </div>
              </div>
              <div
                ref={finalHeadingRef}
                className="final-title"
                style={{ opacity: spreading, top: headingTop }}
              >
                <small>WHAT WAS IN THE BOX</small>
                <b>Four things worth exploring.</b>
              </div>
              <div
                className="scene"
                style={{
                  transform: `translate(${(scroll.w - 1000 * scale) / 2}px,${sceneTop}px) scale(${scale})`,
                }}
              >
                <img
                  className="box-layer"
                  src={A(`box-${frame}-back.svg`)}
                  alt=""
                />
                <div
                  className="contents-layer"
                  style={{
                    zIndex: spreading > 0.02 ? 30 : 5,
                    clipPath:
                      opening < 0.999
                        ? `polygon(0 ${410 + 400 * opening}px,170px 410px,260px ${190 - 700 * opening}px,740px ${190 - 700 * opening}px,830px 410px,1000px ${410 + 400 * opening}px,1000px 760px,0 760px)`
                        : "none",
                  }}
                >
                  {projects.map((p, i) => {
                    const sx = mobile
                        ? [247, 337, 453, 553][i]
                        : [152, 242, 358, 458][i],
                      sy = mobile
                        ? [150, 218, 118, 212][i]
                        : [174, 242, 142, 236][i],
                      fx = mobile
                        ? [256, 514, 256, 514][i]
                        : [58, 522, 58, 522][i],
                      fy = mobile
                        ? [24, 24, 388, 388][i]
                        : [30, 30, 358, 358][i];
                    return (
                      <div
                        key={p.slug}
                        className="project-position"
                        style={{
                          width: mobile ? 230 : 420,
                          height: mobile ? 300 : 252,
                          zIndex: spreading > 0.4 ? 30 : [3, 5, 4, 6][i],
                          transform: `translate(${lerp(sx, fx, spreading)}px,${lerp(sy, fy, spreading)}px) rotate(${lerp([-9, 3, 7, -5][i], 0, spreading)}deg) scale(${lerp(mobile ? 0.869565 : 0.47619, 1, spreading)})`,
                        }}
                      >
                        <button
                          className="project-card"
                          aria-label={`Read ${p.name} case study`}
                          onClick={() => openProject(p.slug)}
                          style={{ "--accent": p.color, "--light": p.light }}
                        >
                          <span className="card-top">
                            0{i + 1} · {p.name}
                            <span>{p.year}</span>
                          </span>
                          <strong>{p.title}</strong>
                          <p>{p.desc}</p>
                          <span className="card-bottom">
                            <span>
                              <b>{p.metric}</b> {p.unit}
                            </span>
                            <i className="barcode" />
                          </span>
                        </button>
                        <span className="card-tag">READ IT</span>
                        <button
                          className="card-link"
                          onClick={() => openProject(p.slug)}
                          style={{ opacity: spreading }}
                        >
                          Read the case study →
                        </button>
                      </div>
                    );
                  })}
                  {items.map(([key, x, y, w, rotation, z, label], i) => {
                    const out = i < automatic || removed.includes(key);
                    return (
                      <button
                        key={key}
                        className={`object ${out ? "cleared" : ""}`}
                        aria-label={label}
                        tabIndex={out || opening < 0.25 ? -1 : 0}
                        disabled={out}
                        onClick={() => {
                          setRemoved([...removed, key]);
                          say(label);
                        }}
                        style={{
                          left: x,
                          top: y,
                          width: w,
                          zIndex: z,
                          transform: `translate(${out ? (i % 2 ? -850 : 850) : 0}px,${out ? -900 : 0}px) rotate(${out ? rotation + 90 : rotation}deg)`,
                          opacity: opening < 0.15 ? 0 : 1,
                        }}
                      >
                        {key === "stamps" ? (
                          <div className="stamp-stack">
                            {[0, 1, 2].map((n) => (
                              <img
                                key={n}
                                src={A(`object-stamps-${n}.svg`)}
                                alt=""
                              />
                            ))}
                          </div>
                        ) : (
                          <img src={A(`object-${key}-0.svg`)} alt="" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <img
                  className="box-front"
                  src={A("box-front.png")}
                  alt="Cardboard box marked fragile"
                  style={{ opacity: 1 }}
                />
                <img
                  className="box-layer box-lid"
                  src={A(`box-${frame}-lid.svg`)}
                  alt=""
                  style={{ opacity: 1 }}
                />
              </div>
              <div
                className="clutter-counter"
                style={{ opacity: opening * (1 - spreading) }}
              >
                <small>CLUTTER OUT</small>
                <b>{visibleCount} / 10</b>
              </div>
              <small className="box-hint">
                {spreading > 0.6
                  ? "CLICK A CARD · SCROLL ON FOR THE REST"
                  : opening > 0.6
                    ? "SCROLL TO CLEAR IT OUT · CLICK ANYTHING"
                    : "SCROLL TO OPEN THE BOX"}
              </small>
            </div>
          </section>
          <section className="wrap slip-section" id="slip">
            <div className="packing-slip">
              <div className="slip-head">
                <div>
                  <small>PACKING SLIP</small>
                  <h2>What you’re getting</h2>
                </div>
                <small>
                  ORDER #HIYA
                  <br />4 ITEMS · ONE DESIGNER
                  <br />
                  PACKED IN BOSTON
                </small>
              </div>
              <div className="slip-labels">
                <span>QTY</span>
                <span>ITEM</span>
                <span>DESCRIPTION</span>
                <span>PROOF</span>
              </div>
              {[
                ["Build", "Working ideas, made tangible.", "hiddenboston"],
                ["Research", "Finding the question that matters.", "paquet"],
                ["Decide", "Design choices with a reason.", "panthere"],
                ["Ship", "Taking the work into the world.", "synesthesia"],
              ].map(([title, desc, slug], i) => (
                <React.Fragment key={title}>
                  <div className="slip-row">
                    <button
                      aria-expanded={expanded === i}
                      onClick={() => {
                        setExpanded(expanded === i ? null : i);
                        say(desc);
                      }}
                    >
                      <span>1 ×</span>
                      <img src={A(`key-${i}.png`)} alt={title[0]} />
                      <span>
                        <b>{title}</b>
                        <span>{desc}</span>
                      </span>
                    </button>
                    <a href={"#project/" + slug}>
                      SEE{" "}
                      {projects.find((p) => p.slug === slug).name.toUpperCase()}{" "}
                      →
                    </a>
                  </div>
                  {expanded === i && (
                    <div className="slip-proof">
                      <p>{projects.find((p) => p.slug === slug).process}</p>
                      <a href={"#project/" + slug}>Read the project →</a>
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="slip-footer">
                <span>Click an item to see the proof.</span>
                <span>Questions welcome. Always.</span>
              </div>
            </div>
          </section>
          <section className="wrap career" id="till">
            <div className="career-intro">
              <small>CAREER</small>
              <h2>Itemised, like a receipt.</h2>
              <p>
                Every place I’ve researched, designed, and learned. A journey
                from visual communication to useful experiences.
              </p>
              <div className="proofs">
                <div>
                  <b>40+</b>
                  <span>high-fidelity screens for the Angle shopping app</span>
                </div>
                <div>
                  <b>2 weeks</b>
                  <span>to design and develop HiddenBoston</span>
                </div>
                <div>
                  <b>MDes</b>
                  <span>Design Innovation at MassArt · May 2027</span>
                </div>
              </div>
              <a
                className="resume-link"
                href="Hiya-Patel-Resume.pdf"
                target="_blank"
              >
                Read my résumé ↗
              </a>
            </div>
            <div className="receipt">
              <h3>HIYA & CO.</h3>
              <div className="receipt-center">
                BOSTON · OPEN TO IDEAS
                <br />
                CASHIER: PIXEL
              </div>
              <hr />
              {jobs.map(([name, title, date]) => (
                <div className="receipt-line" key={name}>
                  <span>
                    {name}
                    <small>{title}</small>
                  </span>
                  <span>{date}</span>
                </div>
              ))}
              <hr />
              <div className="receipt-line">
                <span>
                  MASSACHUSETTS COLLEGE OF ART & DESIGN
                  <small>MDes · Design Innovation</small>
                </span>
                <span>2027</span>
              </div>
              <div className="receipt-line">
                <span>
                  NIRMA UNIVERSITY<small>BDes · Communication Design</small>
                </span>
                <span>2025</span>
              </div>
              <div className="receipt-line">
                <span>
                  MIT · COURSEWORK
                  <small>MAS & STS · Revolutionary Ventures</small>
                </span>
                <span>2026</span>
              </div>
              <hr />
              <div className="receipt-line total">
                <span>ITEMS</span>
                <span>7 TEAMS</span>
              </div>
              <div className="receipt-line">
                <span>PAID IN</span>
                <span>CURIOSITY</span>
              </div>
              <div className="receipt-barcode" />
              <div className="receipt-center">
                THANK YOU FOR READING
                <br />
                LET’S MAKE SOMETHING USEFUL
              </div>
            </div>
          </section>
          <section className="about" id="inside">
            <div className="wrap">
              <small>ABOUT ME</small>
              <h2>Also inside the box</h2>
              <p>
                A communication design background. A research-led approach. An
                interest in what people need, and why.
              </p>
              <div className="about-grid">
                <div className="reader-area">
                  <div
                    className={"reader " + (flip ? "flipped" : "")}
                    onPointerDown={(e) => {
                      if (!e.target.closest("button")) {
                        readerDrag.current = e.clientX;
                        e.currentTarget.setPointerCapture(e.pointerId);
                      }
                    }}
                    onPointerUp={(e) => {
                      if (
                        readerDrag.current !== null &&
                        Math.abs(e.clientX - readerDrag.current) > 60
                      ) {
                        setFlip((value) => !value);
                        say("A different side of the story.");
                      }
                      readerDrag.current = null;
                    }}
                    onPointerCancel={() => {
                      readerDrag.current = null;
                    }}

                    onPointerMove={(e) => {
                      if (!flip) {
                        const r = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty(
                          "--tilt",
                          `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`,
                        );
                      }
                    }}
                    onPointerLeave={(e) =>
                      e.currentTarget.style.setProperty("--tilt", "-8deg")
                    }
                  >
                    <div
                      className="reader-front"
                      inert={flip ? true : undefined}
                    >
                      <div className="reader-screen">
                        <div className="reader-heading">
                          <b>Exploring now</b>
                          <span>5 notes</span>
                        </div>
                        {book !== null ? (
                          <div className="reading-page">
                            <h3>{topics[book][0]}</h3>
                            <p>{topics[book][2]}</p>
                            <button onClick={() => setBook(null)}>
                              ← My notes
                            </button>
                          </div>
                        ) : (
                          topics
                            .slice(page === 0 ? 0 : 4, page === 0 ? 4 : 5)
                            .map((t, i) => (
                              <button
                                className="topic"
                                key={t[0]}
                                onClick={() => {
                                  setBook(page === 0 ? i : 4);
                                  say(t[1]);
                                }}
                              >
                                <img
                                  src={A(`cover-${page === 0 ? i : 4}.svg`)}
                                  alt=""
                                />
                                <span>
                                  <b>{t[0]}</b>
                                  <span>{t[1]}</span>
                                  <small>Explore</small>
                                </span>
                              </button>
                            ))
                        )}
                        <div className="reader-bottom">
                          <span>My notes</span>
                          <span>Exploring now</span>
                        </div>
                      </div>
                      <div className="reader-controls">
                        <button
                          aria-label="Previous page"
                          onClick={() => {
                            setPage(0);
                            setBook(null);
                          }}
                        />
                        <button
                          aria-label="Next page"
                          onClick={() => {
                            setPage(1);
                            setBook(null);
                          }}
                        />
                      </div>
                      <button
                        className="reader-sticker first"
                        aria-label="Creative community"
                        onClick={() =>
                          say("Designing with people, for people.")
                        }
                      >
                        <img src={A("sticker-0.svg")} alt="" />
                      </button>
                      <button
                        className="reader-sticker second"
                        aria-label="Typography and visual design"
                        onClick={() =>
                          say(
                            "A communication design background, in every interface.",
                          )
                        }
                      >
                        <img src={A("sticker-10.svg")} alt="" />
                      </button>
                    </div>
                    <div
                      className="reader-back"
                      inert={flip ? undefined : true}
                    >
                      <span>hiya.</span>
                      {[3, 5, 6, 7, 8, 9].map((n, i) => (
                        <button
                          key={n}
                          className="back-sticker"
                          style={{
                            left: [10, 115, 28, 138, 10, 105][i],
                            top: [10, 40, 155, 180, 290, 300][i],
                            width: [105, 125, 95, 120, 110, 140][i],
                            rotate: `${[-12, 8, -6, 12, 7, -4][i]}deg`,
                          }}
                          aria-label={`Design sticker ${i + 1}`}
                          onClick={() =>
                            say(
                              [
                                "Stay curious.",
                                "Making ideas tangible.",
                                "Feedback welcome.",
                                "Research before assumptions.",
                                "Small details matter.",
                                "Thanks for unboxing.",
                              ][i],
                            )
                          }
                        >
                          <img src={A(`sticker-${n}.svg`)} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className="pill flip-button"
                    onClick={() => {
                      setFlip(!flip);
                      say(
                        flip
                          ? "Back to the notes."
                          : "There is always another side.",
                      );
                    }}
                  >
                    {flip ? "Flip it back" : "Flip it over"}
                  </button>
                  <small className="reader-caption">
                    MY NOTES · TAP A TOPIC · FLIP FOR THE STICKERS
                  </small>
                </div>
                <div className="postcard">
                  <small>POSTCARD · TO WHOEVER IS READING</small>
                  <p>
                    I’m Hiya. I turn questions into clear, useful experiences,
                    one project at a time.
                  </p>
                  <div className="postmark">
                    BOSTON
                    <br />
                    2026
                  </div>
                </div>
              </div>
            </div>
            {[0, 1, 2, 3, 4, 5].map((n, i) => (
              <button
                className={"about-sticker sticker-" + i}
                key={n}
                aria-label={`About Hiya sticker ${i + 1}`}
                onClick={() =>
                  say(
                    [
                      "Curiosity comes first.",
                      "Just a designer, making things useful.",
                      "Good ideas can come from anywhere.",
                      "Always open to feedback.",
                      "Would unbox again.",
                      "A little personality goes a long way.",
                    ][i],
                  )
                }
              >
                <img src={A(`about-${n}.svg`)} alt="" />
              </button>
            ))}
          </section>
        </main>
      )}
      <footer id="siteFooter">
        <div className="wrap footer-grid">
          <div>
            <Logo />
            <h2>
              Thanks for unboxing.
              <br />
              Let’s make something people actually use.
            </h2>
            <a className="email" href="mailto:hhpatel@mit.edu">
              hhpatel@mit.edu
            </a>
          </div>
          <div className="footer-col">
            <small>WORK</small>
            {projects.map((p) => (
              <a href={"#project/" + p.slug} key={p.slug}>
                {p.name}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <small>ELSEWHERE</small>
            <a href="mailto:hhpatel@mit.edu">Email</a>
            <a
              href="https://www.behance.net/hiyaapatell"
              target="_blank"
              rel="noreferrer"
            >
              Behance ↗
            </a>
            <a
              href="https://www.linkedin.com/in/hiya-patel-b4276925b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="Hiya-Patel-Resume.pdf" target="_blank">
              Résumé ↗
            </a>
          </div>
          <div className="gift-machine">
            <span>take a parting gift</span>
            <button
              className={
                (dispensing ? "dispensing " : "") + (!gifts ? "sold" : "")
              }
              aria-label={`Take a parting gift. ${gifts} left.`}
              disabled={!gifts || dispensing}
              onClick={dispense}
            >
              <span
                className="gacha-art"
                role="img"
                aria-label="Cardboard parting-gift machine"
                dangerouslySetInnerHTML={{ __html: gachaArt }}
              />
            </button>
            <small>
              {gifts ? `${gifts} CAPSULES LEFT` : "ALL GIFTS UNBOXED"}
            </small>
            <button
              className="sound-button"
              role="switch"
              aria-checked={sound}
              onClick={() => setSound(!sound)}
            >
              Sound {sound ? "on" : "off"}
            </button>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Hiya Patel · Designed in Boston.</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              nav("top");
            }}
          >
            Back to top ↑
          </a>
        </div>
      </footer>
      {companion.on && (
        <>
          <div ref={companionRef} className="companion">
            <img src={A(semiImage)} alt="Pixel, your portfolio companion" />
          </div>
          <div
            className="companion-says"
            style={{ opacity: toastVisible ? 1 : 0 }}
            aria-live="polite"
          >
            <small>PIXEL</small>
            {said}
          </div>
        </>
      )}
      {!route && (
        <div className="dock" aria-label="Step through the page">
          <button
            aria-label="Previous"
            disabled={current === 0}
            onClick={() => nav(sections[current - 1])}
          >
            ←
          </button>
          <b>{names[current]}</b>
          <div className="dock-dots">
            {sections.map((id, i) => (
              <button
                className={current === i ? "selected" : ""}
                aria-label={"Go to " + names[i]}
                key={id}
                onClick={() => nav(id)}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            disabled={current === 3}
            onClick={() => nav(sections[current + 1])}
          >
            →
          </button>
        </div>
      )}
      {tour !== null && (
        <div className="tour-bar">
          <span>
            {tour + 1} / 2 · {tour === 0 ? "The project" : "The process"}
          </span>
          <button
            onClick={() => {
              if (tour === 0) {
                setTour(1);
                jump("case-process");
              } else setTour(null);
            }}
          >
            {tour === 0 ? "Next →" : "Finish"}
          </button>
          <button aria-label="Close tour" onClick={() => setTour(null)}>
            ×
          </button>
        </div>
      )}
      {gift !== null && (
        <div
          className="gift-modal"
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              const buttons = [...e.currentTarget.querySelectorAll("button")];
              if (e.shiftKey && document.activeElement === buttons[0]) {
                e.preventDefault();
                buttons.at(-1).focus();
              } else if (
                !e.shiftKey &&
                document.activeElement === buttons.at(-1)
              ) {
                e.preventDefault();
                buttons[0].focus();
              }
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-title"
          onClick={() => setGift(null)}
        >
          <div className="gift-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-gift"
              autoFocus
              aria-label="Close gift"
              onClick={() => setGift(null)}
            >
              ×
            </button>
            <small>PARTING GIFT · 0{gift + 1}</small>
            <img
              src={A(`sticker-${[3, 8, 9][gift]}.svg`)}
              alt="A little design sticker"
            />
            <h2 id="gift-title">
              {["Stay curious.", "Keep making.", "Take a second look."][gift]}
            </h2>
            <p>
              {
                [
                  "The best starting point is often a better question.",
                  "An idea becomes useful when someone can try it.",
                  "There might be something good underneath the clutter.",
                ][gift]
              }
            </p>
            <button className="pill yellow" onClick={() => setGift(null)}>
              Pocket it →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export { App };
