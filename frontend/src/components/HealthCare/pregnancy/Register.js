import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const bloodGrpRef = useRef(null)
  const heightRef = useRef(null)
  const weightRef = useRef(null)
  const pregnancyWeekRef = useRef(null)
  const user = useSelector((state) => state.user);
  const email = user?.email || "";
  const navigate = useNavigate()

  const handleClick = () =>{
    const bloodgroup = bloodGrpRef.current.value
    const height = heightRef.current.value
    const weight = weightRef.current.value
    const pregnancyWeek = pregnancyWeekRef.current.value
    //email,bloodgroup, height,weight, pregnancyweek

    navigate('/healthcare/pregnancy')
  }

  return (
    <div className='text-indigo-600 bg-slate-100 min-h-[100vh] flex items-center justify-center'>
      <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-5 flex flex-col justify-center items-center rounded-lg'>
          <h1 className='text-5xl font-bold text-center font-serif my-5 underline underline-offset-4'>Register</h1>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='bloodGroup' className='text-xl font-semibold'>Blood Group:</label>
              <input ref={bloodGrpRef} name='bloodGroup' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your Blood Group' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='height' className='text-xl font-semibold'>Height:</label>
              <input ref={heightRef} name='height' type='email' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your height' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='weight' className='text-xl font-semibold'>Weight:</label>
              <input ref={weightRef} name='weight' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your weight' />
          </div>
          <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
              <label htmlFor='weekcount' className='text-xl font-semibold'>Pregnancy Week:</label>
              <input ref={pregnancyWeekRef} name='count' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your pregnancy week' />
          </div>
          <button onClick={handleClick} className='mt-2 py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
              Register
          </button>
      </div>
    </div>
  )
}

export default Register
