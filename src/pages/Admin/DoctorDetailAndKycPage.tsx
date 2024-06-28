import React from 'react'
import image from "../../assets/doctoProfiler.jpg"

function DoctorDetailAndKycPage() {
  return (
    <div className='w-full h-screen  md:flex p-5 gap-2'>

      <div className='w-full md:w-1/2 bg-white'>

        <div className='w-[20] mx-auto'>
           <img className='rounded-full w-[20%] mx-auto' src={image} alt="" />
        </div>

        <div className='w-1/2 mx-auto'>
            <div className='bg-gray-200 rounded-md mt-2'>
                <h1 className='text-black text-center py-1 mx-1 font-medium'>name :<span className='text-black mx-2'>Shaham salam</span></h1>
            </div>
            <div className='bg-gray-200 rounded-md mt-2'>
                <h1 className='text-center py-1 mx-1 font-medium'>Name :<span className='text-black mx-2'>Shaham salam</span></h1>
            </div>
            <div className='bg-gray-200 rounded-md mt-2'>
                <h1 className='text-black text-center py-1 mx-1 font-medium'>Name:<span className='text-black mx-2'>Shaham salam</span></h1>
            </div>
            <div className='bg-gray-200 rounded-md mt-2'>
                <h1 className='text-black text-center py-1 mx-1 font-medium'>Name:<span className='text-black mx-2'>Shaham salam</span></h1>
            </div>
            <div className='bg-gray-200 rounded-md mt-2'>
                <h1 className='text-black text-center py-1 mx-1 font-medium'>Name:<span className='text-black mx-2'>Shaham salam</span></h1>
            </div>
        </div>
      </div>  
      <div className='w-full md:w-1/2 bg-gray-100 rounded-md p-1'>
         <div className='mt-9 mb-5'>
            <h1 className='font-medium mx-8'>LicenseNumber :<span className='text-red-500 mx-3'>1234</span></h1>
            <h1 className='font-medium mx-8'>years of Experience:<span className='text-red-500 mx-3'>4</span></h1>
            <h1 className='font-medium mx-8'>Languages:<span className='text-red-500 mx-3'>english,malyalam</span></h1>
         </div>
         <div>
            <h1 className='text-center'>License image</h1>
            <img className='w-1/2 object-contain mx-auto rounded-md h-56' src="https://global.discourse-cdn.com/uipath/original/4X/7/2/c/72c6e68215208ca6444071e881ca9dfe8c5ffafb.jpeg" alt="" />
         </div>
         <div className='mx-auto'>
            <h1 className='text-center'>Identity card </h1>
            <img className='object-contain w-1/2  mx-auto h-56 rounded-md' src="https://global.discourse-cdn.com/uipath/original/4X/7/2/c/72c6e68215208ca6444071e881ca9dfe8c5ffafb.jpeg" alt="" />
         </div>
      </div>

    </div>
  )
}

export default DoctorDetailAndKycPage
