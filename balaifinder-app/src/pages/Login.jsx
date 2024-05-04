import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { HiOutlineExclamationCircle } from "react-icons/hi"; 

export default function Login({ isOpen, onClose }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    const handleChange = (e) => {
        e.stopPropagation(); // Stop the propagation of the click event
        
        // Destructure the name and value from the event target
        const { name, value } = e.target;
        
        // Update the inputs state with the new value
        setInputs((prev) => ({ ...prev, [name]: value }));
        
        // Reset errors for the current input
        setErr(null);
        
        // Email validation
        if (name === "email") {
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setErr("Please enter a valid email address.");
            }
        }
        
        // Password validation
        if (name === "password") {
            if (!value || value.length < 6) {
                setErr("Password must be at least 6 characters long.");
            }
        }
    };    

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Check for validation errors
        if (err !== null) {
            return; // Don't proceed with form submission
        }
    
        try {
            const response = await login(inputs);
            if (response && response.status === 400 && response.data === "Wrong password or email!") {
                setErr("Incorrect email or password!");
            } else if (response && response.status === 403 && response.data === 'Email not verified. Please verify your email before logging in.') {
                setErr('Email not verified. Please verify your email before logging in.');
                toast.error('Email not verified. Please verify your email before logging in.');
            } else {
                navigate("/");
                onClose(); // Close the modal upon successful login
                toast.success('Login successful!');
            }
        } catch (err) {
            console.error('Login Error:', err); // Debugging
        if (err.response && err.response.data) {
            setErr(err.response.data);
        } else {
            setErr("An unexpected error occurred. Please try again later.");
        }
        }
    };
    
    if (!isOpen) {
        return null; // Return null if the modal is not open
    }

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                    <div className="bg-white py-8 px-4 shadow-md shadow-black outline outline-1 sm:rounded-lg sm:px-10 relative">
                        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-white hover:bg-red-500 focus:outline-none rounded-full p-1.5">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <form onSubmit={handleLogin}>
                            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 mb-4">
                                <img className="mx-auto h-24 w-auto" src="/assets/Balaifinder.png" alt="Workflow" />
                                <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
                            {/* Error message */}
                            {err && (
                                <div className="m-4 flex items-center justify-center">
                                    <HiOutlineExclamationCircle className='text-red-600 h-6 w-6 mr-2' />
                                    <div className="text-red-600 text-center">{err}</div>
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold leading-5 text-gray-700">Email address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={handleChange} id="email" name="email" type="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <label htmlFor='password' className='block text-sm font-semibold leading-5 text-gray-700'>Password</label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <input
                                        onChange={handleChange}
                                        id='password'
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        required=''
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                                    />
                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                        {showPassword ? (
                                            <LuEyeOff
                                                className='h-5 w-5 text-gray-400 cursor-pointer'
                                                onClick={togglePasswordVisibility}
                                            />
                                        ) : (
                                            <LuEye
                                                className='h-5 w-5 text-gray-400 cursor-pointer'
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
                                </div>

                                <div className="text-sm leading-5">
                                    <Link to="/user-forgot-password"
                                        className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button type="submit" className="w-full hover:bg-sky-700 hover:shadow-md hover:shadow-black flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        Login
                                    </button>
                                </span>
                            </div>
                            <div className='mt-2 flex items-center justify-center hover:text-sky-700'>
                                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                                    <Link to="/user-registration"
                                        className="ml-1 cursor-pointer mb-4 font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Create a New Account
                                    </Link>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}
