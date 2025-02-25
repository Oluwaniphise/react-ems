import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getAccessToken } from '../services/session';
import useUserStore from '../stores/userStore';

export const Navbar = () => {
    const { user, clearUser } = useUserStore();
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    const logoutFn = async (e) => {
        e.preventDefault();

        const response = await supabase.auth.signOut();
        if (response) {
            localStorage.removeItem('accessToken')
            clearUser();
            navigate('/login')
        }
    }

    return (
        <div>
            <div className='bg-blue-500 text-white'>
                <div className='px-5 py-5 flex flex-row justify-between items-center'>
                    <Link to="/">EMS.</Link>

                    <div className='flex flex-row gap-5 justify-between items-center'>
                        {!accessToken && <Link to="/login">Login</Link>}
                        {!accessToken && <Link to="/register">Register</Link>}
                        {accessToken && <Link onClick={logoutFn}>Logout</Link>}
                        {user && <p>Welcome, {user.email} </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
