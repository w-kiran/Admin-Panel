import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  BarChart2,
  Megaphone,
  Menu
} from "lucide-react";
import Dashboard from '../components/Dashboard';
import ManageTeam from "../components/ManageTeam";
import Products from "../components/Products";
import Statistics from "../components/Statistics";
import Transaction from "../components/Transaction";
import SideItems from "../components/SideItems";

const AdminPanel = () => {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  // Determine sidebar width class based on screen size and collapsed state
  const getSidebarWidthClass = () => {
    if (!collapsed && windowWidth < 550) {
      return 'w-full absolute h-full';
    } else if (collapsed) {
      return 'w-20';
    } else {
      return 'w-64';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`
          bg-[#13152a] text-white shadow-lg z-20 transition-all duration-300
          flex-shrink-0
          ${getSidebarWidthClass()}
        `}
      >
        <div className="h-full p-4 flex flex-col">
          {/* Logo + Toggle */}
          <div className="mb-8 flex items-center justify-between">
            {!collapsed ? (
              <>
                <div>
                  <h1 className="text-2xl font-bold">ShopHub</h1>
                  <p className="text-sm text-gray-400">ShopHub Service</p>
                </div>
                <button
                  onClick={handleSidebarToggle}
                  className="cursor-pointer p-2 rounded-md bg-blue-100 text-gray-700 shadow"
                  aria-label="Toggle Sidebar"
                >
                  <Menu size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={handleSidebarToggle}
                className="p-2 my-2 rounded-md bg-blue-100 text-gray-700 shadow mx-auto"
                aria-label="Toggle Sidebar"
              >
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className='space-y-1.5'>
            <SideItems icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} active={active === "Dashboard"} onClick={() => setActive("Dashboard")} />
            <SideItems icon={<Users size={20} />} label="Manage Team" collapsed={collapsed} active={active === "Manage Team"} onClick={() => setActive("Manage Team")} />
            <SideItems icon={<Receipt size={20} />} label="Transaction" collapsed={collapsed} active={active === "Transaction"} onClick={() => setActive("Transaction")} />
            <SideItems icon={<Package size={20} />} label="Product" collapsed={collapsed} active={active === "Product"} onClick={() => setActive("Product")} />
            <SideItems icon={<BarChart2 size={20} />} label="Statistics" collapsed={collapsed} active={active === "Statistics"} onClick={() => setActive("Statistics")} />
            <SideItems icon={<Megaphone size={20} />} label="Campaign" collapsed={collapsed} active={active === "Campaign"} onClick={() => setActive("Campaign")} />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto transition-all duration-300">
        {active === "Dashboard" && <Dashboard />}
        {active === "Manage Team" && <ManageTeam />}
        {active === "Transaction" && <Transaction />}
        {active === "Product" && <Products />}
        {active === "Statistics" && <Statistics />}
      </div>
    </div>
  );
};

export default AdminPanel;
