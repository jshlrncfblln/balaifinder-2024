import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ChangePass() {
  const [input, setInput] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = () => {
    let valid = true;
    const newErrors = {};

    if (!input.oldPassword) {
      newErrors.oldPassword = "Old password is required";
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(input.oldPassword)) {
      newErrors.oldPassword =
        "Your old password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 6 characters long";
      valid = false;
    }
    if (!input.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(input.password)) {
      newErrors.password =
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 6 characters long";
      valid = false;
    }
    if (!input.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (input.confirmPassword.trim() !== input.password.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation before submitting the form
    if (!validateStep()) {
      return; // Prevent form submission if validation fails
    }

    // Replace this with your actual logic to submit the form data (e.g., sending data to server using fetch or axios)
    console.log("Submitting form data:", input);
    setInput({ oldPassword: "", password: "", confirmPassword: "" }); // Clear form after successful submission (optional)
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
        <div className="container flex items-center justify-center mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg w-full sm:w-10/12 lg:w-8/12 xl:w-6/12 shadow-xl">
            <div className="mb-4">
              <h2 className="font-bold text-3xl text-center font-extrabold text-black">Change Password</h2>
              <p className="text-center text-gray-600 text-base">Create your New Password.</p>
            </div>
            <div className="px-0 sm:px-6 lg:px-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
                <input
                  className="border rounded w-full py-3 px-4 text-gray-700 leading-5"
                  type="password"
                  name="oldPassword"
                  value={input.oldPassword}
                  onChange={handleChange}
                />
                {errors.oldPassword && (
                  <div className="text-red-600 text-xs">
                    {errors.oldPassword}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <input
                  className="border rounded w-full py-3 px-4 text-gray-700 leading-5"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-red-600 text-xs">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                <input
                  className="border rounded w-full py-3 px-4 text-gray-700 leading-5"
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="text-red-600 text-xs">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="mb-4 flex justify-center gap-4">
                <button className="bg-sky-500 text-white text-lg py-2 px-20 rounded-lg hover:shadow-black hover:shadow-md">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
