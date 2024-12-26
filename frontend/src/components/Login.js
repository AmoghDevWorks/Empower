import React, { useRef } from 'react'
import axios from 'axios'

const Login = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null)

  const handleClick = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert(response.data.message); // Handle success (You can store JWT in localStorage)
    } catch (error) {
      alert(error.response.data.message); // Handle error
    }
  }

  return (
    <div className='min-h-screen w-screen flex my-28 items-start justify-center'>
      <div className='h-fit w-1/3 bg-green-100 p-4 flex items-center justify-center flex-col gap-3 rounded-lg'>
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
