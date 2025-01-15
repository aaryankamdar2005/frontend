import React from 'react'
import Form from '../components/Form'
import Resumepreview from '../components/Resumepreview'

const Create = () => {
  return (
    <div className="flex w-full flex-col sm:flex-row h-screen">
    {/* Form Section */}
    <div className="w-full h-1/2 sm:w-1/2 p-3 mx-0 sm:mx-10 flex flex-col h-auto sm:h-full overflow-y-auto">
      <Form />
    </div>
  
    {/* Resume Preview Section */}
    <div className="w-full h-1/2 mt-5  sm:w-1/2 p-3 mx-0 sm:mx-10 flex flex-col sm:h-full">
      <Resumepreview />
    </div>
  </div>
  
  )
}

export default Create
