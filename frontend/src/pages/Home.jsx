import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../configURL';
import { toast } from 'sonner';
import { useGetMe } from '../hooks/useGetMe';

const Home = () => {
  const navigate = useNavigate();
  const {user}=useGetMe();
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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-inter">
      {/* Navbar */}
      <nav className="bg-[#13152a] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <a href="/" className="hover:text-gray-300 transition duration-300">YourPlatform</a>
          </div>
          <div className="md:flex space-x-6 hidden">
            <a href="#home" className="text-gray-300 hover:text-white transition duration-300">Home</a>
            <a href="#features" className="text-gray-300 hover:text-white transition duration-300">Features</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            {user ? (
              <button
                onClick={logOutHandler}
                className="text-gray-300 hover:text-white transition duration-300 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="text-gray-300 hover:text-white transition duration-300">Login</a>
                <a href="/signup" className="text-gray-300 hover:text-white transition duration-300">Signup</a>
              </>
            )}
          </div>
          {/* Mobile Menu Icon (add later if needed) */}
          <div className="md:hidden">
            <button className="text-white text-2xl">&#9776;</button> {/* Hamburger icon */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col justify-center items-center flex-grow text-center p-6 md:p-12">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
          Welcome to <span className="text-[#13152a] block bg-white rounded-xl py-2 px-4 shadow-xl">Your Platform</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl animate-fade-in-up delay-200">
          Empowering sellers worldwide with intuitive tools and a vast customer reach.
          Manage your products, users, and settings effortlessly.
        </p>

        {loading ? (
          <div className="text-gray-400 text-lg">Checking authorization...</div>
        ) : (
          authorized ? (
            <button
              onClick={goToAdminPanel}
              className="cursor-pointer bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover: transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 animate-fade-in-up delay-400"
            >
              Go to Admin Panel
            </button>
          ) : (
            <div className="text-red-400 text-lg p-4 bg-gray-800 rounded-lg shadow-inner animate-fade-in-up delay-400">
              You need to be an admin to access the admin panel.
              <p className="mt-2">
                <a href="/login" className="text-[#13152a] hover:underline">Log in</a> or <a href="/signup" className="text-[#13152a] hover:underline">Sign up</a>.
              </p>
            </div>
          )
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 p-8 md:p-16 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature Card 1 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-[#13152a] transition duration-300 transform hover:scale-105">
            <div className="text-[#13152a] text-5xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Product Management</h3>
            <p className="text-gray-300">Easily list, update, and manage your product catalog with intuitive tools.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-[#13152a] transition duration-300 transform hover:scale-105">
            <div className="text-[#13152a] text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Advanced Analytics</h3>
            <p className="text-gray-300">Gain insights into your sales, customer behavior, and market trends.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-[#13152a] transition duration-300 transform hover:scale-105">
            <div className="text-[#13152a] text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Seamless Integrations</h3>
            <p className="text-gray-300">Connect with popular payment gateways and shipping providers effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 p-8 md:p-16 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Get in Touch</h2>
        <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <p className="text-lg text-gray-300 mb-6">Have questions or need support? Reach out to us!</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#13152a]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#13152a]"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#13152a]"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#13152a] text-white font-semibold py-3 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#13152a] p-6 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} YourPlatform. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
