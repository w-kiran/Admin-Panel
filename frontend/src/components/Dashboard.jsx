import { HiCurrencyDollar } from "react-icons/hi2";
import { FaFilter, FaSearch, FaStar, FaUserFriends } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import RevenueCard from './AdminBox.jsx'
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    AreaChart,
    Area // Added for Net Profit sparkline
} from "recharts";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const data = [
    { name: "Jan", orders: 15000, fill: "#A5D8FF" },
    { name: "Feb", orders: 7000, fill: "#BDE0FE" },
    { name: "Mar", orders: 22000, fill: "#D0BFFF" },
    { name: "Apr", orders: 19000, fill: "#FFCAF0" },
    { name: "May", orders: 14000, fill: "#FFAFCC" },
    { name: "June", orders: 20000, fill: "#FFB3C6" },
    { name: "July", orders: 8000, fill: "#FFD6A5" },
    { name: "Aug", orders: 2000, fill: "#FCD5CE" },
    { name: "Sep", orders: 15000, fill: "#FFE066" },
    { name: "Oct", orders: 28000, fill: "#FFD166" },
    { name: "Nov", orders: 17000, fill: "#FFADAD" },
    { name: "Dec", orders: 15000, fill: "#E7C6FF" },
];

const data1 = [
    { name: "Medicine", value: 4200 },
    { name: "Electronics", value: 3150 },
    { name: "Sports", value: 1500 },
    { name: "Food", value: 2890 },
    { name: "Clothing", value: 2001 },
    { name: "Furniture", value: 3909 },
];


const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
            </span>
        );
    }
    return <div className="flex text-lg">{stars}</div>;
};

const branchData = [
    { name: 'New York', productType: 'Doc and Objects', order: '12,000', rating: 5 },
    { name: 'California', productType: 'Objects', order: '5,000', rating: 5 }, // Image shows 5 stars
    { name: 'Louisiana', productType: 'Documents', order: '4,480', rating: 5 },
    { name: 'Arizona', productType: 'Objects', order: '1,500', rating: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FF69B4"];

const options = ["This year", "Last year", "This month", "Last month"];
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("This year");
    const dropdownRef = useRef(null);
    const totalSales = 8888;
    const totalRevenue = 88888;

    const [profitData, setProfitData] = useState([
        { month: 'Jan', value: 10 },
        { month: 'Feb', value: 25 },
        { month: 'Mar', value: 40 },
        { month: 'Apr', value: 30 },
        { month: 'May', value: 55 },
        { month: 'Jun', value: 65 }, // Adjusted June value to show an upward trend like the image
    ]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div >
            <div className="flex items-center justify-between px-4">
                {/* Search Input with Icon */}
                <div className="relative flex-1 max-w-sm mb-9 -ml-2">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Search className="w-5 h-5" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search anything.."
                        className="w-full bg-white pl-10 pr-4 py-4 rounded-full  focus:outline-none focus:ring-2 focus:ring-black-400"
                    />
                </div>

                {/* Right Side: Notification + Avatar */}
                <div className="flex items-center gap-6 ml-4 mb-9">
                    {/* Notification Bell */}
                    <div className="relative">
                        <IoIosNotifications className="w-9 h-9 text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            2
                        </span>
                    </div>

                    {/* Avatar */}
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <div className="text-3xl font-serif mb-10 ml-2">
                    DashBoard
                </div>
                <div className="relative inline-block text-left text-sm" ref={dropdownRef}>
                    <span className="text-gray-500 mr-1 text-lg">Showing:</span>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#13152a] text-lg font-medium inline-flex items-center"
                    >
                        {selected}
                        <svg
                            className="ml-1 w-4 h-4 text-[#13152a]"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-40">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <RevenueCard logo={<HiCurrencyDollar />} incdec={120} today={13} value={"$14000"} total={"Revenue"} />
                <RevenueCard logo={<FaUserFriends />} incdec={1200} today={130} value={140} total={"Customer"} />
                <RevenueCard logo={<FaBagShopping />} incdec={1200} today={1300} value={1400} total={"Transaction"} />
                <RevenueCard logo={<FaSearchLocation />} incdec={12000} today={13000} value={140000} total={"Visitor"} />

                {/* Statistics Chart aligned with 2 cards width or full width under 1024px */}
                <div className="col-span-1 sm:col-span-2 xl:col-span-2 w-full">
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            Statistics of Orders
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Order growth per month
                        </p>
                        <div className="h-60 sm:h-76 ">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="orders" fill="#8884d8" radius={[6, 6, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 xl:col-span-2 w-full">
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Overview</h2>

                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                            {/* Chart Section */}
                            <div className="w-100 h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data1}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label={({ value }) => value.toLocaleString()}
                                        >
                                            {data1.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Info Section */}
                            <div className="w-full md:w-1/2 text-sm space-y-4">
                                <div>
                                    <p className="text-gray-500">Number of sales</p>
                                    <p className="text-xl font-bold text-black">{totalSales.toLocaleString()} items</p>
                                </div>

                                <div className="space-y-1 text-gray-700">
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#8884d8] mr-2" />Medicine: $4,200</p>
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#82ca9d] mr-2" />Electronics: $3,150</p>
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#ffc658] mr-2" />Sports: $1,500</p>
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#ff8042] mr-2" />Food: $2,890</p>
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#00C49F] mr-2" />Clothing: $2,001</p>
                                    <p><span className="inline-block w-3 h-3 rounded-full bg-[#FF69B4] mr-2" />Furniture: $3,909</p>
                                </div>
                            </div>
                        </div>

                        {/* Revenue */}
                        <div className="pt-6 text-base font-medium text-gray-800 text-center md:text-left">
                            Total revenue in 30 days is ${totalRevenue.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* New Grid for the last three cards */}
                <div className="col-span-1 sm:col-span-2 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Card 1: Top Ordered Branch List */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Top Ordered Branch List</h2>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center text-gray-600">
                                    <Search className="mr-1 h-5 w-5" />
                                    <span className="text-sm">Search</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <SlidersHorizontal className="mr-1 h-5 w-5" />
                                    <span className="text-sm">Filter</span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500">
                                        <th className="pb-3 pr-4">Branch Name</th>
                                        <th className="pb-3 pr-4">Product Type</th>
                                        <th className="pb-3 pr-4 text-right">Order</th>
                                        <th className="pb-3 pr-4 text-center">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {branchData.map((branch, index) => (
                                        <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                            <td className="py-3 pr-4 text-gray-800">{branch.name}</td>
                                            <td className="py-3 pr-4 text-gray-800">{branch.productType}</td>
                                            <td className="py-3 pr-4 text-right text-gray-800">{branch.order}</td>
                                            <td className="py-3 pr-4 text-center">
                                                <StarRating rating={branch.rating} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card 2: Most Delivered Zone */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Most Delivered Zone</h2>
                            <div className="relative">
                                <select className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>This year</option>
                                    <option>Last year</option>
                                    <option>This month</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" size={16} />
                            </div>
                        </div>

                        {/* Placeholder for the chart */}
                        <div className="flex h-64 items-center justify-center p-4">
                            <svg viewBox="0 0 200 200" className="h-full w-full max-w-sm">
                                {/* Concentric circles */}
                                <circle cx="100" cy="100" r="20" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                                <circle cx="100" cy="100" r="40" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                                <circle cx="100" cy="100" r="100" fill="none" stroke="#e0e0e0" strokeWidth="1" />

                                {/* Example "zones" represented by colored polygons, approximating the image */}
                                <polygon points="100,0 186.6,50 186.6,150 100,200 13.4,150 13.4,50" fill="none" stroke="#a0a0a0" strokeWidth="1" />

                                {/* Approximate colored sections */}
                                <path d="M100 0 L100 100 A100 100 0 0 1 186.6 50 Z" fill="#ADD8E6" opacity="0.7" /> {/* Light blue */}
                                <path d="M100 100 L186.6 50 L186.6 150 Z" fill="#F0E68C" opacity="0.7" /> {/* Yellow */}
                                <path d="M100 100 L186.6 150 L100 200 Z" fill="#DDA0DD" opacity="0.7" /> {/* Lilac */}
                                <path d="M100 100 L100 200 L13.4 150 Z" fill="#C0C0C0" opacity="0.7" /> {/* Light grey */}
                                <path d="M100 100 L13.4 150 L13.4 50 Z" fill="#90EE90" opacity="0.7" /> {/* Light green */}
                            </svg>
                        </div>

                        <div className="mt-6 text-center text-sm font-medium text-gray-600">
                            Total Delivered Order: <span className="font-semibold text-blue-600">256,560</span>
                        </div>
                    </div>
                    {/* Card 3: Net Profit */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        {/* Enhanced Header for Net Profit */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Net Profit</h3>
                            <div className="flex items-center space-x-2">
                                <span className="bg-green-100 text-green-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                    +8.7%
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 12l3-3 3 3 4-4M7 21a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* ADD THIS LINE FOR CURRENT VALUE */}
                        <p className="text-3xl font-bold text-gray-900 mt-2 mb-4">$15,000</p>
                        {/* END ADDITION */}

                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={profitData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                        interval="preserveStartEnd"
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10B981"
                                        fillOpacity={1}
                                        fill="url(#colorProfit)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard