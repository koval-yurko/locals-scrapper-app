import { useParams } from 'react-router';
import { UserDetails } from '@/components/UsersDetails';

export default function UserDetail() {
  const params = useParams();
  const userId = params.userId as unknown as number;

  return <UserDetails userId={userId} />;
}
