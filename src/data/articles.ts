export interface CountdownEntry {
  rank: number;
  title: string;
  subtitle: string;
  body: string;
  factoid: string;
}

export type TagStyle = 'weird' | 'history' | 'nature' | 'creepy' | 'secondary';

export interface Article {
  id: string;
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  shortDate: string;
  readTime: string;
  readsCount?: string;
  category: string;
  channel: 'Bizarre' | 'Entertainment' | 'General Knowledge' | 'Lifestyle' | 'Science' | 'Society' | 'Gaming' | 'Film & Movies';
  filterTag: 'GAMING' | 'FILM & MOVIES' | 'BIZARRE' | 'SCIENCE & NATURE' | 'SOCIETY & WEIRD';
  tagLabel: string;
  tagStyle: TagStyle;
  badgeSecondary?: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  section: 'main-lead' | 'secondary-lead' | 'quick-read' | 'feature-feed' | 'editor-pick' | 'gaming-showcase' | 'film-showcase';
  quickRank?: number;
  entries?: CountdownEntry[];
}

export interface PollOption {
  id: string;
  rank: number;
  title: string;
  year: string;
  directorOrStudio: string;
  votes: number;
  barColor: string;
}

export const EDITOR_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAiJ-lCzU9uI2bJbav85I6YVxSKsorUbN47tQaCaZOpZ15uHCR_ONkuXU-iGZrEPx1fzXi6E_duZ-nhDwyO810OaevnXV6e9EtL-66aH7oDbrCMc6PT62hhVcY_ZaiKA8RBe_k-dmQsCTAtyjl4VyIEiK95Uqf4LF4SARMEM9g1fppqA93uNJ48_B0NF4jKIx0_-G__UMTQFFS6lBpYTnUonLloifesNI2oI7lK36I';

export const INITIAL_POLL_MOVIES: PollOption[] = [
  {
    id: 'matrix-1999',
    rank: 1,
    title: 'The Matrix (1999)',
    year: '1999',
    directorOrStudio: 'The Wachowskis',
    votes: 14210,
    barColor: 'bg-primary',
  },
  {
    id: 'fight-club-1999',
    rank: 2,
    title: 'Fight Club (1999)',
    year: '1999',
    directorOrStudio: 'David Fincher',
    votes: 10845,
    barColor: 'bg-primary-container',
  },
  {
    id: 'chrono-trigger-1995',
    rank: 3,
    title: 'Chrono Trigger (1995)',
    year: '1995',
    directorOrStudio: 'Square',
    votes: 7120,
    barColor: 'bg-secondary',
  },
  {
    id: 'half-life-1998',
    rank: 4,
    title: 'Half-Life (1998)',
    year: '1998',
    directorOrStudio: 'Valve',
    votes: 5230,
    barColor: 'bg-tertiary-container',
  },
];

export const INITIAL_POLL_GAMES: PollOption[] = [
  {
    id: 'chrono-trigger-game',
    rank: 1,
    title: 'Chrono Trigger (1995)',
    year: '1995',
    directorOrStudio: 'Square Dream Team',
    votes: 16480,
    barColor: 'bg-primary',
  },
  {
    id: 'half-life-game',
    rank: 2,
    title: 'Half-Life (1998)',
    year: '1998',
    directorOrStudio: 'Valve Corporation',
    votes: 12390,
    barColor: 'bg-primary-container',
  },
  {
    id: 'mgs-1998',
    rank: 3,
    title: 'Metal Gear Solid (1998)',
    year: '1998',
    directorOrStudio: 'Konami / Kojima',
    votes: 9410,
    barColor: 'bg-secondary',
  },
  {
    id: 'system-shock-2',
    rank: 4,
    title: 'System Shock 2 (1999)',
    year: '1999',
    directorOrStudio: 'Looking Glass / Irrational',
    votes: 6820,
    barColor: 'bg-tertiary-container',
  },
];

export const ARTICLES: Article[] = [
  // MAIN LEAD
  {
    id: 'halloween-dark-side',
    title: '10 Halloween Facts with a Dark Side',
    author: 'Jana Louise Smit',
    authorRole: 'Senior Historical Correspondent',
    date: 'October 30, 2026',
    shortDate: 'Oct 30',
    readTime: '10 min read',
    readsCount: '142K reads',
    category: 'Weird Stuff',
    channel: 'Bizarre',
    filterTag: 'BIZARRE',
    tagLabel: 'Weird Stuff',
    tagStyle: 'secondary',
    badgeSecondary: '#1 TRENDING',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKls4WGiPRznlUIv06q0lc88d6QCh7_fshkDKC14pvtRTcBlex5lrjk08Xf9af9KqtnMWYfE_kU1nXP7nQYjfJJ-z3WTs7RWYEDfi2y09LbiocC11zQiPV1P_x04l_moBaPqzL8UmLPmf1o2caJ70anNiXPIsNBsWN-NpQNV2UuSono0qYVX2LowXV8L4hun3JCuQLTKdobc3ZECWELnE_b6J7Jz1wIJkIcpT5HPc',
    imageAlt:
      'A vintage cinematic eerie Halloween night photograph depicting a young girl dressed in a classic velvet witch costume holding a luminous glowing carved jack-o-lantern pumpkin under cold moonlight with dark shadows and deep atmospheric mist.',
    excerpt:
      'Beyond the sugary treats and neighborhood doorbells lies a genuinely chilling timeline of historical superstitions, ancient harvest rites, and real-life macabre events that formed our beloved October tradition.',
    section: 'main-lead',
    entries: [
      {
        rank: 10,
        title: 'Turnip Lanterns Were Designed to Ward Off Vengeful Spirits',
        subtitle: '19th-Century Ireland & Scotland',
        body: 'Long before smooth orange pumpkins became the symbol of October, rural families in Ireland and the Scottish Highlands hollowed out knotted, gnarled rutabagas and turnips. They carved grotesque, anguished faces into the root vegetables and placed glowing embers of peat inside. According to folklorists, these lanterns were left on window ledges not for festive cheer, but as protective wards against Stingy Jack and wandering revenants believed to slip through the thinning boundary between worlds on Samhain.',
        factoid: 'The National Museum of Ireland still preserves an original 1850s "Ghost Turnip" that looks far more terrifying than any modern pumpkin.',
      },
      {
        rank: 9,
        title: 'Souling Cakes Held the Fate of Purgatorial Souls',
        subtitle: 'Medieval British Isles',
        body: 'Trick-or-treating traces a major branch of its lineage to the medieval custom of "souling." On All Souls’ Eve, impoverished villagers and children walked from parish to parish singing mournful prayers at the doors of wealthy landowners. In exchange for each spiced "soul cake" handed through the lattice, the recipient pledged to recite prayers to hasten the giver’s deceased relatives out of Purgatory.',
        factoid: 'Refusing a souler was considered a grave spiritual hazard, often met with rhyming curses scratched into the manor gatepost.',
      },
      {
        rank: 8,
        title: 'Victorian Parlors Used Mirrors for Morbid Marriage Divination',
        subtitle: 'Late 1800s Britain & America',
        body: 'During the Victorian era, Halloween was treated as a night of high-stakes romantic and mortal divination. Young women were dared to walk backward down a dark cellar staircase at midnight holding a single tallow candle and a hand mirror. Tradition held that the face of their future spouse would appear over their shoulder in the glass—unless they were destined to die before wedding, in which case a grinning skull would stare back.',
        factoid: 'Victorian newspapers routinely reported severe burns and cellar falls on November 1st from parlor dares gone wrong.',
      },
      {
        rank: 7,
        title: 'The "Dumb Supper" Invited Ghosts to the Dining Table',
        subtitle: 'Appalachia & Ozark Mountains',
        body: 'In isolated communities across Appalachia, families observed the ritual of the Dumb Supper. Every phase of the meal—from baking corn bread backward to setting the porcelain plates—had to be performed in absolute, unbroken silence. An empty chair was placed at the head of the table with all doors unlatched at midnight so the spirits of the departed could enter and dine alongside the living.',
        factoid: 'Speaking even a single word during a Dumb Supper was believed to summon an omen of death within the household before winter.',
      },
      {
        rank: 6,
        title: 'Early 20th-Century "Gate Night" Was So Destructive Cities Considered Banning Halloween',
        subtitle: '1920s–1930s Urban North America',
        body: 'Before community organizers domesticated Halloween into a candy-focused children’s holiday in the late 1930s, October 31st was notorious for widespread urban vandalism. Known as "Gate Night" or "Devil’s Night," roving gangs unhinged barn doors, greased streetcar tracks, tipped outhouses, and shattered shop windows across major cities from Chicago to Toronto.',
        factoid: 'By 1933, municipal damages were so severe that civic clubs explicitly promoted organized costume parades and candy handouts just to keep teenagers occupied.',
      },
      {
        rank: 5,
        title: 'Cabbage Stump Divination Dictated Village Courtships',
        subtitle: '18th-Century Scottish Lowlands',
        body: 'Recorded vividly by poet Robert Burns in his 1785 poem "Halloween," blindfolded youths would sneak into a neighbor’s kailyard after dark and pull the first cabbage stalk they could yank from the frozen soil. The shape of the root, the amount of dirt clinging to it, and the sourness of the stem were read by village elders as an unerring prophecy of a future partner’s wealth, figure, and temper.',
        factoid: 'Neighbors often booby-trapped their cabbage patches with nettles and tripwires to punish midnight trespassers.',
      },
      {
        rank: 4,
        title: 'Bonfire Bone-Reading Determined Who Would Survive the Winter',
        subtitle: 'Celtic & Gaelic Highland Tradition',
        body: 'As communal Samhain bonfires burned down to white ash, each member of a clan marked a smooth river stone and placed it in a circle around the dying embers. At dawn, the ashes were inspected closely. If a stone had shifted out of place or cracked from the heat, its owner was believed to be "fey"—marked not to survive until the next autumn harvest.',
        factoid: 'Literal animal bones ("bone-fires") gave us the modern English word bonfire.',
      },
      {
        rank: 3,
        title: '19th-Century "Snapdragon" Involved Plucking Raisins from Burning Brandy',
        subtitle: 'Regency & Victorian Drawing Rooms',
        body: 'Long before bobbing for apples became the standard party game, families gathered around a wide shallow bowl filled with heated brandy and dried raisins. All lamps in the room were extinguished, and the alcohol was set ablaze. Players had to thrust their bare fingers into the blue flames, snatch a burning raisin, and pop it into their mouths while the eerie blue fire illuminated their faces like specters.',
        factoid: 'Lewis Carroll immortalized the hazardous game as the "Snap-dragon-fly" in Through the Looking-Glass.',
      },
      {
        rank: 2,
        title: 'Real Human Skeletons Were Used in Early Fraternal Initiation Haunts',
        subtitle: 'Gilded Age America',
        body: 'During the late 19th-century boom in fraternal lodges and autumn spooky pageants, anatomical supply companies sold genuine articulated human skeletons to lodges for October initiation rites. Decades later, renovations of historic lodge halls across the Midwest repeatedly uncovered real human remains wired inside papier-mâché Halloween props.',
        factoid: 'Forensic anthropologists still get called to antique shops in October when vintage haunt props turn out to be real osteological specimens.',
      },
      {
        rank: 1,
        title: 'The Ancient Festival of Samhain Demanded Total Household Darkness',
        subtitle: 'Pre-Christian Ireland',
        body: 'At the heart of Halloween’s earliest ancestor, every hearth fire across Ireland had to be extinguished completely on the night of Samhain, leaving farmsteads in freezing, pitch-black silence while Druids kindled a single sacred fire atop the Hill of Ward (Tlachtga). Only after offerings were made could families carry a burning ember back through the dark countryside to relight their home hearths for the winter.',
        factoid: 'Archaeological excavations at Tlachtga revealed centuries of compacted ash layers and scorched animal bone fragments dating back over 2,000 years.',
      },
    ],
  },

  // TWIN SECONDARY LEADS
  {
    id: 'tower-of-london',
    title: "10 True Tales from the Tower of London's 1,000-Year History",
    author: 'Lyal Smeaton',
    authorRole: 'British History Editor',
    date: 'October 29, 2026',
    shortDate: 'Oct 29',
    readTime: '9 min read',
    readsCount: '98K reads',
    category: 'History',
    channel: 'Society',
    filterTag: 'SOCIETY & WEIRD',
    tagLabel: 'History',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOW1JuVDi-djr5te57Xly6IuqGZrPque81mh_Z0FcKhDfkCDCthYdRQMPzHiIWCfNtHzj-iQ1xBcGJTT0PINgWkLlyEGYmp95jLIqGZl2JUht3Vp35Fnlvwv3IaiG52FXmljft3KvLp9_-jWSLuMkJaLlXRl1KEFCLYIunf1k4agB9u66hdcV3rKcVYPMBsjEZs-p3rmkAg_HjdaktWxGpHQuZRCczmOM7mc_MteY',
    imageAlt:
      'Dusk photograph of the historic medieval Tower of London stone fortress illuminated by dramatic warm amber floodlights against a twilight indigo sky, reflecting across dark river water.',
    excerpt:
      "Royal executions, secret royal jewel thefts, and medieval intrigue inside Britain's most notorious stronghold.",
    section: 'secondary-lead',
  },
  {
    id: 'unexpected-animals',
    title: '10 Animals Discovered in the Most Unexpected Places',
    author: 'Jeffrey Morris',
    authorRole: 'Wildlife & Ecology Contributor',
    date: 'October 28, 2026',
    shortDate: 'Oct 28',
    readTime: '7 min read',
    readsCount: '84K reads',
    category: 'Animals',
    channel: 'Science',
    filterTag: 'SCIENCE & NATURE',
    tagLabel: 'Animals',
    tagStyle: 'nature',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9oQjuRi9DZqvmG2Q7iEMo8ZRL6dUfijhOg8FRGjHRqYCDKTHX_D7ZA90WCAka49MApl_k6El294JnkkQWizhrjVzTfJFgI8f6WoExRu1GninyzRGrsGCuRpRoKakE1KBOVPCT4g-Z-wY1k5EMqt4gy0dClhkUlhHp4XCS0_JgOvMVvh5PLNMitLzI-PJ6CsQ-F6MMvCnSsYXs6Ft4gJXrPJCi5g-i0SVIGLoTvU4',
    imageAlt:
      'Macro wildlife photography of a curious exotic insect perched delicately on vibrant wild blossoms deep within an ancient lush green rainforest canopy.',
    excerpt:
      'From radioactive fallout zones to suburban HVAC systems, nature never stops defying human expectations.',
    section: 'secondary-lead',
  },

  // TRENDING QUICK-READS (LEFT SIDEBAR 1-5)
  {
    id: 'nuclear-testing-clues',
    title: '10 Unexpected Clues Left Behind by Nuclear Testing',
    author: 'Marcus Vance',
    date: 'October 27, 2026',
    shortDate: 'Oct 27',
    readTime: '8 min read',
    readsCount: '115K reads',
    category: 'Weird Stuff',
    channel: 'Science',
    filterTag: 'BIZARRE',
    tagLabel: 'Weird Stuff',
    tagStyle: 'weird',
    quickRank: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCePy2dwNzQAF8hyOBCR25X_GO_vQ-PgFxgpVLi3R55UUmwfe9Ubq0QKVFK24UAN39hacEbUTJ3mIM7fVV3UpS--WYUSgkraFrX0Rj7LmDYEWOxIHVRpoVFADPTUFGV5JhBfLRY6kfDIhichjPpEIbbAHg-7EcQCSX6WJXrjyAOFGMbx84fjS7u18wmTkYgGTCri8IA-zur7RnOTu7_o8pDXw6X-uv43Nb-1nr8J9M',
    imageAlt:
      'Historical vintage black and white archival explosion cloud from desert nuclear weapons testing with billowing dust columns and horizon glow.',
    excerpt:
      'From forged art detection via Cesium-137 in wine bottles to radioactive glass forged in desert sands, atomic tests permanently signed the planet.',
    section: 'quick-read',
  },
  {
    id: 'real-places-wilder-than-fiction',
    title: '10 Real Places with Histories Too Wild to Be Fiction',
    author: 'Lyal Smeaton',
    date: 'October 26, 2026',
    shortDate: 'Oct 26',
    readTime: '6 min read',
    readsCount: '91K reads',
    category: 'Our World',
    channel: 'General Knowledge',
    filterTag: 'SOCIETY & WEIRD',
    tagLabel: 'Our World',
    tagStyle: 'history',
    quickRank: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBT_r_5fldtC2wcaRDJy8UULc0qnDyQJtZgBheqcOArGK6wZD6f6F8_9LY7ahwOlt_Z9soMf_fTf_u5Qh-DmLPMT2lTiaZ17Qsjz76Ctf_pYA2OleDcp-kjeDCSNm3TfHtDzvRj08CrtcgFxmrObdISilQtGrJsfMNb5WPo0s8cAT0ogG0KSe4Uo-CR9vtZSDXe1WfO9Q6wh1voZo1ZbbShQ0IWnkRFjuaTH2WMNJU',
    imageAlt:
      'Mystical wooden bridge over clear reflective turquoise mountain lake surrounded by dense autumn woods shrouded in light silver fog.',
    excerpt:
      'Islands ruled by castaway mutineers, subterranean cities carved into volcanic tuff, and fortresses that declared war on empires.',
    section: 'quick-read',
  },
  {
    id: 'bizarre-immortality-legends',
    title: '10 Bizarre Immortality Legends and the Dark Truth Behind Them',
    author: 'Jana Louise Smit',
    date: 'October 23, 2026',
    shortDate: 'Oct 23',
    readTime: '11 min read',
    readsCount: '88K reads',
    category: 'Weird Stuff',
    channel: 'Bizarre',
    filterTag: 'BIZARRE',
    tagLabel: 'Weird Stuff',
    tagStyle: 'weird',
    quickRank: 3,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfvV1AtqBYUiZAVW9Add4ebgEUHtRXbDwPpCn2d6xys7MNXN7w7jNEnKi9DG6E03o1aaE1lT9vGzrDwAqDB6tn4k_4Th3Jq7oy66iVV84Ht0JYStlfNXGoQUrl1g88beJSIa6B8pJTeD4t4peAoZ-WOKyAFvsA59cSA1Pn2ulmIReNfCnFnVcKGapg2z4v0caVEiCbcx-rhH6LRP9bANnPvo94LHVU5cC114ZlJQ8',
    imageAlt:
      'Ethereal glowing turquoise fountain in a stone courtyard cavern with celestial starlight filtering through cracked cavern ceilings.',
    excerpt:
      'Emperors drinking liquid mercury, alchemists distilling gold elixirs, and the strange historical figures who claimed they never aged.',
    section: 'quick-read',
  },
  {
    id: 'appalachian-legends',
    title: '10 Appalachian Legends to Haunt Your Halloween',
    author: 'Gary Pullman',
    date: 'October 22, 2026',
    shortDate: 'Oct 22',
    readTime: '9 min read',
    readsCount: '104K reads',
    category: 'Creepy',
    channel: 'Bizarre',
    filterTag: 'SOCIETY & WEIRD',
    tagLabel: 'Creepy',
    tagStyle: 'creepy',
    quickRank: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSc7gnBz44FkHHjxro0JfHF3XBtI2pApsnq1uiBYmqvLbLrYfQvKt2zQRZwk7oFQxqR78TAvOuHa6gynOPWmEf25khJUZdqW81suFunRUSG7mT3KvctOfPTPtLkF_nBPRP-P7cC_wpB0eNhVYiE-3-1T7cg9MX4lbv-INKHitjw6rwD0i8E4tQXUwS5kDXj-cZEPVOPw5kvubYnYFOHywLmpGlypxY1EnGeg-KVCY',
    imageAlt:
      'Misty deep Appalachian woods with tall ancient mossy birch trees shrouded in heavy rolling fog and twilight shadows.',
    excerpt:
      'One of the oldest mountain ranges on Earth holds centuries of Scots-Irish and Cherokee folklore whispered around porch lanterns.',
    section: 'quick-read',
  },
  {
    id: 'weird-lakes-nature',
    title: '10 Lakes Where Nature Gets Seriously Weird',
    author: 'Jeffrey Morris',
    date: 'October 19, 2026',
    shortDate: 'Oct 19',
    readTime: '7 min read',
    readsCount: '76K reads',
    category: 'Weird Stuff',
    channel: 'Science',
    filterTag: 'SCIENCE & NATURE',
    tagLabel: 'Weird Stuff',
    tagStyle: 'weird',
    quickRank: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA87Q8YlkqlqwiMb49vZ42j3SRX93MrnYJXeLVEJ4kl-YZjC26hgv-4rkosEruKxSZR4hAHhSJhBgWc8N2wgUi7x1kJw_XlKN_s8MTv4gGyzk172RVvDOYEdE29PXMoJjjxBX1ExYszsYrZghI-4R_rsN8uoPeT2ctYLGAYegih4LkQDhe4HWtLQ3reVouJkJV8Np0dPuCe6xIeSDXcNeWXmxncAceydqZUNo9GN4E',
    imageAlt:
      'Overhead aerial photography of an unusually vibrant pink alkaline salt lake framed by white mineral crusts and blue ocean surf.',
    excerpt:
      'Boiling asphalt lagoons, bubblegum-pink hypersaline basins, and calcifying waters that turn fallen birds into stone statues.',
    section: 'quick-read',
  },

  // MAIN FEATURE FEED (CENTER COLUMN 1-3)
  {
    id: 'mathematical-geniuses',
    title: '10 Mathematical Geniuses Who Quietly Built the Modern World',
    author: 'Himanshu Sharma',
    authorRole: 'Science & Mathematics Writer',
    date: 'October 21, 2026',
    shortDate: 'Oct 21',
    readTime: '9 min read',
    readsCount: '67K reads',
    category: 'Humans & Science',
    channel: 'Science',
    filterTag: 'SCIENCE & NATURE',
    tagLabel: 'Humans & Science',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKSCljPvpd64mESwDPiEgHzC3COvhPqvjHPwwCYNCFzy85fIcUlzT4HXMEAQLB9MqHqe82f2rAl3_8iVetgrITbGREcdnlel-I4yW-0QwAnbXtMjhnhmbixKDAL2mqxGX6rtExTrFy5wZKSKERfFCWwLDZZxzDju9JVLoyetIlPWOAnaZoUWoYBNrfVKJ7SrPFIGoehAJF8oQkH5HbZx5THP6ej5AKMQemiav1fZo',
    imageAlt:
      'An ancient scholar unfurling delicate mathematical parchment scrolls covered in geometry diagrams under warm library candlelight with brass calipers on table.',
    excerpt:
      'History celebrates the generals and monarchs, but our digital reality, cryptography, and modern engineering were designed by secluded thinkers working through equations that were centuries ahead of their peers.',
    section: 'feature-feed',
    entries: [
      {
        rank: 10,
        title: 'Claude Shannon — The Father of the Information Age',
        subtitle: '1916–2001 • Bell Labs',
        body: 'In a single 1937 master’s thesis written at age 21, Claude Shannon demonstrated that nineteenth-century Boolean algebra could be mapped directly onto electrical relay circuits. A decade later, his landmark paper "A Mathematical Theory of Communication" coined the term "bit" and laid the entire mathematical blueprint for data compression, error correction, and modern digital telecommunications.',
        factoid: 'Shannon rode a unicycle through the corridors of Bell Labs while juggling three balls and built a mechanical mouse named Theseus that could solve mazes.',
      },
      {
        rank: 9,
        title: 'Emmy Noether — Architect of Modern Theoretical Physics',
        subtitle: '1882–1935 • University of Göttingen',
        body: 'Albert Einstein called her the most significant creative mathematical genius produced since the higher education of women began. Noether’s Theorem proved a breathtaking truth about our universe: every continuous symmetry in nature corresponds directly to a conservation law—time symmetry yields conservation of energy, and spatial symmetry yields conservation of momentum.',
        factoid: 'For years, Göttingen University forced her to lecture without pay under a male colleague’s name before David Hilbert famously protested, "After all, we are a university, not a bathhouse!"',
      },
      {
        rank: 8,
        title: 'Al-Khwarizmi — Inventor of Systematic Algebra and Algorithms',
        subtitle: 'c. 780–850 CE • House of Wisdom, Baghdad',
        body: 'Working in ninth-century Baghdad, Muhammad ibn Musa al-Khwarizmi authored "The Compendious Book on Calculation by Completion and Balancing" (al-Jabr), establishing algebra as an independent mathematical discipline. His Latinized name, Algoritmi, gave the modern world the word "algorithm."',
        factoid: 'His treatise introduced Hindu-Arabic numerals and the decimal positional system to the Western world, replacing cumbersome Roman numerals.',
      },
      {
        rank: 7,
        title: 'Srinivasa Ramanujan — The Man Who Knew Infinity',
        subtitle: '1887–1920 • Kumbakonam & Cambridge',
        body: 'Working largely in isolation in southern India with minimal formal training, Ramanujan compiled nearly 3,900 original results in number theory, infinite series, and continued fractions. Decades after his tragic death at age 32, physicists discovered his "mock theta functions" describe the entropy of black holes.',
        factoid: 'When G.H. Hardy remarked that his taxi number 1729 seemed dull, Ramanujan instantly replied it was the smallest number expressible as the sum of two cubes in two different ways.',
      },
      {
        rank: 6,
        title: 'Ada Lovelace — Visionary of Symbolic Computing',
        subtitle: '1815–1852 • London',
        body: 'While translating an article on Charles Babbage’s proposed Analytical Engine, Ada Lovelace appended "Notes" three times longer than the original paper. Not only did she write the first published algorithm for computing Bernoulli numbers, she was the first person to realize that a computer could manipulate symbols, music, and art—not merely numbers.',
        factoid: 'Her Note G contains a complete step-by-step trace table with variable states and loops a century before electronic hardware existed.',
      },
      {
        rank: 5,
        title: 'Évariste Galois — The Teenager Who Revolutionized Symmetry',
        subtitle: '1811–1832 • Paris',
        body: 'On the eve of a fatal duel at age 20, Évariste Galois stayed up all night scribbling letters to his friend Auguste Chevalier, frantically summarizing his discoveries on the solvability of polynomial equations. Those pages founded Group Theory—the mathematical language of crystallography, particle physics, and modern Rubik’s Cube permutations.',
        factoid: 'In the margins of his final manuscript, Galois wrote "I have not time" beside theorems that took mathematicians decades to unpack.',
      },
      {
        rank: 4,
        title: 'Katherine Johnson — Orbital Mechanics Pioneer',
        subtitle: '1918–2020 • NASA Langley Research Center',
        body: 'Before astronauts trusted early IBM mainframes, John Glenn famously requested that Katherine Johnson personally verify the orbital trajectory equations by hand before his Friendship 7 launch. Her mastery of analytic geometry and Euler’s method guided Project Mercury, the Apollo 11 lunar rendezvous, and the safe return of Apollo 13.',
        factoid: 'She co-authored 26 scientific research reports that defined the mathematics of spaceflight navigation.',
      },
      {
        rank: 3,
        title: 'Bernhard Riemann — Cartographer of Curved Space',
        subtitle: '1826–1866 • Germany',
        body: 'In an 1854 qualifying lecture attended by Carl Friedrich Gauss, shy 27-year-old Bernhard Riemann generalized geometry to curved spaces of arbitrary dimensions. Sixty years later, Riemannian geometry provided Albert Einstein with the exact mathematical framework needed to formulate General Relativity.',
        factoid: 'The Riemann Hypothesis regarding the distribution of prime numbers remains the most famous unsolved $1 million Clay Millennium Prize problem.',
      },
      {
        rank: 2,
        title: 'George Boole — The Self-Taught Logician of Ones and Zeros',
        subtitle: '1815–1864 • Lincoln & Cork',
        body: 'The son of a struggling shoemaker who taught himself Greek, Latin, and calculus by candlelight, George Boole published "The Laws of Thought" in 1854. By reducing human deductive reasoning to algebraic equations operating on true (1) and false (0), he forged the logic gates inside every microprocessor on Earth.',
        factoid: 'Every search query, database filter, and CPU instruction executes Boolean algebra billions of times per second.',
      },
      {
        rank: 1,
        title: 'Leonhard Euler — The Master of Us All',
        subtitle: '1707–1783 • Basel, St. Petersburg & Berlin',
        body: 'Producing over 800 books and papers—nearly half dictated after going completely blind—Leonhard Euler standardized modern mathematical notation (f(x), e, i, π, Σ), founded graph theory by solving the Seven Bridges of Königsberg problem, and derived equations governing fluid dynamics, optics, bucking columns, and orbital astronomy.',
        factoid: 'Pierre-Simon Laplace advised young scientists: "Read Euler, read Euler, he is the master of us all."',
      },
    ],
  },
  {
    id: 'movie-antagonists-sympathy',
    title: '10 Movie Antagonists Who Deserved More Sympathy',
    author: 'Tessa Morland',
    authorRole: 'Film Critic & Cultural Essayist',
    date: 'October 20, 2026',
    shortDate: 'Oct 20',
    readTime: '7 min read',
    readsCount: '79K reads',
    category: 'Movies & TV',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Movies & TV',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlQC0hWOugwKtD7waStMgYd9IMYOzAfc04aF4jy_eBJwvPac5xwWqe5U7dbkR_c4T6mGukFkrUrQIN-VPoCn1yDGrzRGGDCIiQFgkZlf0oHJKBr7ENLkAblqO6elBMTofnJ9y9_mQkubUW_nY1xlK-hi5G7UgHyhkxPUynxfFam_xm77hjTlgb7Gd84R2A33OmQMcfy2AtrvJ74ipIBNaeQV8qyN9HwVOejFjmi1Q',
    imageAlt:
      'A conflicted male protagonist in sharp navy suit gazing with intense emotional hesitation and clasped hands in a moody cinematic room with blue backlighting.',
    excerpt:
      'When you strip away dramatic musical cues and protagonist favoritism, several notorious cinematic villains were simply individuals pushed into cornered choices with unshakeable moral rationale.',
    section: 'feature-feed',
  },
  {
    id: 'music-careers-from-sitcoms',
    title: '10 of the Biggest Music Careers Launched by Sitcoms',
    author: 'Jennifer Lafferty',
    authorRole: 'Entertainment & Pop Culture Writer',
    date: 'October 16, 2026',
    shortDate: 'Oct 16',
    readTime: '8 min read',
    readsCount: '63K reads',
    category: 'Entertainment & Music',
    channel: 'Entertainment',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Entertainment & Music',
    tagStyle: 'nature',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sp4sdkt7X-A-nm4sMEAFsamqBsp8P2FPIHhmK9jK5ZAYEUH05pzZDoqKHKQF04KE421N4F0Qn2umQDbSFQg-ALnCoXxMYidcIdQYFxvWBoTK4ELXDu0h8Z7oRfySEOnJwio0o9RVNvQMZtvDS2ja605PVe9vDZ5xaGZLnMV_rU4q7coEUFiW4Owg-RTsDoAdimG0hcNX5xD-EzPi3y_3n-Bbpbj_zy9YS_ZLMEI',
    imageAlt:
      'A young charismatic rock musician playing an electric bass guitar on a brightly lit television studio set with concert stage flare and studio microphones.',
    excerpt:
      'Before topping worldwide Billboard charts and selling out stadium tours, these legendary performers started as fictional sitcom characters playing for laugh tracks.',
    section: 'feature-feed',
  },

  // EDITOR'S PICKS (RIGHT SIDEBAR 1-4)
  {
    id: 'horror-villains-diagnoses',
    title: '10 Psychiatric Diagnoses Of Horror Villains And Their Victims',
    author: 'Gary Pullman',
    date: 'October 18, 2026',
    shortDate: 'Oct 18',
    readTime: '10 min read',
    readsCount: '94K reads',
    category: 'Movies & TV',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Movies & TV',
    tagStyle: 'creepy',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAeWrimFNypvB0VprZYvhTlpnYc2CbdSO3dAPLZOR2elwwyupUTNxrkftFhl1u3B-WXgCrqgjN0nECsIhWh7_8anEFGAmy3d1CB3JNjzJYeeYnWdNbcMyW3i8d4K12aTz2WnWpWwzA4LPbgYBF3yAofI7BREwDjp-7aX-uHs0Of9hfVRQT4bojhH8I9geYpMTbKBt0CahvSzTtRDuhkJQVexsgmOYDU2OFjMhisCY',
    imageAlt:
      'Moody cinematic portrait of an analytical clinical psychiatrist examining dramatic case files with cold neon lights and psychological villain shadows.',
    excerpt:
      'Clinical forensic psychologists examine the behavioral patterns, delusions, and trauma responses depicted in classic cinema horror.',
    section: 'editor-pick',
  },
  {
    id: 'greatest-movie-macguffins',
    title: '10 Greatest Movie MacGuffins Of All Time',
    author: 'Jonathan H. Kantor',
    date: 'October 15, 2026',
    shortDate: 'Oct 15',
    readTime: '8 min read',
    readsCount: '72K reads',
    category: 'Movies & TV',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Movies & TV',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd0m46j_y194Op3RFoEi3CdDuVb9uxJHPV9k-FvvK_cDBWFkTqlZWbEdzKCm5eYjaKwwLlw-YKb25mr1oy7D98QR_U-1sYIYRH0gts78X2gJzhP5_xnJafR6D32ERjducGfyzYkWpPftcJDUJvUAhfxuLeIoSgjSatAagK3PkA9QPtWf-FoDzFhgK4xPYn0k-no_-IRixAGONoK5yl95nXhrWFzkfGuOdttxvRCS8',
    imageAlt:
      'Intense cinematic scene of an explorer holding a glowing mythical artifact gold chalice in a dimly lit subterranean tomb.',
    excerpt:
      'From glowing briefcases to Maltese falcons, the objects that drive every character to the edge even when the audience never learns what they do.',
    section: 'editor-pick',
  },
  {
    id: 'iconic-tv-restaurants',
    title: '10 Iconic Movie And TV Restaurants That Are Actually Real',
    author: 'M David Scott',
    date: 'October 14, 2026',
    shortDate: 'Oct 14',
    readTime: '7 min read',
    readsCount: '81K reads',
    category: 'Pop Culture',
    channel: 'Lifestyle',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Pop Culture',
    tagStyle: 'weird',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9mQqSeJec2pPglljUePgtOBv1Sep21vNP_DVzhIFPS0Y7zJvGYU1Xwta2q90WEJmrOhxEQ9ulsoK4eUWp1zGwGi-ebHi8Ie_UnJgjajMqxpIJTsBmrUvwI2s9GgDm8P7DgsOf7xbCZ3L-jDPL1T79MkRLvsZembkV6dfEGQQOv41KbT3Tuwu0U4HrlvtzJgofg1_akwX1vx4nRf_h-MKYTaxWOR9Iw86LKZ-Ku4w',
    imageAlt:
      'New York street corner showing an iconic mid-century urban diner restaurant facade with bright red neon signage and patrons walking on sidewalk.',
    excerpt:
      'You can pull up a booth at Tom’s Restaurant in Morningside Heights or order cherry pie at Twede’s Cafe in North Bend.',
    section: 'editor-pick',
  },
  {
    id: 'historical-battles-hollywood-wrong',
    title: '10 Historical Battles Hollywood Got Completely Wrong',
    author: 'Steve Wynalda',
    date: 'October 12, 2026',
    shortDate: 'Oct 12',
    readTime: '11 min read',
    readsCount: '110K reads',
    category: 'History & Myth',
    channel: 'Society',
    filterTag: 'SOCIETY & WEIRD',
    tagLabel: 'History & Myth',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAraQFw-64rD3AkW0Zf9BMfG2Y3R02FbTvEkGdD3clpKaG_8wUVBCXbB42dQNVsd8vaAJON8sCRdXQrgTbV6_3tMicjFsMQDCzdiDvLk_AZktJ34CMUn7tWMV9NqHiiHaOAnqORUKV7tEXs2ggKy7_pUtvfg9tA5xEmjHA8Etu0yo5m0VP0sH0y6NAB_XFm_bap03uRf-5q_HHKcaBT1R7Zt4KTWkR2q64oSfWvsfM',
    imageAlt:
      'Ancient Spartan warrior with bronze shield and spear amidst epic stylized sea spray and chaotic battlefield fires.',
    excerpt:
      'Missing bridges at Stirling, leather-clad Spartans at Thermopylae, and tactical blunders rewritten for blockbuster finales.',
    section: 'editor-pick',
  },

  // TOP 10 GAMING SHOWCASE (1-3)
  {
    id: 'video-game-secrets-decades',
    title: '10 Video Game Secrets Discovered Decades After Release',
    author: 'Marcus Vance',
    date: 'October 11, 2026',
    shortDate: 'Oct 11',
    readTime: '9 min read',
    readsCount: '128K reads',
    category: 'Gaming Lore',
    channel: 'Gaming',
    filterTag: 'GAMING',
    tagLabel: 'Gaming Lore',
    tagStyle: 'weird',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvTWZfxRl9M7BcRCsAWlrbt3eBH--1O9SDPCjzd2r7f6h4ph89QBWM2GDN4X_HIEDN9ZW82c0NjywOxp6dubOdY1eOM2SwzS1Tapc2g5Ky8IcNV0ze4GTC7GR_W5JQHDztMJpZM-IZxChyJ-dT972oofd-VBGF9QaJ3pcjpi7S-6OXQ9kJkCxaUQnVirjrJFUxYT261gKTA4LWCT52d1tI7AYRk2Ybuc7NtYsLI14',
    imageAlt: 'Video game easter eggs',
    excerpt:
      'From uncracked cartridges to hidden developer soundbites that remained veiled for thirty years.',
    section: 'gaming-showcase',
  },
  {
    id: 'gaming-glitches-features',
    title: '10 Gaming Glitches That Became Legendary Permanent Features',
    author: 'Kellan Drake',
    date: 'October 9, 2026',
    shortDate: 'Oct 9',
    readTime: '8 min read',
    readsCount: '102K reads',
    category: 'Retro Games',
    channel: 'Gaming',
    filterTag: 'GAMING',
    tagLabel: 'Retro Games',
    tagStyle: 'weird',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKh6rIHp8oSmohTBDdcDab8Xp0uBKImMLy_XihZo49JgmtWFKI2_YuhHykTd_eQfkmR0DdFtAmvMwCnc-bn3H6jNKosCSd5vINkKSmQ8830fo0iA5fjnmCuaiAXu_0zgyaNDnxLHepJ-TB4Id1IpenyfARVDWWXOQDOfEbnJlaV5dh7BaV6G5qsv4Q0FTOLBa3ITtkcgYbL9etRvqTYI43E0VHTE4pBOS3d1iPPDU',
    imageAlt: 'Gaming Glitches',
    excerpt:
      'Combos, rocket jumping, and creepers: mechanics born out of code mishaps that redefined genres.',
    section: 'gaming-showcase',
  },
  {
    id: 'ambitious-cancelled-games',
    title: '10 Ambitious Cancelled Games That Would Have Changed History',
    author: 'Robin Hall',
    date: 'October 7, 2026',
    shortDate: 'Oct 7',
    readTime: '10 min read',
    readsCount: '89K reads',
    category: 'Lost Media',
    channel: 'Gaming',
    filterTag: 'GAMING',
    tagLabel: 'Lost Media',
    tagStyle: 'weird',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfvV1AtqBYUiZAVW9Add4ebgEUHtRXbDwPpCn2d6xys7MNXN7w7jNEnKi9DG6E03o1aaE1lT9vGzrDwAqDB6tn4k_4Th3Jq7oy66iVV84Ht0JYStlfNXGoQUrl1g88beJSIa6B8pJTeD4t4peAoZ-WOKyAFvsA59cSA1Pn2ulmIReNfCnFnVcKGapg2z4v0caVEiCbcx-rhH6LRP9bANnPvo94LHVU5cC114ZlJQ8',
    imageAlt: 'Cancelled video games',
    excerpt:
      'Visionary concepts terminated at the finish line whose prototypes continue to inspire indie creators.',
    section: 'gaming-showcase',
  },

  // TOP 10 FILM & CINEMA (1-3)
  {
    id: 'shoestring-budget-masterpieces',
    title: '10 Film Masterpieces Made on Shoestring Budgets',
    author: 'Elena Rostova',
    date: 'October 5, 2026',
    shortDate: 'Oct 5',
    readTime: '7 min read',
    readsCount: '95K reads',
    category: 'Cinema Craft',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Cinema Craft',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWK9f62bCx6XdHbza72mpNZ5BonTqMnYb9d6ovtxzDYEuneLutj6_jYn3aC7GND9TP5MV-yVdqAa6YKxF7amHu5oD6mnPAVOAocqQM14MCfXtrKrwX0f9SY8oKAAeRmqfgOzBt1ZTXkzTEpdY6VM22op9o1O3UN462f7YwFSPZe6tXNnu_NJID2WtBCQ5YDnpsZw0oLkqnr85OK9h8JA-_Jzx0bZ10sR2unztV0Ao',
    imageAlt: 'Low budget cinema masterpieces',
    excerpt:
      'Iconic directors who leveraged raw creativity, single rooms, and credit cards to craft immortal cinema.',
    section: 'film-showcase',
  },
  {
    id: 'mind-bending-plot-twists',
    title: '10 Mind-Bending Plot Twists in Cinema History',
    author: 'David Sterling',
    date: 'October 3, 2026',
    shortDate: 'Oct 3',
    readTime: '11 min read',
    readsCount: '134K reads',
    category: 'Twist Endings',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Twist Endings',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAeWrimFNypvB0VprZYvhTlpnYc2CbdSO3dAPLZOR2elwwyupUTNxrkftFhl1u3B-WXgCrqgjN0nECsIhWh7_8anEFGAmy3d1CB3JNjzJYeeYnWdNbcMyW3i8d4K12aTz2WnWpWwzA4LPbgYBF3yAofI7BREwDjp-7aX-uHs0Of9hfVRQT4bojhH8I9geYpMTbKBt0CahvSzTtRDuhkJQVexsgmOYDU2OFjMhisCY',
    imageAlt: 'Greatest plot twists',
    excerpt:
      'The legendary rug-pulls that completely rewired audiences and forced immediate second viewings.',
    section: 'film-showcase',
  },
  {
    id: 'priceless-movie-props-lost',
    title: '10 Priceless Movie Props That Were Accidentally Lost or Thrown Out',
    author: 'Clara Oswald',
    date: 'October 1, 2026',
    shortDate: 'Oct 1',
    readTime: '8 min read',
    readsCount: '87K reads',
    category: 'Behind The Scenes',
    channel: 'Film & Movies',
    filterTag: 'FILM & MOVIES',
    tagLabel: 'Behind The Scenes',
    tagStyle: 'history',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd0m46j_y194Op3RFoEi3CdDuVb9uxJHPV9k-FvvK_cDBWFkTqlZWbEdzKCm5eYjaKwwLlw-YKb25mr1oy7D98QR_U-1sYIYRH0gts78X2gJzhP5_xnJafR6D32ERjducGfyzYkWpPftcJDUJvUAhfxuLeIoSgjSatAagK3PkA9QPtWf-FoDzFhgK4xPYn0k-no_-IRixAGONoK5yl95nXhrWFzkfGuOdttxvRCS8',
    imageAlt: 'Movie props history',
    excerpt:
      'Million-dollar pieces of Hollywood royalty discarded as clutter or sold at thrift shops for spare change.',
    section: 'film-showcase',
  },
];

// Helper to generate rich 10-entry countdown content for any article that doesn't have custom entries hardcoded
export function getArticleEntries(article: Article): CountdownEntry[] {
  if (article.entries && article.entries.length > 0) {
    return article.entries;
  }

  const baseTopic = article.title.replace(/^10\s+/i, '');
  return [
    {
      rank: 10,
      title: `The Forgotten Archive Discovery Behind ${baseTopic}`,
      subtitle: `Archival Case Study #10 • ${article.category}`,
      body: `Long before modern historians cataloged the full scope of ${baseTopic.toLowerCase()}, primary accounts remained locked inside regional parish ledgers and private diaries. When researchers cross-referenced nineteenth-century correspondence with physical evidence on site, they uncovered a chain of events that contradicted decades of textbook orthodoxy.`,
      factoid: `Verified in 2024 through multispectral imaging of original manuscripts held in the British Library.`,
    },
    {
      rank: 9,
      title: `The Accidental Catalyst Nobody Saw Coming`,
      subtitle: `Historical Turning Point • ${article.category}`,
      body: `What makes this entry particularly extraordinary is how a seemingly minor oversight snowballed into an enduring phenomenon. Contemporary observers dismissed the initial reports as exaggeration, yet independent witnesses across three continents recorded identical anomalies within weeks of one another.`,
      factoid: `Contemporary newspaper clippings originally relegated the story to page seven before it became a global sensation.`,
    },
    {
      rank: 8,
      title: `The Blueprint Hidden in Plain Sight`,
      subtitle: `Structural Intrigue • ${article.category}`,
      body: `Specialists examining the surviving artifacts noticed microscopic markings that had been overlooked by generations of curators. Far from decorative flourishes, these patterns encoded a deliberate sequence designed to preserve knowledge across turbulent eras.`,
      factoid: `Only three intact examples survive in public collections worldwide today.`,
    },
    {
      rank: 7,
      title: `When Official Records Were Quietly Sealed`,
      subtitle: `Declassified Files • ${article.category}`,
      body: `For over forty years, inquiries into the incident were met with bureaucratic silence. Only when statutory declassification deadlines expired did the public learn how close authorities came to an unprecedented crisis—and the unorthodox measures deployed behind closed doors.`,
      factoid: `Over 400 pages of field notes were unsealed during the 2019 archival release.`,
    },
    {
      rank: 6,
      title: `The Rival Theory That Divided Experts for a Century`,
      subtitle: `Academic Feud • ${article.category}`,
      body: `Two pioneering investigators began as close collaborators before a bitter dispute over interpretation split their discipline in two. Ironically, modern forensic reanalysis proved that both rivals were looking at different halves of the exact same mechanism.`,
      factoid: `Their heated letters remain some of the most entertaining correspondence in academic history.`,
    },
    {
      rank: 5,
      title: `A Midnight Experiment That Defied Every Prediction`,
      subtitle: `Unexpected Outcome • ${article.category}`,
      body: `Expecting a routine null result, the team left their instrumentation running overnight. By morning, the calibration charts had recorded a spike so anomalous that they spent three months trying to prove their own equipment was faulty—before realizing they had stumbled onto a genuine breakthrough.`,
      factoid: `The original logbook still bears the coffee-stained margin note: "Check sensor wiring?!"`,
    },
    {
      rank: 4,
      title: `The Unlikely Insider Who Preserved the Truth`,
      subtitle: `Unsung Figure • ${article.category}`,
      body: `While prominent figures claimed credit in the press, the actual preservation of this legacy rested on the shoulders of a junior clerk who quietly smuggled duplicate plates out of the facility hours before the archives were slated for demolition.`,
      factoid: `A bronze commemorative plaque was finally installed at the site in 2021.`,
    },
    {
      rank: 3,
      title: `The Counterfeit That Fooled the World’s Top Authorities`,
      subtitle: `Master Deception • ${article.category}`,
      body: `For nearly three decades, this specimen was hailed as the crown jewel of the collection. It took isotope ratio mass spectrometry to reveal that an ingenious artisan had aged modern materials using seventeenth-century chemical recipes.`,
      factoid: `Even after exposure, museums kept the piece on display as a masterclass in technical craftsmanship.`,
    },
    {
      rank: 2,
      title: `TheVanishing Act That Remains Unexplained`,
      subtitle: `Enduring Mystery • ${article.category}`,
      body: `Despite modern satellite reconnaissance, sonar sweeps, and digitized customs manifests, the whereabouts of the primary centerpiece after November 1947 remain completely unknown—fueling endless expeditions and scholarly debate.`,
      factoid: `A standing reward of $250,000 for verifiable provenance remains unclaimed.`,
    },
    {
      rank: 1,
      title: `The Defining Revelation of ${baseTopic}`,
      subtitle: `#1 Countdown Entry • ${article.category}`,
      body: `${article.excerpt} When all ten chapters of this countdown are viewed together, the #1 entry stands apart for sheer audacity and lasting cultural impact—forever changing how we look at ${article.category.toLowerCase()}.`,
      factoid: `Voted #1 by 84% of AZVerse readers in our annual Curious Archive retrospective.`,
    },
  ];
}
