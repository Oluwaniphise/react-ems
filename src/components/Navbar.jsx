import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const Navbar = () => {
    return (
        <div>
            <div className='bg-red-200'>
                <div className='px-5 py-5 flex flex-row justify-between items-center'>
                    <h1>EMS.</h1>

                    <div className='flex flex-row gap-5 justify-between items-center'>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
