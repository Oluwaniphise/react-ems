import React from 'react'
import { Navbar } from '../components/Navbar'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col justify-center items-center'>
          <h1>Welcome to EMS</h1>
          <h3>You can assign tasks to your employees and track</h3>
        </div>
    </div>
  )
}