import { useQuery } from '@tanstack/react-query';
import { useSDK } from '@/contexts/SDKProvider';
import { GetUsersRequest, GetUsers200ResponseItemsInner } from '@/api';

export type User = GetUsers200ResponseItemsInner;

export type UseUsersProps = GetUsersRequest;

export const useUsers = (request: UseUsersProps) => {
  const { sdk } = useSDK();
  const requestString = JSON.stringify(request);
  return useQuery({
    queryKey: ['users', requestString],
    queryFn: () => sdk.getUsers(request),
  });
};
