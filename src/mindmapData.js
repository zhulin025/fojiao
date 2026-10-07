// A reading hierarchy, with explicit cross-links for historical transmission.
// Geographic groupings and practice families are labeled separately from lineages.
export const mapSources = {
  overview: ["哈佛大学 · 佛教导览", "https://pluralism.org/buddhism"],
  mahayana: ["哈佛大学 · 大乘佛教", "https://pluralism.org/mahayana-buddhism"],
  china: [
    "佛光山 · 中国八宗与祖师（传统内部视角）",
    "https://fgsarts.fgs.org.tw/collections/books/123-2017112002",
  ],
  chan: [
    "佛光山 · 禅门五家七宗（传统内部视角）",
    "https://www.fgs.org.tw/cultivation/fgu-chan/quotation-08.htm",
  ],
  linji: [
    "妙心寺 · 临济宗源流（传统内部视角）",
    "https://www.myoshinji.or.jp/english/zen/index.html",
  ],
  rinzai: ["临济宗黄檗宗联合官方 · 各派本山", "https://rinnou.net/"],
  soto: [
    "曹洞宗官方 · 传承历史",
    "https://www.sotozen.com/eng/about/history/index.html",
  ],
  obaku: [
    "驹泽大学 · 黄檗与明代临济禅",
    "https://zen-branding.komazawa-u.ac.jp/en/contents/1563/",
  ],
  japan: [
    "全日本佛教会 · 日本佛教导览（BuddhaNet 收录）",
    "https://www.buddhanet.net/nippon/nippon_partI/",
  ],
  tendai: [
    "京都国立博物馆 · 日本天台宗的来源",
    "https://www.kyohaku.go.jp/eng/exhibitions/special/saicho_2022/",
  ],
  shingon: [
    "高野山金刚峰寺 · 真言宗",
    "https://www.koyasan.or.jp/en/shingonshu/",
  ],
  kukai: ["高野山 · 空海入唐与传承", "https://www.koya.org/english/"],
  jodo: [
    "净土宗国际弘教 · 法然与净土教",
    "https://kaikyonet.jodo.or.jp/wp-content/themes/kaikyo-net/doc/Pure%20Land%20Life%20No38.pdf",
  ],
  shin: [
    "西本愿寺 · 净土真宗历史",
    "https://www.hongwanji.or.jp/english/history/",
  ],
  otani: [
    "东本愿寺 · 真宗大谷派",
    "https://english.higashihonganji.or.jp/english_top/",
  ],
  nichiren: [
    "日莲宗官方 · 法华经与天台渊源",
    "https://www.nichiren.or.jp/english/teachings/sutra/",
  ],
  nichirenPractice: [
    "日莲宗官方 · 教义与实践",
    "https://www.nichiren.or.jp/english/teachings/teachings_nichiren/",
  ],
  pali: [
    "Access to Insight · 上座部佛教导览",
    "https://www.accesstoinsight.org/theravada.html",
  ],
  tibet: [
    "萨迦寺 · 藏传教派与历史",
    "https://www.sakya.org/about/sakya-history/",
  ],
  tibetSchools: [
    "萨迦寺 · 藏传佛教入门",
    "https://sakya.org/wp-content/uploads/2017/08/Intro_to_Sakya_Monastery.pdf",
  ],
  kagyu: [
    "Karma Triyana Dharmachakra · 印度至西藏的传承",
    "https://kagyu.org/lineage/BuddhismTibet",
  ],
  jonang: [
    "觉囊基金会 · 觉囊简史",
    "https://jonangfoundation.org/brief-history/",
  ],
  canon: ["CBETA · 汉文佛典与中国佛教文献", "https://cbetaonline.dila.edu.tw/"],
  chisan: ["真言宗智山派 · 总本山智积院", "https://chisan.or.jp/"],
  buzan: [
    "真言宗丰山派 · 各派寺院",
    "https://www.buzan.or.jp/shingonshu_buzan/map/",
  ],
  yuzu: [
    "融通念佛宗大念佛寺 · 宗义与来源",
    "https://www.dainenbutsuji.com/guide/",
  ],
  ji: ["时宗总本山游行寺 · 历史", "https://yugyoji.or.jp/"],
  shoshu: [
    "日莲正宗 · 大石寺历史（传统内部视角）",
    "https://www.nichirenshoshu.or.jp/jpn/taisekiji.html",
  ],
  drikung: [
    "直贡噶举官方 · 传承历史",
    "https://www.drikung.org/drikung-kagyu-lineage/",
  ],
  drukpa: [
    "竹巴传承 · 英国弘教机构",
    "https://drukpa.org.uk/about/the-drukpa-lineage.html",
  ],
};

const nodes = [];
const add = (
  id,
  label,
  subtitle,
  kind,
  origin,
  practice,
  children = [],
  extra = {},
) => {
  nodes.push({
    id,
    label,
    subtitle,
    kind,
    origin,
    practice,
    children,
    ...extra,
  });
};

add(
  "buddhism",
  "佛教",
  "古代南亚 · 共同起点",
  "共同源头",
  "释迦牟尼在古代南亚教导中道、缘起与解脱。各地传统在长期传播中形成，并没有一次会议把今天所有宗派分好。",
  "四圣谛、戒定慧、减少烦恼，是理解各传统的共同入口。",
  ["early"],
  { sources: ["overview"], article: "buddha" },
);
add(
  "early",
  "早期佛教与部派",
  "佛陀以后 · 多种僧团传统",
  "历史阶段",
  "佛陀去世后，僧团因地域、戒律与解释差异形成部派。大乘兴起于这样的佛教环境，并非所有部派都先变成大乘。",
  "下面是帮助阅读的历史概括。上座部、大乘与其他古代部派的关系，不能看成三次互相取代。",
  ["theravada", "mahayana", "other-schools"],
  { sources: ["overview", "pali"], article: "early" },
);
add(
  "theravada",
  "上座部佛教",
  "巴利传承 · 南亚与东南亚",
  "传统体系",
  "经斯里兰卡等地延续，再传播到缅甸、泰国、柬埔寨、老挝等地。它是特定传承，不等于古代所有非大乘部派；也不宜直接称为“小乘”。",
  "重视巴利三藏与戒定慧。各国僧团还会分成不同派别，国别并不是宗派本身。",
  ["sl-theravada", "thai-theravada", "myanmar-theravada"],
  { sources: ["pali"], article: "theravada", edge: "传承延续" },
);
add(
  "sl-theravada",
  "斯里兰卡传承",
  "南传佛教的重要枢纽",
  "地域传统",
  "斯里兰卡对巴利经典与上座部传承的保存和外传影响深远。",
  "地域节点。内部还有僧团组织与受戒传承的分别。",
  [],
  { sources: ["pali"], article: "southeast" },
);
add(
  "thai-theravada",
  "泰国传承",
  "上座部在当地的发展",
  "地域传统",
  "泰国佛教属于上座部传统，同时受到当地历史与社会制度影响。",
  "既有寺院教育，也有多种禅修传承；禅修风格不等于独立宗派。",
  [],
  { sources: ["pali"], article: "southeast" },
);
add(
  "myanmar-theravada",
  "缅甸传承",
  "上座部与禅修网络",
  "地域传统",
  "上座部佛教在缅甸长期发展，近现代禅修传播影响广泛。",
  "不同禅修中心或老师的教学系统，不宜直接等同于僧团派别。",
  [],
  { sources: ["pali"], article: "southeast" },
);
add(
  "other-schools",
  "其他古代部派",
  "说一切有部等",
  "古代部派",
  "古代印度还有说一切有部、大众部等多种部派。其经典、论书和戒律影响了后来的多种传统。",
  "“非大乘”不是单一宗派；部分部派的戒律传承仍在大乘地区使用。",
  [],
  { sources: ["canon", "overview"], article: "early", edge: "历史分流" },
);
add(
  "mahayana",
  "大乘佛教",
  "菩萨道 · 多种思想与实践",
  "传统体系",
  "约公元前后逐渐兴起，包含多种经论与修行传统。不是单一教会，也不是一个国家的佛教。",
  "以菩萨道连接智慧与慈悲。下层同时有思想学派和地域传统，请结合节点标签阅读。",
  ["india-ideas", "china", "japan", "tibet"],
  { sources: ["mahayana"], article: "mahayana", edge: "逐渐兴起" },
);
add(
  "india-ideas",
  "印度思想与密教",
  "多条思想脉络 · 相互交流",
  "思想归类",
  "印度大乘发展出中观、瑜伽行等思想传统；后来的密教也在大乘基础上发展。它们会在不同地区被继承和重新解释。",
  "这三个节点表示思想或修行体系，不是彼此排他的寺院组织。",
  ["madhyamaka", "yogacara", "vajrayana"],
  { sources: ["mahayana", "canon"], article: "india", edge: "思想发展" },
);
add(
  "madhyamaka",
  "中观",
  "龙树等 · 缘起与空性",
  "思想学派",
  "以龙树及相关论书为重要起点，通过分析缘起说明诸法无自性。",
  "影响汉传三论与藏传哲学，但不意味着所有受影响者属于同一个组织。",
  [],
  {
    sources: ["canon"],
    article: "madhyamaka",
    links: [
      ["cn-sanlun", "汉传三论：思想与译传"],
      ["tibet", "藏传：经论的学习与解释"],
    ],
  },
);
add(
  "yogacara",
  "瑜伽行／唯识",
  "无著、世亲等 · 认识与经验",
  "思想学派",
  "围绕识、经验、修行与认识开展分析。玄奘的译传深刻影响汉传法相。",
  "是思想传统；“唯识”不只在法相宗寺院中被学习。",
  [],
  {
    sources: ["canon"],
    article: "yogacara",
    links: [
      ["cn-faxiang", "汉传法相：玄奘、窥基"],
      ["jp-hosso", "日本法相：奈良学统"],
    ],
  },
);
add(
  "vajrayana",
  "金刚乘／密教",
  "大乘基础上的修行体系",
  "修行体系",
  "在印度发展，经不同路径传入唐代中国、西藏、日本等地。藏传不是密教的全部，日本真言宗也是重要传承。",
  "结合真言、曼荼罗、仪轨与观修；传统强调师承和相应的修学条件。",
  [],
  {
    sources: ["shingon", "tibetSchools"],
    article: "vajrayana",
    links: [
      ["cn-esoteric", "唐代密教"],
      ["jp-shingon", "日本真言宗"],
      ["tibet", "藏传显密传统"],
    ],
  },
);

add(
  "china",
  "中国／汉传佛教",
  "译经与本土发展 · 八宗导览",
  "地域传统",
  "佛教经中亚与海路等进入中国。翻译、经论研究和本土修行共同塑造汉传，并进一步影响朝鲜半岛、日本、越南等地。",
  "“八宗”是常见的教学归纳。各宗形成时间和组织形态不同；同一寺院可以同时持戒、参禅、念佛。",
  [
    "cn-sanlun",
    "cn-faxiang",
    "cn-tiantai",
    "cn-huayan",
    "cn-chan",
    "cn-pure",
    "cn-vinaya",
    "cn-esoteric",
  ],
  { sources: ["china"], article: "china-schools", edge: "在当地发展" },
);
add(
  "cn-sanlun",
  "三论宗",
  "鸠摩罗什译传 · 吉藏",
  "汉传宗派",
  "通过《中论》《百论》《十二门论》等译传中观，吉藏集其大成。",
  "用破除执著的分析理解空性。日本古代三论学统与这一译传有关。",
  [],
  {
    sources: ["canon", "china"],
    article: "madhyamaka",
    links: [
      ["madhyamaka", "追溯印度中观"],
      ["jp-sanron", "日本三论学统"],
    ],
  },
);
add(
  "cn-faxiang",
  "法相宗／唯识宗",
  "玄奘译经 · 窥基阐释",
  "汉传宗派",
  "玄奘从印度带回并翻译瑜伽行文献，窥基推动相关学问体系。",
  "分析心识、认识与修行。日本法相宗是重要的东亚延续。",
  [],
  {
    sources: ["canon", "china"],
    article: "yogacara",
    links: [
      ["yogacara", "印度瑜伽行"],
      ["jp-hosso", "日本法相宗"],
    ],
  },
);
add(
  "cn-tiantai",
  "天台宗",
  "智顗 · 隋代体系化",
  "汉传宗派",
  "智顗以《法华经》及止观建立系统。日本最澄入唐求法后发展出日本天台。",
  "重视经典解释与禅观相互配合。中国天台与日本天台同源，后来的组织和修学内容各有发展。",
  [],
  {
    sources: ["tendai"],
    article: "tiantai",
    links: [["jp-tendai", "最澄传入：日本天台宗"]],
  },
);
add(
  "cn-huayan",
  "华严宗",
  "杜顺、智俨、法藏等",
  "汉传宗派",
  "以《华严经》发展法界缘起等思想；法藏是重要的体系化人物。",
  "从一事与一切事的关系理解世界。日本华严宗承接这一经学传统。",
  [],
  {
    sources: ["canon", "china"],
    article: "huayan",
    links: [["jp-kegon", "日本华严宗"]],
  },
);
add(
  "cn-chan",
  "禅宗",
  "中国发展 · 五家七宗",
  "汉传宗派",
  "达摩、慧能等是传统叙述中的重要祖师。唐宋禅宗逐渐形成不同门风与法脉；传统谱系也包含后世整理，不等于逐条可证的现代传记。",
  "五家是临济、曹洞、沩仰、云门、法眼。临济再分黄龙、杨岐，合称“五家七宗”。",
  ["cn-linji", "cn-caodong", "cn-guiyang", "cn-yunmen", "cn-fayan"],
  { sources: ["chan"], article: "chan" },
);
add(
  "cn-linji",
  "临济宗（中国）",
  "临济义玄 · 唐代中国",
  "禅宗法脉",
  "源于临济义玄的教学一系，后来在宋代分出黄龙、杨岐等支。传往日本的临济禅经历多次输入。",
  "禅修、师徒问答和公案传统在后世发展。中国临济法脉与日本临济宗相关，但组织不是一个。",
  ["cn-huanglong", "cn-yangqi"],
  {
    sources: ["linji", "chan"],
    article: "chan",
    links: [
      ["jp-rinzai", "宋代传入：日本临济宗"],
      ["jp-obaku", "明代传入：日本黄檗宗"],
    ],
  },
);
add(
  "cn-huanglong",
  "黄龙派",
  "黄龙慧南 · 宋代",
  "临济支派",
  "宋代临济法脉中的一支，以黄龙慧南为代表。荣西带回日本的临济传承与这一支有关。",
  "是临济内部的历史法脉，不等于日本黄檗宗。“黄龙”与“黄檗”是两个名称。",
  [],
  { sources: ["chan", "linji"], links: [["jp-rinzai", "荣西的传入线索"]] },
);
add(
  "cn-yangqi",
  "杨岐派",
  "杨岐方会 · 宋代",
  "临济支派",
  "宋代临济法脉中的另一重要支，以杨岐方会为代表，后世传承影响广泛。",
  "黄龙、杨岐加上其余四家，构成传统所说的“五家七宗”。",
  [],
  { sources: ["chan"], article: "chan" },
);
add(
  "cn-caodong",
  "曹洞宗（中国）",
  "洞山良价 · 曹山本寂",
  "禅宗法脉",
  "唐代洞山、曹山一系是重要源头。道元在宋代中国从天童如净参学，回日本后展开自己的教学。",
  "日本曹洞宗在这一传承基础上，经道元、莹山等人发展出当地的修学和寺院网络。",
  [],
  {
    sources: ["chan", "soto"],
    article: "chan",
    links: [["jp-soto", "道元传入：日本曹洞宗"]],
  },
);
add(
  "cn-guiyang",
  "沩仰宗",
  "沩山灵祐 · 仰山慧寂",
  "禅宗法脉",
  "唐代沩山与仰山的教学一系，是传统五家之一。",
  "五家之名主要表示历史法脉和门风，不保证今天都有独立、同规模的教团。",
  [],
  { sources: ["chan"], article: "chan" },
);
add(
  "cn-yunmen",
  "云门宗",
  "云门文偃 · 唐末五代",
  "禅宗法脉",
  "以云门文偃及其弟子的传承为重要起点。",
  "公案与语录影响后世禅学；不能只看今日宗派组织来衡量古代影响。",
  [],
  { sources: ["chan"], article: "chan" },
);
add(
  "cn-fayan",
  "法眼宗",
  "法眼文益 · 五代",
  "禅宗法脉",
  "以法眼文益的传承为重要起点，为传统五家之一。",
  "禅宗各家并非使用完全不同的一套佛教基础教义。",
  [],
  { sources: ["chan"], article: "chan" },
);
add(
  "cn-pure",
  "净土传统",
  "慧远、昙鸾、道绰、善导等",
  "汉传修行传统",
  "围绕阿弥陀佛与净土经发展，祖师谱系有后世整理。善导的解释对日本法然等人影响很大。",
  "重视信、愿、行与念佛。中国净土长期与禅、律等并行，不总是具有日本式的独立教团边界。",
  [],
  {
    sources: ["canon", "jodo"],
    article: "pureland",
    links: [["jp-pure", "日本的多种净土宗派"]],
  },
);
add(
  "cn-vinaya",
  "律宗／南山律",
  "道宣 · 唐代",
  "汉传宗派",
  "道宣研究和解释戒律，对僧团生活影响深远。鉴真东渡促进日本戒律制度与律学的发展。",
  "重视受戒、戒律与僧团规范。持戒并不专属于自称律宗的寺院。",
  [],
  {
    sources: ["canon", "japan"],
    article: "china-schools",
    links: [["jp-ritsu", "鉴真东渡：日本律宗"]],
  },
);
add(
  "cn-esoteric",
  "唐代密教",
  "善无畏、金刚智、不空等",
  "汉传修行传统",
  "印度密教经译师与僧人进入唐代中国；惠果向空海传法，是日本真言宗的重要来源。",
  "后世八宗表中的“密宗”，并不意味着唐代存在一个与今日日本真言宗完全相同的全国教团。",
  [],
  {
    sources: ["kukai", "china"],
    article: "vajrayana",
    links: [["jp-shingon", "惠果 → 空海：真言宗"]],
  },
);

add(
  "japan",
  "日本佛教",
  "东亚传入 · 本土宗派形成",
  "地域传统",
  "6世纪由朝鲜半岛等路径正式传入；后续多次向中国求法。日本宗派在奈良、平安、镰仓和江户等时代逐步形成。",
  "按六组阅读。日本许多“宗”具有明确的教团组织，其内部又可按本山等分“派”。这些分组是导览，不是六个历史祖宗。",
  [
    "jp-nara",
    "jp-tendai",
    "jp-shingon",
    "jp-pure",
    "jp-zen",
    "jp-nichiren-family",
  ],
  { sources: ["japan"], article: "japan-schools", edge: "东亚传播与发展" },
);
add(
  "jp-nara",
  "奈良六宗（古代学统）",
  "经论学习 · 三宗仍为主要宗派",
  "历史归类",
  "早期日本以东亚译经和学问传统为基础，形成三论、成实、法相、俱舍、华严、律等学统。",
  "古代六宗不全等同于今日独立教团。法相、华严、律在主要传统宗派中仍有位置；其余在此作为历史学统阅读。",
  ["jp-sanron", "jp-jojitsu", "jp-hosso", "jp-kusha", "jp-kegon", "jp-ritsu"],
  { sources: ["japan"], article: "japan-schools", edge: "历史分组" },
);
add(
  "jp-sanron",
  "三论学统",
  "奈良六宗 · 古代",
  "古代学统",
  "从中国三论的译经与解释传统传入，学习中观相关论书。",
  "作为古代学统列出，不冒充今天独立延续的同名主要教团。",
  [],
  { sources: ["japan", "canon"], links: [["cn-sanlun", "中国三论宗"]] },
);
add(
  "jp-jojitsu",
  "成实学统",
  "奈良六宗 · 古代",
  "古代学统",
  "以《成实论》为研究核心，在日本常依附三论等学问体系。",
  "“奈良六宗”的宗名在早期往往更接近学问传统。",
  [],
  { sources: ["japan", "canon"] },
);
add(
  "jp-hosso",
  "法相宗",
  "唯识学 · 奈良传承",
  "日本宗派",
  "承接东亚唯识学，与玄奘、窥基的译经和解释传统相连。",
  "代表寺院包括兴福寺、药师寺。以认识、心识与修行的分析为重要内容。",
  [],
  {
    sources: ["japan", "canon"],
    article: "yogacara",
    links: [["cn-faxiang", "中国法相／唯识"]],
  },
);
add(
  "jp-kusha",
  "俱舍学统",
  "《阿毗达磨俱舍论》",
  "古代学统",
  "通过东亚译传学习世亲《俱舍论》等阿毗达磨文献。",
  "不是所有奈良学统都属于大乘思想；大乘寺院也会学习部派论书。",
  [],
  { sources: ["japan", "canon"] },
);
add(
  "jp-kegon",
  "华严宗",
  "《华严经》 · 东大寺",
  "日本宗派",
  "从东亚华严经学传入，日本东大寺是重要中心。",
  "强调诸法之间的关系；与中国华严同源，但组织在日本当地发展。",
  [],
  {
    sources: ["japan", "canon"],
    article: "huayan",
    links: [["cn-huayan", "中国华严宗"]],
  },
);
add(
  "jp-ritsu",
  "律宗",
  "鉴真东渡 · 唐招提寺",
  "日本宗派",
  "鉴真于8世纪抵达日本，推动正式受戒及戒律学习。",
  "以戒律与僧团生活为中心；唐招提寺是重要代表。",
  [],
  {
    sources: ["japan", "canon"],
    article: "china-schools",
    links: [["cn-vinaya", "中国南山律学"]],
  },
);
add(
  "jp-tendai",
  "天台宗（日本）",
  "最澄 · 平安时代",
  "日本宗派",
  "最澄入唐学习天台等教法，返日后在比叡山发展天台。它承接中国天台，同时也结合密教等修学内容。",
  "比叡山是重要学习中心。法然、亲鸾、道元、日莲等都有相关学习经历；这种经历不代表后来教团仍归天台管理。",
  [],
  {
    sources: ["tendai", "japan"],
    article: "tiantai",
    links: [
      ["cn-tiantai", "中国智顗的天台"],
      ["jp-pure", "学习背景：净土诸宗"],
      ["jp-nichiren-family", "学习背景：日莲系"],
    ],
  },
);
add(
  "jp-shingon",
  "真言宗",
  "空海 · 唐代密教传承",
  "日本宗派",
  "空海入唐从惠果受学，回日本发展真言密教。其源头与印度密教及唐代译传相连。",
  "以三密、真言和曼荼罗等为特色。后世产生多种本山与支派，这里选列高野山及新义真言系代表。",
  ["jp-koyasan", "jp-shingi"],
  {
    sources: ["shingon", "kukai"],
    article: "shingon",
    links: [["cn-esoteric", "唐代密教与惠果"]],
  },
);
add(
  "jp-koyasan",
  "高野山真言宗",
  "金刚峰寺 · 本山组织",
  "日本支派",
  "以高野山金刚峰寺为总本山，延续空海相关传承与信仰。",
  "是多个真言教团之一，不代表全部真言宗。",
  [],
  { sources: ["shingon"] },
);
add(
  "jp-shingi",
  "新义真言系",
  "觉鑁以后 · 后续发展",
  "历史支系",
  "从真言传统中进一步发展，后世形成智山、丰山等教团。",
  "“新义”是历史支系归类；下层才是具体的教团组织。",
  ["jp-chisan", "jp-buzan"],
  { sources: ["japan"] },
);
add(
  "jp-chisan",
  "真言宗智山派",
  "智积院 · 京都",
  "日本支派",
  "新义真言系的代表教团之一，以智积院为总本山。",
  "“真言宗 → 智山派”是宗内教团分支的一种清楚例子。",
  [],
  { sources: ["japan"] },
);
add(
  "jp-buzan",
  "真言宗丰山派",
  "长谷寺 · 奈良",
  "日本支派",
  "新义真言系的代表教团之一，以长谷寺为总本山。",
  "与智山派同属相关历史支系，具有各自的本山组织。",
  [],
  { sources: ["japan"] },
);
add(
  "jp-pure",
  "净土诸宗",
  "同一信仰家族 · 多个宗派",
  "修行家族",
  "净土教在日本长期发展，后来出现不同教团。法然受到中国善导等人的影响；亲鸾又在法然教导基础上开展自己的理解。",
  "净土宗与净土真宗是相关而不同的宗派；融通念佛宗、时宗也属于广义净土信仰家族。",
  ["jp-jodo", "jp-shin", "jp-yuzu", "jp-ji"],
  {
    sources: ["jodo", "shin", "japan"],
    article: "pureland",
    edge: "按实践归类",
    links: [["cn-pure", "中国净土教的影响"]],
  },
);
add(
  "jp-jodo",
  "净土宗",
  "法然 · 12世纪",
  "日本宗派",
  "法然强调念佛，受到善导解释的深刻影响；1175年通常被视为开宗的重要时间。",
  "以称念阿弥陀佛为重要实践。日本“净土宗”是具体宗派，汉传“净土传统”的范围更广。",
  [],
  {
    sources: ["jodo"],
    article: "pureland",
    links: [
      ["cn-pure", "善导等中国净土思想"],
      ["jp-shin", "亲鸾：法然弟子的后续发展"],
    ],
  },
);
add(
  "jp-shin",
  "净土真宗",
  "亲鸾 · 13世纪",
  "日本宗派",
  "亲鸾曾从法然受学。其教导后来经门人和教团延续、组织化。",
  "强调阿弥陀佛本愿与信心。“真宗”并不是禅宗，也不等于“真言宗”。下列为代表支派，并非全部。",
  ["jp-hongwanji", "jp-otani"],
  {
    sources: ["shin"],
    article: "pureland",
    links: [["jp-jodo", "法然的教学背景"]],
  },
);
add(
  "jp-hongwanji",
  "本愿寺派",
  "西本愿寺 · 京都",
  "日本支派",
  "净土真宗的重要教团，以西本愿寺为本山。",
  "与大谷派共享亲鸾的教导，但具有各自的组织。",
  [],
  { sources: ["shin"] },
);
add(
  "jp-otani",
  "大谷派",
  "东本愿寺 · 京都",
  "日本支派",
  "净土真宗的重要教团，以东本愿寺（真宗本庙）为本山。",
  "宗名相近不代表同一个行政组织。",
  [],
  { sources: ["otani"] },
);
add(
  "jp-yuzu",
  "融通念佛宗",
  "良忍 · 12世纪",
  "日本宗派",
  "由良忍相关的念佛传统发展，强调彼此念佛的融通关系。",
  "与法然净土宗同属广义净土信仰，但不能简单画成法然门下。",
  [],
  { sources: ["japan"] },
);
add(
  "jp-ji",
  "时宗",
  "一遍 · 13世纪",
  "日本宗派",
  "与一遍的游行、念佛教学相关。",
  "具有自己的教团历史；念佛实践也曾与社会传播和舞踊结合。",
  [],
  { sources: ["japan"] },
);
add(
  "jp-zen",
  "禅宗诸系（日本）",
  "临济 · 曹洞 · 黄檗",
  "传承家族",
  "日本禅宗并不是从一个本土祖师一次分出三宗：临济、曹洞、黄檗对应不同时期和法脉的输入。",
  "切换“禅宗流向”可以直接沿中国源头看到日本的三条传承。",
  ["jp-rinzai", "jp-soto", "jp-obaku"],
  {
    sources: ["linji", "soto", "obaku"],
    article: "chan",
    edge: "按传承家族归类",
  },
);
add(
  "jp-rinzai",
  "临济宗（日本）",
  "荣西等传入 · Rinzai",
  "日本宗派",
  "来自中国临济一系。荣西于12世纪末传入；之后南浦绍明等又带来不同传承，后经白隐等发展。它不是只由荣西一人、一次传入。",
  "重视坐禅、作务与公案等修学。下层是官方所列的十四个本山派，按组织归属划分，不是十四套完全不同的教义。",
  [
    "rinzai-myoshin",
    "rinzai-nanzen",
    "rinzai-kencho",
    "rinzai-tofuku",
    "rinzai-engaku",
    "rinzai-daitoku",
    "rinzai-hoko",
    "rinzai-eigen",
    "rinzai-tenryu",
    "rinzai-shokoku",
    "rinzai-kennin",
    "rinzai-kogaku",
    "rinzai-buttsu",
    "rinzai-kokutai",
  ],
  {
    sources: ["linji", "rinzai"],
    article: "chan",
    links: [
      ["cn-linji", "追溯中国临济义玄"],
      ["jp-obaku", "同源的另一次输入：黄檗宗"],
    ],
  },
);
const rinzaiBranches = [
  ["myoshin", "妙心寺派", "京都"],
  ["nanzen", "南禅寺派", "京都"],
  ["kencho", "建长寺派", "镰仓"],
  ["tofuku", "东福寺派", "京都"],
  ["engaku", "圆觉寺派", "镰仓"],
  ["daitoku", "大德寺派", "京都"],
  ["hoko", "方广寺派", "滨松"],
  ["eigen", "永源寺派", "滋贺"],
  ["tenryu", "天龙寺派", "京都"],
  ["shokoku", "相国寺派", "京都"],
  ["kennin", "建仁寺派", "京都"],
  ["kogaku", "向岳寺派", "山梨"],
  ["buttsu", "佛通寺派", "广岛"],
  ["kokutai", "国泰寺派", "富山"],
];
rinzaiBranches.forEach(([id, label, place]) =>
  add(
    `rinzai-${id}`,
    label,
    `${place} · 临济十四派之一`,
    "日本支派",
    `日本临济宗的一个本山派，名称取自其本山${label.replace("派", "")}。`,
    "这里的“派”主要说明教团与寺院归属。共同的临济禅背景，不等于所有寺院的具体教学完全相同。",
    [],
    { sources: ["rinzai"], article: "chan", edge: "本山组织" },
  ),
);
add(
  "jp-soto",
  "曹洞宗（日本）",
  "道元、莹山 · Sōtō",
  "日本宗派",
  "道元入宋从天童如净参学，回日本后弘传。莹山及后续弟子扩大传承和寺院网络。",
  "以坐禅为核心；永平寺、总持寺是两大本山，不宜把两个本山自动称为两个独立宗派。",
  [],
  {
    sources: ["soto"],
    article: "chan",
    links: [["cn-caodong", "中国曹洞与天童如净"]],
  },
);
add(
  "jp-obaku",
  "黄檗宗（日本）",
  "隐元隆琦 · 17世纪 · Ōbaku",
  "日本宗派",
  "隐元隆琦于1654年从中国赴日，传入明代临济禅风，万福寺成为重要中心。后来在日本成为独立宗派。",
  "保留较多明代中国佛教的仪式和文化。它与日本临济宗同有临济背景，但不是荣西时代同一次传入。",
  [],
  {
    sources: ["obaku", "rinzai"],
    article: "chan",
    links: [
      ["cn-linji", "源自中国临济法脉"],
      ["jp-rinzai", "比较日本临济宗"],
    ],
  },
);
add(
  "jp-nichiren-family",
  "日莲系／法华系",
  "日莲 · 13世纪",
  "历史家族",
  "日莲在日本天台等学习环境中发展自己的《法华经》理解；后世门人形成多种传承和教团。",
  "重视《法华经》与唱题。下面是代表性传统教团，不是日莲系的完整名单；近现代还出现多种在家教团。",
  ["jp-nichiren", "jp-shoshu"],
  {
    sources: ["nichiren", "nichirenPractice"],
    article: "japan-schools",
    edge: "历史家族归类",
    links: [["jp-tendai", "天台与法华经的学习背景"]],
  },
);
add(
  "jp-nichiren",
  "日莲宗",
  "日莲系的代表教团",
  "日本宗派",
  "继承日莲相关教导，在后世形成自己的教团组织。",
  "以《法华经》与“南无妙法莲华经”的唱题为重要实践。日莲宗不等于全部日莲系团体。",
  [],
  { sources: ["nichirenPractice"] },
);
add(
  "jp-shoshu",
  "日莲正宗",
  "日兴相关传承 · 大石寺",
  "日本宗派",
  "日莲系中沿日兴相关传承发展，以大石寺为中心。",
  "与日莲宗同属相关历史家族，教义解释和组织各有区别。",
  [],
  { sources: ["japan"] },
);

add(
  "tibet",
  "藏传佛教",
  "印度译传 · 显密共同修学",
  "地域传统",
  "8世纪前后早期传播及10世纪后新的译传，带来不同教学法脉。藏传各派都包含显教学习和密教修行。",
  "常说的四大派之外，觉囊等传承也延续至今。苯教有自己的历史，不在本图中作为佛教宗派列入。",
  ["nyingma", "kagyu", "sakya", "gelug", "jonang"],
  {
    sources: ["tibetSchools", "jonang"],
    article: "tibet-schools",
    edge: "印度等地译传",
  },
);
add(
  "nyingma",
  "宁玛派",
  "旧译传统 · 8世纪渊源",
  "藏传教派",
  "重视早期译传，与莲花生、寂护等人的传统记忆相关。",
  "重视大圆满等教法，也有经论、戒律和多种修学内容；不能只靠帽子颜色理解教派。",
  [],
  { sources: ["tibetSchools"], article: "tibet-schools" },
);
add(
  "kagyu",
  "噶举派",
  "玛尔巴、米拉日巴、冈波巴等",
  "藏传教派",
  "从印度教学传承经译师与修行者进入西藏，后发展出多条传承。",
  "重视口传与实践、大手印等。这里选列三条重要支系，并非所有噶举支系。",
  ["karma-kagyu", "drikung-kagyu", "drukpa-kagyu"],
  { sources: ["kagyu"], article: "tibet-schools" },
);
add(
  "karma-kagyu",
  "噶玛噶举",
  "噶玛巴传承",
  "藏传支系",
  "噶举中与噶玛巴相关的一条重要传承。",
  "属于噶举家族；不等于噶举全部。",
  [],
  { sources: ["kagyu"] },
);
add(
  "drikung-kagyu",
  "直贡噶举",
  "觉巴吉天颂恭相关传承",
  "藏传支系",
  "噶举中以直贡相关传承为中心的一支。",
  "有独立的寺院和教学传承，仍共享噶举家族的重要背景。",
  [],
  { sources: ["kagyu"] },
);
add(
  "drukpa-kagyu",
  "竹巴噶举",
  "藏地与不丹等地",
  "藏传支系",
  "噶举家族中在藏地与不丹等地发展的重要传承。",
  "教派不能直接等同于国家；同一传承可跨越多个地区。",
  [],
  { sources: ["kagyu"] },
);
add(
  "sakya",
  "萨迦派",
  "昆氏传承 · 11世纪",
  "藏传教派",
  "以1073年建立的萨迦寺及相关教学为重要中心。",
  "道果法是重要特色，兼重经论学习与修行。",
  [],
  { sources: ["tibet"], article: "tibet-schools" },
);
add(
  "gelug",
  "格鲁派",
  "宗喀巴 · 14—15世纪",
  "藏传教派",
  "宗喀巴及其弟子推动教学和寺院体系发展，继承并整理多种先前教法。",
  "重视戒律、道次第、经论与辩经，也有密教。不是只学理论的一派。",
  [],
  { sources: ["tibetSchools"], article: "tibet-schools" },
);
add(
  "jonang",
  "觉囊派",
  "多笃补、多罗那他等",
  "藏传教派",
  "在觉囊相关传承中发展，多笃补与多罗那他是重要人物。不是已经消失的古代名称。",
  "他空见与时轮六支瑜伽是重要特色。具体解释应结合该传统材料阅读。",
  [],
  { sources: ["jonang"], article: "tibet-schools" },
);

const specificSources = {
  "jp-chisan": ["chisan"],
  "jp-buzan": ["buzan"],
  "jp-shingi": ["chisan", "buzan"],
  "jp-yuzu": ["yuzu"],
  "jp-ji": ["ji"],
  "jp-shoshu": ["shoshu"],
  "drikung-kagyu": ["drikung"],
  "drukpa-kagyu": ["drukpa"],
};
export const mindmapNodes = Object.fromEntries(
  nodes.map((node) => [
    node.id,
    { ...node, sources: specificSources[node.id] || node.sources },
  ]),
);
export const mapViews = [
  {
    id: "overview",
    label: "整体脉络",
    root: "buddhism",
    expanded: ["buddhism", "early", "mahayana"],
  },
  {
    id: "china",
    label: "中国宗派",
    root: "china",
    expanded: ["china", "cn-chan", "cn-linji"],
  },
  {
    id: "japan",
    label: "日本宗派",
    root: "japan",
    expanded: ["japan", "jp-nara", "jp-pure", "jp-zen", "jp-nichiren-family"],
  },
  {
    id: "zen",
    label: "禅宗流向",
    root: "cn-chan",
    note: "聚焦临济、曹洞传日线索；五家全貌见“中国宗派”。",
    expanded: ["cn-chan", "cn-linji", "cn-caodong"],
    edges: {
      "cn-chan": ["cn-linji", "cn-caodong"],
      "cn-linji": ["cn-huanglong", "cn-yangqi", "jp-rinzai", "jp-obaku"],
      "cn-caodong": ["jp-soto"],
    },
  },
  {
    id: "transmission",
    label: "中国到日本",
    root: "china",
    expanded: [
      "china",
      "cn-sanlun",
      "cn-faxiang",
      "cn-tiantai",
      "cn-huayan",
      "cn-pure",
      "cn-vinaya",
      "cn-esoteric",
    ],
    edges: {
      "cn-sanlun": ["jp-sanron"],
      "cn-faxiang": ["jp-hosso"],
      "cn-tiantai": ["jp-tendai"],
      "cn-huayan": ["jp-kegon"],
      "cn-chan": ["cn-linji", "cn-caodong"],
      "cn-linji": ["jp-rinzai", "jp-obaku"],
      "cn-caodong": ["jp-soto"],
      "cn-pure": ["jp-jodo"],
      "jp-jodo": ["jp-shin"],
      "cn-vinaya": ["jp-ritsu"],
      "cn-esoteric": ["jp-shingon"],
    },
  },
  {
    id: "tibet",
    label: "藏传各派",
    root: "tibet",
    expanded: ["tibet", "kagyu"],
  },
];

export function childrenOf(id, view) {
  return view?.edges?.[id] ?? mindmapNodes[id].children;
}

export function findMapPath(target, root = "buddhism", view) {
  if (root === target) return [root];
  for (const child of childrenOf(root, view)) {
    const path = findMapPath(target, child, view);
    if (path) return [root, ...path];
  }
  return null;
}
