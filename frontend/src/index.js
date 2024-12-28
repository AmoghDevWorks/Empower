import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom"
import App from './components/App';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import { Provider } from 'react-redux'
import appStore from './utils/appStore';
import HealthCare from './components/HealthCare/HealthCare';
import Finance from './components/Finance/Finance';
import SafetySecurity from './components/SafetySecurity/SafetySecurity';
import SocketIndividual from './components/HealthCare/DoctorCommunication/SocketIndividual';
import Pregnancy from './components/HealthCare/pregnancy/Pregnancy';
import Register from './components/HealthCare/pregnancy/Register';
import FinanceStats from './components/Finance/budgetTool/FinanceStats';
import Chatbot from './components/chatbot';
import PeriodTracker from './components/HealthCare/periodTracker/PeriodTracker';

const Structure = () =>{
  return(
    <div className='bg-white text-blue-700'>
      <Navbar />
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Structure />,
    children:[
      {
        path:'/',
        element:<App />
      },
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:'/healthcare',
        element:<HealthCare />
      },
      {
        path:'/finance',
        element:<Finance />
      },
      {
        path:'/safetyandsecurity',
        element:<SafetySecurity />
      },
      {
        path:'/healthcare/communicate',
        element:<SocketIndividual/>
      },
      {
        path:'/healthcare/pregnancy',
        element:<Pregnancy />
      },
      {
        path:'/healthcare/pregnancy/register',
        element:<Register />
      },
      {
        path:'/finance/budgettools',
        element:<FinanceStats />
      },
      {
        path:'/chatbot',
        element:<Chatbot/>
      },
      {
        path:'/healthcare/periodtracker',
        element: <PeriodTracker />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals