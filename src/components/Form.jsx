import React, { useContext, useState } from 'react'
import { Formcontext } from '../Formcontext/Formcontext';
import { jsPDF } from 'jspdf';
const Form = () => {

const {formData,updateFormData}=useContext(Formcontext);

const onsubmitHandle = (e)=>{
  e.preventDefault();



}
const  generatePdf =()=>{
  const doc = new jsPDF();
  
  const marginX = 20;
  let currentY = 30;

  // Add Name and Contact Info (at the top, in bold)
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(formData.name, marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(` ${formData.contact}`, marginX, currentY + 10);

  // Add a separator line after contact info
  currentY += 20;
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 200, currentY);
  currentY += 10;

  // Education Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Education', marginX, currentY);

  // Add separator line for Education
  currentY += 10;
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 200, currentY);
  currentY += 10;

  doc.setFont('helvetica', 'normal');
  doc.text(`School: ${formData.school}`, marginX, currentY);
  doc.text(`Degree: ${formData.degree}`, marginX, currentY + 10);
  doc.text(`Location: ${formData.location}`, marginX, currentY + 20);
  doc.text(`Date: ${formData.date}`, marginX, currentY + 30);

  // Add a line break
  currentY += 40;

  // Experience Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Experience', marginX, currentY);

  // Add separator line for Experience
  currentY += 10;
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 200, currentY);
  currentY += 10;

  doc.setFont('helvetica', 'normal');
  doc.text(`Title: ${formData.title}`, marginX, currentY);
  doc.text(`Company: ${formData.company}`, marginX, currentY + 10);
  doc.text(`Location: ${formData.cLocation}`, marginX, currentY + 20);
  doc.text(`Date: ${formData.cDate}`, marginX, currentY + 30);
  doc.text(`Details: ${formData.detail}`, marginX, currentY + 40);

  // Add a line break
  currentY += 50;

  // Projects Section (if any)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Projects', marginX, currentY);

  // Add separator line for Projects
  currentY += 10;
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 200, currentY);
  currentY += 10;

  doc.setFont('helvetica', 'normal');
  doc.text(`Languages: ${formData.language}`, marginX, currentY);
  doc.text(`Frameworks: ${formData.framework}`, marginX, currentY + 10);
  doc.text(`Tools: ${formData.tools}`, marginX, currentY + 20);

  // Add a line break
  currentY += 30;

  // Technical Skills Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Technical Skills', marginX, currentY);

  // Add separator line for Technical Skills
  currentY += 10;
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 200, currentY);
  currentY += 10;

  doc.setFont('helvetica', 'normal');
  doc.text(`Languages: ${formData.language}`, marginX, currentY);
  doc.text(`Frameworks: ${formData.framework}`, marginX, currentY + 10);
  doc.text(`Tools: ${formData.tools}`, marginX, currentY + 20);

  // Save the generated PDF
  doc.save("resume.pdf");
}

  const previewHandler = (e)=>{

   const {name,value}= e.target;
   updateFormData(name,value);
console.log(value);

  }
  
  return (
    <form onChange={(e)=>{onsubmitHandle(e)}} className='flex flex-col gap-y-2  '>
      <div className='flex justify-between'>
    <h1 className='text-xl font-bold'>Build the perfect Resume</h1>
    <button onClick={()=>{
      generatePdf()
    }} type='submit' className='bg-black text-white px-3 py-2 rounded-lg'>Download PDF</button>
    </div>
    <p className='text-sm font-bold'>Name</p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="name" value={formData.name} className=' w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='enter name' />
    <p className='text-sm font-bold'>Contact Information</p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="contact" value={formData.contact}  className=' w-full  outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='enter contact' />
    <p className='text-md font-bold'>Education</p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="school" value={formData.school} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='school' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="degree" value={formData.degree} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='degree' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="location" value={formData.location} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='location' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="date" value={formData.date} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' type='date' placeholder='date' />
    <button className='bg-black text-white w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Education</button>
    <p className='text-md font-bold'>Experience</p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="title" value={formData.title} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='title' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="company" value={formData.company} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='company' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="clocation" value={formData.clocation} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='location' />
    <input  onChange={(e)=>{
      previewHandler(e)
    }}  name="cdate" value={formData.cdate}className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' type='date' placeholder='date' />
    <button className='bg-black text-white  w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Experience</button>
<p className='text-md font-bold'>Projects</p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="detail" value={formData.detail} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='detail' />
    <input className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='detail' />
    <input className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='detail' />
    <button className='bg-black text-white  w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Project</button>
    
<p className='text-md font-bold'>Technical Skills </p>
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="language" value={formData.language} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Languages' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="framework" value={formData.framework} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='frameworks' />
    <input onChange={(e)=>{
      previewHandler(e)
    }}  name="tools" value={formData.tools} className='w-full outline-none border border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='dev tools ' />
    <button className='bg-black text-white  w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Skills</button>
    </form>
  )
}

export default Form
