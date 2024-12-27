import React from 'react'
import {Link} from 'react-router-dom'
import budgetTooling from '../../images/budgetTooling.gif'
import donation from '../../images/donation.gif'
import financialAdvice from '../../images/financial-advisor.gif'

const Finance = () => {
  return (
    <div className='p-4'>
        <h1 className='text-center text-black text-7xl font-semibold font-haverbrooke'>Finance</h1>
        <h4 className='text-center text-black text-xl mt-2 font-haverbrooke'>"Empowering Her Wealth, Securing Her Dreams."</h4>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                            <img src={budgetTooling} alt='pregnancy' />
                        </div>
                        <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Budget Tool</h2>
                        <p className="leading-relaxed text-base">Plan your finances with ease using our Budget Tool. Set spending limits, monitor expenses, and achieve your financial goals effectively.</p>
                        <Link className="mt-3 text-indigo-500 inline-flex items-center  ">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                      <img src={donation} alt='period' />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Financial Assist</h2>
                        <p className="leading-relaxed text-base">Receive support from generous donors to fund your needs and initiatives. Manage contributions effortlessly and keep track of all incoming donations.</p>
                        <Link className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0">
                        <img src={financialAdvice} alt='communicate' />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Financial Advisor</h2>
                        <p className="leading-relaxed text-base">Connect with a virtual financial expert for tailored guidance. Get advice on budgeting, saving, and investing to make informed financial decisions</p>
                        <Link className="mt-3 text-indigo-500 inline-flex items-center">Learn More
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

export default Finance
