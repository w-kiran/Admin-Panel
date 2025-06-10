import {
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  BarChart2,
  Megaphone,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#13152a] text-white p-6 space-y-8">
      {/* Logo & Title */}
      <div>
        <h1 className="text-2xl font-bold">JoshiStore</h1>
        <p className="text-sm text-gray-400">Joshi Service</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
        <NavItem icon={<Package size={20} />} label="Product" />
        <NavItem icon={<Receipt size={20} />} label="Transaction" />
        <NavItem icon={<Users size={20} />} label="Customer" />
        <NavItem icon={<BarChart2 size={20} />} label="Statistics" />
        <NavItem icon={<Megaphone size={20} />} label="Campaign" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
        active
          ? "bg-blue-100 text-black font-semibold"
          : "text-gray-300 hover:bg-blue-900 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
