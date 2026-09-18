import InterviewService, {
  FilterParams,
  CreateInterviewInput,
  UpdateInterviewInput,
} from "@/services/InterviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const INTERVIEWS_QUERY_KEY = ["interviews"];

export const useInterviews = (filters?: FilterParams) => {
  return useQuery({
    queryKey: [...INTERVIEWS_QUERY_KEY, filters],
    queryFn: () => InterviewService.fetchInterviews(filters),
  });
};

export const useInterviewDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["interview-details", id],
    queryFn: () => (id ? InterviewService.fetchInterviewById(id) : null),
    enabled: Boolean(id),
  });
};

export const useInterviewMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: INTERVIEWS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: ["interview-details"] });
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateInterviewInput) => InterviewService.createInterview(data),
    onSuccess: () => invalidate(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInterviewInput }) =>
      InterviewService.updateInterview(id, data),
    onSuccess: () => invalidate(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => InterviewService.deleteInterview(id),
    onSuccess: () => invalidate(),
  });

  const addRoundMutation = useMutation({
    mutationFn: ({
      interviewId,
      roundData,
    }: {
      interviewId: string;
      roundData: { roundName?: string; roundNumber?: number; status?: string; notes?: string };
    }) => InterviewService.addRound(interviewId, roundData),
    onSuccess: () => invalidate(),
  });

  const updateRoundMutation = useMutation({
    mutationFn: ({
      interviewId,
      roundId,
      roundData,
    }: {
      interviewId: string;
      roundId: string;
      roundData: { status?: string; notes?: string; roundName?: string };
    }) => InterviewService.updateRound(interviewId, roundId, roundData),
    onSuccess: () => invalidate(),
  });

  return {
    createInterview: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateInterview: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteInterview: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    addRound: addRoundMutation.mutateAsync,
    isAddingRound: addRoundMutation.isPending,
    updateRound: updateRoundMutation.mutateAsync,
    isUpdatingRound: updateRoundMutation.isPending,
    invalidate,
  };
};
