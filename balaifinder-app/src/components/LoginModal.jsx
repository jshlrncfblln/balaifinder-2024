import { useState, useContext} from "react";
import { AuthContext } from "../context/authContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const [err, setErr] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
  
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
  
    const handleChange = (e) => {
      e.stopPropagation(); // Stop the propagation of the click event
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
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
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div
          className="fixed inset-0 flex bg-white rounded-lg overflow-hidden mx-auto max-w-md w-full p-8 relative outline outline-1 shadow-black shadow-lg"
          style={{ maxWidth: "600px" }}
        >
          <div
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer hover:border hover:shadow-md"
          >
            <svg
              className="h-6 w-6 text-gray-600"
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
          </div>
          <div className="hidden items-center justify-center text-center lg:flex lg:flex-col lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-700">
              Balai<span className="text-sky-500">Finder</span>
            </h2>
            <img
              src="/assets/Balaifinder.png"
              className="object-center object-cover"
              alt="Balaifinder Logo"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome Back!</p>
            <form onSubmit={handleLogin} className="mt-4">
              {/* Email input */}
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-700 focus:outline-sky-600 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              {/* Password input */}
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-700 focus:outline-sky-600 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
                <div className="mt-3">
                  <label
                    className="inline-flex items-center"
                    htmlFor="showPassCheck"
                  >
                    <input
                      type="checkbox"
                      id="showPassCheck"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                      className="size-4 accent-sky-500 "
                    />
                    <span className="text-gray-700 text-sm font-bold ml-2">
                      Show password
                    </span>
                  </label>
                </div>
              </div>
              {/* Error message */}
              {err && <div className="mt-4 text-red-600">{err}</div>}
              {/* Login button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-sky-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-sky-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-5 flex items-center justify-between">
              <span className="border-b border-gray-500 w-1/5 md:w-1/4"></span>
              <Link to="/buyers_registration">
                <p className="text-xs text-gray-500 uppercase">
                  Or Create Account
                </p>
              </Link>
              <span className="border-b border-gray-500 w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default LoginModal