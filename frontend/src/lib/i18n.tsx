"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "tr";

const dict = {
  en: {
    settings: {
      theme: "Theme",
      language: "Language",
      light: "Light",
      dark: "Dark",
    },
    nav: {
      index: "Index",
      grammar: "Grammar",
      api: "API",
      contact: "Contact",
      back: "Back",
    },
    home: {
      eyebrow: "01 — Translator",
      heroTitle: "Zenith",
      heroSubtitle:
        "A constructed language for universal logic — minimal, acoustic, and built to be translated, not read.",
      heroBody:
        "Convert any Turkish sentence into Zenith, or back. The engine applies SOV syntax, acoustic deformation, and tense prefixes in a single pass.",
      direction: "Direction",
      trToZn: "Turkish → Zenith",
      znToTr: "Zenith → Turkish",
      tense: "Tense",
      present: "Present",
      past: "Past",
      future: "Future",
      presentTr: "Geniş",
      pastTr: "Geçmiş",
      futureTr: "Gelecek",
      engine: "Engine",
      engineOnline: "Engine Online",
      engineOffline: "Engine Offline",
      pinging: "Pinging…",
      input: "02 — Input",
      inputTr: "Turkish",
      inputZn: "Zenith",
      placeholderTr: "Type a sentence…",
      placeholderZn: "Type Zenith…",
      hint: "⌘ + ↵ to translate",
      translate: "Translate",
      working: "Working",
      clear: "Clear",
      output: "03 — Output",
      copy: "Copy",
      copied: "Copied",
      recent: "04 — Recent",
      recentEmpty:
        "No translations yet. The page is empty, the engine is patient.",
      clearHistory: "Clear history",
      errorOffline: "// engine unreachable",
    },
    footer: {
      project: "Zenith Project",
      description: "Universal Logic Language",
      version: "v0.1.0 · 2026",
      principles: "SOV · Acoustic · Modular",
      made: "Made with restraint",
      rights: "© Zenith Labs",
    },
    about: {
      eyebrow: "01 — Manifesto",
      titleA: "A language built to be ",
      titleAccent: "translated",
      titleB: ", not read.",
      premise: "Premise",
      premiseP1:
        "Zenith is a minimal, constructed language designed to sit between human thought and machine execution. It strips natural language of its exceptions, idioms, and inherited noise, leaving only what can be said without ambiguity.",
      premiseP2:
        "Where ordinary languages accumulate, Zenith subtracts. Every rule earns its place. Every word is a function. Every sentence is a closed loop.",
      principles: "Principles",
      principlesList: [
        {
          n: "I",
          t: "Acoustic Deformation",
          d: "Words derive from phonetic cores of source languages. Strip the outer letters, invert the centre, attach the suffix.",
        },
        {
          n: "II",
          t: "SOV Permanence",
          d: "Subject–Object–Verb is the only order. A sentence always ends in an action, never a state.",
        },
        {
          n: "III",
          t: "Modular Affixes",
          d: "Tense, plurality, and polarity are prefixes and suffixes. Roots never inflect.",
        },
        {
          n: "IV",
          t: "Zero Exception",
          d: "If a rule can be broken, it is not a rule. Zenith prefers fewer words with stricter meaning.",
        },
      ],
      continue: "Continue",
      grammarLink: "Grammar",
      grammarSub: "Read the four rules",
      apiLink: "API",
      apiSub: "Integrate the engine",
    },
    rules: {
      eyebrow: "01 — Four Rules",
      title: "Grammar",
      lede: "Zenith rests on four rules. Read them once, and you can read anything written in it.",
      rules: [
        {
          title: "SOV Syntax",
          body: "Every Zenith sentence follows Subject–Object–Verb. The verb arrives last, sealing the meaning of everything before it.",
          example: [
            { tr: "Zon", zn: "I" },
            { tr: "Ofele", zn: "phone" },
            { tr: "Vaz", zn: "see" },
          ],
          gloss: "Zon Ofele Vaz. / I phone see.",
        },
        {
          title: "Acoustic Deformation",
          body: "Words are derived from the phonetic core of source terms. Strip the outer letters, invert the centre, and you have a Zenith root.",
          pairs: [
            { src: "Klavye", zn: "Yval" },
            { src: "Telefon", zn: "Ofele" },
            { src: "Görmek", zn: "Vaz" },
          ],
        },
        {
          title: "Tense and Plurality",
          body: "Roots are immutable. Tense is a prefix, plurality is a suffix, polarity is a suffix. The root is the constant.",
          affixes: [
            { label: "Past", ex: "m-  /  mvaz" },
            { label: "Future", ex: "v-  /  vvaz" },
            { label: "Plural", ex: "-is  /  ofeleis" },
            { label: "Negation", ex: "no-  /  no-vaz" },
          ],
        },
        {
          title: "Zero Exception",
          body: "A rule that can be broken is not a rule. Zenith is deliberately small so that nothing has to be memorised twice.",
        },
      ],
    },
    api: {
      eyebrow: "01 — Endpoint",
      title: "API",
      lede: "A single HTTP endpoint. No auth, no keys, no rate limit. Run it locally, point your app at it.",
      translate: "POST",
      translatePath: "/translate",
      translateDesc:
        "Convert a Turkish sentence to Zenith (SOV order). Returns a JSON object with the translated text.",
      reqCurl: "Request — cURL",
      response: "Response",
      generatePath: "/generate-word",
      generateDesc:
        "Returns the acoustic deformation of a single word. Useful for building vocabulary trainers or generating roots in batch.",
      generateStatus: "Documentation in progress",
    },
    privacy: {
      eyebrow: "01 — Privacy",
      title: "Privacy",
      sections: [
        {
          n: "I. Data Collection",
          body:
            "Zenith stores nothing on a server. Your translation history lives in your browser only, in localStorage, and is never transmitted anywhere outside the engine call itself.",
        },
        {
          n: "II. Cookies",
          body:
            "No tracking cookies, no analytics, no third-party scripts. The site works the same in a private window.",
        },
        {
          n: "III. Engine Requests",
          body:
            "Translation requests are sent over HTTP to the local engine during development. In production, requests travel over TLS and are not logged.",
        },
      ],
    },
    terms: {
      eyebrow: "01 — Terms",
      title: "Terms",
      sections: [
        {
          n: "I. Purpose",
          body:
            "Zenith is a research project on constructed languages and NLP. It may be used freely for non-commercial purposes.",
        },
        {
          n: "II. Disclaimer",
          body:
            "The engine produces outputs algorithmically. Accuracy and cultural appropriateness of generated words are not guaranteed.",
        },
        {
          n: "III. Licence",
          body:
            "The Zenith language structure and algorithm are developed under an open-source vision.",
        },
      ],
    },
    contact: {
      eyebrow: "01 — Channels",
      title: "Contact",
      lede:
        "One inbox, five channels. Pick whichever one you prefer — they all reach the same person.",
      intro:
        "For collaboration, research notes, or just to say hi. Replies are usually within a day.",
      list: [
        {
          n: "I",
          label: "Instagram",
          handle: "gucluyumhe",
          href: "https://instagram.com/gucluyumhe",
        },
        {
          n: "II",
          label: "Twitter / X",
          handle: "gucluyumhe",
          href: "https://x.com/gucluyumhe",
        },
        {
          n: "III",
          label: "Telegram",
          handle: "islamakhachev",
          href: "https://t.me/islamakhachev",
        },
        {
          n: "IV",
          label: "Mail",
          handle: "omeriletisimportfolyo@gmail.com",
          href: "mailto:omeriletisimportfolyo@gmail.com",
        },
        {
          n: "V",
          label: "GitHub",
          handle: "sandrotonal",
          href: "https://github.com/sandrotonal",
        },
      ],
    },
    cookies: {
      label: "Cookies",
      title: "Privacy notice",
      body: "Zenith stores minimal data in your browser only — language, theme, and recent translations. No tracking, no analytics, no third parties.",
      policyLink: "Privacy policy",
      decline: "Decline",
      accept: "Accept",
    },
  },
  tr: {
    settings: {
      theme: "Tema",
      language: "Dil",
      light: "Aydınlık",
      dark: "Karanlık",
    },
    nav: {
      index: "Dizin",
      grammar: "Dil Bilgisi",
      api: "API",
      contact: "İletişim",
      back: "Geri",
    },
    home: {
      eyebrow: "01 — Çevirmen",
      heroTitle: "Zenith",
      heroSubtitle:
        "Evrensel mantık için inşa edilmiş bir yapay dil — minimal, akustik ve okunmak için değil, çevrilmek için tasarlandı.",
      heroBody:
        "Herhangi bir Türkçe cümleyi Zenith'e ya da geriye çevir. Motor SOV sırasını, akustik deformasyonu ve zaman eklerini tek geçişte uygular.",
      direction: "Yön",
      trToZn: "Türkçe → Zenith",
      znToTr: "Zenith → Türkçe",
      tense: "Zaman",
      present: "Geniş",
      past: "Geçmiş",
      future: "Gelecek",
      presentTr: "Şimdiki",
      pastTr: "Geçmiş",
      futureTr: "Gelecek",
      engine: "Motor",
      engineOnline: "Motor Çevrimiçi",
      engineOffline: "Motor Çevrimdışı",
      pinging: "Yoklanıyor…",
      input: "02 — Girdi",
      inputTr: "Türkçe",
      inputZn: "Zenith",
      placeholderTr: "Bir cümle yaz…",
      placeholderZn: "Zenith metni gir…",
      hint: "Çevirmek için ⌘ + ↵",
      translate: "Çevir",
      working: "Çalışıyor",
      clear: "Temizle",
      output: "03 — Çıktı",
      copy: "Kopyala",
      copied: "Kopyalandı",
      recent: "04 — Geçmiş",
      recentEmpty:
        "Henüz çeviri yok. Sayfa boş, motor sabırlı.",
      clearHistory: "Geçmişi temizle",
      errorOffline: "// motor bağlantısı kesildi",
    },
    footer: {
      project: "Zenith Projesi",
      description: "Evrensel Mantık Dili",
      version: "v0.1.0 · 2026",
      principles: "SOV · Akustik · Modüler",
      made: "Ölçülü bir şekilde yapıldı",
      rights: "© Zenith Labs",
    },
    about: {
      eyebrow: "01 — Manifesto",
      titleA: "Okunmak için değil, ",
      titleAccent: "çevrilmek",
      titleB: " için inşa edilmiş bir dil.",
      premise: "Önsöz",
      premiseP1:
        "Zenith, insan düşüncesi ile makine yürütmesi arasına yerleşen minimal, yapay bir dildir. Doğal dillerin istisnalarını, deyimlerini ve birikmiş gürültüsünü soyup yalnızca belirsizlik taşımayan ifadeleri bırakır.",
      premiseP2:
        "Sıradan diller biriktirir; Zenith çıkarır. Her kural yerini hak eder. Her sözcük bir fonksiyondur. Her cümle kapalı bir döngüdür.",
      principles: "İlkeler",
      principlesList: [
        {
          n: "I",
          t: "Akustik Deformasyon",
          d: "Sözcükler kaynak dillerin fonetik çekirdeklerinden türetilir. Dış harfleri at, ortayı ters çevir, soneki ekle.",
        },
        {
          n: "II",
          t: "SOV Değişmezliği",
          d: "Tek sıra Özne–Nesne–Yüklem'dir. Cümle her zaman bir eylemle biter, asla bir durumla değil.",
        },
        {
          n: "III",
          t: "Modüler Ekler",
          d: "Zaman, çoğul ve olumsuzluk önek ya da sonektir. Kökler asla çekimlenmez.",
        },
        {
          n: "IV",
          t: "Sıfır İstisna",
          d: "Kırılabilen bir kural kural değildir. Zenith, daha az sözcükle daha sert anlam yeğler.",
        },
      ],
      continue: "Devam",
      grammarLink: "Dil Bilgisi",
      grammarSub: "Dört kuralı oku",
      apiLink: "API",
      apiSub: "Motoru entegre et",
    },
    rules: {
      eyebrow: "01 — Dört Kural",
      title: "Dil Bilgisi",
      lede: "Zenith dört kural üzerine kuruludur. Bir kez oku, yazılan her şeyi okuyabilirsin.",
      rules: [
        {
          title: "SOV Sözdizimi",
          body: "Her Zenith cümlesi Özne–Nesne–Yüklem sırasını izler. Yüklem en sonda gelir ve öncesindeki her şeyin anlamını mühürler.",
          example: [
            { tr: "Zon", zn: "Ben" },
            { tr: "Ofele", zn: "telefon" },
            { tr: "Vaz", zn: "görmek" },
          ],
          gloss: "Zon Ofele Vaz. / Ben telefon gör.",
        },
        {
          title: "Akustik Deformasyon",
          body: "Sözcükler kaynak terimlerin fonetik çekirdeğinden türetilir. Dış harfleri at, ortayı ters çevir — elinde bir Zenith kökü var.",
          pairs: [
            { src: "Klavye", zn: "Yval" },
            { src: "Telefon", zn: "Ofele" },
            { src: "Görmek", zn: "Vaz" },
          ],
        },
        {
          title: "Zaman ve Çoğul",
          body: "Kökler değişmez. Zaman önektir, çoğul sonektir, olumsuzluk sonektir. Kök her zaman sabittir.",
          affixes: [
            { label: "Geçmiş", ex: "m-  /  mvaz" },
            { label: "Gelecek", ex: "v-  /  vvaz" },
            { label: "Çoğul", ex: "-is  /  ofeleis" },
            { label: "Olumsuzluk", ex: "no-  /  no-vaz" },
          ],
        },
        {
          title: "Sıfır İstisna",
          body: "Kırılabilen bir kural kural değildir. Zenith, hiçbir şeyin iki kez ezberlenmeyeceği ölçüde küçük tasarlanmıştır.",
        },
      ],
    },
    api: {
      eyebrow: "01 — Uç Nokta",
      title: "API",
      lede: "Tek bir HTTP uç noktası. Anahtar yok, yetkilendirme yok, oran limiti yok. Yerelde çalıştır, uygulamanı ona yönlendir.",
      translate: "POST",
      translatePath: "/translate",
      translateDesc:
        "Bir Türkçe cümleyi Zenith'e (SOV sırasıyla) çevirir. Çevrilmiş metni içeren bir JSON nesnesi döner.",
      reqCurl: "İstek — cURL",
      response: "Yanıt",
      generatePath: "/generate-word",
      generateDesc:
        "Tek bir sözcüğün akustik deformasyonunu döner. Sözlük eğiticileri ya da toplu kök üretimi için kullanışlıdır.",
      generateStatus: "Dokümantasyon hazırlanıyor",
    },
    privacy: {
      eyebrow: "01 — Gizlilik",
      title: "Gizlilik",
      sections: [
        {
          n: "I. Veri Toplama",
          body:
            "Zenith sunucuda hiçbir şey saklamaz. Çeviri geçmişin yalnızca tarayıcında, localStorage içinde yaşar; motor çağrısının dışına asla gönderilmez.",
        },
        {
          n: "II. Çerezler",
          body:
            "İzleme çerezi yok, analitik yok, üçüncü taraf betiği yok. Site gizli pencerede de aynı çalışır.",
        },
        {
          n: "III. Motor İstekleri",
          body:
            "Geliştirme sırasında çeviri istekleri yerel motora HTTP üzerinden gönderilir. Üretimde istekler TLS üzerinden gider ve kayıt altına alınmaz.",
        },
      ],
    },
    terms: {
      eyebrow: "01 — Şartlar",
      title: "Şartlar",
      sections: [
        {
          n: "I. Amaç",
          body:
            "Zenith, yapay diller ve doğal dil işleme üzerine bir araştırma projesidir. Ticari olmayan amaçlarla serbestçe kullanılabilir.",
        },
        {
          n: "II. Sorumluluk Reddi",
          body:
            "Motor çıktılarını algoritmik olarak üretir. Üretilen sözcüklerin doğruluğu ve kültürel uygunluğu garanti edilmez.",
        },
        {
          n: "III. Lisans",
          body:
            "Zenith dil yapısı ve algoritması açık kaynak vizyonuyla geliştirilmektedir.",
        },
      ],
    },
    contact: {
      eyebrow: "01 — Kanallar",
      title: "İletişim",
      lede:
        "Tek bir kutu, beş kanal. Hangisini seversen seç — hepsi aynı kişiye ulaşır.",
      intro:
        "İş birliği, araştırma notları ya da sadece bir merhaba için. Yanıtlar genelde bir gün içinde gelir.",
      list: [
        {
          n: "I",
          label: "Instagram",
          handle: "gucluyumhe",
          href: "https://instagram.com/gucluyumhe",
        },
        {
          n: "II",
          label: "Twitter / X",
          handle: "gucluyumhe",
          href: "https://x.com/gucluyumhe",
        },
        {
          n: "III",
          label: "Telegram",
          handle: "islamakhachev",
          href: "https://t.me/islamakhachev",
        },
        {
          n: "IV",
          label: "E-posta",
          handle: "omeriletisimportfolyo@gmail.com",
          href: "mailto:omeriletisimportfolyo@gmail.com",
        },
        {
          n: "V",
          label: "GitHub",
          handle: "sandrotonal",
          href: "https://github.com/sandrotonal",
        },
      ],
    },
    cookies: {
      label: "Çerezler",
      title: "Gizlilik bildirimi",
      body: "Zenith yalnızca tarayıcında asgari veri saklar — dil, tema ve son çeviriler. İzleme yok, analitik yok, üçüncü taraf yok.",
      policyLink: "Gizlilik politikası",
      decline: "Reddet",
      accept: "Kabul et",
    },
  },
} as const;

export type Dictionary = (typeof dict)["en"] | (typeof dict)["tr"];

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("zenith_lang");
    if (saved === "en" || saved === "tr") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("zenith_lang", l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  return useContext(I18nContext);
}
