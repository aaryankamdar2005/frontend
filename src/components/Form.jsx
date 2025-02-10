import React, { useContext, useState } from 'react';
import { Formcontext } from '../Formcontext/Formcontext';
import { jsPDF } from 'jspdf';

const Form = () => {
  const { formData, updateFormData } = useContext(Formcontext);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const onsubmitHandle = (e) => {
    e.preventDefault();
  };

  const generatePdf = async () => {
    const response = await fetch( backendurl+'/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'Resume', inputText: JSON.stringify(formData) }),
    });

    const data = await response.json();

    if (data.generatedText) {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text(data.generatedText, 20, 30, { maxWidth: 170 });
      doc.save('resume.pdf');
    }
  };

  const previewHandler = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  return (
    <form onChange={onsubmitHandle} className='flex flex-col gap-y-2'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-bold'>Build the perfect Resume</h1>
        <button onClick={generatePdf} type='button' className='bg-black text-white px-3 py-2 rounded-lg'>
          Download PDF
        </button>
      </div>
      <p className='text-sm font-bold'>Name</p>
      <input name='name' value={formData.name} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Enter name' />
      <p className='text-sm font-bold'>Contact Information</p>
      <input name='contact' value={formData.contact} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Enter contact' />
      <p className='text-md font-bold'>Education</p>
      <input name='school' value={formData.school} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='School' />
      <input name='degree' value={formData.degree} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Degree' />
      <input name='location' value={formData.location} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Location' />
      <input name='date' value={formData.date} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' type='date' placeholder='Date' />
      <button className='bg-black text-white w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Education</button>
      <p className='text-md font-bold'>Experience</p>
      <input name='title' value={formData.title} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Job Title' />
      <input name='company' value={formData.company} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Company' />
      <input name='clocation' value={formData.clocation} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Location' />
      <input name='cdate' value={formData.cdate} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' type='date' placeholder='Date' />
      <input name='detail' value={formData.detail} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Job Details' />
      <button className='bg-black text-white w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Experience</button>
      <p className='text-md font-bold'>Technical Skills</p>
      <input name='language' value={formData.language} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Languages' />
      <input name='framework' value={formData.framework} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Frameworks' />
      <input name='tools' value={formData.tools} onChange={previewHandler} className='w-full border-2 px-2 py-1 border-gray-500 rounded-lg' placeholder='Tools' />
      <button className='bg-black text-white w-32 px-3 py-2 rounded-xl text-sm font-bold'>Add Skills</button>
    </form>
  );
};

export default Form;