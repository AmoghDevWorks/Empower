import React, { useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const contactRef = useRef(null)
  const passwordRef = useRef(null)
  const userTypeRef = useRef(null)

  const navigate = useNavigate();
  
  const handleClick = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const contact = contactRef.current.value;
    const userType = userTypeRef.current.value; // Get the selected value

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, contact, password, userType });
        alert(response.data.message); // Handle success
        navigate('/login');
    } catch (error) {
        alert(error.response.data.message); // Handle error
    }
  };


  return (
    <div className='text-indigo-600 bg-slate-100 min-h-[100vh] flex items-center justify-center'>
      <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-5 flex flex-col justify-center items-center rounded-lg'>
          <h1 className='text-5xl font-bold text-center font-serif my-5 underline underline-offset-4'>SignUp</h1>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='name' className='text-xl font-semibold'>Name:</label>
              <input ref={nameRef} name='name' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your name' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='email' className='text-xl font-semibold'>Email:</label>
              <input ref={emailRef} name='email' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='contact' className='text-xl font-semibold'>Contact detail:</label>
              <input ref={contactRef} name='contact' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your contact details' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='password' className='text-xl font-semibold'>Password:</label>
              <input ref={passwordRef} name='password' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your password' />
          </div>
          {/* New Select Dropdown */}
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
            <label htmlFor='userType' className='text-xl font-semibold'>Select Role:</label>
            <select ref={userTypeRef} name='userType' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md'>
                <option value='Doctor'>Doctor</option>
                <option value='General'>General</option>
                <option value='Donor'>Donor</option>
            </select>
          </div>
          <button onClick={handleClick} className='mt-2 py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
              SignUp
          </button>
          <p className='text-xl mt-2'>Already have an account? <span className='underline underline-offset-2'><Link to={'/login'}>Login</Link></span></p>
      </div>
    </div>
  )
}

export default Signup
