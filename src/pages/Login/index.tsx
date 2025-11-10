import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useAuthContext } from '@/contexts/AuthProvider';

export default function Login2() {
  const navigate = useNavigate();
  const { user, loading, loginWithRedirect } = useAuthContext();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant='h5' component='h1' gutterBottom align='center'>
            Welcome
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            sx={{ mb: 3 }}
          >
            Sign in with Auth0 to continue
          </Typography>
          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Sign In with Auth0
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
