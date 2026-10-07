import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Minus,
  Plus,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import {
  childrenOf,
  findMapPath,
  mapSources,
  mapViews,
  mindmapNodes,
} from "./mindmapData";
import "./mindmap.css";

const NODE_WIDTH = 192;
const NODE_HEIGHT = 88;
const COLUMN = 304;
const ROW = 112;

// Stable sibling order, with parents centered between their first and last child.
// Coordinates are calculated from the currently expanded tree, never from text widths.
export function layoutMindmap(root, expanded, view) {
  let cursor = 32;
  const positions = [];
  const edges = [];
  let maxDepth = 0;
  const visit = (id, depth, ancestors) => {
    const childIds = expanded.has(id) ? childrenOf(id, view) : [];
    const childPositions = childIds.map((child) =>
      visit(child, depth + 1, [...ancestors, id]),
    );
    const y = childPositions.length
      ? (childPositions[0].y + childPositions.at(-1).y) / 2
      : cursor + NODE_HEIGHT / 2;
    if (!childPositions.length) cursor += ROW;
    const position = {
      id,
      x: 32 + depth * COLUMN,
      y,
      depth,
      path: [...ancestors, id],
    };
    positions.push(position);
    if (childPositions.length)
      edges.push({ parent: position, children: childPositions });
    maxDepth = Math.max(maxDepth, depth);
    return position;
  };
  visit(root, 0, []);
  positions.sort((a, b) => a.depth - b.depth || a.y - b.y);
  return {
    positions,
    edges,
    width: 64 + NODE_WIDTH + maxDepth * COLUMN,
    height: Math.max(352, cursor + 8),
  };
}

function Connections({ edges, width, height, view }) {
  return (
    <svg
      className="mm-lines"
      width={width}
      height={height}
      role="img"
      aria-labelledby="lineage-tree-title lineage-tree-desc"
    >
      <title id="lineage-tree-title">可逐层展开的佛教宗派思维导图</title>
      <desc id="lineage-tree-desc">
        从左向右阅读，连线表示阅读层级。地域、实践家族、宗派和支派均有类型标签；具体来源与跨地区传承在节点说明中列出。
      </desc>
      {edges.map(({ parent, children }) => {
        const start = parent.x + NODE_WIDTH + 28;
        const bus = start + 20;
        const last = children.at(-1);
        const first = children[0];
        return (
          <g key={parent.id}>
            <path
              d={`M${start} ${parent.y}H${children.length === 1 ? first.x : bus}`}
            />
            {children.length > 1 && (
              <path d={`M${bus} ${first.y + 8}V${last.y - 8}`} />
            )}
            {children.length > 1 &&
              children.map((child, index) => (
                <path
                  key={child.id}
                  d={
                    index === 0
                      ? `M${bus} ${child.y + 8}Q${bus} ${child.y} ${bus + 8} ${child.y}H${child.x}`
                      : index === children.length - 1
                        ? `M${bus} ${child.y - 8}Q${bus} ${child.y} ${bus + 8} ${child.y}H${child.x}`
                        : `M${bus} ${child.y}H${child.x}`
                  }
                />
              ))}
            {children.map((child) => {
              const item = mindmapNodes[child.id];
              const crossing =
                ["zen", "transmission"].includes(view.id) &&
                child.id.startsWith("jp-");
              const transmissionLabels = {
                "jp-obaku": "明代传入",
                "jp-rinzai": "宋代传入",
                "jp-soto": "道元传入",
                "jp-tendai": "最澄传入",
                "jp-shingon": "空海传入",
                "jp-jodo": "善导影响",
                "jp-shin": "亲鸾发展",
                "jp-ritsu": "鉴真传入",
              };
              const label = crossing
                ? transmissionLabels[child.id] || "经学传入"
                : parent.depth === 0
                  ? item.kind === "禅宗法脉"
                    ? "法脉分支"
                    : item.kind === "日本支派"
                      ? "本山分派"
                      : item.kind === "藏传教派"
                        ? "传承分支"
                        : parent.id === "china"
                          ? "汉传发展"
                          : {
                              buddhism: "历史延续",
                              early: item.edge,
                              mahayana: {
                                china: "汉地传播",
                                japan: "东亚传播",
                                tibet: "印度译传",
                                "india-ideas": "思想发展",
                              }[child.id],
                              japan:
                                {
                                  "jp-nara": "古代学统",
                                  "jp-pure": "实践归类",
                                  "jp-zen": "传承归类",
                                  "jp-nichiren-family": "历史家族",
                                }[child.id] || "当地成宗",
                            }[parent.id] || "阅读分组"
                  : null;
              if (!label) return null;
              const x =
                children.length === 1
                  ? (start + child.x) / 2
                  : (bus + child.x) / 2;
              return (
                <g className="mm-edge-label" key={`label-${child.id}`}>
                  <rect
                    x={x - 25}
                    y={child.y - 27}
                    width={50}
                    height={16}
                    rx={3}
                  />
                  <text x={x} y={child.y - 15} textAnchor="middle">
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export default function MindMap({ openArticle }) {
  const [viewId, setViewId] = useState("overview");
  const view = mapViews.find((item) => item.id === viewId);
  const [root, setRoot] = useState(view.root);
  const [expanded, setExpanded] = useState(new Set(view.expanded));
  const [selected, setSelected] = useState("mahayana");
  const [scale, setScale] = useState(0.8);
  const [mode, setMode] = useState("map");
  const [search, setSearch] = useState("");
  const [backStack, setBackStack] = useState([]);
  const viewport = useRef(null);
  const outlineViewport = useRef(null);
  const drag = useRef(null);
  const node = mindmapNodes[selected];
  const layout = useMemo(
    () => layoutMindmap(root, expanded, view),
    [root, expanded, view],
  );
  const path = findMapPath(selected, root, view) ||
    findMapPath(selected) || [selected];
  const searchResults = search.trim()
    ? Object.values(mindmapNodes)
        .filter((item) =>
          `${item.label} ${item.subtitle}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
        )
        .slice(0, 10)
    : [];

  const resetViewport = () => {
    viewport.current?.scrollTo({ top: 0, left: 0 });
    outlineViewport.current?.scrollTo({ top: 0, left: 0 });
    setScale(0.8);
  };
  const chooseView = (id) => {
    const next = mapViews.find((item) => item.id === id);
    setViewId(id);
    setRoot(next.root);
    setExpanded(new Set(next.expanded));
    setSelected(next.root);
    setBackStack([]);
    setSearch("");
    resetViewport();
  };
  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSelected(id);
  };
  const select = (id) => {
    setSelected(id);
    if (childrenOf(id, view).length)
      setExpanded((prev) => new Set([...prev, id]));
  };
  const focusBranch = (id) => {
    setBackStack((prev) => [
      ...prev,
      { root, expanded: [...expanded], selected },
    ]);
    setRoot(id);
    setSelected(id);
    setExpanded(new Set([id, ...childrenOf(id, view)]));
    setSearch("");
    resetViewport();
  };
  const back = () => {
    const previous = backStack.at(-1);
    setRoot(previous.root);
    setExpanded(new Set(previous.expanded));
    setSelected(previous.selected);
    setBackStack((prev) => prev.slice(0, -1));
    resetViewport();
  };
  const reveal = (id) => {
    const canonical = findMapPath(id) || [id];
    const nextView = canonical.includes("japan")
      ? "japan"
      : canonical.includes("china")
        ? "china"
        : canonical.includes("tibet")
          ? "tibet"
          : "overview";
    const next = mapViews.find((item) => item.id === nextView);
    const localPath = findMapPath(id, next.root) || canonical;
    setViewId(nextView);
    setRoot(next.root);
    setExpanded(new Set([...next.expanded, ...localPath.slice(0, -1)]));
    setSelected(id);
    setBackStack([]);
    setSearch("");
    resetViewport();
  };
  const fit = () => {
    setScale(
      Math.max(
        0.55,
        Math.min(1, (viewport.current.clientWidth - 24) / layout.width),
      ),
    );
    viewport.current.scrollTo({ top: 0, left: 0 });
  };
  useEffect(() => {
    if (mode === "outline") {
      const frame = outlineViewport.current;
      const target = frame?.querySelector('[aria-pressed="true"]');
      if (target) {
        const y =
          target.getBoundingClientRect().top -
          frame.getBoundingClientRect().top +
          frame.scrollTop;
        frame.scrollTo({
          top: Math.max(
            0,
            Math.min(frame.scrollTop, y - 16),
            y + target.offsetHeight - frame.clientHeight + 16,
          ),
        });
      }
      return;
    }
    const position = layout.positions.find((item) => item.id === selected);
    const frame = viewport.current;
    if (!position || !frame || mode !== "map") return;
    const x = position.x * scale;
    const y = (position.y - NODE_HEIGHT / 2) * scale;
    frame.scrollTo({
      left: Math.max(
        0,
        Math.min(frame.scrollLeft, x - 20),
        x + NODE_WIDTH * scale - frame.clientWidth + 36,
      ),
      top: Math.max(
        0,
        Math.min(frame.scrollTop, y - 20),
        y + NODE_HEIGHT * scale - frame.clientHeight + 24,
      ),
    });
  }, [selected, root, scale, mode, layout]);

  const outline = (id, depth = 0) => {
    const item = mindmapNodes[id];
    const children = childrenOf(id, view);
    const isOpen = expanded.has(id);
    return (
      <li key={id}>
        <div className={`mm-outline-node ${selected === id ? "selected" : ""}`}>
          {children.length ? (
            <button
              className="mm-outline-toggle"
              onClick={() => toggle(id)}
              aria-label={`${isOpen ? "收起" : "展开"}${item.label}`}
              aria-expanded={isOpen}
            >
              {isOpen ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          ) : (
            <span className="mm-outline-dot" />
          )}
          <button
            className="mm-outline-label"
            onClick={() => select(id)}
            aria-pressed={selected === id}
          >
            <strong>{item.label}</strong>
            <small>
              {item.kind} · {item.subtitle}
            </small>
          </button>
        </div>
        {isOpen && children.length > 0 && (
          <ul>{children.map((child) => outline(child, depth + 1))}</ul>
        )}
      </li>
    );
  };

  return (
    <div className="mindmap" aria-label="宗派源流思维导图">
      <div className="mm-topline">
        <span>
          <GitBranch size={17} /> 宗派源流 · 一层层看
        </span>
        <small>{Object.keys(mindmapNodes).length} 个知识节点</small>
      </div>
      <div className="mm-navigation">
        <div className="mm-views" role="group" aria-label="选择思维导图视图">
          {mapViews.map((item) => (
            <button
              key={item.id}
              onClick={() => chooseView(item.id)}
              aria-pressed={viewId === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mm-search-wrap">
          <label className="mm-search">
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="找宗派，如：临济、天台"
              aria-label="搜索思维导图宗派"
            />
            {search && (
              <button aria-label="清空宗派搜索" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </label>
          {search.trim() && (
            <div className="mm-search-results" aria-label="宗派搜索结果">
              {searchResults.length ? (
                searchResults.map((item) => (
                  <button key={item.id} onClick={() => reveal(item.id)}>
                    <strong>{item.label}</strong>
                    <small>
                      {item.kind} · {item.subtitle}
                    </small>
                    <ArrowRight size={14} />
                  </button>
                ))
              ) : (
                <p>未找到这个名称。试试“禅宗”或“净土”。</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mm-toolbar">
        <div className="mm-context">
          {backStack.length > 0 && (
            <button onClick={back}>
              <ArrowLeft size={14} />
              返回上层
            </button>
          )}
          <span>{mindmapNodes[root].label}</span>
          <small>点击名称读来源，点击 ＋ 展开</small>
        </div>
        <div className="mm-tools">
          <div className="mm-mode" role="group" aria-label="导图显示方式">
            <button
              aria-pressed={mode === "map"}
              onClick={() => setMode("map")}
            >
              结构图
            </button>
            <button
              aria-pressed={mode === "outline"}
              onClick={() => setMode("outline")}
            >
              大纲
            </button>
          </div>
          {mode === "map" && (
            <>
              <button
                className="mm-icon-button"
                aria-label="缩小思维导图"
                disabled={scale <= 0.55}
                onClick={() => setScale(Math.max(0.55, scale - 0.1))}
              >
                <Minus size={16} />
              </button>
              <span className="mm-scale">{Math.round(scale * 100)}%</span>
              <button
                className="mm-icon-button"
                aria-label="放大思维导图"
                disabled={scale >= 1.3}
                onClick={() => setScale(Math.min(1.3, scale + 0.1))}
              >
                <Plus size={16} />
              </button>
              <button className="mm-fit" onClick={fit}>
                适合宽度
              </button>
            </>
          )}
          <button
            className="mm-icon-button"
            aria-label="重置当前思维导图"
            onClick={() => chooseView(viewId)}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
      <div className="mm-workspace">
        <div className="mm-map-area">
          {mode === "map" ? (
            <div
              className="mm-viewport"
              key="map"
              ref={viewport}
              tabIndex={0}
              aria-label="可滚动的宗派结构图；使用加号展开分支"
              onPointerDown={(event) => {
                if (
                  event.pointerType !== "mouse" ||
                  event.button !== 0 ||
                  event.target.closest("button")
                )
                  return;
                drag.current = {
                  x: event.clientX,
                  y: event.clientY,
                  left: event.currentTarget.scrollLeft,
                  top: event.currentTarget.scrollTop,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
                event.currentTarget.classList.add("dragging");
              }}
              onPointerMove={(event) => {
                if (!drag.current) return;
                event.currentTarget.scrollLeft =
                  drag.current.left + drag.current.x - event.clientX;
                event.currentTarget.scrollTop =
                  drag.current.top + drag.current.y - event.clientY;
              }}
              onPointerUp={(event) => {
                drag.current = null;
                event.currentTarget.classList.remove("dragging");
              }}
              onPointerCancel={(event) => {
                drag.current = null;
                event.currentTarget.classList.remove("dragging");
              }}
            >
              <div
                className="mm-sized-canvas"
                style={{
                  width: layout.width * scale,
                  height: layout.height * scale,
                }}
              >
                <div
                  className="mm-canvas"
                  style={{
                    width: layout.width,
                    height: layout.height,
                    transform: `scale(${scale})`,
                  }}
                >
                  <Connections
                    edges={layout.edges}
                    width={layout.width}
                    height={layout.height}
                    view={view}
                  />
                  {layout.positions.map((position) => {
                    const item = mindmapNodes[position.id];
                    const children = childrenOf(item.id, view);
                    const isOpen = expanded.has(item.id);
                    return (
                      <div
                        className={`mm-node ${position.depth === 0 ? "root" : ""} ${item.label.length > 9 ? "long-label" : ""} ${selected === item.id ? "selected" : ""}`}
                        key={item.id}
                        style={{
                          left: position.x,
                          top: position.y - NODE_HEIGHT / 2,
                        }}
                      >
                        <button
                          className="mm-node-label"
                          onClick={() => select(item.id)}
                          aria-pressed={selected === item.id}
                        >
                          <small>{item.kind}</small>
                          <strong>{item.label}</strong>
                          <span>{item.subtitle}</span>
                        </button>
                        {children.length > 0 && (
                          <button
                            className="mm-node-toggle"
                            aria-label={`${isOpen ? "收起" : "展开"}${item.label}，${children.length}个分支`}
                            aria-expanded={isOpen}
                            onClick={() => toggle(item.id)}
                          >
                            {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                            {!isOpen && <small>{children.length}</small>}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mm-outline" key="outline" ref={outlineViewport}>
              <ul>{outline(root)}</ul>
            </div>
          )}
          <div className="mm-map-footer">
            <span>
              {mode === "map"
                ? "拖动空白处／滚动查看 · 手机可横向滑动"
                : "用 ＋／− 逐层展开 · 点击名称查看说明"}
            </span>
            <span aria-live="polite">
              当前显示 {layout.positions.length} 个节点
            </span>
          </div>
        </div>
        <aside
          className="mm-inspector"
          aria-label="选中宗派的来源与特点"
          aria-live="polite"
        >
          <div className="mm-inspector-header">
            <span>{node.kind}</span>
            <h3>{node.label}</h3>
            <p>{node.subtitle}</p>
          </div>
          <div className="mm-breadcrumb" aria-label="当前节点的阅读层级">
            {path.map((id, index) => (
              <React.Fragment key={id}>
                {index > 0 && <ChevronRight size={10} />}
                <span>{mindmapNodes[id].label}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="mm-fact">
            <h4>从哪里来</h4>
            <p>{node.origin}</p>
          </div>
          <div className="mm-fact">
            <h4>怎样理解</h4>
            <p>{node.practice}</p>
          </div>
          {childrenOf(selected, view).length > 0 && selected !== root && (
            <button
              className="mm-drill-button"
              onClick={() => focusBranch(selected)}
            >
              进入这一支，放大阅读 <ArrowRight size={14} />
            </button>
          )}
          {node.links?.length > 0 && (
            <div className="mm-crosslinks">
              <h4>追溯源头与后续传播</h4>
              {node.links.map(([id, label]) => (
                <button key={id} onClick={() => reveal(id)}>
                  {label}
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          )}
          {node.article && (
            <button
              className="mm-read"
              onClick={() => openArticle(node.article)}
            >
              <BookOpen size={15} />
              读相关导读
              <ArrowRight size={14} />
            </button>
          )}
          <details className="mm-sources">
            <summary>
              核对来源 <ChevronDown size={13} />
            </summary>
            {node.sources.map((id) => (
              <a
                key={id}
                href={mapSources[id][1]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mapSources[id][0]}
                <ExternalLink size={12} />
              </a>
            ))}
          </details>
        </aside>
      </div>
      {view.note && <p className="mm-view-note">{view.note}</p>}
      <div className="mm-clarity">
        <details open>
          <summary>
            “宗”和“派”，是固定的上下级吗？
            <ChevronDown size={16} />
          </summary>
          <p>
            通常，“宗”指围绕教义、经典或祖师形成的传统；“派”常指其中的师承或组织分支。但它们没有一套全球统一的等级。中国“禅宗
            → 临济宗 → 黄龙派”里，两个层级都叫“宗”；日本“临济宗 →
            妙心寺派”则是教团与本山派的关系；藏传的宁玛“派”本身就是一个大型传统。
          </p>
        </details>
        <details>
          <summary>
            为什么同源宗派，到了不同国家会变样？
            <ChevronDown size={16} />
          </summary>
          <p>
            传入的是经论、修行方法和师承，随后又受到当地寺院、政治、语言和文化影响。中国天台与日本天台同源；中国临济与日本临济有传承联系。名字相同，不等于今天是同一个组织。日本净土宗、净土真宗、真言宗、曹洞宗、临济宗、日莲系等，也不能都装进一个“禅宗”分支。
          </p>
        </details>
      </div>
      <p className="mm-reading-note">
        <strong>读线索，也读标签。</strong>
        连线整理阅读层级，包含历史发展、地域归类与宗内分支，并不都代表直接师徒传承。“从哪里来”和跳转链接补充跨地区关系；本图选取主要传统与代表支派，古代学统另有标注。
      </p>
    </div>
  );
}
