import React, { useState, useRef } from 'react';
import { BACKEND_URL } from '../../configURL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, formData, {
        headers: {
          'Content-type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
        setFormData({
          username: "",
          gender: "",
          email: "",
          password: ""
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left - Promo */}
      <div className="h-screen flex flex-col justify-center items-center md:w-1/2 bg-orange-400 text-slate-900 px-6 sm:px-10 py-8 md:py-0">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">Become a Seller</h1>
          <p className="text-base sm:text-lg mb-6">
            Join our platform and start selling your products to millions of customers worldwide.
          </p>
          <img
            src="https://illustrations.popsy.co/white/online-shopping.svg"
            alt="ecommerce"
            className="w-48 sm:w-64 md:w-full mx-auto md:mx-0 mb-6 max-w-xs"
          />
          <button
            onClick={scrollToForm}
            className="cursor-pointer bg-slate-900 text-orange-400 px-4 py-2 rounded hover:bg-slate-800 transition md:hidden"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right - Form */}
      <div
        ref={formRef}
        className="flex flex-col justify-center items-center md:w-1/2 bg-slate-900 text-white px-6 sm:px-10 md:px-16 py-12 h-screen md:h-auto"
      >
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-transparent border-b-2 border-gray-400 text-white py-2 focus:outline-none focus:border-orange-400"
              />
            </div>

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
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already registered?{" "}
            <a href="/login" className="text-orange-400 hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
