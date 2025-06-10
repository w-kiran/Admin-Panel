import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../configURL';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          withCredentials: true,
        });

        const role = res.data.role;
        if (role === 'ADMIN' || role === 'SUPERADMIN') {
          setAuthorized(true);
        }
      } catch (err) {
        console.error('Authorization failed', err);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

   const logOutHandler = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/auth/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
    };

  const goToAdminPanel = () => {
    navigate('/admin');
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-900 text-white px-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        Welcome to the Platform
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 mb-10 text-center max-w-md">
        Manage your products, users, and settings from the Admin Panel.
      </p>
      {authorized ? <button
        onClick={goToAdminPanel}
        className="cursor-pointer bg-orange-400 text-slate-900 px-6 py-3 rounded font-semibold hover:bg-orange-300 transition"
      >
        Go to Admin Panel
      </button>:<div>You cannot access admin panel</div>}
      <button onClick={logOutHandler} className="cursor-pointer mt-5 bg-orange-400 text-slate-900 px-6 py-3 rounded font-semibold hover:bg-orange-300 transition">Logout</button>
    </div>
  );
};

export default Home;
