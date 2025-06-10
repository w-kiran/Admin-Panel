const RevenueCard = ({logo,incdec,today,value}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-4">
        {logo}
        </div>
        <div className="text-sm text-gray-500">
          <span className="text-green-500 font-semibold mr-1">
            ↑ {incdec}%
          </span>
          <span className="text-red-400 font-medium">+ ${today}k today</span>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">
        ${value}
      </div>
      <div className="text-sm text-gray-400 mt-1">Total Revenue</div>
    </div>
  );
}

export default RevenueCard

