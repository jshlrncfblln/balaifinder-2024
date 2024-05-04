import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making API requests

export default function Profile() {
    const [userData, setUserData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      bday: '',
      gender: '',
      address: '',
      region: '',
      province: '',
      municipality: '',
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const userString = localStorage.getItem("user");
          if (!userString) {
            console.error("User data not found in local storage");
            return;
          }
          const { id } = JSON.parse(userString);
  
          const response = await axios.get(`https://balaifinder-backend-deploy.onrender.com/api/users/${id}/profile`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const handleProfileUpdate = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("User data not found in local storage");
          return;
        }
        const { id } = JSON.parse(userString);
  
        await axios.put(`https://balaifinder-backend-deploy.onrender.com/api/users/${id}/updprofile`, userData);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    };
  
    return (
      <div className="bg-slate-100">
        <Navbar />
        <div className="container mx-auto py-8">
          <form className="bg-white p-2 rounded-xl">
            <h2 className="font-lato text-3xl text-center font-extrabold text-black m-4">User Account</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="First Name*"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Last Name*"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="email"
                    placeholder="Email*"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Birthdate</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="date"
                    placeholder="Birthdate*"
                    name="bday"
                    value={userData.bday}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Residential Address</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Residential Address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Region</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Region"
                    name="region"
                    value={userData.region}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Province</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Province"
                    name="province"
                    value={userData.province}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Municipality</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="text"
                    placeholder="Municipality"
                    name="municipality"
                    value={userData.municipality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                  <input
                    className="border rounded w-full py-3 px-4 text-grey leading-5"
                    type="number"
                    placeholder="Zip Code"
                    name="pin"
                    value={userData.pin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="m-4 flex justify-end gap-4">
              <button
                className="bg-sky-500 border border-primary text-white text-h4 py-3 px-8 rounded-lg py-2 lg:mt-8 mt-4 hover:bg-sky-700 hover:shadow-black hover:shadow-md"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleProfileUpdate(); // Call handleProfileUpdate function
                }}
              >
                Update Profile
              </button>
              <button className=" bg-black border border-primary text-white text-h4 py-3 px-8 rounded-lg py-2 lg:mt-8 mt-4 hover:shadow-black hover:shadow-md">
              Change Password
            </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
