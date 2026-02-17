"use client";

import { useState, useEffect } from "react";
import { Plus, Briefcase, Building, MapPin, DollarSign, ExternalLink, Trash2, Search, Filter, Moon, Sun, Lightbulb, Loader2 } from "lucide-react";

type JobStatus = "applied" | "interview" | "offer" | "rejected";

interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  url: string;
  status: JobStatus;
  notes: string;
  appliedDate: string;
}

const statusColors: Record<JobStatus, string> = {
  applied: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  interview: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  offer: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<JobStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "company">("date");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [tips, setTips] = useState<string>("");
  const [loadingTips, setLoadingTips] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    url: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    const newJob: Job = {
      id: Date.now().toString(),
      ...formData,
      status: "applied",
      appliedDate: new Date().toISOString().split("T")[0],
    };
    setJobs([newJob, ...jobs]);
    setFormData({ company: "", role: "", location: "", salary: "", url: "", notes: "" });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: JobStatus) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  const getTips = async (job: Job) => {
    setSelectedJob(job);
    setLoadingTips(true);
    setTips("");
    
    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: job.role, company: job.company })
      });
      const data = await res.json();
      setTips(data.tips || "No tips available");
    } catch (e) {
      setTips("Failed to load tips");
    }
    setLoadingTips(false);
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interview: jobs.filter((j) => j.status === "interview").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === "all" || job.status === filter;
    const matchesSearch = 
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    }
    return a.company.localeCompare(b.company);
  });

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Job Tracker</h1>
              <p className="text-slate-400">Track your job applications</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-slate-400 text-sm">Total</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-2xl font-bold text-blue-400">{stats.applied}</p>
            <p className="text-slate-400 text-sm">Applied</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-2xl font-bold text-yellow-400">{stats.interview}</p>
            <p className="text-slate-400 text-sm">Interview</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-2xl font-bold text-green-400">{stats.offer}</p>
            <p className="text-slate-400 text-sm">Offers</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as JobStatus | "all")}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "company")}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="date">Newest</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors mb-8"
        >
          <Plus size={20} />
          Add Application
        </button>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Add New Application</h2>
              <div className="space-y-4">
                <input
                  placeholder="Company Name *"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                />
                <input
                  placeholder="Role *"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    placeholder="Salary Range"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <input
                  placeholder="Job URL"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                />
                <textarea
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={addJob}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
                >
                  Add Job
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {tips && (
          <div className="mt-6 p-4 bg-cyan-900/30 border border-cyan-700 rounded-lg">
            <h3 className="font-bold mb-2">Tips for {selectedJob?.role} at {selectedJob?.company}</h3>
            <pre className="whitespace-pre-wrap text-sm text-cyan-200">{tips}</pre>
          </div>
        )}

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
              <p>No applications yet. Add your first job!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Building size={14} />
                        {job.company}
                      </span>
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {job.salary}
                        </span>
                      )}
                    </div>
                    {job.notes && <p className="text-slate-400 text-sm">{job.notes}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => getTips(job)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Get tips"
                    >
                      {loadingTips && selectedJob?.id === job.id ? <Loader2 size={18} className="animate-spin" /> : <Lightbulb size={18} />}
                    </button>
                    <select
                      value={job.status}
                      onChange={(e) => updateStatus(job.id, e.target.value as JobStatus)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
