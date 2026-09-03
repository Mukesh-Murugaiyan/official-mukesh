export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
}

export interface SkillCategory {
  id?: string;
  category: string;
  items: string[];
}

export interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectItem {
  id?: string;
  title: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  bullets: string[];
}

export interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface CV {
  id?: string;
  title?: string;
  userId?: string;
  personal: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  createdAt?: string;
  updatedAt?: string;
}

export const sampleCvData: CV = {
  title: "Full Stack Engineer Resume",
  personal: {
    fullName: "MUKESH MURUGAIYAN",
    title: "Senior Full Stack Engineer",
    email: "mukesh@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    portfolioUrl: "https://themukesh.com",
    linkedinUrl: "https://linkedin.com/in/mukesh-murugaiyan",
  },
  summary:
    "Dynamic and results-driven Senior Full Stack Engineer with over 6 years of experience architecting high-performance web applications, cloud microservices, and interactive developer tools. Proven track record of scaling user applications, optimizing CI/CD pipelines, and leading cross-functional engineering teams to deliver robust products with seamless user experiences.",
  skills: [
    {
      id: "1",
      category: "Frontend Development",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Vite", "HTML5/CSS3"],
    },
    {
      id: "2",
      category: "Backend & Cloud",
      items: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "MongoDB", "AWS S3", "Docker", "REST & GraphQL APIs"],
    },
    {
      id: "3",
      category: "Tools & Testing",
      items: ["Git", "GitHub Actions", "Jest", "Playwright", "Webpack", "VS Code Extensions"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Full Stack Engineer",
      company: "Apex Tech Innovations",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      bullets: [
        "Architected scalable micro-frontend architecture using Next.js 16 and TypeScript, reducing initial load times by 42%.",
        "Engineered real-time document generation engine using Node.js and docx.js, delivering high-fidelity Word and PDF exports for 100,000+ active users.",
        "Integrated AWS S3 and PostgreSQL backend pipelines with Prisma ORM, improving database query efficiency by 35%.",
        "Mentored a team of 5 junior engineers, implementing strict code quality standards, unit testing coverage, and automated CI/CD workflows.",
      ],
    },
    {
      id: "exp-2",
      role: "Frontend Engineer",
      company: "Nexus Digital Systems",
      location: "San Jose, CA",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      bullets: [
        "Developed responsive user interfaces and interactive dashboards utilizing React, Zustand, and Tailwind CSS.",
        "Implemented real-time web utilities and canvas graphics engines, resulting in a 50% increase in weekly user engagement.",
        "Collaborated closely with UX designers to build accessible, fluid component libraries following strict WCAG 2.1 AAA guidelines.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Interactive Developer Portal & Web Tools",
      startDate: "Mar 2023",
      endDate: "Present",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      bullets: [
        "Designed and published an open-source suite of developer utilities including API testers, background removers, and custom document generators.",
        "Attracted over 25,000 monthly active developers with zero downtime and sub-100ms API response latency.",
      ],
    },
    {
      id: "proj-2",
      title: "Automated Document Synthesis Engine",
      startDate: "Oct 2022",
      endDate: "Feb 2023",
      techStack: ["Node.js", "docx", "LibreOffice CLI", "Express", "Docker"],
      bullets: [
        "Created an OOXML compliant document builder capable of generating pixel-exact Word documents with tab-stop date alignment and custom typography.",
        "Automated PDF conversion pipeline processing up to 500 documents per minute in isolated Docker container workers.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      institution: "California State University",
      startYear: "2015",
      endYear: "2019",
    },
  ],
};
