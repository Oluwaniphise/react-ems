import React from 'react'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
        <div className="text-center text-white p-8 rounded-xl shadow-lg bg-opacity-90">
          <h1 className="text-5xl font-bold mb-4">Welcome to EMS</h1>
          <p className="text-lg mb-6">Effortlessly assign tasks to your employees and track their progress in real-time.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-2">Task Management</h2>
              <p>Assign, track, and manage your team's tasks with ease.</p>
            </div>
            <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-2">Real-Time Updates</h2>
              <p>Stay informed with instant status updates and progress reports.</p>
            </div>
            <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-2">Employee Collaboration</h2>
              <p>Foster teamwork with collaborative tools and clear communication.</p>
            </div>
          </div>

          <div className='mt-20'>
            <Link to="/dashboard" className=" px-8 py-3 bg-white text-blue-700 rounded-2xl font-semibold hover:bg-blue-100 transition">Get Started</Link>
          </div>

        </div>
      </div>
    </div>
  )
}