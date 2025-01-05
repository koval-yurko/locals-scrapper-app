'use client';

import { useParams } from 'next/navigation';
import { UserDetails } from '@/components/UsersDetails';

export default function UserPage() {
  const params = useParams();

  if (!params || !params.userId) {
    return null;
  }

  const userId = params.userId as unknown as number;

  return <UserDetails userId={userId} />;
}
