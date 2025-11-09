import { UsersTableStateProvider } from '@/contexts/UsersTableStateProvider';
import { UsersTable } from '@/components/UsersTable';

export default function Home() {
  return (
    <UsersTableStateProvider prefix='home' voteSearchDefault={1}>
      <UsersTable />
    </UsersTableStateProvider>
  );
}
