"use client";

import React, { useState, useMemo } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaEye,
  FaTrash,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUsers,
  FaSort,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useInterviews, useInterviewMutations } from "@/hooks/useInterviews";
import { InterviewType } from "@/services/InterviewService";
import { formatDateTime } from "@/lib/DateTime";
import InterviewDrawerForm from "./components/InterviewDrawerForm";
import InterviewDetailsModal from "./components/InterviewDetailsModal";

const COMMON_ROUNDS_FILTER = [
  "Round 1",
  "Round 2",
  "Round 3",
  "Technical Round",
  "System Design Round",
  "HR Round",
];

const COMMON_STATUSES_FILTER = [
  "Pending",
  "In Progress",
  "Completed",
  "Passed",
  "Rejected",
];

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

const InterviewManageTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal / Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<InterviewType | null>(null);
  const [selectedInterviewForDetails, setSelectedInterviewForDetails] = useState<InterviewType | null>(null);

  // Active three-dot action dropdown
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useInterviews({
    search: searchTerm,
    position: positionFilter,
    round: roundFilter,
    status: statusFilter,
  });

  const { deleteInterview, isDeleting } = useInterviewMutations();

  const interviews: InterviewType[] = data?.data || [];

  // Distinct positions for the position filter dropdown
  const uniquePositions = useMemo(() => {
    const set = new Set<string>();
    interviews.forEach((item) => {
      if (item.position) set.add(item.position);
    });
    return Array.from(set);
  }, [interviews]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = interviews.length;
    const inProgress = interviews.filter(
      (i) => i.status === "In Progress" || i.status === "Pending"
    ).length;
    const passed = interviews.filter((i) => i.status === "Passed").length;
    const rejected = interviews.filter((i) => i.status === "Rejected").length;
    return { total, inProgress, passed, rejected };
  }, [interviews]);

  const handleOpenAddModal = () => {
    setEditingInterview(null);
    setIsDrawerOpen(true);
    setActiveDropdownId(null);
  };

  const handleOpenEditModal = (interview: InterviewType) => {
    setEditingInterview(interview);
    setIsDrawerOpen(true);
    setActiveDropdownId(null);
  };

  const handleOpenDetailsModal = (interview: InterviewType) => {
    setSelectedInterviewForDetails(interview);
    setActiveDropdownId(null);
  };

  const handleDelete = async (id: string, candidateName: string) => {
    if (!confirm(`Are you sure you want to delete interview for ${candidateName}?`)) {
      return;
    }
    try {
      await deleteInterview(id);
      toast.success("Interview deleted successfully");
      if (selectedInterviewForDetails?.id === id) {
        setSelectedInterviewForDetails(null);
      }
      refetch();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete interview";
      toast.error(msg);
    } finally {
      setActiveDropdownId(null);
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".action-menu-container")) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Update selected interview if data changed in background
  React.useEffect(() => {
    if (selectedInterviewForDetails) {
      const updated = interviews.find((i) => i.id === selectedInterviewForDetails.id);
      if (updated) {
        setSelectedInterviewForDetails(updated);
      }
    }
  }, [interviews, selectedInterviewForDetails]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Drawer for Add/Edit */}
      <InterviewDrawerForm
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingInterview(null);
        }}
        interviewToEdit={editingInterview}
        onSuccess={() => refetch()}
      />

      {/* Modal for Details & Round Progression */}
      <InterviewDetailsModal
        isOpen={Boolean(selectedInterviewForDetails)}
        interview={selectedInterviewForDetails}
        onClose={() => setSelectedInterviewForDetails(null)}
        onEditCandidate={(candidate) => handleOpenEditModal(candidate)}
        onDeleteCandidate={(id) => handleDelete(id, selectedInterviewForDetails?.candidateName || "Candidate")}
      />

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
              <FaUserTie className="text-blue-600" />
              Interview Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage candidate interviews, stage progression, and round evaluation
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
          >
            <FaPlus />
            Add Interview
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Candidates
              </span>
              <FaUsers className="text-blue-500 text-lg opacity-80" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mt-2">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">Scheduled / Completed</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                In Progress
              </span>
              <FaClock className="text-amber-500 text-lg opacity-80" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-2">{stats.inProgress}</div>
            <div className="text-xs text-amber-600/80 mt-1">Active evaluation</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Passed
              </span>
              <FaCheckCircle className="text-emerald-500 text-lg opacity-80" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.passed}</div>
            <div className="text-xs text-emerald-600/80 mt-1">Recommended for hire</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rejected
              </span>
              <FaTimesCircle className="text-rose-500 text-lg opacity-80" />
            </div>
            <div className="text-2xl font-bold text-rose-600 mt-2">{stats.rejected}</div>
            <div className="text-xs text-rose-600/80 mt-1">Did not qualify</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200 space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FaSearch className="text-sm" />
              </span>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Filter by Position */}
            <div>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Positions</option>
                {uniquePositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Round */}
            <div>
              <select
                value={roundFilter}
                onChange={(e) => setRoundFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Rounds</option>
                {COMMON_ROUNDS_FILTER.map((rnd) => (
                  <option key={rnd} value={rnd}>
                    {rnd}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {COMMON_STATUSES_FILTER.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main List Section */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Interview Candidates</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Showing {interviews.length} candidate{interviews.length === 1 ? "" : "s"}
            </p>
          </div>

          {(searchTerm || positionFilter !== "all" || roundFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setPositionFilter("all");
                setRoundFilter("all");
                setStatusFilter("all");
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-2xl text-blue-600" />
            <p className="text-sm">Loading interviews...</p>
          </div>
        ) : interviews.length === 0 ? (
          <div className="py-16 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <FaUserTie className="text-2xl" />
            </div>
            <h3 className="text-base font-semibold text-gray-800">No interviews found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {searchTerm || positionFilter !== "all" || roundFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria or clearing filters."
                : "Get started by adding candidate interviews to track their progress."}
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
            >
              + Add First Interview
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Interview Round</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Updated Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {interviews.map((interview) => {
                    const badge = getStatusBadge(interview.status);
                    const isDropdownOpen = activeDropdownId === interview.id;

                    return (
                      <tr key={interview.id} className="hover:bg-gray-50/80 transition">
                        {/* Candidate Name */}
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          <button
                            onClick={() => handleOpenDetailsModal(interview)}
                            className="flex items-center gap-3 text-left hover:text-blue-600 transition group"
                          >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                              {interview.candidateName?.charAt(0).toUpperCase() || "C"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                                {interview.candidateName}
                              </div>
                              {interview.notes && (
                                <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                  {interview.notes}
                                </div>
                              )}
                            </div>
                          </button>
                        </td>

                        {/* Position */}
                        <td className="py-3.5 px-4 text-gray-700 font-medium">
                          <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-semibold text-gray-800">
                            {interview.position}
                          </span>
                        </td>

                        {/* Interview Round */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {interview.round}
                          </span>
                        </td>

                        {/* Phone Number & Email */}
                        <td className="py-3.5 px-4">
                          <div className="text-xs space-y-0.5">
                            <div className="flex items-center gap-1.5 text-gray-700">
                              <FaPhone className="text-gray-400 text-[10px]" />
                              <span>{interview.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <FaEnvelope className="text-gray-400 text-[10px]" />
                              <span className="truncate max-w-[150px]">{interview.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                          >
                            {badge.icon}
                            {interview.status}
                          </span>
                        </td>

                        {/* Created / Updated Date */}
                        <td className="py-3.5 px-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            {formatDateTime(interview.updatedAt || interview.createdAt)}
                          </div>
                        </td>

                        {/* Actions: Three-dot menu */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="relative inline-block text-left action-menu-container">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(isDropdownOpen ? null : interview.id);
                              }}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition"
                              title="Actions"
                            >
                              <MdMoreVert className="text-lg" />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-30 divide-y divide-gray-100">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleOpenDetailsModal(interview)}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    <FaEye className="text-blue-600" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleOpenEditModal(interview)}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    <FaEdit className="text-indigo-600" />
                                    Edit
                                  </button>
                                </div>
                                <div className="py-1">
                                  <a
                                    href={`tel:${interview.phone}`}
                                    onClick={() => setActiveDropdownId(null)}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    <FaPhone className="text-emerald-600" />
                                    Call ({interview.phone})
                                  </a>
                                  <a
                                    href={`mailto:${interview.email}?subject=Interview%20Update%20-%20${encodeURIComponent(
                                      interview.position
                                    )}&body=Dear%20${encodeURIComponent(interview.candidateName)},`}
                                    onClick={() => setActiveDropdownId(null)}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    <FaEnvelope className="text-purple-600" />
                                    Send Email
                                  </a>
                                </div>
                                <div className="py-1">
                                  <button
                                    onClick={() => handleDelete(interview.id, interview.candidateName)}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                                  >
                                    <FaTrash className="text-red-500" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {interviews.map((interview) => {
                const badge = getStatusBadge(interview.status);
                const isDropdownOpen = activeDropdownId === interview.id;

                return (
                  <div
                    key={interview.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs relative"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                          {interview.candidateName?.charAt(0).toUpperCase() || "C"}
                        </div>
                        <div>
                          <h3
                            onClick={() => handleOpenDetailsModal(interview)}
                            className="font-bold text-gray-900 text-base cursor-pointer hover:text-blue-600"
                          >
                            {interview.candidateName}
                          </h3>
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-medium mt-0.5">
                            {interview.position}
                          </span>
                        </div>
                      </div>

                      {/* Three-dot action button */}
                      <div className="relative action-menu-container">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(isDropdownOpen ? null : interview.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                        >
                          <MdMoreVert className="text-xl" />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-30">
                            <button
                              onClick={() => handleOpenDetailsModal(interview)}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <FaEye className="text-blue-600" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(interview)}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-indigo-600" />
                              Edit
                            </button>
                            <a
                              href={`tel:${interview.phone}`}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <FaPhone className="text-emerald-600" />
                              Call
                            </a>
                            <a
                              href={`mailto:${interview.email}`}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <FaEnvelope className="text-purple-600" />
                              Send Email
                            </a>
                            <button
                              onClick={() => handleDelete(interview.id, interview.candidateName)}
                              className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                            >
                              <FaTrash className="text-red-500" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-gray-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-gray-400">Round:</span>{" "}
                        <span className="font-semibold text-indigo-700">{interview.round}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>{" "}
                        <span
                          className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded text-[11px] ${badge.bg}`}
                        >
                          {interview.status}
                        </span>
                      </div>
                      <div className="truncate">
                        <span className="text-gray-400">Phone:</span>{" "}
                        <span className="font-medium text-gray-800">{interview.phone}</span>
                      </div>
                      <div className="truncate">
                        <span className="text-gray-400">Email:</span>{" "}
                        <span className="font-medium text-gray-800 truncate">{interview.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1 border-t border-gray-100">
                      <button
                        onClick={() => handleOpenDetailsModal(interview)}
                        className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-1.5"
                      >
                        <FaEye />
                        Details & Progress
                      </button>
                      <a
                        href={`tel:${interview.phone}`}
                        className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition flex items-center justify-center"
                        title="Call"
                      >
                        <FaPhone />
                      </a>
                      <a
                        href={`mailto:${interview.email}`}
                        className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold hover:bg-purple-100 transition flex items-center justify-center"
                        title="Email"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InterviewManageTab;
