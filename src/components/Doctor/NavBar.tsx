
import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-between  mt-3 p-2 mx-6'>
           
           <div className='text-black '>
           <h1 className="text-black text-2xl sm:text-4xl custom-font">
              MEDDICAL
            </h1>
           </div>

           <div className='hidden sm:flex gap-10'>
                  <h1 className='my-auto text-md sm:text-xl font-medium'>Profile</h1>
                  <button className='bg-btnColor rounded-md py-1  sm:px-7 text-white'>LogOut</button>
           </div>
    </div>
  )
}

export default NavBar
