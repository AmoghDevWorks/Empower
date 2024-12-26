import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom"
import App from './components/App';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

const Structure = () =>{
  return(
    <div className='bg-black text-blue-700'>
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
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals