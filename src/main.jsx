import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Search,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  BookOpen,
  Clock,
  Globe2,
  Route,
  GitBranch,
  Layers,
  RotateCcw,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import {
  articles,
  sources,
  timeline,
  regions,
  quizzes,
  faqs,
  readingPath,
} from "./data";
import { HeroArt, LeafMark, Dharma, RouteMap } from "./Illustrations";
import MindMap from "./MindMap";
import "./style.css";
const byId = Object.fromEntries(articles.map((a) => [a.id, a]));
const nav = [
  ["overview", "总览"],
  ["knowledge-map", "宗派思维导图"],
  ["history", "历史脉络"],
  ["traditions", "宗派关系"],
  ["regions", "地域佛教"],
  ["library", "知识索引"],
];

const knowledgeBranches = [
  {
    id: "origins",
    label: "起源与历史",
    range: "前5世纪 · 当代",
    summary: "从释迦牟尼、早期僧团与部派，到大乘、密教和近现代复兴。",
    icon: Route,
    articles: ["buddha", "early", "india", "modern"],
  },
  {
    id: "schools",
    label: "传统与宗派",
    range: "体系 · 宗派",
    summary: "先分清上座部、大乘和金刚乘，再进入汉传、日本与藏传各派。",
    icon: GitBranch,
    articles: [
      "three",
      "theravada",
      "mahayana",
      "vajrayana",
      "china-schools",
      "tibet-schools",
    ],
  },
  {
    id: "places",
    label: "地域与传播",
    range: "印度 · 亚洲",
    summary: "沿陆路与海路，看佛教如何进入中国、西藏、日本与东南亚。",
    icon: Globe2,
    articles: [
      "india",
      "china",
      "tibet",
      "japan",
      "southeast",
      "korea-vietnam",
    ],
  },
  {
    id: "ideas",
    label: "思想与生活",
    range: "教义 · 经典 · 实践",
    summary: "从四圣谛、缘起与空性，连接经典、禅修、伦理和日常文化。",
    icon: Layers,
    articles: [
      "truths",
      "dependent",
      "self",
      "emptiness",
      "canon",
      "meditation",
      "ethics",
      "ritual",
    ],
  },
];
function useStored(key) {
  const [items, set] = useState(() => {
    try {
      const x = JSON.parse(localStorage.getItem(key));
      return Array.isArray(x)
        ? x.filter((id) => typeof id === "string" && byId[id])
        : [];
    } catch {
      return [];
    }
  });
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [items, key]);
  return [items, set, failed];
}
function SectionTitle({ number, eyebrow, title, children, aside }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span>{number}</span>
          {eyebrow}
        </div>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {aside}
    </div>
  );
}
function App() {
  const [saved, setSaved, saveFailed] = useStored("yiye-bookmarks"),
    [read, setRead, readFailed] = useStored("yiye-read");
  const [active, setActive] = useState("overview"),
    [mobile, setMobile] = useState(false),
    [modal, setModal] = useState(() => {
      const id = new URLSearchParams(location.search).get("article");
      return byId[id] ? { type: "article", id } : null;
    }),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("全部"),
    [search, setSearch] = useState(""),
    [region, setRegion] = useState("india"),
    [mapBranch, setMapBranch] = useState("origins"),
    [era, setEra] = useState(0),
    [expanded, setExpanded] = useState(false),
    [quizIndex, setQuizIndex] = useState(0),
    [answers, setAnswers] = useState({}),
    [flash, setFlash] = useState(0),
    [flipped, setFlipped] = useState(false);
  const dialog = useRef(null),
    articleTop = useRef(null);
  const navigate = (id) => {
    setMobile(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setActive(id);
  };
  const openArticle = (id) => {
    if (!byId[id]) return;
    setModal({ type: "article", id });
    const url = new URL(location.href);
    url.searchParams.set("article", id);
    history.replaceState(null, "", url);
  };
  const close = () => {
    setModal(null);
    const url = new URL(location.href);
    url.searchParams.delete("article");
    history.replaceState(null, "", url);
  };
  const toggleSaved = (id) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const toggleRead = (id) =>
    setRead((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  useEffect(() => {
    if (modal) {
      if (!dialog.current?.open) dialog.current?.showModal();
      document.body.style.overflow = "hidden";
      dialog.current?.scrollTo(0, 0);
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setModal({ type: "search" });
        setSearch("");
      }
    };
    window.addEventListener("keydown", onKey);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    nav.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      obs.disconnect();
    };
  }, []);
  const filtered = articles.filter(
    (a) =>
      (filter === "全部" || a.category === filter) &&
      [a.title, a.subtitle, ...a.sections.flat()]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const searchResults = articles.filter((a) =>
    [a.title, a.subtitle, ...a.sections.flat()]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const currentRegion = regions.find((r) => r.id === region),
    currentBranch = knowledgeBranches.find((branch) => branch.id === mapBranch),
    item = modal?.type === "article" ? byId[modal.id] : null;
  const studyArticles = articles.filter((a) => a.category === "思想");
  const articleButtons = (ids) =>
    ids.map((id) => (
      <button key={id} className="related" onClick={() => openArticle(id)}>
        {byId[id].title}
        <ArrowUpRight size={15} />
      </button>
    ));
  return (
    <>
      <a className="skip-link" href="#main">
        跳至正文
      </a>
      <header className="header">
        <div className="header-inner">
          <a
            href="#overview"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              navigate("overview");
            }}
          >
            <LeafMark />
            <div>
              <strong>一叶</strong>
              <span>佛教脉络指南</span>
            </div>
          </a>
          <nav aria-label="主导航" className={mobile ? "open" : ""}>
            {nav.map(([id, label]) => (
              <a
                href={"#" + id}
                key={id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(id);
                }}
                className={active === id ? "active" : ""}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <button
              className="icon-button"
              aria-label="搜索知识"
              onClick={() => {
                setModal({ type: "search" });
                setSearch("");
              }}
            >
              <Search size={19} />
            </button>
            <span className="tool-divider" />
            <button
              className="reading-button"
              aria-label="我的阅读"
              onClick={() => setModal({ type: "saved" })}
            >
              <Bookmark size={17} />
              <span>我的阅读</span>
              {read.length > 0 && <b>{read.length}</b>}
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label={mobile ? "关闭导航" : "打开导航"}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container" id="overview">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="tiny-leaf">✳</span>一份人人都能读懂的佛教指南
            </div>
            <h1>
              一片菩提叶，
              <br />
              看见<span>整个佛教。</span>
            </h1>
            <p className="hero-description">
              从古印度的一次觉醒，到遍布亚洲的万千枝叶。
              <br className="desktop-break" />
              把历史、宗派与思想连起来，读懂佛教的来龙去脉。
            </p>
            <div className="hero-actions">
              <button
                className="button primary"
                onClick={() => openArticle("start")}
              >
                从这里开始 <ArrowRight size={17} />
              </button>
              <button
                className="text-button"
                onClick={() => navigate("knowledge-map")}
              >
                先看一张脉络图 <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="hero-footnote">
              <span>不需要背景知识</span>
              <i />
              每次读懂一个问题
              <i />
              <span>保持好奇，慢慢探索</span>
            </div>
          </div>
          <div className="hero-art">
            <HeroArt />
            <div className="art-caption">
              <span>01 / THE ROOTS OF BUDDHISM</span>
              <span>同源 · 多样 · 相连</span>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="intro-strip">
            <div className="intro-label">
              <BookOpen size={19} />
              <strong>不知道从哪里开始？</strong>
              <span>跟着三个问题，建立全貌</span>
            </div>
            {[
              ["01", "佛教从哪里来？", "history"],
              ["02", "各个宗派怎么分？", "traditions"],
              ["03", "在各地如何生长？", "regions"],
            ].map(([n, t, id]) => (
              <button key={n} onClick={() => navigate(id)}>
                <span>{n}</span>
                {t}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>
        <section className="knowledge-map-section" id="knowledge-map">
          <div className="container section">
            <SectionTitle
              number="01"
              eyebrow="THE KNOWLEDGE MAP"
              title="从一个源头，看见宗派的来路。"
              aside={
                <button
                  className="text-button"
                  onClick={() => openArticle("start")}
                >
                  阅读入门说明 <ArrowUpRight size={16} />
                </button>
              }
            >
              从佛教起源，到中国八宗、日本诸宗和藏传各派。沿着连线逐层展开，既看每一支，也看它从哪里来。
            </SectionTitle>
            <MindMap openArticle={openArticle} />
            <details className="knowledge-reading-paths">
              <summary>
                从历史、地域、思想四条主线继续阅读 <ChevronDown size={16} />
              </summary>
              <div className="knowledge-map-shell">
                <div className="knowledge-map-canvas">
                  <svg
                    className="knowledge-map-connectors"
                    viewBox="0 0 1200 280"
                    role="img"
                    aria-labelledby="buddhism-map-title buddhism-map-desc"
                  >
                    <title id="buddhism-map-title">佛教知识图谱</title>
                    <desc id="buddhism-map-desc">
                      佛教共同根基向起源与历史、传统与宗派、地域与传播、思想与生活四条主线展开。
                    </desc>
                    <path d="M600 104V144" />
                    <path d="M152 144H1048" />
                    <path d="M152 144V184" />
                    <path d="M448 144V184" />
                    <path d="M752 144V184" />
                    <path d="M1048 144V184" />
                  </svg>
                  <button
                    className="knowledge-root"
                    onClick={() => openArticle("start")}
                  >
                    <LeafMark size={26} />
                    <span>
                      <small>共同根基</small>
                      佛教：一条觉醒之道
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                  <div className="knowledge-branches">
                    {knowledgeBranches.map((branch) => {
                      const Icon = branch.icon;
                      return (
                        <button
                          key={branch.id}
                          className={mapBranch === branch.id ? "active" : ""}
                          aria-pressed={mapBranch === branch.id}
                          onClick={() => setMapBranch(branch.id)}
                        >
                          <Icon size={18} />
                          <span>
                            <strong>{branch.label}</strong>
                            <small>{branch.range}</small>
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="knowledge-map-detail" aria-live="polite">
                  <div className="knowledge-detail-copy">
                    <span className="knowledge-detail-index">
                      {String(
                        knowledgeBranches.findIndex(
                          (branch) => branch.id === mapBranch,
                        ) + 1,
                      ).padStart(2, "0")}
                      <i />
                      04
                    </span>
                    <div>
                      <div className="eyebrow">CURRENT PATH</div>
                      <h3>{currentBranch.label}</h3>
                      <p>{currentBranch.summary}</p>
                    </div>
                  </div>
                  <div className="knowledge-topic-list">
                    {currentBranch.articles.map((id, index) => (
                      <button key={id} onClick={() => openArticle(id)}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{byId[id].title}</strong>
                          <small>{byId[id].subtitle}</small>
                        </div>
                        <ArrowUpRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>
            <div className="knowledge-map-note">
              <GitBranch size={16} />
              <p>
                <strong>读图提示：</strong>
                “上座部、大乘、金刚乘”是传统与修行体系；“汉传、藏传、日本佛教”是地域与文化传统。两种分类彼此交叉，不能放在同一级简单并列。
              </p>
            </div>
          </div>
        </section>
        <section className="section container" id="traditions">
          <SectionTitle
            number="02"
            eyebrow="THE BIG PICTURE"
            title="同一个源头，不同的枝叶。"
            aside={
              <button
                className="text-button"
                onClick={() => openArticle("three")}
              >
                理解分类方式 <ArrowUpRight size={16} />
              </button>
            }
          >
            先看共同的根，再看思想、修行与地域如何交织。
          </SectionTitle>
          <div className="relationship">
            <div className="root-node">
              <span className="node-dot" />
              <button onClick={() => openArticle("buddha")}>
                释迦牟尼的教导
              </button>
              <span>古代南亚 · 约公元前5世纪</span>
            </div>
            <div className="tree-stem" />
            <button className="early-node" onClick={() => openArticle("early")}>
              早期僧团与部派发展 <ArrowUpRight size={13} />
            </button>
            <div className="branch-line" />
            <div className="tradition-grid">
              {[
                {
                  id: "theravada",
                  en: "THERAVĀDA",
                  name: "上座部佛教",
                  label: "以巴利经典为核心的传承",
                  kind: "wheel",
                  color: "gold",
                  text: "重视戒定慧与解脱之道，在布施、持戒与禅修中，培育智慧与慈悲。",
                  regions: "斯里兰卡 · 泰国 · 缅甸等",
                  tags: ["巴利三藏", "阿罗汉理想"],
                },
                {
                  id: "mahayana",
                  en: "MAHĀYĀNA",
                  name: "大乘佛教",
                  label: "以菩萨道为理想的传统家族",
                  kind: "lotus",
                  color: "green",
                  text: "以菩提心连接智慧与慈悲，在自己的觉醒之路上，帮助更多众生离苦。",
                  regions: "中国 · 朝鲜半岛 · 日本 · 越南等",
                  tags: ["菩萨道", "般若与空性"],
                },
                {
                  id: "vajrayana",
                  en: "VAJRAYĀNA",
                  name: "金刚乘",
                  label: "大乘框架下的密教修行体系",
                  kind: "vajra",
                  color: "clay",
                  text: "在大乘见地与发心的基础上，结合真言、曼荼罗、观修及传承仪轨。",
                  regions: "西藏 · 不丹 · 蒙古 · 日本真言宗等",
                  tags: ["显密相依", "师承与仪轨"],
                },
              ].map((t) => (
                <button
                  className={"tradition-card " + t.color}
                  key={t.id}
                  onClick={() => openArticle(t.id)}
                >
                  <div className="tradition-top">
                    <span>{t.en}</span>
                    <ArrowUpRight size={20} />
                  </div>
                  <Dharma kind={t.kind} />
                  <h3>{t.name}</h3>
                  <div className="tradition-label">{t.label}</div>
                  <p>{t.text}</p>
                  <div className="tags">
                    {t.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="card-location">
                    <Globe2 size={13} />
                    {t.regions}
                  </div>
                </button>
              ))}
            </div>
            <div className="tree-note">
              <GitBranch size={16} />
              <span>
                这是帮助理解的关系示意，并非三条互斥的历史分支。
                <b>金刚乘通常以大乘为基础</b>，地域传统也常包含多种修行体系。
              </span>
            </div>
          </div>
          <button
            className="terminology-note"
            onClick={() => openArticle("hinayana")}
          >
            <span className="note-icon">i</span>
            <div>
              <strong>你可能听过“小乘佛教”</strong>
              <span>
                它是带有论辩色彩的历史称呼，不能直接等同于今天的上座部佛教。我们把这件事讲清楚。
              </span>
            </div>
            <ArrowRight size={20} />
          </button>
          <div className="lineage-heading">
            <h3>再走近一步，看看具体宗派</h3>
            <span>点击展开它的来路与特点</span>
          </div>
          <div className="lineage-grid">
            {[
              [
                "汉传与东亚",
                "china",
                [
                  "china-schools",
                  "chan",
                  "pureland",
                  "tiantai",
                  "huayan",
                  "madhyamaka",
                  "yogacara",
                ],
              ],
              ["日本的多种传统", "japan", ["japan-schools", "shingon"]],
              ["藏传的多条传承", "tibet", ["tibet-schools", "vajrayana"]],
            ].map(([title, id, ids]) => (
              <div className="lineage-box" key={id}>
                <button
                  className="lineage-title"
                  onClick={() => openArticle(id)}
                >
                  {title}
                  <ArrowUpRight size={16} />
                </button>
                <div>{articleButtons(ids)}</div>
                {id === "tibet" && <p>宁玛 · 噶举 · 萨迦 · 格鲁 · 觉囊</p>}
                {id === "japan" && (
                  <p>奈良诸宗 · 天台 · 真言 · 净土 · 禅 · 日莲系</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="history-section" id="history">
          <div className="container section">
            <SectionTitle
              number="03"
              eyebrow="A JOURNEY THROUGH TIME"
              title="两千五百余年，不是一条直线。"
            >
              从起源到分流，从翻译到相遇。每一次传播，都带来新的理解。
            </SectionTitle>
            <div className="timeline-tabs" role="tablist" aria-label="历史时期">
              {timeline.map((t, i) => (
                <button
                  role="tab"
                  aria-selected={era === i}
                  aria-controls="era-panel"
                  id={"era-" + i}
                  key={t.date}
                  className={era === i ? "active" : ""}
                  onClick={() => setEra(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const next =
                        (i +
                          (e.key === "ArrowRight" ? 1 : -1) +
                          timeline.length) %
                        timeline.length;
                      setEra(next);
                      document.getElementById("era-" + next)?.focus();
                    }
                  }}
                >
                  <span className="time-point" />
                  {t.date}
                </button>
              ))}
            </div>
            <div
              className="era-panel"
              id="era-panel"
              role="tabpanel"
              aria-labelledby={"era-" + era}
            >
              <div className="era-number">
                {String(era + 1).padStart(2, "0")}
                <span>/ 07</span>
              </div>
              <div>
                <span className="eyebrow">{timeline[era].date}</span>
                <h3>{timeline[era].title}</h3>
                <p>{timeline[era].text}</p>
                <button
                  className="text-button"
                  onClick={() => openArticle(timeline[era].id)}
                >
                  读懂这个阶段 <ArrowRight size={16} />
                </button>
              </div>
              <div className="era-decoration">
                <Dharma kind={era % 2 ? "lotus" : "wheel"} />
              </div>
            </div>
            <p className="small-note">
              年代为入门性的约略划分；各传统曾长期并存与交流，并非依次替代。早期佛教的具体纪年仍有争议。
            </p>
          </div>
        </section>
        <section className="section container" id="regions">
          <SectionTitle
            number="04"
            eyebrow="ACROSS ASIA"
            title="走向不同的土地，长出不同的风景。"
          >
            佛教不只属于一个国家。沿着传播的路径，看看它如何与各地文化相遇。
          </SectionTitle>
          <div className="region-layout">
            <div className="region-map-wrap">
              <div className="map-topline">
                <span>
                  <span className="status-dot" />
                  佛教的亚洲传播
                </span>
                <span>点击地点探索</span>
              </div>
              <RouteMap
                selected={region}
                onSelect={setRegion}
                regions={regions}
              />
              <div className="map-legend">
                <span>
                  <i style={{ background: "#8b9470" }} />
                  中亚与东亚
                </span>
                <span>
                  <i style={{ background: "#bd9b62" }} />
                  南亚与东南亚
                </span>
                <span>
                  <i style={{ background: "#b48b7b" }} />
                  喜马拉雅
                </span>
              </div>
            </div>
            <div className="region-detail">
              <div className="eyebrow">{currentRegion.en}</div>
              <span className="region-tag">{currentRegion.tag}</span>
              <h3>{currentRegion.name}</h3>
              <p>{currentRegion.desc}</p>
              <div className="region-excerpt">
                {byId[region].sections[0][1]}
              </div>
              <button
                className="button primary"
                onClick={() => openArticle(region)}
              >
                探索这段历史 <ArrowRight size={16} />
              </button>
              <div className="region-pagination">
                {regions.findIndex((r) => r.id === region) + 1} /{" "}
                {regions.length}
                <div>
                  <button
                    aria-label="上一个地区"
                    onClick={() =>
                      setRegion(
                        regions[
                          (regions.findIndex((r) => r.id === region) +
                            regions.length -
                            1) %
                            regions.length
                        ].id,
                      )
                    }
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    aria-label="下一个地区"
                    onClick={() =>
                      setRegion(
                        regions[
                          (regions.findIndex((r) => r.id === region) + 1) %
                            regions.length
                        ].id,
                      )
                    }
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="region-tabs">
            {regions.map((r) => (
              <button
                key={r.id}
                aria-pressed={r.id === region}
                className={r.id === region ? "active" : ""}
                onClick={() => setRegion(r.id)}
              >
                {r.name}
              </button>
            ))}
          </div>
        </section>
        <section className="knowledge-section" id="library">
          <div className="container section">
            <SectionTitle
              number="05"
              eyebrow="ONE QUESTION AT A TIME"
              title="从一个问题，读懂一个概念。"
              aside={
                <span className="article-count">
                  {articles.length} 篇通俗导读
                </span>
              }
            >
              不急着记住所有名词。带着好奇，找到你想了解的那一页。
            </SectionTitle>
            <div className="library-toolbar">
              <div className="filter-tabs" aria-label="知识分类">
                {[
                  "全部",
                  "入门",
                  "思想",
                  "宗派",
                  "地区",
                  "历史",
                  "经典",
                  "实践",
                  "文化",
                ].map((c) => (
                  <button
                    aria-pressed={filter === c}
                    className={filter === c ? "active" : ""}
                    key={c}
                    onClick={() => {
                      setFilter(c);
                      setExpanded(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <label className="inline-search">
                <Search size={17} />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setExpanded(true);
                  }}
                  placeholder="搜索，比如「空性」"
                  aria-label="搜索知识索引"
                />
                {query && (
                  <button aria-label="清除搜索" onClick={() => setQuery("")}>
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>
            <div className="article-grid">
              {(expanded ? filtered : filtered.slice(0, 9)).map((a, i) => (
                <article key={a.id} className="article-card">
                  <button
                    className="article-open"
                    onClick={() => openArticle(a.id)}
                  >
                    <div className="article-meta">
                      <span>{a.category}</span>
                      <span>
                        {read.includes(a.id) ? (
                          <>
                            <Check size={12} /> 已读
                          </>
                        ) : (
                          <>
                            <Clock size={12} /> 约 2 分钟
                          </>
                        )}
                      </span>
                    </div>
                    <h3>{a.title}</h3>
                    <p>{a.subtitle}</p>
                    <div className="article-card-footer">
                      <span>阅读全文</span>
                      <ArrowUpRight size={18} />
                    </div>
                  </button>
                  <button
                    className={
                      "article-bookmark " +
                      (saved.includes(a.id) ? "saved" : "")
                    }
                    aria-label={
                      (saved.includes(a.id) ? "取消收藏：" : "收藏：") + a.title
                    }
                    onClick={() => toggleSaved(a.id)}
                  >
                    <Bookmark
                      size={16}
                      fill={saved.includes(a.id) ? "currentColor" : "none"}
                    />
                  </button>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <Search size={32} />
                <h3>还没有找到这个词</h3>
                <p>试试“禅宗”“日本”或“经典”，也可以切换到全部分类。</p>
                <button
                  className="button"
                  onClick={() => {
                    setFilter("全部");
                    setQuery("");
                  }}
                >
                  重置筛选
                </button>
              </div>
            )}
            {!expanded && filtered.length > 9 && (
              <button
                className="button show-more"
                onClick={() => setExpanded(true)}
              >
                展开全部 {filtered.length} 篇导读 <ChevronDown size={17} />
              </button>
            )}
            <div className="learning-banner">
              <div className="learning-symbol">
                <LeafMark size={46} />
              </div>
              <div>
                <span className="eyebrow">LEARN AT YOUR OWN PACE</span>
                <h3>读过的知识，慢慢变成自己的。</h3>
                <p>用概念闪卡温习，再用 5 个小问题串起全貌。</p>
              </div>
              <div className="learning-actions">
                <button
                  className="button"
                  onClick={() => {
                    setFlipped(false);
                    setModal({ type: "flash" });
                  }}
                >
                  概念闪卡 <Layers size={16} />
                </button>
                <button
                  className="button dark"
                  onClick={() => {
                    setQuizIndex(0);
                    setAnswers({});
                    setModal({ type: "quiz" });
                  }}
                >
                  试试小测验 <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="section container faq-section">
          <div>
            <div className="eyebrow">
              <span>06</span>A LITTLE MORE CLARITY
            </div>
            <h2>
              几个常见的误解，
              <br />
              在这里说清楚。
            </h2>
            <p>复杂的传统，值得多一点理解。</p>
            <LeafMark size={90} />
          </div>
          <div className="faqs">
            {faqs.map(([q, a], i) => (
              <details key={q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {q}
                  <ChevronDown size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="sources-section container">
          <div>
            <BookOpen size={21} />
            <h3>保持通俗，也保留出处。</h3>
            <p>
              本指南区分历史研究与传统自身的解释。每篇导读附有参考入口，欢迎继续读原始资料。
            </p>
          </div>
          <button
            className="text-button"
            onClick={() => setModal({ type: "sources" })}
          >
            资料来源与阅读说明 <ArrowUpRight size={17} />
          </button>
        </section>
      </main>
      <footer>
        <div className="container footer-main">
          <div className="brand">
            <LeafMark />
            <div>
              <strong>一叶</strong>
              <span>佛教脉络指南</span>
            </div>
          </div>
          <p>一叶见脉络，万法待探索。</p>
          <button className="text-button" onClick={() => navigate("overview")}>
            回到开始 ↑
          </button>
        </div>
        <div className="container footer-bottom">
          <span>以理解为起点 · 一份面向所有人的知识导览</span>
          <span>内容整理于 2026 年 10 月 · 阅读进度保存在本机</span>
        </div>
      </footer>
      {(saveFailed || readFailed) && (
        <div className="storage-notice" role="status">
          浏览器暂时无法保存记录；本次阅读仍可继续。
        </div>
      )}
      <dialog
        ref={dialog}
        className={
          "modal " + (modal?.type === "article" ? "reading-modal" : "")
        }
        aria-label={
          item?.title ||
          {
            search: "搜索知识",
            saved: "我的阅读",
            sources: "资料来源",
            quiz: "知识小测验",
            flash: "概念闪卡",
          }[modal?.type] ||
          "阅读窗口"
        }
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) {
            const r = dialog.current.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              close();
          }
        }}
      >
        <div className="modal-toolbar">
          <span>
            <LeafMark size={19} />
            一叶 · {modal?.type === "article" ? "慢慢读，慢慢理解" : "学习空间"}
          </span>
          <button className="icon-button" aria-label="关闭窗口" onClick={close}>
            <X size={21} />
          </button>
        </div>
        {item && (
          <article className="reading-content" ref={articleTop}>
            <div className="eyebrow">{item.category} / 约 2 分钟</div>
            <h2>{item.title}</h2>
            <p className="reading-subtitle">{item.subtitle}</p>
            <div className="reading-tools">
              <button onClick={() => toggleSaved(item.id)}>
                <Bookmark
                  size={15}
                  fill={saved.includes(item.id) ? "currentColor" : "none"}
                />
                {saved.includes(item.id) ? "已收藏" : "收藏这篇"}
              </button>
              <button onClick={() => toggleRead(item.id)}>
                <Check size={15} />
                {read.includes(item.id) ? "已读 · 点击撤销" : "标记为已读"}
              </button>
            </div>
            {item.sections.map(([title, text], i) => (
              <section className="reading-section" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </section>
            ))}
            <aside className="reading-sources">
              <h4>参考与延伸阅读</h4>
              {item.sourceIds.map((id) => (
                <a
                  key={id}
                  href={sources[id][1]}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sources[id][0]}
                  <ExternalLink size={13} />
                </a>
              ))}
              <small>
                本文为综合性入门导读；来源包含学术机构与传统内部材料，具体见解不代表所有佛教流派。
              </small>
            </aside>
            {item.related.length > 0 && (
              <div className="related-section">
                <h4>把脉络继续连起来</h4>
                {articleButtons(item.related)}
              </div>
            )}
            <div className="reading-next">
              <button
                className="button primary"
                onClick={() => {
                  if (!read.includes(item.id)) setRead((p) => [...p, item.id]);
                  const index = readingPath.indexOf(item.id);
                  const next =
                    index >= 0
                      ? readingPath[(index + 1) % readingPath.length]
                      : item.related[0] || "start";
                  openArticle(next);
                }}
              >
                读完了，继续下一篇 <ArrowRight size={16} />
              </button>
              <span>
                已读 {read.length} / {articles.length} 篇
              </span>
            </div>
          </article>
        )}
        {modal?.type === "search" && (
          <div className="modal-content">
            <div className="eyebrow">FIND YOUR NEXT QUESTION</div>
            <h2>你想了解什么？</h2>
            <label className="modal-search">
              <Search size={21} />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索宗派、地区、概念……"
                aria-label="搜索所有导读"
              />
            </label>
            <div className="search-count">
              {search
                ? `找到 ${searchResults.length} 篇相关导读`
                : "从这些入门问题开始"}
            </div>
            <div className="result-list">
              {(search
                ? searchResults
                : articles.filter((a) => readingPath.slice(0, 6).includes(a.id))
              ).map((a) => (
                <button key={a.id} onClick={() => openArticle(a.id)}>
                  <div>
                    <small>{a.category}</small>
                    <h3>{a.title}</h3>
                    <p>{a.subtitle}</p>
                  </div>
                  <ArrowUpRight size={18} />
                </button>
              ))}
              {searchResults.length === 0 && (
                <div className="empty-state">
                  没有找到相关内容，换一个关键词试试。
                </div>
              )}
            </div>
          </div>
        )}
        {modal?.type === "saved" && (
          <div className="modal-content">
            <div className="eyebrow">YOUR READING JOURNEY</div>
            <h2>慢慢读，也是一种进步。</h2>
            <div className="progress-stats">
              <div>
                <b>
                  {read.length}
                  <small> / {articles.length}</small>
                </b>
                <span>已经读过</span>
              </div>
              <div>
                <b>{saved.length}</b>
                <span>收藏的导读</span>
              </div>
              <div>
                <b>
                  {Math.round((read.length / articles.length) * 100)}
                  <small>%</small>
                </b>
                <span>探索进度</span>
              </div>
            </div>
            <div className="progress-track">
              <i
                style={{ width: (read.length / articles.length) * 100 + "%" }}
              />
            </div>
            <h3>我的收藏</h3>
            {saved.length ? (
              <div className="result-list">
                {saved.map((id) => (
                  <div className="saved-row" key={id}>
                    <button onClick={() => openArticle(id)}>
                      {byId[id].title}
                      <ArrowUpRight size={15} />
                    </button>
                    <button
                      className="icon-button"
                      aria-label={"取消收藏：" + byId[id].title}
                      onClick={() => toggleSaved(id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-copy">
                还没有收藏。读到感兴趣的内容，点击书签就能留在这里。
              </p>
            )}
            <h3>推荐入门路线</h3>
            <div className="reading-path">
              {readingPath.map((id, i) => (
                <button key={id} onClick={() => openArticle(id)}>
                  <span>
                    {read.includes(id) ? (
                      <Check size={15} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  {byId[id].title}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
            {read.length > 0 && (
              <>
                <h3>已经读过</h3>
                <div className="result-list">
                  {read.map((id) => (
                    <button key={id} onClick={() => openArticle(id)}>
                      <span>{byId[id].title}</span>
                      <Check size={15} />
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className="small-note">
              收藏与进度只保存在当前浏览器，不需要账号。清理浏览器数据后会重置。
            </p>
          </div>
        )}
        {modal?.type === "sources" && (
          <div className="modal-content">
            <div className="eyebrow">SOURCES & EDITORIAL NOTES</div>
            <h2>资料来源与阅读说明</h2>
            <p>
              本网站是一份入门地图，覆盖主要脉络与代表性宗派，不是穷尽所有支派的百科全书。我们将历史研究、经典文本和传统自述放在一起阅读，不给宗派排高低。
            </p>
            <h3>如何使用这份指南</h3>
            <p>
              历史年代有争论时使用约略表述；“传统认为”不等于已被独立证实。地域名称用于说明文化与传播，不意味着内部完全一致。正文中的茶、杯子与日常情绪等例子，是教学类比。
            </p>
            <h3>继续阅读</h3>
            <div className="source-list">
              {Object.entries(sources).map(([id, [name, url]]) => (
                <a key={id} href={url} target="_blank" rel="noreferrer">
                  <span>{name}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
            <p className="small-note">
              资料整理：2026 年 10
              月。机构导览适合建立背景；经典数据库适合核对原文；寺院与传承组织的介绍用于理解各自的内部视角。原创插画是概念性示意，不是文物复原或精确地理图。
            </p>
          </div>
        )}
        {modal?.type === "flash" && (
          <div className="modal-content flash-content">
            <div className="eyebrow">
              CONCEPT CARDS · {flash + 1} / {studyArticles.length}
            </div>
            <h2>一个概念，换一种理解。</h2>
            <button
              className={"flash-card " + (flipped ? "flipped" : "")}
              onClick={() => setFlipped(!flipped)}
              aria-label={flipped ? "返回问题" : "翻开概念解释"}
            >
              {!flipped ? (
                <>
                  <Dharma kind="lotus" />
                  <h3>{studyArticles[flash].title}</h3>
                  <span>
                    先想一想，再点击翻开 <RotateCcw size={14} />
                  </span>
                </>
              ) : (
                <>
                  <span className="eyebrow">试着这样理解</span>
                  <h3>{studyArticles[flash].subtitle}</h3>
                  <p>{studyArticles[flash].sections[0][1]}</p>
                  <small>点击回到正面</small>
                </>
              )}
            </button>
            <div className="flash-controls">
              <button
                className="button"
                onClick={() => {
                  setFlash(
                    (flash + studyArticles.length - 1) % studyArticles.length,
                  );
                  setFlipped(false);
                }}
              >
                <ArrowLeft size={16} />
                上一张
              </button>
              <button
                className="text-button"
                onClick={() => openArticle(studyArticles[flash].id)}
              >
                阅读全文
              </button>
              <button
                className="button"
                onClick={() => {
                  setFlash((flash + 1) % studyArticles.length);
                  setFlipped(false);
                }}
              >
                下一张
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
        {modal?.type === "quiz" && (
          <div className="modal-content quiz-content">
            <div className="eyebrow">A SMALL KNOWLEDGE CHECK</div>
            {quizIndex < quizzes.length ? (
              <>
                <div className="quiz-progress">
                  问题 {quizIndex + 1} / {quizzes.length}
                  <span>{Object.keys(answers).length} 题已回答</span>
                </div>
                <h2>{quizzes[quizIndex].q}</h2>
                <div className="quiz-options">
                  {quizzes[quizIndex].options.map((option, i) => (
                    <button
                      key={option}
                      disabled={answers[quizIndex] !== undefined}
                      className={
                        answers[quizIndex] !== undefined
                          ? i === quizzes[quizIndex].answer
                            ? "correct"
                            : answers[quizIndex] === i
                              ? "incorrect"
                              : ""
                          : ""
                      }
                      onClick={() => setAnswers({ ...answers, [quizIndex]: i })}
                    >
                      <span>{"ABCD"[i]}</span>
                      {option}
                      {answers[quizIndex] !== undefined &&
                        i === quizzes[quizIndex].answer && <Check size={18} />}
                    </button>
                  ))}
                </div>
                {answers[quizIndex] !== undefined && (
                  <div className="quiz-explanation" role="status">
                    <strong>
                      {answers[quizIndex] === quizzes[quizIndex].answer
                        ? "答对了，脉络更清楚了一点。"
                        : "再看一眼，关键在这里。"}
                    </strong>
                    <p>{quizzes[quizIndex].explain}</p>
                    <button
                      className="button primary"
                      onClick={() => setQuizIndex(quizIndex + 1)}
                    >
                      {quizIndex === quizzes.length - 1 ? "看看结果" : "下一题"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="quiz-result">
                <GraduationCap size={48} />
                <h2>又把脉络连接了一遍。</h2>
                <div className="score">
                  {quizzes.filter((q, i) => answers[i] === q.answer).length}
                  <span> / {quizzes.length}</span>
                </div>
                <p>答对多少都没关系，理解这些差别才是目的。</p>
                <button
                  className="button primary"
                  onClick={() => {
                    setQuizIndex(0);
                    setAnswers({});
                  }}
                >
                  再试一次 <RotateCcw size={16} />
                </button>
                <button
                  className="text-button"
                  onClick={() => openArticle("three")}
                >
                  回顾宗派关系 <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js").catch(() => {}),
  );
}
