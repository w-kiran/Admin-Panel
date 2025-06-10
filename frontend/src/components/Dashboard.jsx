import RevenueCard from './AdminBox.jsx'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

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
const Dashboard = () => {
    return (
        <div >
            <h1 className=''>Dashboard</h1>
            <div className='flex'>
                <div className='p-5'><RevenueCard logo={"a"} incdec={120} today={13} value={14000}/></div>
                <div className='p-5'><RevenueCard logo={"b"} incdec={1200} today={130} value={140}/></div>
                <div className='p-5'><RevenueCard logo={"c"} incdec={1200} today={1300} value={1400}/></div>
                <div className='p-5'><RevenueCard logo={"d"} incdec={12000} today={13000} value={140000}/></div>
            </div>
            <div className='pl-5 '>
                <div className="bg-white rounded-xl shadow p-5 w-[65%] h-[50%]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        Statistics of Orders
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">Order growths per month</p>
                    <div className="h-[50%] ">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="orders" fill="#8884d8">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
