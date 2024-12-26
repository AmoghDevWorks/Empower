import React, { useRef } from 'react'

const Signup = () => {

  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const contactRef = useRef(null)
  const passwordRef = useRef(null)
  
  const handleClick = () =>{
    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const contact = contactRef.current.value
  }

  return (
    <div className='bg-gradient-to-r from-cyan-100 to-blue-500 min-h-[90vh] flex items-center justify-center'>
        <div className='h-fit w-1/3 bg-gradient-to-b from-green-100 to-green-300 p-5 flex flex-col justify-center items-center rounded-lg'>
            <h1 className='text-5xl font-bold text-center font-serif my-5 underline underline-offset-4'>SignUp</h1>
            <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                <label htmlFor='name' className='text-xl font-semibold'>Name:</label>
                <input ref={nameRef} name='name' type='text' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your name'/>
            </div>
            <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                <label htmlFor='email' className='text-xl font-semibold'>Email:</label>
                <input ref={emailRef} name='email' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email'/>
            </div>
            <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                <label htmlFor='contact' className='text-xl font-semibold'>Contact detail:</label>
                <input ref={contactRef} name='contact' type='text' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your contact details'/>
            </div>
            <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                <label htmlFor='password' className='text-xl font-semibold'>Password:</label>
                <input ref={passwordRef} name='password' type='text' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your mobile number'/>
            </div>
            <button onClick={handleClick} className='mt-2 py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
                SignUp
            </button>
        </div>
    </div>
  )
}

export default Signup
