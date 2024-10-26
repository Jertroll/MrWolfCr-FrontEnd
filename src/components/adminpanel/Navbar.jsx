import React from 'react'
import { FaBars } from 'react-icons/fa'

function Navbar() {
  return (
    <div className='bg-grey-800 px-4 py-3 flex justify-between'>
      <div className='flex item-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer'/>
        <span>E-comerce</span>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar