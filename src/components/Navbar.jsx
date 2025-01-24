import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { Formcontext } from '../Formcontext/Formcontext';

import Cookies from 'js-cookie';

const Navbar = () => {
    const {setCookieToken,cookieToken}=useContext(Formcontext);
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const[login,setLogin]=useState('Login');
    const [visible,setVisible]=useState(false);
const navigate = useNavigate();
useEffect(() => {
    const token = Cookies.get("token");
if(token){
    setIsTokenAvailable(true);
    setLogin('Logout');
}
else {
    setIsTokenAvailable(false);
    setLogin('Login');
}
  }, [login,cookieToken]);
  const  logOut = ()=>{
    setCookieToken(null);
    Cookies.remove('token');


  }
console.log(Cookies.get("token"));

  return (
    <div className=' sm:w-full  py-2 px-3 h-auto flex justify-around  items-center'>

   <img src={assets.logo}/>
   <div className='group relative  hidden lg:block  '>
   <div className='flex items-center gap-1'>
   <p className='text-sm font-bold group-hover:text-blue-600 bt '>BUILDER</p>
<img src={assets.dropdown}   className='w-6 group-hover:rotate-180 transition-transform
ease-in duration-300
' alt='search icon'/>
   
</div>
   
   <div className='group-hover:block hidden  absolute  left-1  flex flex-col items-center w-36 bg-slate-100 rounded-md border down-menu'
   >
    <p >AI RESUME BUILDER</p>
    <p>COVER LETTER </p>
    <p>CV MAKER</p>
   </div>
   </div>
   <div className='group relative  hidden lg:block  '>
   <div className='flex items-center gap-1'>
   <p className='text-sm  font-bold group-hover:text-blue-600 bt '>RESUME</p>
<img src={assets.dropdown}  className='w-6 group-hover:rotate-180 transition-transform
ease-in duration-300
' alt='search icon'/>
   
</div>
   
   <div className='group-hover:block hidden  absolute  left-1  flex flex-col items-center w-36 bg-slate-100 rounded-md border down-menu'
   >
    <p >AI RESUME BUILDER</p>
    <p>COVER LETTER </p>
    <p>CV MAKER</p>
   </div>
   </div>
   <div className='group relative  hidden lg:block  '>
   <div className='flex items-center gap-1'>
   <p className='text-sm  font-bold group-hover:text-blue-600 bt '>CV</p>
<img src={assets.dropdown}   className='w-6 group-hover:rotate-180 transition-transform
ease-in duration-300
' alt='search icon'/>
   
</div>
   
   <div className='group-hover:block hidden  absolute  left-1  flex flex-col items-center w-36 bg-slate-100 rounded-md border down-menu'
   >
    <p >AI RESUME BUILDER</p>
    <p>COVER LETTER </p>
    <p>CV MAKER</p>
   </div>
   </div>
 
   <div className='group relative  hidden lg:block  '>
   <div className='flex items-center gap-1'>
   <p className='text-sm  font-bold group-hover:text-blue-600 bt '>RESOURCES</p>
<img src={assets.dropdown}  className='w-6 group-hover:rotate-180 transition-transform
ease-in duration-300
' alt='search icon'/>
   
</div>
   
   <div className='group-hover:block hidden  absolute  left-1  justify-center items-center flex flex-col items-center w-36  bg-slate-100 rounded-md border down-menu'
   >
    <p className='text-md font-md'>AI RESUME BUILDER</p>
    <p>COVER LETTER </p>
    <p>CV MAKER</p>
   </div>
   </div>
   
<div className='  hidden lg:flex items-center gap-1'>
<img src={assets.search} className='w-6' alt='search icon'/>
    <p className='text-md font-bold '>Search</p>
</div>
<div className='  hidden lg:flex items-center gap-1'>
<img src={assets.chat} className='w-6' alt='search icon'/>
    <p className='text-md font-bold '>Chat</p>
</div>
<img src={assets.hamburger} onClick={()=>{setVisible(true)}} className='w-8 mx-1 lg:hidden'/>
<div className={ ` absolute top-0 px-2 py-2 right-0 bg-gray-100  ${ visible ? 'w-full':'hidden'}` }>
    <div className='flex flex-col justify-center items-start  gap-y-2'>
   
    <img onClick={()=>setVisible(false)} src={assets.dropdown}  className='w-6 rotate-90
' alt='search icon'/>

<p className='text-sm font-md '>BUILDER</p>
<hr className='w-full'></hr>
<p className='text-sm font-md '>RESUME</p>
<hr className='w-full'></hr>
<p className='text-sm font-md '>CV</p>
<hr className='w-full'></hr>
<p className='text-sm font-md '>COVER LETTER</p>
<hr className='w-full'></hr>
<p className='text-sm font-md '>ADVICE</p>
<hr className='w-full'></hr>
<p className='text-sm font-md '>RESOURCES</p>
    </div>
 
    
    </div>
    
<button  onClick={ ()=>{ login==='Login'?navigate("/login"):logOut()}}     className='bg-black text-white rounded-2xl flex  px-8 py-3 items-center justify-center text-md font-bold'>
{login}
</button>


    </div>
  )
}

export default Navbar
