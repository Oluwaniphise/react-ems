import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { Navbar } from '../components/Navbar';


export const Register = () => {

    return (
        <>
            <Navbar />
            <AuthForm authMode='register' />
        </>

    )
}
