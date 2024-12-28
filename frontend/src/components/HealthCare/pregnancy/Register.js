import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AddPregnancyData } from '../../../utils/PregnancySlice';

const Register = () => {
    const bloodGrpRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const pregnancyWeekRef = useRef(null);
    const user = useSelector((state) => state.user);
    const email = user?.email || '';
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClick = async () => {
        const bloodgroup = bloodGrpRef.current.value;
        const height = heightRef.current.value;
        const weight = weightRef.current.value;
        const pregnancyWeek = pregnancyWeekRef.current.value;

        // Simple validation
        if (!bloodgroup || !height || !weight || !pregnancyWeek) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/pregnancy', {
                email,
                bloodgroup,
                height,
                weight,
                pregnancyWeek
            });

            setError(null);
            setSuccess(response.data.message);
            dispatch(AddPregnancyData({email:email,bloodgroup:bloodgroup,height:height,weight:weight,pWeek:pregnancyWeek}))

            // Clear form after success
            bloodGrpRef.current.value = '';
            heightRef.current.value = '';
            weightRef.current.value = '';
            pregnancyWeekRef.current.value = '';

            // Redirect to the pregnancy dashboard
            navigate('/healthcare/pregnancy');
        } catch (err) {
            setSuccess(null);
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    // Fetch pregnancy data using POST request with email in the body
    

    // Fetch data on component mount (for testing)
     
    return (
        <div className='text-indigo-600 bg-slate-100 min-h-[100vh] flex items-center justify-center'>
            <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-5 flex flex-col justify-center items-center rounded-lg'>
                <h1 className='text-5xl font-bold text-center font-serif my-5 underline underline-offset-4'>Register</h1>

                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}

                <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                    <label htmlFor='bloodGroup' className='text-xl font-semibold'>Blood Group:</label>
                    <input ref={bloodGrpRef} name='bloodGroup' type='text' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your Blood Group' />
                </div>
                <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                    <label htmlFor='height' className='text-xl font-semibold'>Height (cm):</label>
                    <input ref={heightRef} name='height' type='number' className='bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your height' />
                </div>
                <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                    <label htmlFor='weight' className='text-xl font-semibold'>Weight (kg):</label>
                    <input ref={weightRef} name='weight' type='number' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your weight' />
                </div>
                <div className='w-full flex items-start justify-center gap-1 flex-col my-2'>
                    <label htmlFor='weekcount' className='text-xl font-semibold'>Pregnancy Week:</label>
                    <input ref={pregnancyWeekRef} name='count' type='number' className='bg-slate-50 text-black p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md' placeholder='Enter your pregnancy week' />
                </div>
                <button onClick={handleClick} className='mt-2 py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
