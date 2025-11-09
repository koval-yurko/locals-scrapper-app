import { FC, ComponentType, Suspense, lazy, ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import Container from '@mui/material/Container';

import { Loading } from '@/components/Loading';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoadComponent = () => Promise<{ default: ComponentType<any> }>;

type AnyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function asyncComponentLoader(
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
): FC {
  const LazyComponent = lazy(() => {
    return loadComponent().then((moduleExports) => {
      return moduleExports;
    });
  });

  return function AsyncComponent(props: AnyProps): ReactElement {
    return (
      <Suspense fallback={<Loading />}>
        <LazyComponent {...additionalProps} {...props} />
      </Suspense>
    );
  };
}

function Pages() {
  const Home = asyncComponentLoader(() => import('@/pages/Home'));
  const Users = asyncComponentLoader(() => import('@/pages/Users'));
  const UserDetail = asyncComponentLoader(() => import('@/pages/UserDetail'));
  const Login = asyncComponentLoader(() => import('@/pages/Login'));

  return (
    <Container maxWidth='lg'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:userId' element={<UserDetail />} />
      </Routes>
    </Container>
  );
}

export default Pages;
