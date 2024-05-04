import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import regionsData from "../components/json/regions.json";
import provincesData from "../components/json/provinces.json";
import municipalitiesData from "../components/json/municipalities.json";
import axios from "axios";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // State to manage password visibility for confirm password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    bday: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    region: "",
    province: "",
    municipality: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const [err, setErr] = useState(null);

  const validateStep = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (step === 1) {
      if (!inputs.first_name) {
        newErrors.first_name = "First Name is required";
        valid = false;
      }
      if (!inputs.last_name) {
        newErrors.last_name = "Last Name is required";
        valid = false;
      }
      if (!inputs.bday) {
        newErrors.bday = "Birthdate is required";
        valid = false;
      }
      if (!inputs.gender) {
        newErrors.gender = "Gender is required";
        valid = false;
      }
    } else if (step === 2) {
      if (!inputs.address) {
        newErrors.address = "Address is required";
        valid = false;
      }
      if (!inputs.region) {
        newErrors.region = "Region is required";
        valid = false;
      }
      if (!inputs.province) {
        newErrors.province = "Province is required";
        valid = false;
      }
      if (!inputs.municipality) {
        newErrors.municipality = "Municipality is required";
        valid = false;
      }
    } else if (step === 3) {
      if (!inputs.email) {
        newErrors.email = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        newErrors.email = "Invalid email address";
        valid = false;
      }
      if (!inputs.password) {
        newErrors.password = "Password is required";
        valid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(inputs.password)) {
        newErrors.password =
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 6 characters long";
        valid = false;
      }
      if (inputs.confirm_password.trim() !== inputs.password.trim()) {
        newErrors.confirm_password = "Passwords do not match";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // this will remove the errors for the input fields
    }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      // Validate the current step
      try {
        await axios.post(
          "https://balaifinder-backend-deploy.onrender.com/api/auth/register",
          inputs
        );
        navigate("/");
        toast.success("Registration successful! Welcome to BalaiFinder. Check Email for Verification");
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  console.log(err);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (step === 3) {
        console.log(inputs); // Form submission logic goes here
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const regions = regionsData;
  const provinces = provincesData.filter(
    (province) => province.reg_code === inputs.region
  );
  const municipalities = municipalitiesData.filter(
    (municipality) => municipality.prov_code === inputs.province
  );

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle password visibility for confirm password field
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed bg-gradient-to-b from-sky-50 via-sky-200 to-sky-500 inset-0 flex items-center justify-center z-50">
      <div className="flex bg-white shadow-xl shadow-black rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
          <div className="bg-white py-8 px-84 shadow-md shadow-black outline outline-1 sm:rounded-lg sm:px-10">
            <Link to="/">
              <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-white hover:bg-red-500 focus:outline-none rounded-full p-1.5">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </Link>
            <form onSubmit={handleSubmit}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 mb-4">
                <img
                  className="mx-auto h-24 w-auto"
                  src="/assets/Balaifinder.png"
                  alt="Workflow"
                />
                <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Create your Account
                </h2>
              </div>
              {/** this is for the step 1 process */}
              {step === 1 && (
                <>
                  <p className="text-md font-semibold text-gray-500 text-center mb-4">
                    Personal Information
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold leading-5 text-gray-700">
                        First Name
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="first_name"
                          value={inputs.first_name}
                          onChange={handleChange}
                          className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                            errors.first_name
                              ? "border-red-600"
                              : inputs.first_name
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {errors.first_name && (
                          <div className="text-red-600 text-xs">
                            {errors.first_name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold leading-5 text-gray-700">
                        Last Name
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="last_name"
                          value={inputs.last_name}
                          onChange={handleChange}
                          className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                            errors.last_name
                              ? "border-red-500"
                              : inputs.last_name
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {errors.last_name && (
                          <div className="text-red-600 text-xs">
                            {errors.last_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold leading-5 text-gray-700">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      name="bday"
                      value={inputs.bday}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.bday
                          ? "border-red-500"
                          : inputs.bday
                          ? "border-green-500"
                          : ""
                      }`}
                    />
                    {errors.bday && (
                      <div className="text-red-600 text-xs mt-1">
                        {errors.bday}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold leading-5 text-gray-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={inputs.gender}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.gender
                          ? "border-red-500"
                          : inputs.gender
                          ? "border-green-500"
                          : ""
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                      <div className="text-red-600 text-xs mt-1">
                        {errors.gender}
                      </div>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-md font-semibold text-gray-500 text-center mb-4">
                    Address Details
                  </p>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Residential Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      value={inputs.address}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.address
                          ? "border-red-500"
                          : inputs.address
                          ? "border-green-500"
                          : ""
                      }`}
                    />
                    {errors.address && (
                      <div className="text-red-600 text-xs">
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Region
                    </label>
                    <select
                      name="region"
                      value={inputs.region}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.region
                          ? "border-red-500"
                          : inputs.region
                          ? "border-green-500"
                          : ""
                      }`}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.reg_code} value={region.reg_code}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <div className="text-red-600 text-xs">
                        {errors.region}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Province
                    </label>
                    <select
                      name="province"
                      value={inputs.province}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.province ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option
                          key={province.prov_code}
                          value={province.prov_code}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>

                    {errors.province && (
                      <div className="text-red-600 text-xs">
                        {errors.province}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Municipality
                    </label>
                    <select
                      name="municipality"
                      value={inputs.municipality}
                      onChange={handleChange}
                      className={`mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.province ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Municipality</option>
                      {municipalities.map((municipality) => (
                        <option
                          key={municipality.mun_code}
                          value={municipality.mun_code}
                        >
                          {municipality.name}
                        </option>
                      ))}
                    </select>
                    {errors.municipality && (
                      <div className="text-red-600 text-xs">
                        {errors.municipality}
                      </div>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="text-lg text-gray-800 text-center">
                    Account Creation
                  </p>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={inputs.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className="text-red-600 text-xs">{errors.email}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Create Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={inputs.password}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      {errors.password && (
                        <div className="text-red-600 text-xs">
                          {errors.password}
                        </div>
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
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        name="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={inputs.confirm_password}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                          errors.confirm_password ? "border-red-500" : ""
                        }`}
                      />
                      {errors.confirm_password && (
                        <div className="text-red-600 text-xs">
                          {errors.confirm_password}
                        </div>
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
                </>
              )}
              <div className="flex justify-center mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="w-full mr-2 py-2 px-4 bg-slate-900 text-white font-semibold rounded-full hover:shadow-md hover:bg-gray-500 hover:shadow-black focus:outline-none focus:shadow-outline"
                  >
                    Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded-full hover:shadow-md hover:shadow-black hover:bg-sky-700 focus:outline-none focus:shadow-outline"
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <>
                    {err && err}
                    <button
                      type="submit"
                      onClick={handleClick}
                      className="w-full py-2 text-sm px-4 bg-sky-500 text-white font-semibold rounded-full hover:shadow-md hover:shadow-black hover:bg-sky-700 focus:outline-none focus:shadow-outline"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
