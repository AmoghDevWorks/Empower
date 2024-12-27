import React from 'react'
import {Link} from 'react-router-dom'

const Pregnancy = () => {
  return (
    <div className='p-5 text-black'>
        {/* register the pregnancy */}
        <div>
            <h1 className='text-4xl text-center text-slate-800 font-semibold font-haverbrooke'>Join Our Community for Expert Pregnancy Assistance</h1>
            <h4 className='my-8 text-2xl font-haverbrooke text-center text-slate-600'> "Your Pregnancy, Your Journey – Tracked Day by Day."</h4>
            <section className='px-28 text-justify my-5 text-lg'>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow your pregnancy journey with ease! Get personalized updates, expert advice, and timely reminders every step of the way. From your baby’s first movements to the big day, our tracker keeps you informed and supported, making this special time memorable and stress-free.</p>
            </section>
            <div className='flex items-center justify-center my-10'>
              <Link to={'/healthcare/pregnancy/register'} class="px-6 py-2.5 text-white text-lg font-bold uppercase tracking-widest rounded-lg bg-indigo-500 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500">
                  Register
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Pregnancy
