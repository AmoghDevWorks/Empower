import React, { useRef } from 'react'

const Login = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null)

  const handleClick = () =>{
    const email = emailRef.current.value
    const password = passwordRef.current.value
  }

  return (
    <div className='min-h-screen w-[99vw] flex pt-24 items-start justify-center bg-gradient-to-r from-cyan-100 to-blue-500'>
      <div className='h-fit w-1/3 bg-gradient-to-b from-green-100 to-green-300 p-8 flex items-center justify-center flex-col gap-6 rounded-lg'>
        <h1 className='text-center text-5xl font-bold font-serif text-blue-700 mb-4 underline underline-offset-4'>Login</h1>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='email' className='text-xl font-semibold'>Email:</label>
            <input ref={emailRef} name='email' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email'/>
        </div>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='email' className='text-xl font-semibold'>Password:</label>
            <input ref={passwordRef} name='email' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email'/>
        </div>
        <button onClick={handleClick} className='py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
            Login
        </button>
      </div>
    </div>
  )
}

export default Login
