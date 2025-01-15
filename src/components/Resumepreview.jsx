import React from 'react'
import { useContext } from 'react';
import { Formcontext } from '../Formcontext/Formcontext';
const Resumepreview = () => {
  const {formData,updateFormData}=useContext(Formcontext);

  return (
    <div className='border  h-screen border-2 p-3  border-black'>
      <h1 className=' text-center mt-2 text-lg font-bold'>{formData.name}</h1>
      <h1 className=' text-center mt-2 text-lg font-bold'>{formData.contact}</h1>
      <h1 className='text-md  mt-2 font-bold'>Education</h1>
      <hr className='w-full p-[1px]  bg-black'></hr>
      <div className='flex  justify-between'>
<p>{formData.school}</p>
<p>{formData.location}</p>
      </div>
      <div className='flex  justify-between'>
<p>{formData.degree}</p>
<p>{formData.date}</p>
      </div>
      <h1 className='text-md mt-2 font-bold'>Experience</h1>
      <hr className='w-full p-[1px]  bg-black'></hr>
      <div className='flex  justify-between'>
<p>{formData.title}</p>
<p>{formData.cdate}</p>
      </div>
      <div className='flex  justify-between'>
<p>{formData.company}</p>
<p>{formData.clocation}</p>
      </div>
      <h1 className='text-md mt-2 font-bold'>Projects</h1>
      <hr className='w-full p-[1px]  bg-black'></hr>
      <p>{formData.detail}</p>
      <h1 className='text-md mt-2 font-bold'>Technical Skills</h1>
      <hr className='w-full p-[1px]  bg-black'></hr>
<p>{formData.language}</p>
<p>{formData.framework}</p>
<p>{formData.tools}</p>
    </div>
  )
}

export default Resumepreview
