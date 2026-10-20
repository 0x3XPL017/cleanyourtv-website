// Every verified article about CleanYourTV, grouped by country, for /press.
// The same list is docs/PRESS.md in the cleanyourtv repo; keep the two in step.
export type PressGroup = { group: string; country: boolean; items: [outlet: string, headline: string, date: string, url: string][] };

export const COVERAGE: PressGroup[] = [
  {
    group: "United States",
    country: true,
    items: [
      ["TechCrunch", "People are using AI to make their smart TVs dumb again", "19 Oct", "https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/"],
      ["Mashable", "Smart TV owners have found a new use for AI: Removing home-screen clutter", "19 Oct", "https://mashable.com/tech/smart-tv-ads-claude-code-ai-cleanup"],
      ["Android Authority", "Fed up with ads and bloatware on your smart TV? People are vibecoding ways to remove them", "20 Oct", "https://www.androidauthority.com/android-tv-vibe-hacking-remove-ads-bloatware-3725338/"],
      ["XDA", "People are now vibe-coding their smart TVs to strip them of ads and unwanted features", "19 Oct", "https://www.xda-developers.com/people-are-now-vibe-coding-their-smart-tvs-to-strip-them-of-ads-and-unwanted-features/"],
      ["Phandroid", "Smart TV Owners Are Using AI to Strip the Ads Off Their Sets", "20 Oct", "https://phandroid.com/2026/10/20/smart-tv-owners-are-using-ai-to-strip-the-ads-off-their-sets/"],
      ["Techaeris", "Android TV Debloat Gets a Free tvOS-Style Makeover", "18 Oct", "https://techaeris.com/2026/10/18/android-tv-debloat-tvos-style-makeover/"],
      ["Gadget Review (on Yahoo Tech)", "Developers Are Using AI to Strip Ads and Tracking From Smart TVs", "19 Oct", "https://tech.yahoo.com/ai/meta-ai/articles/developers-using-ai-strip-ads-185856468.html"],
    ],
  },
  {
    group: "United Kingdom",
    country: true,
    items: [
      ["Tech Times", "Man Asks AI with a Simple Prompt 'Can You Hack This?' to Fix His TV: Now Everyone Wants to Copy Him", "19 Oct", "https://www.techtimes.co.uk/ai-smart-tv-bloatware-performance-fix-1809233"],
    ],
  },
  {
    group: "India",
    country: true,
    items: [
      ["It's FOSS", "People Are Using AI to Get Rid of Smart TV Ads and Make Their TVs Faster", "19 Oct", "https://itsfoss.com/news/debloat-smart-tv/"],
      ["TechPP", "How I Made My Android TV Faster and Ad-Free Using Claude Code", "18 Oct", "https://techpp.com/2026/10/18/speed-up-android-tv-claude-code/"],
    ],
  },
  {
    group: "Denmark",
    country: true,
    items: [
      ["FlatpanelsHD", "People are using AI to clean up their Smart TV homescreens", "20 Oct", "https://flatpanelshd.com/news.php?id=1792478262&subaction=showfull"],
    ],
  },
  {
    group: "Japan",
    country: true,
    items: [
      ["GIGAZINE", "Developers are trying to use AI to remove ads and tracking from smart TVs", "20 Oct", "https://gigazine.net/gsc_news/en/20261020-smart-tv-no-ads-tool/"],
      ["生成AIキュレーター (note)", "4年前のテレビをClaudeに任せた開発者、プロンプトの大半は「禁止事項」だった——8つのルールから読むエージェントの任せ方", "20 Oct", "https://note.com/ai_curator/n/ne9a7dff77e27"],
    ],
  },
  {
    group: "Bangladesh",
    country: true,
    items: [
      ["The Daily Star", "Smart TV owners are using AI to get rid of ads: report", "20 Oct", "https://www.thedailystar.net/news/technology/news/smart-tv-owners-are-using-ai-get-rid-ads-report-4303291"],
    ],
  },
  {
    group: "United Arab Emirates",
    country: true,
    items: [
      ["tbreak", "People are using AI agents to strip ads and tracking from their smart TVs", "20 Oct", "https://tbreak.com/debloat-smart-tv-ai-dumbtv-cleanyourtv/"],
    ],
  },
  {
    group: "France",
    country: true,
    items: [
      ["Frandroid", "Fini la lenteur et les pubs : j’ai redonné une seconde jeunesse à ma Google TV en 10 minutes", "18 Oct", "https://www.frandroid.com/android/google-tv/3290159_google-tv-lent-et-envahi-par-les-pubs-le-projet-tv-vibehack-corrige-tout-ca-grace-a-lia-jai-tente-lexperience"],
      ["Les Joies du Code", "Après l'imprimante et le Wi-Fi, des devs lâchent Claude Code sur leur télé pour virer les pubs", "20 Oct", "https://lesjoiesducode.fr/retirer-pub-android-tv-claude-code"],
      ["Xboxygen", "Sa TV Xiaomi affichait des pubs partout : il donne son modèle à Claude Code, qui refait toute l'interface", "19 Oct", "https://www.xboxygen.com/News/371393-sa-tv-xiaomi-affichait-des-pubs-partout-il-donne-son-modele-a-claude-code-qui-refait-toute-linterface"],
    ],
  },
  {
    group: "Germany",
    country: true,
    items: [
      ["WinFuture", "KIs machen Smart-TVs dumm, um Werbung und Tracking loszuwerden", "20 Oct", "https://winfuture.de/news,162070.html"],
      ["Clauding.de", "dumbtv and cleanyourtv: People Are Stripping Their TVs With Claude Code", "20 Oct", "https://clauding.de/en/posts/smart-tv-entruempeln-claude-code/"],
    ],
  },
  {
    group: "Spain",
    country: true,
    items: [
      ["Xataka", "La última sensación viral de la IA es eliminar anuncios y bloatware de las Smart TV: he \"tontificado\" mi Chromecast y es maravilloso", "20 Oct", "https://www.xataka.com/televisores/ultima-sensacion-viral-ia-eliminar-anuncios-bloatware-smart-tv-he-tontificado-mi-chromecast-maravilloso"],
      ["Xataka Hogar", "Las interfaces de las smart TV se han convertido en un tablón de anuncios, así que los usuarios están buscando cómo escapar de ellas", "19 Oct", "https://hogar.xataka.com/televisores/interfaces-smart-tv-se-han-convertido-tablon-anuncios-asi-que-usuarios-estan-buscando-como-escapar-ellas"],
    ],
  },
  {
    group: "Italy",
    country: true,
    items: [
      ["Macitynet", "La smart TV è lenta e piena di pubblicità? C’è chi usa l’AI per ripulirla", "20 Oct", "https://www.macitynet.it/rendere-le-tv-meno-smart/"],
    ],
  },
  {
    group: "Norway",
    country: true,
    items: [
      ["ITavisen", "Vibe-kodet seg til bedre TV", "19 Oct", "https://itavisen.no/2026/10/19/vibekodet-bort-reklame-smart-tv/"],
    ],
  },
  {
    group: "Portugal",
    country: true,
    items: [
      ["Pplware", "Nem as Smart TV escaparam à febre do vibe coding", "19 Oct", "https://pplware.sapo.pt/inteligencia-artificial/nem-as-smart-tv-escaparam-a-febre-do-vibe-coding-a-televisao-a-medida-de-cada-utilizador/"],
    ],
  },
  {
    group: "Czechia",
    country: true,
    items: [
      ["Insmart", "Android TV bez reklam s AI a Claude Code", "19 Oct", "https://insmart.cz/android-tv-bez-reklam-ai-claude-code/"],
    ],
  },
  {
    group: "Greece",
    country: true,
    items: [
      ["Hacks.gr (on DEV)", "They're using artificial intelligence to remove ads from TVs", "19 Oct", "https://dev.to/hacksgr/theyre-using-artificial-intelligence-to-remove-ads-from-tvs-gmk"],
    ],
  },
  {
    group: "Egypt",
    country: true,
    items: [
      ["Mogaz", "Developers use AI to strip ads and tracking from smart TVs", "19 Oct", "https://www.mogazmasr.com/151088"],
    ],
  },
  {
    group: "Brazil",
    country: true,
    items: [
      ["Save State", "Dev usa Claude Code para tirar anúncios da TV dos pais", "19 Oct", "https://savestate.com.br/claude-code-android-tv-anuncios/"],
      ["GD / Eurisko", "Usuários hackeiam Android TV e Google TV com ajuda do Claude Code", "19 Oct", "https://gd.eurisko.com.br/2026/10/19/usuarios-hackeiam-android-tv-e-google-tv-com-ajuda-do-claude-code"],
      ["AJN1", "Usuários recorrem à inteligência artificial para remoção de anúncios e modificações de interfaces de TVs", "19 Oct", "https://ajn1.com.br/usuarios-recorrem-a-inteligencia-artificial-para-remocao-de-anuncios-e-modificacoes-de-interfaces-de-tvs/"],
    ],
  },
  {
    group: "Latin America (Spanish-language)",
    country: false,
    items: [
      ["Qore", "Desarrolladores usan IA para quitar anuncios de smart TVs", "20 Oct", "https://www.qore.com/tecnologia/desarrolladores-usan-ia-para-quitar-anuncios-de-smart-tvs/"],
      ["DiarioBitcoin", "Usuarios usan IA para quitar anuncios y bloatware de sus televisores inteligentes", "19 Oct", "https://www.diariobitcoin.com/tecnologia/usuarios-usan-ia-para-quitar-anuncios-y-bloatware-de-sus-televisores-inteligentes/"],
      ["Ecosistema Startup", "dumbtv: el hack con IA que elimina los anuncios del TV", "19 Oct", "https://ecosistemastartup.com/dumbtv-el-hack-con-ia-que-elimina-los-anuncios-del-tv/"],
      ["TecToc", "Usuarios están usando IA para quitar anuncios y «limpiar» sus Smart TV", "19 Oct", "https://tectoc.blog/2026/10/19/usuarios-estan-usando-ia-para-quitar-anuncios-y-limpiar-sus-smart-tv/"],
    ],
  },
  {
    group: "China",
    country: true,
    items: [
      ["什么值得买 SMZDM", "海外老哥用AI去了小米电视广告，新桌面像Apple TV，还开源了", "19 Oct", "https://post.smzdm.com/p/a70p4w9o/"],
      ["夜雨聆风", "海外老哥用AI去了小米电视广告，新桌面像Apple TV，还开源了", "18 Oct", "https://www.yeyulingfeng.com/a/1207204.html"],
      ["Weibo via Sina (壹小寒)", "电视界面从杂乱到清爽，原来不用 Root 也能给电视“减肥”", "20 Oct", "https://www.sina.cn/weibo/detail/5356077664175961.html"],
      ["我是菜鸟 imcn.me", "用AI给智能电视\"瘦身\"：一键清除广告，老电视秒变流畅", "20 Oct", "https://imcn.me/html/y2026/44561.html"],
      ["AI工具集 ai-bot.cn", "CleanYourTV – 开源的电视广告去除工具，垃圾软件全清空", "20 Oct", "https://ai-bot.cn/cleanyourtv/"],
      ["OCTOHZ", "CleanYourTV - 安卓电视去广告神器", "", "https://octohz.com/p/2338"],
      ["AI产品库 AIProductHub", "CleanYourTV - 开源电视去广告启动器，一键替换桌面", "20 Oct", "https://aiproducthub.cn/launch/p/70162.html"],
    ],
  },
  {
    group: "Taiwan",
    country: true,
    items: [
      ["媒角抵加News (yam.com)", "開發者用AI清理智慧電視，公開去廣告工具與復原限制", "20 Oct", "https://n.yam.com/Article/20261020173220"],
    ],
  },
  {
    group: "Indonesia",
    country: true,
    items: [
      ["detikINET", "Kesal TV Xiaomi Banyak Iklan, Pria Ini Sulap Jadi Apple TV Pakai AI", "19 Oct", "https://inet.detik.com/consumer/d-8713172/kesal-tv-xiaomi-banyak-iklan-pria-ini-sulap-jadi-apple-tv-pakai-ai"],
      ["Gizmo by Qoo10", "Gathin Ubah TV Xiaomi Penuh Iklan Jadi Mirip Apple TV dengan AI", "", "https://gizmo.qoo10.co.id/649081/gathin-ubah-tv-xiaomi-jadi-mirip-apple-tv-dengan-ai"],
      ["Mediakompeten", "Developer Gunakan AI untuk Hilangkan Iklan di Smart TV Xiaomi", "19 Oct", "https://www.mediakompeten.co.id/ai-hilangkan-iklan-smart-tv-xiaomi"],
      ["BSI News", "Developer Ubah Antarmuka TV Xiaomi dengan Bantuan AI", "19 Oct", "https://bsinews.id/developer-modifikasi-tv-xiaomi-ai"],
      ["Suara Independent News", "Developer Ubah Smart TV Xiaomi Jadi Mirip Apple TV dengan AI", "19 Oct", "https://www.suaraindependentnews.id/developer-modifikasi-tv-xiaomi-ai"],
      ["Twasl News", "Developer Ubah Smart TV Xiaomi Bebas Iklan dengan Bantuan AI", "19 Oct", "https://twaslnews1.twaslnews.com/6197597/"],
    ],
  },
  {
    group: "Thailand",
    country: true,
    items: [
      ["iPhoneMod", "Clean Your TV ชุบชีวิต Android TV สไตล์ Apple TV ลื่นตาไร้โฆษณา", "19 Oct", "https://www.iphonemod.net/clean-your-tv-android-tv-debloat-launcher.html"],
    ],
  },
  {
    group: "Online (newsletters, blogs, AI news)",
    country: false,
    items: [
      ["Artificially Intimidating (AI Brief)", "Claude Code Is Evicting the Ads From Your TV", "20 Oct", "https://artificiallyintimidating.com/p/ai-brief-october-20-2026"],
      ["AI Weekly", "Developers use Claude Code to make smart TVs dumb again", "20 Oct", "https://aiweekly.co/alerts/developers-use-claude-code-to-make-smart-tvs-dumb-again"],
      ["AI Weekly", "Devs use Claude Code, DeepSeek to strip ads from smart TVs", "19 Oct", "https://aiweekly.co/alerts/devs-use-claude-code-deepseek-to-strip-ads-from-smart-tvs"],
      ["AI Daily", "Android TV owners use Claude Code to strip ads and tracking", "20 Oct", "https://www.ai-daily.news/articles/android-tv-owners-use-claude-code-to-strip-ads-and-tracking"],
      ["daily.dev", "Smart TVs got so bad people hired Claude to fix them", "20 Oct", "https://daily.dev/posts/smart-tvs-got-so-bad-people-hired-claude-to-fix-them-htn48diup"],
      ["DEV Community (David Díaz)", "cleanyourtv Debloats Android TV and Replaces Its Home Screen", "19 Oct", "https://dev.to/dd8888/cleanyourtv-debloats-android-tv-and-replaces-its-home-screen-i3f"],
      ["SaaSCity", "How to Debloat Android TV and Google TV with Claude Code: The Clean Your TV (tv-vibehack) Guide", "19 Oct", "https://saascity.io/blog/debloat-android-tv-claude-code"],
      ["explainx.ai", "tv-vibehack: Debloat Your Android TV With Claude Code and ADB", "19 Oct", "https://explainx.ai/blog/tv-vibehack-debloat-android-tv-claude-code-adb-launcher-guide-2026"],
      ["Umang Chauhan (Substack)", "I removed every ad from my TV with AI. Here's how.", "18 Oct", "https://thisumang.substack.com/p/i-removed-every-ad-from-my-tv-with"],
      ["Robert Creative", "How to Debloat a Smart TV With Claude Code", "19 Oct", "https://www.robertcreative.com/blog/debloat-smart-tv-claude-code"],
      ["Silicon Report", "Developers share AI solutions to strip ads from smart TVs", "20 Oct", "https://www.siliconreport.com/developers-share-ai-solutions-to-strip-ads-from-smart-tvs"],
      ["Time News", "Smart TV Owners Use AI Tools To Remove Bloatware and Ads", "20 Oct", "https://time.news/smart-tv-owners-use-ai-tools-to-remove-bloatware-and-ads/"],
      ["Newsy Today", "AI Agents Remove Smart TV Bloatware and Ads", "20 Oct", "https://www.newsy-today.com/ai-agents-remove-smart-tv-bloatware-and-ads/"],
      ["LAVX News", "AI tools help users strip ads and bloat from smart TVs", "19 Oct", "https://news.lavx.hu/article/ai-tools-help-users-strip-ads-and-bloat-from-smart-tvs"],
      ["AI Parabellum", "People Are Using Claude Code to Strip Ads From Their Smart TVs", "19 Oct", "https://aiparabellum.com/claude-code-smart-tv-debloat/"],
      ["Progressive Robot", "People Are Using AI to Make Their Smart TVs Dumb Again", "19 Oct", "https://www.progressiverobot.com/2026/10/19/ai-smart-tv-debloating-remove-ads-bloatware/"],
      ["Zetik", "AI Agents Strip 25 Apps From Smart TVs as Users Fight Ads and Tracking", "19 Oct", "https://www.zetik.com/news/article/story_id-p008-225108"],
      ["Nyongesa Sande", "People Are Using AI to Remove Smart TV Clutter and Take Back Their Home Screens", "19 Oct", "https://www.nyongesasande.com/ai-smart-tv-hacks-remove-ads-and-simplify-home-screens/"],
      ["MiscW", "Clean Your TV: The GitHub Project Using Claude Code to Strip Smart TV Ads", "20 Oct", "https://www.miscw.com/clean-your-tv-the-github-project-using-claude-code-to-strip-smart-tv-ads-154800.html"],
      ["MiscW", "What Is cleanyourtv? The AI Tool Stripping Ads From Smart TVs", "20 Oct", "https://www.miscw.com/what-is-cleanyourtv-the-ai-tool-stripping-ads-from-smart-tvs-154802.html"],
    ],
  },
];

export const COVERAGE_TOTAL = COVERAGE.reduce((n, g) => n + g.items.length, 0);
export const COVERAGE_COUNTRIES = COVERAGE.filter((g) => g.country).length;
