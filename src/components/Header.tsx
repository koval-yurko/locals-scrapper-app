import * as React from 'react';
import { Link } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Header() {
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
