import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddPregnancyData } from '../../../utils/PregnancySlice';

const Pregnancy = () => {
  const email = useSelector((state) => state.user.email); // Get email from Redux state
  const pregRedux = useSelector((state)=>state.pregnancy)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [pregData, setPregData] = useState(null); // State to store pregnancy data

  // Fetch pregnancy data from the backend
  const fetchData = async () => {
    try {
      // Use GET method with query parameter email
      const response = await axios.get(`http://localhost:5000/getpregnancy?email=${email}`);
      setPregData(response.data.pregnancy);  // Store fetched data in state
      const data = response.data.pregnancy
      console.log(data)
      dispatch(AddPregnancyData({email:email,bloodgroup:data.bloodgroup,height:data.height,weight:data.weight,pWeek:data.pregnancyWeek}))
    } catch (err) {
      console.error("Error fetching pregnancy data:", err);
    }
  };

  const handleAddData = (e) =>{
    e.preventDefault()
    navigate('/healthcare/pregnancy/addData')
  }

  // Fetch data when the email is available
  useEffect(() => {
    if (email) {
      fetchData();
    }
  }, [email]); // Depend on email to re-run when it changes

  return (
    <div className='p-5 text-black relative'>
      {/* Register the pregnancy */}
      <div className=' border-b-2 border-solid border-slate-400'>
        <h1 className='text-4xl text-center text-slate-800 font-semibold font-haverbrooke'>
          Join Our Community for Expert Pregnancy Assistance
        </h1>
        <h4 className='my-8 text-2xl font-haverbrooke text-center text-slate-600'>
          "Your Pregnancy, Your Journey – Tracked Day by Day."
        </h4>
        <section className='px-28 text-justify my-5 text-lg'>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow your pregnancy journey with ease! Get personalized updates, expert advice, and timely reminders every step of the way. From your baby’s first movements to the big day, our tracker keeps you informed and supported, making this special time memorable and stress-free.
          </p>
        </section>
        {!pregRedux && <div className='flex items-center justify-center my-10'>
          <Link
            to={'/healthcare/pregnancy/register'}
            className="px-6 py-2.5 text-white text-lg font-bold uppercase tracking-widest rounded-lg bg-indigo-500 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500"
          >
            Register
          </Link>
        </div>}
      </div>

      {/* Display fetched pregnancy data */}
      {pregData && (
        <div className='py-2 px-16 text-center'>
          <h2 className='text-4xl font-semibold font-haverbrooke my-3'>Your Pregnancy Data</h2>
          <p className='text-left font-serif capitalize'><strong>Blood Group:</strong> {pregData.bloodgroup}</p>
          <p className='text-left font-serif '><strong>Height:</strong> {pregData.height} cm</p>
          <p className='text-left font-serif '><strong>Weight:</strong> {pregData.weight} kg</p>
          <p className='text-left font-serif '><strong>Pregnancy Week:</strong> {pregData.pregnancyWeek} weeks</p>
        </div>
      )}
      <button onClick={handleAddData} className='p-2 absolute right-5 top-4 border-2 border-solid border-black rounded-md font-semibold'>Add Data</button>
    </div>
  );
};

export default Pregnancy;
