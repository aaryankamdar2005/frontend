import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
     <div className='w-full mt-20  bg-blue-800 rounded-t-3xl flex  flex-col sm:flex-row justify-between'>
      <div className='flex  justify-center items-center'>
      <h1 className='text-5xl p-6 font-extrabold text-white'>Take Your Resume to the <br/> Next Level</h1>
      </div>
   
      <div>
      <img src={assets.footer}/>
      </div>
     
    </div>
    <div>
      
    </div>
    </>
   
  )
}

export default Footer
