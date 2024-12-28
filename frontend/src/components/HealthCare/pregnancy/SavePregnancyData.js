import React, { useRef } from 'react'

const SavePregnancyData = () => {

  const heightRef = useRef(null)
  const weightRef = useRef(null)
  const pregWeekRef = useRef(null)

  const handleClick = () =>{
        const height = heightRef.current.value
        const width = weightRef.current.value
        const pregWeek = pregWeekRef.current.value
  }

  return (
    <div className='text-indigo-600 min-h-screen w-[99vw] flex pt-24 items-start justify-center bg-slate-100'>
    {/* <ToastContainer /> */}
    <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-8 flex items-center justify-center flex-col gap-6 rounded-lg'>
        <h1 className='text-center text-5xl font-bold font-serif text-blue-700 mb-4'>Add Details</h1>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='email' className='text-xl font-semibold'>Height:</label>
            <input ref={heightRef} name='email' type='email' className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your email'/>
        </div>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='password' className='text-xl font-semibold'>Weight:</label>
            <input ref={weightRef} name='password' type='password' className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your password'/>
        </div>
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
            <label htmlFor='password' className='text-xl font-semibold'>Pregnancy Week:</label>
            <input ref={pregWeekRef} name='password' type='password' className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your password'/>
        </div>
        <button onClick={handleClick} className='py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
            Login
        </button>
      </div>
    </div>
  )
}

export default SavePregnancyData
