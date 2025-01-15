import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate= useNavigate();

  return (
    <>
      <div className=' mt-2 w-full px-11 flex flex-col lg:flex-row   '>
      {/* {left} */}
     <div className=' flex flex-col gap-1 py-1 px-2 lg:w-1/2 my-2 '>
     <h1 class="text-3xl font-extrabold sm:mb-10 lg:text-6xl">AI Resume Builder (Fast, Easy & Free to Use)</h1>
<p className='text-xl'>Land your next job with one of the best AI resume builders online. Choose from dozens of recruiter-approved templates and add ready-to-use skills and phrases in one click. Millions have trusted our resume maker — and it’s free to use!</p>
<div className=' flex flex-col gap-5 sm:flex-row  my-4 items-center gap-28 '>
  <button className='bg-orange-300 px-8 py-3 rounded-3xl text-black font-bold transition-all duration-100 ease-in hover:bg-orange-200'>Import your Resume</button>
  <button onClick={()=>{navigate("/create")}} className='bg-blue-500 px-8 py-3 rounded-3xl text-white font-bold transition-all duration-100 ease-in hover:bg-blue-300'>Create your Resume</button> 
</div>
     </div>

     {/* {right} */}
     <div className=' flex lg:w-1/2 flex justify-center items-center'>
<img src={assets.heroimg} className='w-96 shadow-2xl'/>
     </div>
    
    </div>
    <div className='flex flex-col items-center gap-y-3  mt-6 lg:flex-row justify-around'>
      <p className='text-xl font-md'>Our Customers hired by : </p>
      <img src={assets.nike} />
      <img src={assets.pinterest} />
      <img src={assets.sephora} />
      <img src={assets.kaiser} />
     </div>

      <h1 className=' text-center mt-10 mb-10 text-4xl font-extrabold '>
      Make a Resume That Gets Results
      </h1>
      <div className='w-full flex flex-col gap-y-10 justify-center items-center sm:flex-row justify-around justify-center'>
        <img src={assets.choose} className='h-28 w-28'/>
        <img src={assets.design} className='h-28 w-28'/>
        <img src={assets.download} className='h-28 w-28'/>
        <img src={assets.customize} className='h-28 w-28'/>
     </div>
     <div className=' w-full rounded-3xl mt-10 flex flex-col sm:flex flex-row justify-center items-center'>
     <div className='w-full lg:w-4/5 h-auto bg-blue-600 flex flex-col lg:flex-row justify-center items-center'>
  {/* Left Section (Image) */}
  <div className='w-full lg:w-1/2 px-8 py-8'>
    <img src={assets.thumbnail} className='w-full h-auto rounded-xl object-cover' />
  </div>

  {/* Right Section (Text Content) */}
  <div className='w-full lg:w-1/2 flex flex-col gap-y-5 items-start justify-start px-8 py-8'>
    <h1 className='text-white font-bold text-xl sm:text-3xl lg:text-4xl'>
      See what our AI<br /> resume builder can do
    </h1>
    <p className='text-sm sm:text-base font-medium text-white'>
      Learn how to create a mistake-free resume in under 10 minutes with our award-winning Resume Builder.
    </p>
  </div>
</div>

     </div>
    </>
  
  )
}

export default Hero
