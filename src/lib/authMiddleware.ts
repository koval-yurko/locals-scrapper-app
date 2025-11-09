import type { Middleware } from '@/api/runtime';

export const createAuthMiddleware = (): Middleware => {
  const handleUnauthorized = (response: Response) => {
    if (response.status === 401) {
      console.log('401 detected - redirecting to login');
      // Redirect to login page on 401 Unauthorized
      window.location.hash = '/login';
    }
  };

  return {
    pre: async (context) => {
      return context;
    },
    post: async (context) => {
      const { response } = context;
      handleUnauthorized(response);
      return response;
    },
    onError: async (context) => {
      const { error, response } = context;

      // Check if error is a Response object (some fetch implementations throw Response on error)
      if (error instanceof Response) {
        handleUnauthorized(error);
      } else if (response) {
        handleUnauthorized(response);
      }

      // Don't return a response, let the error propagate
      return undefined;
    },
  };
};
