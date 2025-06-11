import React from "react";

const SideItems = ({ icon, label, active, onClick, collapsed }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer rounded-lg transition-all duration-200
        ${active ? "bg-blue-100 text-black font-semibold" : "text-gray-300 hover:bg-blue-900 hover:text-white"}
        ${collapsed 
          ? "justify-center h-11 w-11 mx-auto" // fixed size, center icon vertically & horizontally
          : "gap-3 px-4 py-3"}
      `}
    >
      {/* Increase icon size when collapsed */}
      {React.cloneElement(icon, { size: collapsed ? 28 : 20 })}
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    </div>
  );
};

export default SideItems;

