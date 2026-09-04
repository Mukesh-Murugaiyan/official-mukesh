export const styleTokens = {
  colors: {
    nameHeading: "111111",      // Dark/black name
    sectionHeading: "2F5597",   // Steel blue / navy header color from document image
    bodyText: "222222",
    mutedText: "444444",
    projectTechLine: "333333",  // Italic tech-stack line
    hyperlink: "0056B3",
  },
  fonts: {
    body: "Times New Roman",
  },
  sizes: {             // in half-points (Word units): sz=20 → 10pt
    name: 36,          // 18pt
    title: 22,          // 11pt
    sectionHeader: 22,   // 11pt bold
    body: 20,            // 10pt
    contactLine: 18,     // 9pt
  },
  layout: {
    pageMarginsTwips: { top: 720, bottom: 720, left: 900, right: 900 },
    dateTabStopPos: 10440,   // right-aligned tab position for dates
  },
};

export const cssTokens = {
  nameHeading: "#111111",
  sectionHeading: "#2F5597",
  bodyText: "#222222",
  mutedText: "#444444",
  hyperlink: "#0056B3",
  fontFamily: '"Times New Roman", Times, Georgia, serif',
};
