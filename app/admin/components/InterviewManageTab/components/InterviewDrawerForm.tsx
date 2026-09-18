"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner, FaUser, FaBriefcase, FaPhone, FaEnvelope, FaLayerGroup, FaFileAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { InterviewType } from "@/services/InterviewService";
import { useInterviewMutations } from "@/hooks/useInterviews";

interface InterviewDrawerFormProps {
  isOpen: boolean;
  onClose: () => void;
  interviewToEdit?: InterviewType | null;
  onSuccess?: () => void;
}

const COMMON_POSITIONS = [
  "Full Stack Developer",
  "Mern Stack Developer",
  "React Native Developer",
  "Mern Stack Developer + React Native",
  "Frontend Developer",
  "Backend Developer",
  "Node.js Developer",
  "React Developer",
  "Next.js Developer",
  "DevOps Engineer",
  "Software Engineer",
  "UI/UX Designer",
  "QA Engineer",
];

const COMMON_ROUNDS = [
  "Round 1",
  "Round 2",
  "Round 3",
  "Technical Round",
  "System Design Round",
  "HR Round",
  "Managerial Round",
];

const COMMON_STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
  "Passed",
  "Rejected",
];

const InterviewDrawerForm: React.FC<InterviewDrawerFormProps> = ({
  isOpen,
  onClose,
  interviewToEdit,
  onSuccess,
}) => {
  const { createInterview, updateInterview, isCreating, isUpdating } = useInterviewMutations();

  const [formData, setFormData] = useState({
    candidateName: "",
    position: "",
    customPosition: "",
    phone: "",
    email: "",
    round: "Round 1",
    status: "Pending",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (interviewToEdit) {
      const isKnownPosition = COMMON_POSITIONS.includes(interviewToEdit.position);
      setFormData({
        candidateName: interviewToEdit.candidateName || "",
        position: isKnownPosition ? interviewToEdit.position : "Other",
        customPosition: isKnownPosition ? "" : interviewToEdit.position,
        phone: interviewToEdit.phone || "",
        email: interviewToEdit.email || "",
        round: interviewToEdit.round || "Round 1",
        status: interviewToEdit.status || "Pending",
        notes: interviewToEdit.notes || "",
      });
    } else {
      setFormData({
        candidateName: "",
        position: COMMON_POSITIONS[0],
        customPosition: "",
        phone: "",
        email: "",
        round: "Round 1",
        status: "Pending",
        notes: "",
      });
    }
    setErrors({});
  }, [interviewToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Candidate Name is required";
    }

    const finalPosition =
      formData.position === "Other" ? formData.customPosition.trim() : formData.position.trim();
    if (!finalPosition) {
      newErrors.position = "Position is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalPosition =
      formData.position === "Other" ? formData.customPosition.trim() : formData.position.trim();

    try {
      if (interviewToEdit) {
        await updateInterview({
          id: interviewToEdit.id,
          data: {
            candidateName: formData.candidateName.trim(),
            position: finalPosition,
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            round: formData.round,
            status: formData.status,
            notes: formData.notes.trim() || undefined,
          },
        });
        toast.success("Interview updated successfully!");
      } else {
        await createInterview({
          candidateName: formData.candidateName.trim(),
          position: finalPosition,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          round: formData.round,
          status: formData.status,
          notes: formData.notes.trim() || undefined,
        });
        toast.success("Interview created successfully!");
      }

      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {interviewToEdit ? "Edit Interview" : "Add New Interview"}
              </h2>
              <p className="text-blue-100 text-xs mt-1">
                {interviewToEdit
                  ? "Update candidate and interview round details"
                  : "Enter candidate information to schedule interview"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Candidate Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Candidate Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser className="text-sm" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.candidateName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, candidateName: e.target.value }))
                  }
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 ${errors.candidateName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
              </div>
              {errors.candidateName && (
                <p className="text-red-500 text-xs mt-1">{errors.candidateName}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Position *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaBriefcase className="text-sm" />
                </span>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, position: e.target.value }))
                  }
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {COMMON_POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                  <option value="Other">Other (Custom Position)</option>
                </select>
              </div>

              {formData.position === "Other" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter custom position"
                    value={formData.customPosition}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, customPosition: e.target.value }))
                    }
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 ${errors.position
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500"
                      }`}
                  />
                  {errors.position && (
                    <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                  )}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaPhone className="text-sm" />
                </span>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 ${errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  type="email"
                  placeholder="e.g. candidate@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 ${errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Interview Round */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Interview Round
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLayerGroup className="text-sm" />
                </span>
                <select
                  value={formData.round}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, round: e.target.value }))
                  }
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {COMMON_ROUNDS.map((rnd) => (
                    <option key={rnd} value={rnd}>
                      {rnd}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COMMON_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Interview Notes
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Add notes about candidate background, skills, expectations, or scheduling details..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-95 transition flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    Saving...
                  </>
                ) : interviewToEdit ? (
                  "Update Interview"
                ) : (
                  "Create Interview"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewDrawerForm;
