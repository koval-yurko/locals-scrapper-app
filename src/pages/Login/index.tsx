import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/api';
import { useAuth } from '@/contexts/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    // Redirect if user is already logged in
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1976d2',
                    brandAccent: '#1468bc',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
