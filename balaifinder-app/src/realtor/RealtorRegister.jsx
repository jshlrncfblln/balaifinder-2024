import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from 'react-toastify';
import axios from "axios";

export default function RealtorRegister() {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (!first_name) {
          newErrors.first_name = "First Name is required";
          valid = false;
        }
      
        if (!last_name) {
          newErrors.last_name = "Last Name is required";
          valid = false;
        }

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await axios.post(
                    "https://balaifinder-backend-deploy.onrender.com/api/relauth/relregister",
                    {
                        first_name,
                        last_name,
                        company,
                        gender,
                        email,
                        password,
                    }
                );
                navigate("/realtor/");
                toast.success('Registration successful! Welcome to Realtor BalaiFinder.');
            } catch (err) {
                console.error("Registration error:", err);
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-sky-200 to-sky-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-24 w-auto" src="/assets/Balaifinder.png" alt="BalaiFinder Logo"/>
                <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Create a New Account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                    Or
                    <Link to="/realtor/" className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Login to Your Account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-md shadow-black sm:rounded-lg sm:px-10">
                    <form>
                        <h1 className="font-bold text-xl mb-4">Personal Details</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="firstname"
                                    className="block text-sm font-semibold leading-5 text-gray-700"
                                >
                                    First Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        value={first_name}
                                        onChange={handleFirstNameChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${
                                            errors.first_name ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                        } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                    />
                                    {errors.first_name && (
                                        <p className="mt-2 text-xs text-red-500">{errors.first_name}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-semibold leading-5 text-gray-700"
                                >
                                    Last Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        value={last_name}
                                        onChange={handleLastNameChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${
                                            errors.last_name ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                        } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                    />
                                    {errors.last_name && (
                                        <p className="mt-2 text-xs text-red-500">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="company_name"
                                className="block text-sm font-semibold leading-5 text-gray-700"
                            >
                                Company Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    required=""
                                    value={company}
                                    onChange={handleCompanyChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${
                                        errors.company ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                />
                                {errors.company && (
                                    <p className="mt-2 text-xs text-red-500">{errors.company}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-semibold leading-5 text-gray-700"
                            >
                                Gender
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <select
                                    id="gender"
                                    name="gender"
                                    required=""
                                    maxLength="10"
                                    value={gender}
                                    onChange={handleGenderChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                >
                                    <option value="" disabled selected>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <h1 className="font-bold text-xl mt-4">Account Creation</h1>
                        <div className="mt-6">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required=""
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-bold leading-5 text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required=""
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${
                                            errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                        } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                    />
                                    {errors.password && (
                                        <div className="text-red-600 text-xs">{errors.password}</div>
                                    )}
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ? (
                                            <LuEyeOff
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            />
                                        ) : (
                                            <LuEye
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-bold leading-5 text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required=""
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-300'
                                        } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showConfirmPassword ? (
                                            <LuEyeOff
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                onClick={toggleConfirmPasswordVisibility}
                                            />
                                        ) : (
                                            <LuEye
                                                className="h-5 w-5 text-gray-400 cursor-pointer"
                                                onClick={toggleConfirmPasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-sky-500 hover:bg-sky-700 transition duration-150 ease-in-out"
                                >
                                    Create account
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
