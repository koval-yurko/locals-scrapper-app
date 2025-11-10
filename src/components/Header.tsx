import * as React from 'react';
import { Link } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuthContext } from '@/contexts/AuthProvider';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          {user && (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Typography>{user?.name || user?.email || 'User'}</Typography>
              <Button
                color='inherit'
                sx={{ ml: 2 }}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
