import React from 'react'


function NavBar() {
  return (
    <div className='w-full  flex justify-between'>

           <div className='m-3 mx-10 my-7'>
               <h1 className='text-black text-4xl custom-font'>MEDDICAL</h1>
           </div>    

           <div className='my-7 mx-10'>
              <button  className='bg-btnColor text-white rounded-md py-1 px-7'>Logout</button>
           </div>
  
    </div>
  )
}

export default NavBar
