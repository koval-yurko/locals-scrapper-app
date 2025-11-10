'use client';

import React, { useMemo, createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Configuration, DefaultApi } from '@/api';
import { createAuthMiddleware } from '@/lib/authMiddleware';
import { useAuthContext } from './AuthProvider';

interface SDKContextType {
  sdk: DefaultApi;
}

const defaultContext: SDKContextType = {
  sdk: new DefaultApi(),
};

const SDKContext = createContext<SDKContextType>(defaultContext);

export function SDKProvider({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthContext();

  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  const sdk = useMemo(() => {
    const config = new Configuration({
      basePath: import.meta.env.VITE_API_URL,
      accessToken: accessToken || undefined,
      middleware: [createAuthMiddleware()],
    });

    return new DefaultApi(config);
  }, [accessToken]);

  return (
    <SDKContext.Provider value={{ sdk }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SDKContext.Provider>
  );
}

export function useSDK() {
  return React.useContext(SDKContext);
}
