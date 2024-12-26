import React, { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/UserSlice';

const Login = () => {
     
  const emailRef = useRef(null);
  const passwordRef = useRef(null)
   const nameref=useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClick = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert(response.data.message);
        
        console.log(nameref);
       // Handle success (You can store JWT in localStorage)
      dispatch(addUser({Name:'text_name',email:email}))
      navigate('/')
    } catch (error) {
      alert(error.response.data.message); // Handle error
    }
  }

  return (
    <div className='text-indigo-600 min-h-screen w-[99vw] flex pt-24 items-start justify-center bg-slate-100'>
    <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-8 flex items-center justify-center flex-col gap-6 rounded-lg'>
        <h1 className='text-center text-5xl font-bold font-serif text-blue-700 mb-4'>Login</h1>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='email' className='text-xl font-semibold'>Email:</label>
            <input ref={emailRef} name='email' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email'/>
        </div>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='password' className='text-xl font-semibold'>Password:</label>
            <input ref={passwordRef} name='password' type='password' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your password'/>
        </div>
        <button onClick={handleClick} className='py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
            Login
        </button>
      </div>
    </div>
  )
}

export default Login;
