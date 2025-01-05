import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSDK } from '@/contexts/SDKProvider';
import { VoteUserRequest } from '@/api';

export type UseUserVoteProps = VoteUserRequest;

export const useUserVote = (userId: number) => {
  const { sdk } = useSDK();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vote: number) => {
      return sdk.voteUser({
        userId: userId,
        voteUserParams: {
          vote,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries<any>(['users']);
    },
  });
};
