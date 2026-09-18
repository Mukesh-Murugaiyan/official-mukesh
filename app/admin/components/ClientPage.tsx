// app/admin/page.tsx
"use client";
import { useState, useEffect } from "react";
import {
  FaBell,
  FaChartBar,
  FaCog,
  FaDownload,
  FaEye,
  FaFilePdf,
  FaSearch,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
  FaUserTie,
  FaUsers
} from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import PDFManageTab from "./PDFManageTab";
import InterviewManageTab from "./InterviewManageTab";

const ClientAdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["dashboard", "pdfs", "interviews", "users", "analytics", "settings"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  // Sample data
  const stats = {
    totalPdfs: 156,
    totalDownloads: 45289,
    activeUsers: 1247,
    revenue: 12450,
  };

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "downloaded",
      pdf: "React Guide",
      time: "2 min ago",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "uploaded",
      pdf: "Next.js Tutorial",
      time: "15 min ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "updated",
      pdf: "TypeScript Handbook",
      time: "1 hour ago",
    },
    {
      id: 4,
      user: "Emma Wilson",
      action: "commented",
      pdf: "Tailwind Guide",
      time: "2 hours ago",
    },
    {
      id: 5,
      user: "Alex Brown",
      action: "rated",
      pdf: "Web Dev Basics",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-80px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Mukesh Murugaiyan</h3>
                  <p className="text-sm text-gray-600"> Full Stack Software Engineer</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "dashboard"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab("pdfs")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "pdfs"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaFilePdf />
                  <span>PDF Management</span>
                </button>

                <button
                  onClick={() => setActiveTab("interviews")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "interviews"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaUserTie />
                  <span>Interview</span>
                </button>

                <button
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "users"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaUsers />
                  <span>User Management</span>
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "analytics"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaChartBar />
                  <span>Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${activeTab === "settings"
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">
                Storage Usage
              </h4>
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2 w-3/4"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">2.4 GB of 5 GB used</p>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-20">
          <div className="flex justify-around py-2 overflow-x-auto">
            {["dashboard", "pdfs", "interviews", "users", "analytics", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex flex-col items-center p-2 min-w-[50px] ${activeTab === tab ? "text-blue-600 font-medium" : "text-gray-600"
                    }`}
                >
                  {tab === "dashboard" && <FaTachometerAlt />}
                  {tab === "pdfs" && <FaFilePdf />}
                  {tab === "interviews" && <FaUserTie />}
                  {tab === "users" && <FaUsers />}
                  {tab === "analytics" && <FaChartBar />}
                  {tab === "settings" && <FaCog />}
                  <span className="text-[10px] mt-1 capitalize">{tab}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Stats Overview */}
          {activeTab == "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total PDFs</p>
                      <p className="text-3xl font-bold mt-2">
                        {stats.totalPdfs}
                      </p>
                    </div>
                    <FaFilePdf className="text-3xl opacity-80" />
                  </div>
                  <div className="mt-4 text-sm text-blue-100">
                    +12% from last month
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Downloads</p>
                      <p className="text-3xl font-bold mt-2">
                        {stats.totalDownloads.toLocaleString()}
                      </p>
                    </div>
                    <FaDownload className="text-3xl opacity-80" />
                  </div>
                  <div className="mt-4 text-sm text-purple-100">
                    +24% from last month
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Users</p>
                      <p className="text-3xl font-bold mt-2">
                        {stats.activeUsers}
                      </p>
                    </div>
                    <FaUsers className="text-3xl opacity-80" />
                  </div>
                  <div className="mt-4 text-sm text-green-100">
                    +8% from last week
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Revenue</p>
                      <p className="text-3xl font-bold mt-2">
                        ${stats.revenue.toLocaleString()}
                      </p>
                    </div>
                    <MdAnalytics className="text-3xl opacity-80" />
                  </div>
                  <div className="mt-4 text-sm text-orange-100">
                    +18% from last month
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Activities
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                          <FaUserCircle className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            <span className="font-semibold">
                              {activity.user}
                            </span>{" "}
                            {activity.action} &quot;{activity.pdf}&quot;
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEye />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* PDF Management Table */}
          {activeTab === "pdfs" && (
            <PDFManageTab />
          )}

          {/* Interview Management */}
          {activeTab === "interviews" && (
            <InterviewManageTab />
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientAdminPage;
