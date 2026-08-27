export interface StoryCardItem {
  id: string;
  tagline: string;
  title: string;
  content: string;
  subtext?: string;
  themeColor: string;
  motif?: string;
}

export interface MemoryJarOrb {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  content: string;
  kavithai: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "sathi";
  text: string;
  replyTo?: string;
  reaction?: string;
  delayMs?: number;
}

export interface InstagramChatConfig {
  headerName: string;
  username: string;
  avatarUrl: string;
  messages: ChatMessage[];
  seenStatus: string;
}

export interface PersonalConfig {
  personalDetails: {
    fullName: string;
    shortName: string;
    nickname: string;
    emojis: {
      heart: string;
      moon: string;
      butterfly: string;
      fullSet: string[];
    };
  };
  intro: {
    line1: string;
    forText: string;
    moonTitle: string;
    enterButtonText: string;
  };
  nameReveal: {
    mainName: string;
    subName: string;
    kavithai: string;
    subtitle: string;
  };
  apology: {
    heading: string;
    lines: string[];
    closingNote: string;
  };
  storyCards: StoryCardItem[];
  memoryJarOrbs: MemoryJarOrb[];
  instagramChat: InstagramChatConfig;
  whyMoon: {
    heading: string;
    line1: string;
    line2: string;
    line3: string;
    kavithai: string;
  };
  particleHeart: {
    moonCenterText: string;
    heartCenterEmoji: string;
    kavithai: string;
  };
  letter: {
    previewText: string;
    envelopeTitle: string;
    salutation: string;
    bodyParagraphs: string[];
    closing: string;
    signature: string;
  };
  finalQuestion: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    kavithai: string;
    talkButtonText: string;
    timeButtonText: string;
    talkResponseMessage: string;
    timeResponseMessage: string;
    contactAction: {
      type: "link" | "message";
      url?: string;
      instagramUsername?: string;
      whatsappNumber?: string;
      messageText?: string;
    };
  };
  ending: {
    line1: string;
    line2: string;
    line3: string;
    kavithai: string;
    fadeNote: string;
  };
}

export const personalConfig: PersonalConfig = {
  personalDetails: {
    fullName: "Sathiya",
    shortName: "Sathi",
    nickname: "Moon",
    emojis: {
      heart: "💜",
      moon: "🌙",
      butterfly: "🦋",
      fullSet: ["💜", "🌙", "🦋"],
    },
  },
  intro: {
    line1: "Sila vishayangalai vaarthaigala vida... manasula irundhu sollumbodhu dhaan azhaga irukkum.",
    forText: "Sathi-kkaaga.",
    moonTitle: "En Moon 🌙",
    enterButtonText: "Ulle vaa...",
  },
  nameReveal: {
    mainName: "Sathi",
    subName: "en Moon 🌙",
    kavithai: "Sathi... unna koopidra peru chinna dhaan, aana en manasula nee irukkura idam romba perusu.",
    subtitle: "En manasula irundhu unakkaga senja oru chinna personal space.",
  },
  apology: {
    heading: "Sathi...",
    lines: [
      "Thappu pannadhukku 'sorry' kekkaradhu romba easy... Aana unna evlo hurt panniruppen nu unmaiya purinjukittu, adha thirumba nadakkaama paathukkaradhu dhaan enakku mukkiyam.",

      "Unna lose panniduvomonu bayandhu pesuradha vida... Unna hurt pannirundha adha accept pannitu, konjam konjam ah better-a irukkanum nu dhaan ippo aasapadren.",

      "Sathi... unakku en mela kovam irundhaalum, distance venumnaalum, naan adha respect panren. Aana oru vishayam mattum unakku theriyanum... nee enakku romba mukkiyam. 💜🌙"
    ],
    closingNote: "Enna nadanthalum una kai vida matta di. 💜",
  },
  storyCards: [
    {
      id: "card-1",
      tagline: "REFLECTIONS",
      title: "Sathi, Naan innum konjam nalla nadandhirukalamnu thonura vishayangal.",
      content:
        "Kopamum dharichaniyum naduvula naan pesina silani vaarthaigalai ninaichu ippo feel pannren. Porumaikkuda unna kettukittu nalla nadandhirundha innum azhaga irundhirukkum.",
      subtext: "Naan dinamum kathukittu dhaan irukkren.",
      themeColor: "hsla(270, 75%, 60%, 0.4)",
      motif: "💜",
    },
    {
      id: "card-2",
      tagline: "GRATITUDE",
      title: "Unkitta naan unmaiyave rasikkira vishayangal.",
      content:
        "Unnoda anbu, nee pesumbodhu kidaikira oru chinna nimmathi, un koode sirippodudha nerangal... Idhu ellaame en vazhvil naan romba madhikkira vishayangal.",
      subtext: "Nee nee-yaa irukkradhukke nandri.",
      themeColor: "hsla(285, 70%, 65%, 0.4)",
      motif: "🌙",
    },
    {
      id: "card-3",
      tagline: "WARMTH",
      title: "Naan innum sirikkira silani azhagana nyabaganggal.",
      content:
        "Namma renduperum mattum pesina silani lolen jokes, late night pesina vishayangal, edhuvum pesama nimmathiya irundha tharunangal... Idhu eppavum en manasula irukkum.",
      subtext: "Sila azhagana vishayangalai pidichu vaikka mudiyadhu... Paathuttu rasikka mattum dhaan mudiyum. 🦋",
      themeColor: "hsla(260, 85%, 60%, 0.4)",
      motif: "🦋",
    },
    {
      id: "card-4",
      tagline: "PERSPECTIVE",
      title: "Nee en life-la evvalavu mukkiyamnu...",
      content:
        "Ennaala ellaathaiyum vaarthaigalaal solla mudiyala... Aana nee en life-la evvalavu mukkiyamaanavarnu enakku nallave theriyum. Enna nadandhalum un mela ulla mariyadhai maradhu.",
      subtext: "Eppavum un mela unmaiyaana mariyadhai irukkum.",
      themeColor: "hsla(295, 80%, 55%, 0.4)",
      motif: "💜",
    },
  ],
  memoryJarOrbs: [
    {
      id: "orb-sirippu",
      title: "Unnoda Sirippu",
      tagline: "WARMTH 💜",
      icon: "💜",
      content: "Unnoda aazhamaana, unmaiyaana sirippu en darkest days-la kooda velicham tharum. Nee sirikkumbodhu nattula ulla ellaa vishayangalukku aavadhu oru azhagan irukku.",
      kavithai: "Nee sirikkum nimidathil... en vazhvin ellaa kasangalum marandhu pogudhu. 💜",
      color: "rgba(192, 132, 252, 0.9)",
    },
    {
      id: "orb-anbu",
      title: "Unnoda Anbu",
      tagline: "CARE 🌙",
      icon: "🌙",
      content: "Nee en mela vechirukkura unmaiyaana anbum mariyadhaiyum dhaan en vazhvil naan romba madhikkira periya selvam.",
      kavithai: "Unnoda anbu irukira idam dhaan en manasuki eppavum nimmathiyaana idam. 🌙",
      color: "rgba(244, 63, 94, 0.9)",
    },
    {
      id: "orb-latenight",
      title: "Late Night Pesina Tharunangal",
      tagline: "MEMORIES ✨",
      icon: "✨",
      content: "Yarum illatha andha nimidangalil namma pesina vaarthaigal, sirichu pesina lolen jokes innum en manasula padhiyya irukku.",
      kavithai: "Niraiyya pesina nimidangalai vida... un koode pesama irundha andha nimmathi dhaan azhagudhu. ✨",
      color: "rgba(168, 85, 247, 0.9)",
    },
    {
      id: "orb-puridhal",
      title: "Unnoda Puridhal",
      tagline: "UNDERSTANDING 🦋",
      icon: "🦋",
      content: "Edhuvum pesama kooda naan enna ninaikren nu purinjukitta andha tharunangal... adhu ennaala eppavum marakka mudiyadhu.",
      kavithai: "Vaarthaigal illamal... manasaala purinjukira unnoda andha azhagana puridhal. 🦋",
      color: "rgba(217, 70, 239, 0.9)",
    },
  ],
  instagramChat: {
    headerName: "Moon🦋💜",
    username: "dad_little_prince...",
    avatarUrl: "https://instagram.fcok2-1.fna.fbcdn.net/v/t51.82787-19/772697575_17941697472284352_922676968934468914_n.jpg?_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=IgtQpvtquxEQ7kNvwGeQ59K&_nc_oc=AdrhSgrldxn9CUtQKcaxJIouOaGjpMIj7qGAYtUs-oyFuVQyZUsvHbuov41i_xguMTXqj0xaZ--r9OzeNfasNRfn&_nc_zt=24&_nc_ht=instagram.fcok2-1.fna&_nc_gid=H_r1Z4nKQsYpQIkwi-dBrA&_nc_ss=7b6a8&oh=00_AQEfnNEcj11NUCkSJbyG5OBhI4hh7HiCpLAHTfYvHVn_aQ&oe=6A95BEEB",
    seenStatus: "Seen 3h ago",
    messages: [
      { id: "10", sender: "me", text: "Hi", delayMs: 1400 },
      { id: "11", sender: "sathi", text: "Solunga", delayMs: 1500 },
      { id: "12", sender: "me", text: "Onnum illa di enna panura", delayMs: 1800 },
      { id: "13", sender: "sathi", text: "Summma tha", delayMs: 1600 },
      { id: "14", sender: "me", text: "Saptiya di", delayMs: 1400 },
      { id: "15", sender: "sathi", text: "Athu ethuku ungaluku", delayMs: 1500 },
      { id: "16", sender: "me", text: "Enna panra di", delayMs: 1400 },
      { id: "17", sender: "sathi", text: "Ungalukku enna", delayMs: 1800 },
      { id: "18", sender: "me", text: "Summa tha di.", delayMs: 1600 },
      { id: "19", sender: "sathi", text: "bye", delayMs: 1800 },
      { id: "20", sender: "sathi", text: "naa pore", delayMs: 1800 },
      { id: "21", sender: "me", text: "ena di pora poranu solura", delayMs: 1600 },
      { id: "22", sender: "sathi", text: "bye", delayMs: 1800 },
    ],
  },
  whyMoon: {
    heading: "En unna Moon-nu koopidren?",
    line1: "Yen na...",
    line2: "en darkest days-la kooda...",
    line3: "nee vandha madhiri ellaathaiyum azhaga velicham aakkittae. 🌙",
    kavithai: "Iruttula kooda velicham theda vendam... En Moon irukkumbodhu, iruttukkum oru azhagu irukku. 🌙",
  },
  particleHeart: {
    moonCenterText: "En Moon-kkaaga 🌙",
    heartCenterEmoji: "💜",
    kavithai: "Idhayathula irukkura aasaigala vaarthaiyaala solla mudiyala... adhaan ippadi oru chinna tharunathil sollren. 💜",
  },
  letter: {
    previewText: "En manasula ulla vishayathai solla oru chinna kadhadhi...",
    envelopeTitle: "Sathi-kkaaga Oru Kadhadhi",
    salutation: "Sathi,",
    bodyParagraphs: [
      "Oru chinna message-la en manasula ulla ellaathaiyum solla mudiyala... adhaan ippadi ezhudhuren.",
      "Namma naduvula silani puridhal illama irundhirukkalam. Aana ellaathukkum mela, naan un mela vechirukkura anbum mariyadhaiyum dhaan eppavum unmaiyaanadhu.",
      "Nee உடனே edhavadhu badhil sollanum nu naan edhirpaarkala. En manasu enna solludhoonnu unkitta unmaiyaa sollanum nu dhaan aasaipatten. Un santhosham dhaan enakku eppavum mukkiyam.",
    ],
    closing: "Eppavum,",
    signature: "Un mela unmaiyaana anbudan. 💜🌙🦋",
  },
  finalQuestion: {
    line1: "Sathi...",
    line2: "En Moon.",
    line3: "Naalaki enna nadakkumnu enakku theriyadhu.",
    line4: "Aana namma renduperum innum oru murai pesalamnu unakku thonudha?",
    line5: "Oru nalla pesadhukku naan eppavum ready-aa irukkren.",
    kavithai: "Namma kathai epdi mudiyumnu enakku theriyadhu... Aana nee en life-la vandha oru beautiful chapter-nu mattum enakku eppavume marakka mudiyadhu. 💜",
    talkButtonText: "Pesalam 💜",
    timeButtonText: "Nee nalla yosi 🌙",
    talkResponseMessage: "Romba santhosham, Sathi. Nee eppo free-a irukkiyo appo pesalam. 💜",
    timeResponseMessage: "No pressure, Sathi. Nee un time eduthukko. Naan eppavum iruppen. 🌙",
    contactAction: {
      type: "link",
      url: "https://ig.me/m/muki_5106",
      instagramUsername: "muki_5106",
    },
  },
  ending: {
    line1: "Enna nadandhalum...",
    line2: "Unna paarthadhu en life-la nadandha oru azhagana vishayam, Sathi.",
    line3: "Goodnight, Moon 🌙",
    kavithai: "Sila azhagana tharunangal mudindhalum... adhan nyabagangal eppavum en manasula dhaan irukkum.",
    fadeNote: "Idhai padikkradhukku un time eduthadhukku romba nandri.",
  },
};
