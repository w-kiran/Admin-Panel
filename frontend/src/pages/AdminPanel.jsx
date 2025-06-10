import React from 'react'
import Dashboard from '../components/Dashboard'
import LeftSidebar from '../components/LeftSidebar'

const AdminPanel = () => {
  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
        <div
        className={`fixed top-50 left-0 h-full overflow-y-auto scrollbar-thin shadow-lg transition-transform duration-300 z-50"
          } md:static md:translate-x-0`}
      >
            <LeftSidebar/>
        </div>
        <div>
            <Dashboard/>
        </div>
    </div>
  )
}

export default AdminPanel
