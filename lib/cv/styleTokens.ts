export const styleTokens = {
  colors: {
    nameHeading: "1F4E79",      // dark navy — name at top
    sectionHeading: "1F4E79",   // section headers
    bodyText: "333333",
    mutedText: "444444",
    projectTechLine: "444444",  // italic tech-stack line under project titles
    hyperlink: "0056B3",
  },
  fonts: {
    body: "Calibri",
  },
  sizes: {             // in half-points (Word units): sz=20 → 10pt
    name: 32,          // 16pt
    title: 22,          // 11pt
    sectionHeader: 22,   // 11pt bold
    body: 20,            // 10pt
    contactLine: 18,     // 9pt
  },
  layout: {
    pageMarginsTwips: { top: 720, bottom: 720, left: 900, right: 900 },
    dateTabStopPos: 10440,   // right-aligned tab position for dates (matches right margin)
  },
};

export const cssTokens = {
  nameHeading: "#1F4E79",
  sectionHeading: "#1F4E79",
  bodyText: "#333333",
  mutedText: "#444444",
  hyperlink: "#0056B3",
  fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif',
};
