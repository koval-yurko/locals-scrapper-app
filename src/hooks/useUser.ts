import { useQuery } from '@tanstack/react-query';
import { useSDK } from '@/contexts/SDKProvider';
import { GetUserRequest } from '@/api';

export type UseUserProps = GetUserRequest;

export const useUser = (request: UseUserProps) => {
  const { sdk } = useSDK();
  return useQuery({
    queryKey: ['users', request.userId],
    queryFn: () => sdk.getUser(request),
  });
};
