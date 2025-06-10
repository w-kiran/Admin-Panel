import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BACKEND_URL } from '../../configURL';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left - Promo */}
      <div className="h-screen flex flex-col justify-center items-center md:w-1/2 bg-orange-400 text-slate-900 px-6 sm:px-10 py-8 md:py-0">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">Welcome Back!!</h1>
          <p className="text-base sm:text-lg mb-6">
            Log in to access your seller account and manage your products easily.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-slate-900 text-orange-400 px-4 py-2 rounded hover:bg-slate-800 transition md:hidden"
          >
            Log In Now
          </button>
        </div>
      </div>

      {/* Right - Form */}
      <div
        ref={formRef}
        className="flex flex-col justify-center items-center md:w-1/2 bg-slate-900 text-white px-6 sm:px-10 md:px-16 py-12 h-screen md:h-auto"
      >
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left">Log Into Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent border-b-2 border-gray-400 text-white py-2 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-b-2 border-gray-400 text-white py-2 focus:outline-none focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-orange-400 text-slate-900 font-semibold py-2 rounded hover:bg-orange-300 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            New here?{" "}
            <a href="/signup" className="text-orange-400 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
