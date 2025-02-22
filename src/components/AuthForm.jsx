import React, {useState} from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export const AuthForm = ({authMode}) => {
    
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        console.log(data)

        if(data){
            navigate('/login')
        }

        if (error) {
            setError(error.message);
        } else {
            setMessage('Check your email for the confirmation link!');
        }
    };

    const handleLoginnSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        console.log(data)

        if(data){
            navigate('/dashboard')
        }

        if (error) {
            setError(error.message);
        } else {
            setMessage('');
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6"> {authMode === "login" ? "Sign In" : "Sign Up" } </h2>

        <form className="space-y-6" onSubmit={authMode === "register" ? handleRegisterSubmit : handleLoginnSubmit }>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition duration-200"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
            >
                {authMode === "login" ? "Sign In" : "Sign Up" }
            </button>
        </form>
        <div className='my-4'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
       
    </div>

</div>
  )
}
