import React, { useContext, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Formcontext } from '../Formcontext/Formcontext';
const Login = () => {
  const navigate=useNavigate();
const {setCookieToken}=useContext(Formcontext);
const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [login,setLogin]=useState('Login');

  const [name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  
const onSubmitHandler = async (event)=>{
event.preventDefault();
console.log(login);
try {
  if(login=='Signup'){
    const response = await axios.post(  backendurl + '/api/user/signup',{name,email,password});
    console.log('Response:', response);
          console.log('Response data:', response.data);
          console.log('Response data:', response.data.token);
          if(response.data.success){
  localStorage.setItem('authtoken',response.data.token)
          setCookieToken(response.data.token);
          navigate("/create");
          }
  }
  else {
    const response = await axios.post( backendurl + '/api/user/login',{email,password});
    console.log(response);
    console.log(response.data);
    console.log('Response data:', response.data.token);
    if(response.data.success){
      localStorage.setItem('authtoken',response.data.token)
      setCookieToken(response.data.token);
      navigate("/create");
    }
  
  }
}
catch(error){
console.log(error.message);
}

}
  return (
    <form onSubmit={onSubmitHandler} className='flex text-xl font-md flex-col justify-center items-center  gap-y-3'>
      <h2>{login}</h2>
      <div className='w-full  p-3 sm:w-1/2  flex flex-col  justify-center text-sm gap-y-3 items-center'>
{
  login==='Signup' &&   <input onChange={(e)=>{
    setName(e.target.value);
  }} value={name} required className='w-64 sm:w-1/2 outline-none border border-1 rounded-md border-black  px-3 py-1' placeholder='name'/>
}
    
      <input onChange={(e)=>{
    setEmail(e.target.value);
  }} value={email} required className=' w-64 sm:w-1/2 outline-none border border-1 rounded-md border-black  px-3 py-1' placeholder='email' type='email'/>
      <input onChange={(e)=>{
    setPassword(e.target.value);
  }} value={password} required className=' w-64 sm:w-1/2 outline-none border border-1 rounded-md border-black  px-3 py-1' placeholder='password' type='password'/>
<button className='bg-black text-white text-sm px-6 py-2 font-md '>{login}</button>
<div className=' flex sm:flex-row gap-48 items-center'>
  <p>Forgot password ? </p>
  <p onClick={()=>{login==='Signup'? setLogin('Login'): setLogin('Signup')}}>{login==='Signup' ? 'Login' : 'Signup'}</p>
</div>

      </div>


    </form>
  )
}

export default Login
