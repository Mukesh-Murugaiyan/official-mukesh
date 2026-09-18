"use client";

import React, { useState } from "react";
import {
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaSave,
  FaArrowRight,
  FaLayerGroup,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { InterviewType, InterviewRoundType } from "@/services/InterviewService";
import { useInterviewMutations } from "@/hooks/useInterviews";
import { formatDateTime } from "@/lib/DateTime";

interface InterviewDetailsModalProps {
  isOpen: boolean;
  interview: InterviewType | null;
  onClose: () => void;
  onEditCandidate: (interview: InterviewType) => void;
  onDeleteCandidate: (id: string) => void;
}

const ROUND_STATUSES = ["Pending", "Completed", "Passed", "Rejected"] as const;

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "passed":
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <FaCheckCircle className="text-emerald-500" />,
      };
    case "completed":
      return {
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <FaCheckCircle className="text-blue-500" />,
      };
    case "rejected":
      return {
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <FaTimesCircle className="text-rose-500" />,
      };
    case "in progress":
      return {
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        icon: <FaClock className="text-purple-500" />,
      };
    default:
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <FaClock className="text-amber-500" />,
      };
  }
};

const InterviewDetailsModal: React.FC<InterviewDetailsModalProps> = ({
  isOpen,
  interview,
  onClose,
  onEditCandidate,
  onDeleteCandidate,
}) => {
  const { addRound, updateRound, isAddingRound, isUpdatingRound } = useInterviewMutations();

  // Local state for editing round notes
  const [roundNotesState, setRoundNotesState] = useState<Record<string, string>>({});
  const [isAddingNewRound, setIsAddingNewRound] = useState(false);
  const [newRoundName, setNewRoundName] = useState("");
  const [savingRoundId, setSavingRoundId] = useState<string | null>(null);

  if (!isOpen || !interview) return null;

  const rounds: InterviewRoundType[] = interview.rounds || [];

  const handleStatusChange = async (round: InterviewRoundType, newStatus: string) => {
    try {
      setSavingRoundId(round.id);
      await updateRound({
        interviewId: interview.id,
        roundId: round.id,
        roundData: {
          status: newStatus,
          notes: roundNotesState[round.id] !== undefined ? roundNotesState[round.id] : (round.notes || undefined),
        },
      });
      toast.success(`${round.roundName} marked as ${newStatus}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update round";
      toast.error(msg);
    } finally {
      setSavingRoundId(null);
    }
  };

  const handleSaveRoundNotes = async (round: InterviewRoundType) => {
    const currentNotes = roundNotesState[round.id];
    if (currentNotes === undefined) return;

    try {
      setSavingRoundId(round.id);
      await updateRound({
        interviewId: interview.id,
        roundId: round.id,
        roundData: {
          notes: currentNotes.trim() || undefined,
        },
      });
      toast.success(`Notes saved for ${round.roundName}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save notes";
      toast.error(msg);
    } finally {
      setSavingRoundId(null);
    }
  };

  const handleAddNewRound = async () => {
    const nextNum = rounds.length + 1;
    const roundTitle = newRoundName.trim() || `Round ${nextNum}`;

    try {
      await addRound({
        interviewId: interview.id,
        roundData: {
          roundName: roundTitle,
          roundNumber: nextNum,
          status: "Pending",
        },
      });
      toast.success(`${roundTitle} added successfully!`);
      setNewRoundName("");
      setIsAddingNewRound(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add round";
      toast.error(msg);
    }
  };

  const overallBadge = getStatusBadge(interview.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/20 text-white transition"
          >
            <FaTimes className="text-lg" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                {interview.candidateName?.charAt(0).toUpperCase() || "C"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold">{interview.candidateName}</h2>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${overallBadge.bg}`}
                  >
                    {overallBadge.icon}
                    {interview.status}
                  </span>
                </div>
                <p className="text-blue-100 font-medium mt-0.5">{interview.position}</p>
                <div className="flex items-center gap-2 text-xs text-blue-100 mt-1">
                  <span className="bg-white/20 px-2 py-0.5 rounded-md font-medium">
                    Current: {interview.round}
                  </span>
                  <span>•</span>
                  <span>Updated: {formatDateTime(interview.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              <a
                href={`tel:${interview.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-lg text-xs font-medium transition backdrop-blur-xs"
                title="Call Candidate"
              >
                <FaPhone className="text-xs" />
                Call
              </a>
              <a
                href={`mailto:${interview.email}?subject=Interview%20Update%20-%20${encodeURIComponent(
                  interview.position
                )}&body=Dear%20${encodeURIComponent(
                  interview.candidateName
                )},%0D%0A%0D%0AThank%20you%20for%20interviewing%20for%20the%20${encodeURIComponent(
                  interview.position
                )}%20position.`}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-lg text-xs font-medium transition backdrop-blur-xs"
                title="Send Email"
              >
                <FaEnvelope className="text-xs" />
                Email
              </a>
              <button
                onClick={() => {
                  onClose();
                  onEditCandidate(interview);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white text-gray-800 hover:bg-gray-100 rounded-lg text-xs font-semibold transition shadow-sm"
              >
                <FaEdit className="text-xs text-blue-600" />
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this interview record?")) {
                    onDeleteCandidate(interview.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition"
                title="Delete Interview"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {/* Candidate Contact & Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-gray-900">{interview.phone}</span>
                <a
                  href={`tel:${interview.phone}`}
                  className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition text-xs"
                >
                  <FaPhone />
                </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Address
              </span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
                  {interview.email}
                </span>
                <a
                  href={`mailto:${interview.email}`}
                  className="p-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition text-xs"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </span>
              <div className="flex items-center gap-2 mt-1">
                <FaCalendarAlt className="text-gray-400 text-xs" />
                <span className="text-sm font-semibold text-gray-900">
                  {formatDateTime(interview.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Candidate General Notes */}
          {interview.notes && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                Candidate Notes
              </div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{interview.notes}</p>
            </div>
          )}

          {/* Section: Complete Interview History & Progress Pipeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  Interview Progress & Round Status
                </h3>
                <p className="text-xs text-gray-500">
                  Track candidate journey and stage transitions across all rounds
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isAddingNewRound ? (
                  <button
                    onClick={() => setIsAddingNewRound(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs font-medium hover:opacity-90 transition shadow-xs"
                  >
                    <FaPlus className="text-xs" />
                    Add Round
                  </button>
                ) : null}
              </div>
            </div>

            {/* Inline Add Round Form */}
            {isAddingNewRound && (
              <div className="mb-5 p-4 bg-blue-50/60 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-900">
                    Add Next Interview Round
                  </span>
                  <button
                    onClick={() => setIsAddingNewRound(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder={`e.g. Round ${rounds.length + 1} or HR Round`}
                    value={newRoundName}
                    onChange={(e) => setNewRoundName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddNewRound}
                      disabled={isAddingRound}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                      {isAddingRound && <FaSpinner className="animate-spin text-xs" />}
                      Add Round
                    </button>
                    <button
                      onClick={() => setIsAddingNewRound(false)}
                      className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Step Timeline */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Round Progression Timeline
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {rounds.map((rnd, idx) => {
                  const badge = getStatusBadge(rnd.status);
                  return (
                    <React.Fragment key={rnd.id}>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-2xs">
                        <span className="font-bold text-gray-800 text-xs">{rnd.roundName}</span>
                        <span className="text-gray-300">→</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}
                        >
                          {badge.icon}
                          {rnd.status}
                        </span>
                      </div>
                      {idx < rounds.length - 1 && (
                        <FaArrowRight className="text-gray-400 text-xs hidden sm:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Detailed Round Cards for Updating Status & Notes */}
            <div className="space-y-4">
              {rounds.map((round) => {
                const currentNotes =
                  roundNotesState[round.id] !== undefined
                    ? roundNotesState[round.id]
                    : round.notes || "";
                const isSaving = savingRoundId === round.id && (isUpdatingRound || isAddingRound);

                return (
                  <div
                    key={round.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 transition hover:border-gray-300 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {round.roundNumber}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{round.roundName}</h4>
                          <span className="text-2xl font-normal leading-none"></span>
                          <span className="text-xs text-gray-400">
                            Updated: {formatDateTime(round.updatedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Status Selector Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {ROUND_STATUSES.map((status) => {
                          const isSelected = round.status === status;
                          return (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(round, status)}
                              disabled={isSaving}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                                isSelected
                                  ? status === "Passed"
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                    : status === "Rejected"
                                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                                    : status === "Completed"
                                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                                    : "bg-amber-500 text-white border-amber-500 shadow-xs"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Round Notes & Feedback */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Round Notes & Interview Feedback
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <textarea
                          rows={2}
                          placeholder={`Enter notes for ${round.roundName} (e.g., Coding test score, technical strengths, culture fit, recommendations)...`}
                          value={currentNotes}
                          onChange={(e) =>
                            setRoundNotesState((prev) => ({
                              ...prev,
                              [round.id]: e.target.value,
                            }))
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <button
                          onClick={() => handleSaveRoundNotes(round)}
                          disabled={isSaving}
                          className="self-end sm:self-stretch px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                        >
                          {isSaving ? (
                            <FaSpinner className="animate-spin text-xs" />
                          ) : (
                            <FaSave className="text-xs" />
                          )}
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Candidate ID: <span className="font-mono text-gray-700">{interview.id}</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailsModal;
