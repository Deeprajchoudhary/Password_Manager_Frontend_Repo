import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full bg-slate-600 flex flex-col justify-center items-center'>
        <div className="logo">
            <div className="logo font-bold m-2 cursor-pointer hover:scale-110">
            <span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>OP/&gt;</span>
        </div>
        </div>
        <div className="somewords items-center my-5"><span>created with </span><span><i className="text-red-600 fa-solid fa-heart fa-flip"></i></span> <span> by Deepraj choudhary </span> </div>
      
    </div>
  )
}

export default Footer
