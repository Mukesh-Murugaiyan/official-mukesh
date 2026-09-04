import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  BorderStyle,
  TabStopType,
} from "docx";
import { styleTokens } from "./styleTokens";
import { CV } from "./types";

export function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: styleTokens.colors.sectionHeading,
      },
    },
    children: [
      new TextRun({
        text,
        bold: true,
        font: styleTokens.fonts.body,
        color: styleTokens.colors.sectionHeading,
        size: styleTokens.sizes.sectionHeader,
      }),
    ],
  });
}

export function bodyParagraph(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
    ],
  });
}

export function bulletPoint(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    bullet: { level: 0 },
    spacing: { after: 50 },
    children: [
      new TextRun({
        text,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
    ],
  });
}

export function skillBulletPoint(category: string, itemsStr: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    bullet: { level: 0 },
    spacing: { after: 50 },
    children: [
      new TextRun({
        text: `${category}: `,
        bold: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
      new TextRun({
        text: itemsStr,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
    ],
  });
}

// Title + right-aligned date on the same line, via a right tab stop
export function titleWithDate(title: string, dateRange: string): Paragraph {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: styleTokens.layout.dateTabStopPos }],
    spacing: { before: 120, after: 20 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
      new TextRun({
        text: `\t${dateRange}`,
        italics: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
    ],
  });
}

export function companyLocationLine(company: string, location?: string): Paragraph {
  const text = location ? `${company} | ${location}` : company;
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 60 },
    children: [
      new TextRun({
        text,
        italics: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.mutedText,
      }),
    ],
  });
}

export function techStackLine(techStr: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: techStr,
        italics: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.projectTechLine,
      }),
    ],
  });
}

export function contactLine(personal: CV["personal"]): Paragraph {
  const children: (TextRun | ExternalHyperlink)[] = [];

  const parts = [
    personal.email,
    personal.phone,
    personal.location,
  ].filter(Boolean);

  if (parts.length > 0) {
    children.push(
      new TextRun({
        text: parts.join(" | "),
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.contactLine,
        color: styleTokens.colors.mutedText,
      })
    );
  }

  if (personal.portfolioUrl) {
    if (children.length > 0) {
      children.push(
        new TextRun({
          text: " | ",
          font: styleTokens.fonts.body,
          size: styleTokens.sizes.contactLine,
          color: styleTokens.colors.mutedText,
        })
      );
    }
    children.push(
      new ExternalHyperlink({
        link: personal.portfolioUrl,
        children: [
          new TextRun({
            text: "Portfolio",
            style: "Hyperlink",
            font: styleTokens.fonts.body,
            size: styleTokens.sizes.contactLine,
            color: styleTokens.colors.hyperlink,
          }),
        ],
      })
    );
  }

  if (personal.linkedinUrl) {
    if (children.length > 0) {
      children.push(
        new TextRun({
          text: " | ",
          font: styleTokens.fonts.body,
          size: styleTokens.sizes.contactLine,
          color: styleTokens.colors.mutedText,
        })
      );
    }
    children.push(
      new ExternalHyperlink({
        link: personal.linkedinUrl,
        children: [
          new TextRun({
            text: "LinkedIn",
            style: "Hyperlink",
            font: styleTokens.fonts.body,
            size: styleTokens.sizes.contactLine,
            color: styleTokens.colors.hyperlink,
          }),
        ],
      })
    );
  }

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 4,
        color: "D3D3D3",
      },
    },
    children,
  });
}

export function educationLine(edu: CV["education"][0]): Paragraph {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: styleTokens.layout.dateTabStopPos }],
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: `${edu.degree} — ${edu.institution}`,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
      new TextRun({
        text: `\t${edu.startYear} – ${edu.endYear}`,
        italics: true,
        font: styleTokens.fonts.body,
        size: styleTokens.sizes.body,
        color: styleTokens.colors.bodyText,
      }),
    ],
  });
}

export async function generateCvDocx(cv: CV): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: cv.personal.fullName || "MUKESH MURUGAIYAN",
          bold: true,
          font: styleTokens.fonts.body,
          color: styleTokens.colors.nameHeading,
          size: styleTokens.sizes.name,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: cv.personal.title || "",
          font: styleTokens.fonts.body,
          color: styleTokens.colors.mutedText,
          size: styleTokens.sizes.title,
        }),
      ],
    }),
    contactLine(cv.personal),
  ];

  if (cv.summary) {
    children.push(sectionHeader("PROFESSIONAL SUMMARY"));
    children.push(bodyParagraph(cv.summary));
  }

  if (cv.skills && cv.skills.length > 0) {
    children.push(sectionHeader("CORE SKILLS"));
    cv.skills.forEach((s) => {
      if (s.category || (s.items && s.items.length > 0)) {
        const itemsList = Array.isArray(s.items) ? s.items.join(", ") : s.items;
        children.push(skillBulletPoint(s.category, itemsList));
      }
    });
  }

  if (cv.experience && cv.experience.length > 0) {
    children.push(sectionHeader("PROFESSIONAL EXPERIENCE"));
    cv.experience.forEach((exp) => {
      children.push(titleWithDate(exp.role, `${exp.startDate} – ${exp.endDate}`));
      if (exp.company) {
        children.push(companyLocationLine(exp.company, exp.location));
      }
      if (exp.bullets) {
        exp.bullets.forEach((b) => {
          if (b.trim()) children.push(bulletPoint(b));
        });
      }
    });
  }

  if (cv.projects && cv.projects.length > 0) {
    children.push(sectionHeader("KEY PROJECTS"));
    cv.projects.forEach((p) => {
      children.push(titleWithDate(p.title, `${p.startDate} – ${p.endDate}`));
      if (p.techStack && p.techStack.length > 0) {
        const techStr = Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack;
        children.push(techStackLine(techStr));
      }
      if (p.bullets) {
        p.bullets.forEach((b) => {
          if (b.trim()) children.push(bulletPoint(b));
        });
      }
    });
  }

  if (cv.education && cv.education.length > 0) {
    children.push(sectionHeader("EDUCATION"));
    cv.education.forEach((edu) => {
      children.push(educationLine(edu));
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: styleTokens.layout.pageMarginsTwips } },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}
