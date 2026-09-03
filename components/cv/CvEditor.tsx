"use client";

import React, { useState } from "react";
import { CV, SkillCategory, ExperienceItem, ProjectItem, EducationItem } from "@/lib/cv/types";
import {
  MdPerson,
  MdDescription,
  MdBuild,
  MdWork,
  MdFolderSpecial,
  MdSchool,
  MdAdd,
  MdDelete,
} from "react-icons/md";

interface CvEditorProps {
  cv: CV;
  onChange: (updatedCv: CV) => void;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 45 }, (_, i) => String(CURRENT_YEAR + 2 - i));

// Reusable Date Picker Component with Month, Year, and Present Checkbox Option
function DatePickerInput({
  label,
  value,
  onChange,
  allowPresent = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  allowPresent?: boolean;
}) {
  const isPresent = (value || "").trim().toLowerCase() === "present";

  // Extract month and year from string e.g. "Mar 2023"
  const parts = (value || "").trim().split(/\s+/);
  const rawMonth = parts[0] || "Jan";
  const rawYear = parts[1] || String(CURRENT_YEAR);

  const selectedMonth = MONTHS.includes(rawMonth) ? rawMonth : "Jan";
  const selectedYear = YEARS.includes(rawYear) ? rawYear : String(CURRENT_YEAR);

  const handleMonthSelect = (m: string) => {
    const yr = isPresent ? String(CURRENT_YEAR) : selectedYear;
    onChange(`${m} ${yr}`);
  };

  const handleYearSelect = (y: string) => {
    const m = isPresent ? "Jan" : selectedMonth;
    onChange(`${m} ${y}`);
  };

  const togglePresent = () => {
    if (isPresent) {
      onChange(`Jan ${CURRENT_YEAR}`);
    } else {
      onChange("Present");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center h-5">
        <label className="text-[11px] font-medium text-gray-400">{label}</label>
        {allowPresent && (
          <label className="flex items-center gap-1.5 text-[11px] text-cyan-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={togglePresent}
              className="w-3.5 h-3.5 rounded border-white/20 bg-black/40 text-cyan-400 focus:ring-0 cursor-pointer"
            />
            <span>Present</span>
          </label>
        )}
      </div>

      {isPresent ? (
        <div className="w-full h-[34px] flex items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          Present (Currently Working)
        </div>
      ) : (
        <div className="flex gap-2 w-full">
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthSelect(e.target.value)}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-gray-200 focus:border-cyan-400 focus:outline-none cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m} className="bg-gray-900 text-gray-200">
                {m}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => handleYearSelect(e.target.value)}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-gray-200 focus:border-cyan-400 focus:outline-none cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-gray-900 text-gray-200">
                {y}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default function CvEditor({ cv, onChange }: CvEditorProps) {
  const [activeTab, setActiveTab] = useState<
    "personal" | "summary" | "skills" | "experience" | "projects" | "education"
  >("personal");

  // Personal Info update
  const updatePersonal = (field: keyof CV["personal"], value: string) => {
    onChange({
      ...cv,
      personal: {
        ...cv.personal,
        [field]: value,
      },
    });
  };

  // Summary update
  const updateSummary = (val: string) => {
    onChange({ ...cv, summary: val });
  };

  // Skills handlers
  const addSkill = () => {
    const newSkill: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: "Category Name",
      items: ["Skill 1", "Skill 2"],
    };
    onChange({ ...cv, skills: [...(cv.skills || []), newSkill] });
  };

  const updateSkill = (index: number, category: string, itemsStr: string) => {
    const updated = [...(cv.skills || [])];
    const items = itemsStr.split(",").map((s) => s.trim());
    updated[index] = { ...updated[index], category, items };
    onChange({ ...cv, skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = cv.skills.filter((_, i) => i !== index);
    onChange({ ...cv, skills: updated });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Job Title",
      company: "Company Name",
      location: "City, State",
      startDate: "Jan 2023",
      endDate: "Present",
      bullets: ["Accomplishment or responsibility line"],
    };
    onChange({ ...cv, experience: [...(cv.experience || []), newExp] });
  };

  const updateExpField = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...(cv.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...cv, experience: updated });
  };

  const addExpBullet = (expIndex: number) => {
    const updated = [...(cv.experience || [])];
    const bullets = [...(updated[expIndex].bullets || []), ""];
    updated[expIndex] = { ...updated[expIndex], bullets };
    onChange({ ...cv, experience: updated });
  };

  const updateExpBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const updated = [...(cv.experience || [])];
    const bullets = [...(updated[expIndex].bullets || [])];
    bullets[bulletIndex] = text;
    updated[expIndex] = { ...updated[expIndex], bullets };
    onChange({ ...cv, experience: updated });
  };

  const removeExpBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...(cv.experience || [])];
    const bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    updated[expIndex] = { ...updated[expIndex], bullets };
    onChange({ ...cv, experience: updated });
  };

  const removeExperience = (index: number) => {
    const updated = cv.experience.filter((_, i) => i !== index);
    onChange({ ...cv, experience: updated });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "Project Name",
      startDate: "Jan 2023",
      endDate: "Present",
      techStack: ["React", "Node.js"],
      bullets: ["Key feature or achievement line"],
    };
    onChange({ ...cv, projects: [...(cv.projects || []), newProj] });
  };

  const updateProjField = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...(cv.projects || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...cv, projects: updated });
  };

  const addProjBullet = (projIndex: number) => {
    const updated = [...(cv.projects || [])];
    const bullets = [...(updated[projIndex].bullets || []), ""];
    updated[projIndex] = { ...updated[projIndex], bullets };
    onChange({ ...cv, projects: updated });
  };

  const updateProjBullet = (projIndex: number, bulletIndex: number, text: string) => {
    const updated = [...(cv.projects || [])];
    const bullets = [...(updated[projIndex].bullets || [])];
    bullets[bulletIndex] = text;
    updated[projIndex] = { ...updated[projIndex], bullets };
    onChange({ ...cv, projects: updated });
  };

  const removeProjBullet = (projIndex: number, bulletIndex: number) => {
    const updated = [...(cv.projects || [])];
    const bullets = updated[projIndex].bullets.filter((_, i) => i !== bulletIndex);
    updated[projIndex] = { ...updated[projIndex], bullets };
    onChange({ ...cv, projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = cv.projects.filter((_, i) => i !== index);
    onChange({ ...cv, projects: updated });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "Degree / Program",
      institution: "University Name",
      startYear: "2019",
      endYear: "2023",
    };
    onChange({ ...cv, education: [...(cv.education || []), newEdu] });
  };

  const updateEduField = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...(cv.education || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...cv, education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = cv.education.filter((_, i) => i !== index);
    onChange({ ...cv, education: updated });
  };

  const navItems = [
    { id: "personal", label: "Personal", icon: MdPerson },
    { id: "summary", label: "Summary", icon: MdDescription },
    { id: "skills", label: "Skills", icon: MdBuild },
    { id: "experience", label: "Experience", icon: MdWork },
    { id: "projects", label: "Projects", icon: MdFolderSpecial },
    { id: "education", label: "Education", icon: MdSchool },
  ];

  return (
    <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 flex flex-col gap-5 text-gray-200">
      {/* Editor Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm"
                  : "bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10 border border-transparent"
              }`}
            >
              <Icon className="text-sm" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Personal Info */}
      {activeTab === "personal" && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Personal Details & Contact Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={cv.personal.fullName}
                onChange={(e) => updatePersonal("fullName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Mukesh Murugaiyan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Professional Title</label>
              <input
                type="text"
                value={cv.personal.title}
                onChange={(e) => updatePersonal("title", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Senior Full Stack Engineer"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={cv.personal.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. mukesh@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={cv.personal.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. +1 (555) 019-2834"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Location</label>
              <input
                type="text"
                value={cv.personal.location}
                onChange={(e) => updatePersonal("location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">Portfolio URL</label>
              <input
                type="url"
                value={cv.personal.portfolioUrl || ""}
                onChange={(e) => updatePersonal("portfolioUrl", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. https://themukesh.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-gray-400 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={cv.personal.linkedinUrl || ""}
                onChange={(e) => updatePersonal("linkedinUrl", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Summary */}
      {activeTab === "summary" && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Professional Summary Paragraph
          </h3>
          <div>
            <label className="block text-[11px] font-medium text-gray-400 mb-1">
              Summary (Justified text formatting applied automatically)
            </label>
            <textarea
              rows={6}
              value={cv.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none leading-relaxed"
              placeholder="Write a concise overview of your background, tech expertise, and major career achievements..."
            />
          </div>
        </div>
      )}

      {/* TAB CONTENT: Skills */}
      {activeTab === "skills" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Core Skills Categories
            </h3>
            <button
              onClick={addSkill}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
            >
              <MdAdd /> Add Category
            </button>
          </div>

          <div className="space-y-3">
            {cv.skills?.map((skill, idx) => {
              const itemsStr = Array.isArray(skill.items)
                ? skill.items.join(", ")
                : skill.items || "";
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                  <div className="w-full sm:w-1/3">
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-semibold">
                      Category
                    </label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(idx, e.target.value, itemsStr)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-semibold">
                      Skills (Comma separated)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={itemsStr}
                        onChange={(e) => updateSkill(idx, skill.category, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                      />
                      <button
                        onClick={() => removeSkill(idx)}
                        className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-500/20 shrink-0"
                        title="Delete category"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Experience */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Professional Experience
            </h3>
            <button
              onClick={addExperience}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
            >
              <MdAdd /> Add Work Role
            </button>
          </div>

          <div className="space-y-4">
            {cv.experience?.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3.5">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs font-semibold text-gray-300">
                    Role #{idx + 1}: {exp.role || "Untitled"}
                  </span>
                  <button
                    onClick={() => removeExperience(idx)}
                    className="text-[11px] text-rose-400 hover:bg-rose-500/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <MdDelete /> Remove Role
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Job Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExpField(idx, "role", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExpField(idx, "company", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExpField(idx, "location", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Start Date & End Date Pickers */}
                  <div>
                    <DatePickerInput
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(val) => updateExpField(idx, "startDate", val)}
                    />
                  </div>
                  <div>
                    <DatePickerInput
                      label="End Date"
                      value={exp.endDate}
                      onChange={(val) => updateExpField(idx, "endDate", val)}
                      allowPresent={true}
                    />
                  </div>
                </div>

                {/* Bullets List */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-medium text-gray-400">
                      Achievement Bullets (Justified formatting)
                    </label>
                    <button
                      onClick={() => addExpBullet(idx)}
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5"
                    >
                      <MdAdd /> Add Bullet Point
                    </button>
                  </div>
                  {exp.bullets?.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => updateExpBullet(idx, bIdx, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                        placeholder="Bullet point accomplishment..."
                      />
                      <button
                        onClick={() => removeExpBullet(idx, bIdx)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded transition-colors"
                      >
                        <MdDelete className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Projects */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Key Projects
            </h3>
            <button
              onClick={addProject}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
            >
              <MdAdd /> Add Project
            </button>
          </div>

          <div className="space-y-4">
            {cv.projects?.map((proj, idx) => {
              const techStr = Array.isArray(proj.techStack)
                ? proj.techStack.join(", ")
                : proj.techStack || "";
              return (
                <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3.5">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs font-semibold text-gray-300">
                      Project #{idx + 1}: {proj.title || "Untitled"}
                    </span>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-[11px] text-rose-400 hover:bg-rose-500/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <MdDelete /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-gray-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProjField(idx, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    {/* Start Date & End Date Pickers */}
                    <div>
                      <DatePickerInput
                        label="Start Date"
                        value={proj.startDate}
                        onChange={(val) => updateProjField(idx, "startDate", val)}
                      />
                    </div>
                    <div>
                      <DatePickerInput
                        label="End Date"
                        value={proj.endDate}
                        onChange={(val) => updateProjField(idx, "endDate", val)}
                        allowPresent={true}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Tech Stack (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={techStr}
                        onChange={(e) =>
                          updateProjField(
                            idx,
                            "techStack",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                        placeholder="e.g. Next.js, TypeScript, Tailwind CSS"
                      />
                    </div>
                  </div>

                  {/* Bullets List */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-medium text-gray-400">
                        Project Details / Bullets
                      </label>
                      <button
                        onClick={() => addProjBullet(idx)}
                        className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <MdAdd /> Add Bullet
                      </button>
                    </div>
                    {proj.bullets?.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => updateProjBullet(idx, bIdx, e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                          placeholder="Project achievement..."
                        />
                        <button
                          onClick={() => removeProjBullet(idx, bIdx)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded transition-colors"
                        >
                          <MdDelete className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Education */}
      {activeTab === "education" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Education & Degrees
            </h3>
            <button
              onClick={addEducation}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
            >
              <MdAdd /> Add Education
            </button>
          </div>

          <div className="space-y-4">
            {cv.education?.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3.5">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs font-semibold text-gray-300">
                    Education #{idx + 1}: {edu.degree || "Untitled Degree"}
                  </span>
                  <button
                    onClick={() => removeEducation(idx)}
                    className="text-[11px] text-rose-400 hover:bg-rose-500/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <MdDelete /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Degree / Qualification</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEduField(idx, "degree", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEduField(idx, "institution", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Start Year</label>
                    <select
                      value={edu.startYear}
                      onChange={(e) => updateEduField(idx, "startYear", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-gray-200 focus:border-cyan-400 focus:outline-none cursor-pointer"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-gray-900 text-gray-200">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">End Year</label>
                    <select
                      value={edu.endYear}
                      onChange={(e) => updateEduField(idx, "endYear", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-gray-200 focus:border-cyan-400 focus:outline-none cursor-pointer"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-gray-900 text-gray-200">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
