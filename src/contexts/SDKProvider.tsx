'use client';

import React, { useMemo, createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Configuration, DefaultApi } from '@/api';

interface ThemeContextType {
  sdk: DefaultApi;
}

const defaultContext: ThemeContextType = {
  sdk: new DefaultApi(),
};

const SDKContext = createContext<ThemeContextType>(defaultContext);

export function SDKProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  const sdk = useMemo(() => {
    const config = new Configuration({
      basePath: process.env.NEXT_PUBLIC_API_URL,
    });

    return new DefaultApi(config);
  }, []);

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
