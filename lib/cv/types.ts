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
  title: "React Native & MERN Stack Resume",
  personal: {
    fullName: "MUKESH MURUGAIYAN",
    title: "React Native Developer + MERN Stack",
    email: "mukeshmurugaiyan.dev@gmail.com",
    phone: "+91 97865 87013",
    location: "Bengaluru, India",
    portfolioUrl: "https://themukesh.com",
    linkedinUrl: "https://linkedin.com/in/mukesh-murugaiyan",
  },
  summary:
    "React Native Developer + MERN Stack Engineer with 4+ years of experience designing, developing, and maintaining enterprise-grade web and mobile applications. Hands-on experience building and deploying production Android and iOS applications using React Native, published and maintained on the Google Play Store and Apple App Store. Strong expertise across MongoDB (Mongoose), Express.js-style Node.js APIs, React.js, and React Native, with real-time project experience across the full software development lifecycle — requirement analysis, development, testing, deployment, production support, and maintenance. Experienced integrating REST APIs and third-party services, implementing JWT/OAuth authentication with Role-Based Access Control (RBAC), push notifications (FCM), camera/location services, file uploads, and offline data synchronization. Proficient in JavaScript (ES6+), TypeScript, Redux/Redux Toolkit, Git, Docker, CI/CD, and AWS, in Agile development environments.",
  skills: [
    {
      id: "1",
      category: "MERN Stack",
      items: ["MongoDB", "Mongoose", "Node.js", "Express-style REST APIs", "React.js", "Next.js"],
    },
    {
      id: "2",
      category: "Mobile Development",
      items: ["React Native (Android + iOS)", "Production App Store & Play Store Deployment", "Kotlin", "Swift", "Electron"],
    },
    {
      id: "3",
      category: "Mobile Capabilities",
      items: ["Push Notifications (Firebase Cloud Messaging)", "Camera & Location Services", "File Upload", "Offline Data Sync/Storage"],
    },
    {
      id: "4",
      category: "Auth & Security",
      items: ["JWT/OAuth Authentication", "Role-Based Access Control (RBAC)", "API Security", "Session Authentication"],
    },
    {
      id: "5",
      category: "State Management",
      items: ["Redux", "Redux Toolkit", "Context API", "React Query"],
    },
    {
      id: "6",
      category: "Language & Web",
      items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"],
    },
    {
      id: "7",
      category: "APIs & Real-Time",
      items: ["RESTful API Development", "Third-Party API Integration", "WebSockets/Socket.IO", "Webhooks"],
    },
    {
      id: "8",
      category: "DevOps & Cloud",
      items: ["Git (GitHub)", "Docker", "CI/CD (GitHub Actions)", "AWS (EC2, S3)", "Deployment"],
    },
    {
      id: "9",
      category: "Database",
      items: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      id: "10",
      category: "Process & Practices",
      items: ["Agile/Scrum", "Code Reviews", "Debugging", "Mentoring", "Performance Optimization", "Analytics Dashboards", "Highcharts"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Software Engineer — Full Stack Development (React Native + MERN Focus)",
      company: "ThiDiff Technologies",
      location: "Bangalore, India",
      startDate: "07/2022",
      endDate: "04/2026",
      bullets: [
        "Designed, developed, and maintained enterprise-grade web and mobile applications using the MERN stack (MongoDB, Node.js, React.js) and React Native, covering orders, payments, inventory, HR, and reporting modules.",
        "Built and deployed production Android and iOS applications using React Native, publishing and maintaining live releases on the Google Play Store and Apple App Store.",
        "Developed scalable backend REST APIs with Node.js and MongoDB (Mongoose), implementing JWT-based authentication and Role-Based Access Control (RBAC).",
        "Implemented real-time features including WebSocket/Socket.IO connections for live data updates, push notifications via Firebase (FCM), and offline data management with Redux/Redux Toolkit.",
        "Deployed and maintained applications on AWS using Docker and CI/CD pipelines (GitHub Actions), with Git-based version control across a multi-developer Agile team.",
        "Mentored junior developers, conducted code reviews, and drove adoption of reusable, service-based architecture across web and mobile.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Nexreon — Enterprise Mobile Field Operations & Real-Time Tracking App",
      startDate: "07/2022",
      endDate: "04/2026",
      techStack: ["React Native", "JavaScript", "TypeScript", "Redux", "Context API", "WebSockets", "REST APIs", "RBAC", "MongoDB"],
      bullets: [
        "Built and published a cross-platform React Native mobile application (Android + iOS) to production, sharing ~50% of modules with the MERN-based web codebase.",
        "Implemented field-operations features including live location tracking, push notifications, camera-based workflows, and offline-first background sync for unreliable network conditions.",
        "Integrated JWT-based authentication and RBAC for role-driven access across field and admin users.",
      ],
    },
    {
      id: "proj-2",
      title: "Nexreon — Caller Automation & Tracking System",
      startDate: "08/2025",
      endDate: "04/2026",
      techStack: ["React Native", "Kotlin", "Gradle", "Android Studio", "Xcode (Sole Developer)"],
      bullets: [
        "Built and deployed a custom Android caller application with React Native and Kotlin for internal receptionist and employee communication workflows, including call/location handling.",
      ],
    },
    {
      id: "proj-3",
      title: "Nexreon — Enterprise Web Dashboard & Business Management System",
      startDate: "07/2022",
      endDate: "04/2026",
      techStack: ["React.js", "Node.js", "Next.js", "MongoDB", "Redux", "React Query", "JavaScript", "TypeScript", "REST APIs", "WebSockets", "RBAC", "Highcharts"],
      bullets: [
        "Developed a scalable MERN-based enterprise web dashboard covering orders, payments, inventory, HR, reports, and system administration.",
        "Implemented RBAC with JWT/session-based authentication across Admin, Manager, and User roles.",
        "Worked as a Full Stack Developer in a 7-member Agile team delivering scalable frontend and backend features.",
      ],
    },
    {
      id: "proj-4",
      title: "Nexreon — Real-Time Enterprise Chat & Announcement Desktop App",
      startDate: "08/2025",
      endDate: "04/2026",
      techStack: ["Electron.js", "React.js", "Vite", "Node.js", "WebSockets", "RBAC", "Git (Sole Developer)"],
      bullets: [
        "Developed a cross-platform desktop application (Windows, Linux, macOS) using Electron, React, and Vite, with file sharing and offline-capable local storage caching.",
        "Sole developer responsible for end-to-end design, architecture, and deployment via Electron Builder.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Computer Science",
      institution: "Bharathidasan University, Mayiladuthurai",
      startYear: "2019",
      endYear: "2022",
    },
  ],
};
