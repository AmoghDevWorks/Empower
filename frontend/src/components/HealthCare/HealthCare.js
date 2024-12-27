import React from 'react'
import {Link} from 'react-router-dom'
import pregnancy from '../../images/pregnancy.png'
import menstruation from '../../images/menstruation.png'
import doctorCommunication from '../../images/doctorCommunication.png'

const HealthCare = () => {
  return (
    <div className='p-4'>
        <h1 className='text-center text-black text-7xl font-semibold font-haverbrooke'>HealthCare</h1>
        <h4 className='text-center text-black text-xl mt-2 font-haverbrooke'>"Wellness Redefined for Her Future." </h4>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                            <img src={pregnancy} alt='pregnancy' />
                        </div>
                        <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Pregnancy</h2>
                        <p className="leading-relaxed text-base">Track your baby's growth week by week, monitor symptoms, and get tailored tips for each stage of your pregnancy. Stay organized with logs for appointments, tests, and milestones. </p>
                        <Link to={'/healthcare/pregnancy'} className="mt-3 text-indigo-500 inline-flex items-center  ">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                      <img src={menstruation} alt='period' className='p-5' />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Period Tracker</h2>
                        <p className="leading-relaxed text-base">Log your periods, symptoms, and moods to predict your next cycle. Understand your patterns, track ovulation, and receive timely reminders to stay prepared. </p>
                        <Link className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                        <img src={doctorCommunication} alt='communicate' />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Communicate</h2>
                        <p className="leading-relaxed text-base">Easily connect with your doctor for advice or schedule appointments. Whether for quick questions or follow-ups, support is always within reach.</p>
                        <Link to={'/healthcare/communicate'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
  )
}

export default HealthCare
