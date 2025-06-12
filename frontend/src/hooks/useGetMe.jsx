import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../configURL';

export const useGetMe = () => {
  const [user, setUser] = useState(null);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/getMe`, {
          withCredentials: true,
        });
        setUser(res.data.Me); 
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
      } finally {
        setLoading1(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading1 };
};
