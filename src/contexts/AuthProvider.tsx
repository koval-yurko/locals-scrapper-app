import React, { createContext, useContext } from 'react';
import {
  Auth0Provider as Auth0ReactProvider,
  useAuth0,
} from '@auth0/auth0-react';

export type UserProfile = {
  email?: string;
  name?: string;
};

interface AuthContextType {
  accessToken: string | null;
  loading: boolean;
  user: UserProfile | null;
  loginWithRedirect: () => Promise<void>;
  loginWithPopup: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  loading: true,
  user: null,
  loginWithRedirect: async () => {},
  loginWithPopup: async () => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const [accessToken, idToken] = await Promise.all([
            getAccessTokenSilently(),
            getIdTokenClaims(),
          ]);
          setAccessToken(accessToken);
          setUser({
            email: idToken?.email,
            name: idToken?.name,
          });
        } catch (error) {
          console.error('Error getting access token:', error);
          setAccessToken(null);
        }
      } else {
        setAccessToken(null);
        setUser(null);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        loading: isLoading,
        user,
        loginWithPopup,
        loginWithRedirect,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.error(
      'Missing Auth0 environment variables: VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID',
    );
    return <>{children}</>;
  }

  return (
    <Auth0ReactProvider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: 'openid profile email',
        prompt: 'login',
      }}
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </Auth0ReactProvider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
