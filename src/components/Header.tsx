'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Button component={Link} href='/' color='inherit'>
            Home
          </Button>
          <Button component={Link} href='/users' color='inherit'>
            Users
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
