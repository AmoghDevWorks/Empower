import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/UserSlice'

const Navbar = () => {

  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(removeUser())
  }

  return (
    <div className="flex items-center justify-between h-20 w-full bg-zinc-100 relative p-2 border-b-2 border-solid border-black">
        <div className="text-indigo-600 font-bold text-2xl flex items-center gap-2 font-serif font-rubik-vinyl animate-lightning ">
            Empower Her
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-indigo-700 text-sm font-semibold bg-zinc-50 rounded-full backdrop-blur-sm px-5 py-1 overflow-hidden border border-zinc-700">
            <Link to={'/'} className="hover:text-zinc-100 hover:bg-zinc-800 hover:rounded-full transition duration-700 px-4 py-1.5 rounded-full relative group isolate">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <span className="z-10 relative text-md">Home</span>
            </Link>
            <Link to={'/healthcare'} className="hover:text-zinc-100 hover:bg-zinc-800 hover:rounded-full transition px-4 py-1.5 duration-700 rounded-full relative group isolate">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <span className="z-10 relative text-md">HealthCare</span>
            </Link>
            <Link to={'/finance'} className="hover:text-zinc-100 hover:bg-zinc-800 hover:rounded-full transition px-4 py-1.5 duration-700 rounded-full relative group isolate">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <span className="z-10 relative text-md">Finance</span>
            </Link>
            <Link to={'/safetyandsecurity'} className="hover:text-zinc-100 hover:bg-zinc-800 hover:rounded-full transition px-4 py-1.5 duration-700 rounded-full relative group isolate">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10">
                </div>
                <span className="z-10 relative text-md">Safety and Security</span>
            </Link>
        </div>
        {!user && <div className="flex items-center justify-center gap-3">
            <Link to={'/login'} className="text-indigo-700 font-medium hover:text-zinc-800 transition">Log In</Link>
            <Link to={'/signup'} className="text-indigo-700 rounded-full px-5 py-1.5 bg-zinc-50 font-medium flex items-center transition border border-zinc-700 relative overflow-hidden group">
                Sign Up
                <svg className="inline-block ml-2 group-hover:translate-x-2 transition duration-1000" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.325 8.175q-.3-.3-.313-.725t.288-.725q.3-.3.725-.288t.725.313l4.15 4.15q.15.15.213.325t.063.375q0 .2-.063.375t-.213.325l-4.15 4.15q-.3.3-.725.313t-.725-.288Z"/>
                </svg>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-zinc-100 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000">

                </div>
            </Link>
        </div>}
        {user && <div className="flex items-center justify-center gap-3">
            {/* <Link to={'/login'} className="text-indigo-700 font-medium hover:text-zinc-800 transition">Log In</Link> */}
            <div onClick={handleLogout} className="text-indigo-700 rounded-full px-5 py-1.5 bg-zinc-50 font-medium flex items-center transition border border-zinc-700 relative overflow-hidden group">
                Logout
                <svg className="inline-block ml-2 group-hover:translate-x-2 transition duration-1000" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.325 8.175q-.3-.3-.313-.725t.288-.725q.3-.3.725-.288t.725.313l4.15 4.15q.15.15.213.325t.063.375q0 .2-.063.375t-.213.325l-4.15 4.15q-.3.3-.725.313t-.725-.288Z"/>
                </svg>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-zinc-100 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000">

                </div>
            </div>
        </div>}
    </div>
  )
}

export default Navbar
