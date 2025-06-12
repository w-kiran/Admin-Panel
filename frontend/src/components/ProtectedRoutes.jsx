import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '../hooks/useGetMe';

const ProtectedRoutes = ({ children }) => {
  const { user, loading1 } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading1 && !user) {
      navigate('/login');
    }
  }, [loading1, user, navigate]);

  if (loading1) return <div>Loading...</div>;

  return <>{user && children}</>;
};

export default ProtectedRoutes;
