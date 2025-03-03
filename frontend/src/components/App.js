import React from 'react'
import {Link} from 'react-router-dom'
import moneybag from '../images/finance.gif'
import medicine from '../images/medicine.gif'
import shield from '../images/shield.gif'
import { useSelector } from 'react-redux'

const App = () => {

  const user = useSelector((state)=>state.user)

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-32 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
              <img src={medicine} alt='finance pic' />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">HealthCare</h2>
              <h3 className='font-semibold text-black text-lg'>"Wellness Redefined for Her Future." </h3>
              <p className="leading-relaxed text-base">We strive to revolutionize women's health by providing access to essential resources, preventive care, and holistic wellness programs. Together, we pave the way for healthier and empowered lives.</p>
              {user && <Link to={'/healthcare'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>}
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
              <img src={moneybag} alt='finance pic' />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium mb-3 text-2xl">Finance</h2>
              <h3 className='font-semibold text-black text-lg'>"Empowering Her Wealth, Securing Her Dreams."  </h3>
              <p className="leading-relaxed text-base">Unlocking financial independence with tools and knowledge, we help women make informed decisions in savings, investments, and entrepreneurship. Our mission is to build lasting financial confidence.</p>
              {user && <Link to={'/finance'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>}
            </div>
          </div>
          <div className="p-5 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
              <img src={shield} alt='finance pic' />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Safety and Security</h2>
              <h3 className='font-semibold text-black text-lg'>"Safe Today, Stronger Tomorrow."</h3>
              <p className="leading-relaxed text-base">We create secure environments and offer innovative solutions to ensure women feel safe and supported. Empowerment begins with safety, fostering confidence and resilience for a brighter tomorrow.</p>
              {user && <Link to={'/safetyandsecurity'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>}
            </div>
          </div>
        </div>
        {!user && <div className='flex items-center justify-center my-6'>
          <Link to={'/login'} className="px-6 py-2.5 text-white text-lg font-bold uppercase tracking-widest rounded-lg bg-indigo-500 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500">
              Login
          </Link>
        </div>}
        
      </div>
    </section>
  )
}

export default App
