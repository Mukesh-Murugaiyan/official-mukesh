export interface InterviewRoundType {
  id: string;
  interviewId: string;
  roundNumber: number;
  roundName: string;
  status: string; // "Pending" | "Completed" | "Passed" | "Rejected"
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewType {
  id: string;
  candidateName: string;
  position: string;
  round: string;
  phone: string;
  email: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  rounds: InterviewRoundType[];
}

export interface CreateInterviewInput {
  candidateName: string;
  position: string;
  phone: string;
  email: string;
  round?: string;
  status?: string;
  notes?: string;
}

export interface UpdateInterviewInput {
  candidateName?: string;
  position?: string;
  phone?: string;
  email?: string;
  round?: string;
  status?: string;
  notes?: string;
}

export interface FilterParams {
  search?: string;
  position?: string;
  round?: string;
  status?: string;
}

class InterviewService {
  static async fetchInterviews(filters?: FilterParams): Promise<{ success: boolean; data: InterviewType[] }> {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.position && filters.position !== "all") params.append("position", filters.position);
    if (filters?.round && filters.round !== "all") params.append("round", filters.round);
    if (filters?.status && filters.status !== "all") params.append("status", filters.status);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`/api/interviews${queryString}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch interviews");
    }
    return res.json();
  }

  static async fetchInterviewById(id: string): Promise<{ success: boolean; data: InterviewType }> {
    const res = await fetch(`/api/interviews/${id}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch interview details");
    }
    return res.json();
  }

  static async createInterview(data: CreateInterviewInput): Promise<{ success: boolean; data: InterviewType }> {
    const res = await fetch("/api/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to create interview");
    }
    return res.json();
  }

  static async updateInterview(id: string, data: UpdateInterviewInput): Promise<{ success: boolean; data: InterviewType }> {
    const res = await fetch(`/api/interviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to update interview");
    }
    return res.json();
  }

  static async deleteInterview(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/interviews/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to delete interview");
    }
    return res.json();
  }

  static async addRound(
    interviewId: string,
    roundData: { roundName?: string; roundNumber?: number; status?: string; notes?: string }
  ): Promise<{ success: boolean; data: { round: InterviewRoundType; interview: InterviewType } }> {
    const res = await fetch(`/api/interviews/${interviewId}/rounds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roundData),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to add round");
    }
    return res.json();
  }

  static async updateRound(
    interviewId: string,
    roundId: string,
    roundData: { status?: string; notes?: string; roundName?: string }
  ): Promise<{ success: boolean; data: { round: InterviewRoundType; interview: InterviewType } }> {
    const res = await fetch(`/api/interviews/${interviewId}/rounds/${roundId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roundData),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to update round");
    }
    return res.json();
  }
}

export default InterviewService;
