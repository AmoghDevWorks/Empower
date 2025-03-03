import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const EmergencyRegister = () => {

  const email = useSelector((state)=>state.user.email)
  const contactNumber = useRef(null)
  const navigate = useNavigate()

  const handleClick = async(e) =>{
    e.preventDefault()
    const number = contactNumber.current.value
    try{  
      const data = await axios('http://localhost:5000/postsosnumber',{email,number})
      navigate('/safetyandsecurity')
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className='text-slate-700 h-screen flex items-center flex-col justify-center'>
      <form className='w-1/3 h-fit border-2 border-solid border-slate-400 p-5 rounded-lg'>
        <label className='text-2xl font-semibold' >Emergency Contact:</label>
        <input ref={contactNumber} type='text' placeholder='Enter the contact information' className='w-full my-3 border-2 border-black border-solid p-1 rounded-lg' />
        <button onClick={handleClick} className='bg-red-600 text-white font-semibold font-haverbrooke p-2 rounded-lg my-3 mx-auto'>Submit</button>
      </form>
    </div>
  )
}

export default EmergencyRegister
