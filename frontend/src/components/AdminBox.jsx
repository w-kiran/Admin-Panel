const RevenueCard = ({ logo, incdec, today, value, total }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[100%] h-[100%]">
      <div className="flex items-center justify-between mb-2">
        <div className="rounded-full text-3xl">
          {logo}
        </div>
        <div className="text-lg text-gray-400 mt-1">Total {total}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900">
        {value}
      </div><div className="text-sm text-gray-500">
        <span className="text-green-500 font-semibold text-xs mr-1">
          ↑ {incdec}%
        </span>
        <span className="text-red-400 font-semibold text-xs">+ ${today}k today</span>
      </div>
    </div>
  );
}

export default RevenueCard

