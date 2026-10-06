import React from "react";
export function LeafMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 3C41 20 43 33 25 42C8 37 5 22 25 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M25 15V46M25 31L15 22M25 25L32 18"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function Dharma({ kind = "wheel" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="dharma"
    >
      <g stroke="currentColor" strokeWidth="1.35">
        {kind === "wheel" ? (
          <>
            <circle cx="50" cy="50" r="31" />
            <circle cx="50" cy="50" r="24" />
            <circle cx="50" cy="50" r="7" />
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d="M50 13V43M47 14h6"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </>
        ) : kind === "lotus" ? (
          <>
            <path d="M50 76C19 70 12 48 14 33C34 34 49 48 50 76ZM50 76C81 70 88 48 86 33C66 34 51 48 50 76Z" />
            <path d="M50 76C24 57 34 33 50 16C66 33 76 57 50 76ZM50 76C22 85 12 66 8 54C24 51 42 59 50 76ZM50 76C78 85 88 66 92 54C76 51 58 59 50 76Z" />
          </>
        ) : (
          <>
            <path d="M50 8V92M8 50H92M28 28L72 72M28 72L72 28" />
            <path d="M50 8C28 21 29 34 50 42C71 34 72 21 50 8ZM50 92C28 79 29 66 50 58C71 66 72 79 50 92ZM8 50C21 28 34 29 42 50C34 71 21 72 8 50ZM92 50C79 28 66 29 58 50C66 71 79 72 92 50Z" />
            <circle cx="50" cy="50" r="6" />
          </>
        )}
      </g>
    </svg>
  );
}
export function HeroArt() {
  return (
    <svg
      viewBox="0 0 660 570"
      role="img"
      aria-label="菩提树、山峦与佛塔的原创线描插画，象征佛教从共同源头延展"
    >
      <defs>
        <pattern id="paper" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".45" fill="#93997d" opacity=".23" />
        </pattern>
        <linearGradient id="sun" x2="0" y2="1">
          <stop stopColor="#e6c789" />
          <stop offset="1" stopColor="#efdec0" />
        </linearGradient>
        <linearGradient id="hill" x2="0" y2="1">
          <stop stopColor="#d5dac7" />
          <stop offset="1" stopColor="#e8e9dc" />
        </linearGradient>
      </defs>
      <circle cx="350" cy="278" r="207" fill="#e9eade" />
      <circle cx="350" cy="278" r="207" fill="url(#paper)" />
      <circle cx="404" cy="180" r="79" fill="url(#sun)" />
      <circle
        cx="350"
        cy="278"
        r="226"
        fill="none"
        stroke="#d9ddcc"
        strokeDasharray="2 7"
      />
      <path
        d="M119 344Q200 185 270 316Q333 201 394 304Q483 143 569 339L569 428H119Z"
        fill="#dce0ce"
      />
      <path
        d="M117 397Q182 283 250 366Q320 234 390 348Q454 281 577 393L562 430H141Z"
        fill="url(#hill)"
      />
      <g fill="none" stroke="#b4bca2" strokeWidth="1">
        <path d="M122 398Q185 319 250 385Q322 282 390 369Q470 324 578 414" />
        <path d="M133 412Q200 345 260 407Q330 323 398 393Q479 357 563 433" />
        <path d="M156 433Q221 374 283 432Q343 362 410 418Q475 394 541 452" />
        <path d="M187 451Q236 412 292 455Q354 399 418 444Q468 426 509 469" />
      </g>
      <ellipse cx="350" cy="459" rx="157" ry="16" fill="#b2b599" opacity=".2" />
      <g stroke="#777d62" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M230 413h240v29H230Z" fill="#eceadd" />
        <path d="M219 438h262v12H219Z" fill="#e1dfce" />
        <path
          d="M239 416V382C239 323 285 285 350 285C415 285 461 323 461 382V416Z"
          fill="#f6f1df"
        />
        <path
          d="M350 287C406 295 429 346 432 413H461V382C461 326 414 288 350 287Z"
          fill="#e7e0c8"
          stroke="none"
        />
        <path
          d="M239 402H461M239 412H461M242 373H458M251 344H449M272 316H428"
          opacity=".46"
        />
        <path d="M321 264H379V286H321Z" fill="#e5ddc4" />
        <path d="M315 259H385V266H315Z" fill="#f3ecdc" />
        <path d="M350 191V259" />
        <path
          d="M329 211Q350 196 371 211ZM324 229Q350 214 376 229ZM318 247Q350 231 382 247Z"
          fill="#efead8"
        />
        <circle cx="350" cy="190" r="3" fill="#8c956f" />
        <path d="M306 442v-87h12v87m64 0v-87h12v87" fill="#ded8c1" />
        <path
          d="M294 354Q350 344 406 354V365Q350 356 294 365ZM294 336Q350 326 406 336V346Q350 337 294 346Z"
          fill="#e3dcc5"
        />
        <path
          d="M301 329v-9h98v9M312 318v-10M329 318v-10M350 318v-10M371 318v-10M388 318v-10"
          fill="none"
        />
        <path d="M311 442h78l11 10H300Z" fill="#eee7d4" />
      </g>
      <g stroke="#737e5c" strokeWidth="1.5" fill="none">
        <path d="M166 416Q193 348 179 260Q161 207 175 151M185 331Q139 292 130 244M181 289Q226 250 229 202M178 257Q148 227 149 188M179 235Q212 199 209 164" />
        <path
          d="M175 192Q140 177 156 136Q184 153 175 192ZM181 225Q179 190 215 178Q218 213 181 225ZM156 248Q120 238 125 199Q156 211 156 248ZM196 278Q198 238 235 231Q233 268 196 278ZM170 310Q132 304 135 266Q168 277 170 310ZM179 160Q161 129 184 104Q203 133 179 160ZM212 185Q204 153 228 134Q239 165 212 185Z"
          fill="#d2d9bc"
        />
        <path
          d="M174 192L156 137M181 225l34-47M156 248l-30-47M196 278l38-46M170 310l-35-43M179 160l5-55M212 185l16-50"
          strokeWidth=".7"
        />
      </g>
      <g fill="#74805e">
        <path d="M477 172q9-8 18 0q9-8 18 0q-18-5-18 3q-9-8-18-3" />
        <path d="M502 151q6-5 12 0q6-5 12 0q-12-3-12 2q-6-5-12-2" />
      </g>
      <g stroke="#9ca688" fill="none" strokeWidth="1.1">
        <path d="M463 432q14-26 31-26q-2 20-24 30M478 438q26-22 46-15q-12 17-37 20M468 445l22-35M481 447l33-20" />
        <path d="M200 427l-12-19m13 12 10-19" />
      </g>
      <text
        x="547"
        y="277"
        fill="#8e967c"
        fontSize="12"
        style={{ writingMode: "vertical-rl", letterSpacing: 8 }}
      >
        一树千枝 · 同根而生
      </text>
      <g stroke="#b5baa6" strokeWidth=".8">
        <path d="M98 347H72M85 334V360M559 121h18M568 112v18" />
      </g>
    </svg>
  );
}
export function RouteMap({ selected, onSelect, regions }) {
  return (
    <div className="route-map">
      <svg viewBox="0 0 700 460" aria-hidden="true">
        <defs>
          <pattern
            id="grid"
            width="35"
            height="35"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M35 0H0V35"
              fill="none"
              stroke="#dedfd3"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="700" height="460" fill="url(#grid)" />
        <path
          d="M30 50L190 35 266 53 348 24 421 48 501 32 575 74 591 109 554 151 586 176 549 211 507 230 495 273 474 283 492 320 460 359 435 306 411 286 393 318 360 307 353 272 326 251 317 290 291 317 271 334 250 296 225 254 209 214 165 213 126 181 76 188 41 153Z"
          fill="#e6e8dc"
          stroke="#c7ccba"
        />
        <path
          d="M606 124l-8 30-18 26 3 21 16-20 16-47ZM582 212l12-6 10 2-9 9-14 7ZM304 362l8 18-4 17-10-8ZM407 373l36 14 16 1 28 10 4 6-43-4-45-17Z"
          fill="#e6e8dc"
          stroke="#c7ccba"
        />
        <g stroke="#b7bea5" fill="none" strokeWidth="1.3">
          <path d="M212 180l45-26 35 22 27-17 44 12 24-17 38 7" />
          <path d="M218 192l40-26 33 25 30-17 45 12 23-18 35 5" />
        </g>
        <g fill="none" strokeWidth="2" strokeDasharray="5 6">
          <path
            d="M238 271Q220 120 375 155Q436 156 462 202Q560 195 623 179"
            stroke="#8b9470"
          />
          <path
            d="M238 271Q253 329 305 377Q347 389 371 363Q405 319 385 265"
            stroke="#bd9b62"
          />
          <path d="M238 271Q274 180 315 170" stroke="#b48b7b" />
        </g>
        <text x="82" y="309" fill="#b1b7a7" fontSize="11" letterSpacing="4">
          印度洋
        </text>
        <text x="550" y="342" fill="#b1b7a7" fontSize="11" letterSpacing="4">
          太平洋
        </text>
      </svg>
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          style={{ left: r.x + "%", top: r.y + "%" }}
          className={`map-marker ${selected === r.id ? "active" : ""}`}
          aria-label={`查看${r.name}`}
          aria-pressed={selected === r.id}
        >
          <i />
          {r.name === "斯里兰卡与东南亚"
            ? "南传地区"
            : r.name === "西藏与喜马拉雅"
              ? "藏传地区"
              : r.name === "朝鲜半岛与越南"
                ? "朝鲜半岛"
                : r.name}
        </button>
      ))}
      <small>传播路径示意 · 非疆界地图 · 节点代表相关专题</small>
    </div>
  );
}
