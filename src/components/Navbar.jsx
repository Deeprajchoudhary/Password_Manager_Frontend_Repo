import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-300 flex justify-around'>
        <div className="logo font-bold m-2 cursor-pointer hover:scale-110">
            <span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>OP/&gt;</span>
        </div>
        <ul className='flex gap-4 justify-around m-4'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contect us</a></li>
            <li><a href="#">Login</a></li>
        </ul>
      
    </nav>
  )
}

export default Navbar
