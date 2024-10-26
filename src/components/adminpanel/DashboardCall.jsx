import React from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
function DashboardCall() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Dashboard/>
    </div>
  )
}

export default DashboardCall