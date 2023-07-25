import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';

import Loading from './Loading';
import { getSession } from '../api/auth/login';

export function AuthGuard() {
  const { status, error } = useQuery({
    queryKey: ['sessionCheck'],
    queryFn: () => getSession({}),
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  switch (status) {
    case 'error':
    case 'loading':
      return <Loading />;
    case 'success':
      return <Outlet />;
  }
}
