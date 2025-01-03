import Container from '@mui/material/Container';
import { Users } from '@/components/Users';

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <h1>Users</h1>

      <Users />
    </Container>
  );
}
