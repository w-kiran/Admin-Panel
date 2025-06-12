import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BACKEND_URL } from '../../configURL';
import { useGetMe } from '../hooks/useGetMe';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const {user,loading1}=useGetMe();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData, {  // Use input instead of Input
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/");  // Redirect on successful login
                toast.success(res.data.message);
                setFormData({
                    email: "",
                    password: ""
                });  // Reset input fields
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
  if (!loading1 && user) {
    navigate('/');
  }
}, [user, loading1, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left - Promo Section (Darker background, lighter text) */}
      <div className="h-screen flex flex-col justify-center items-center md:w-1/2 bg-gray-900 text-white px-6 sm:px-10 py-8 md:py-0 rounded-r-lg shadow-xl">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 rounded-lg">Welcome Back!</h1>
          <p className="text-base sm:text-lg mb-6 rounded-lg">
            Log in to access your seller account and manage your products easily.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-[#13152a] text-white px-6 py-3 rounded-full hover:[#13152a]transition-all duration-300 ease-in-out md:hidden shadow-lg"
          >
            Log In Now
          </button>
        </div>
      </div>

      {/* Right - Form Section (Lighter background, darker text) */}
      <div
        ref={formRef}
        className="flex flex-col justify-center items-center md:w-1/2 bg-white text-gray-800 px-6 sm:px-10 md:px-16 py-12 h-screen md:h-auto rounded-l-lg shadow-xl"
      >
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left text-gray-900">Log Into Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent border-b-2 border-gray-300 text-gray-800 py-2 focus:outline-none focus:border-[#13152a] transition duration-200 rounded-md"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-b-2 border-gray-300 text-gray-800 py-2 focus:border-[#13152a] focus:outline-none transition duration-200 rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#1d1f3d] text-white font-semibold py-3 rounded-full hover:bg-[#3c4070] transition-all duration-300 ease-in-out shadow-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* New User Link */}
          <p className="text-sm text-center text-gray-500 mt-6">
            New here?{" "}
            <a href="/signup" className="text-[#13152a] hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
