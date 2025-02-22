import React, { useState } from 'react';
import axios from 'axios';
import { backendurl } from '../../../backend-connector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { imageDb } from '../../../firebase';

const AddPropertyModal = ({ isOpen, onClose }) => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    address: "",
    type: "",
    price: "",
    monthly: "",
    nearelementary: "",
    nearhighschool: "",
    nearcollege: "",
    nearmall: "",
    nearchurch: "",
    numBedrooms: "",
    numBathrooms: "",
    typeoflot: "",
    familysize: "",
    businessready: "",
    description: "",
    imgsrc: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [propertyImage, setPropertyImage] = useState(null); // State to hold property image file
  const [fileUrl, setFileUrl] = useState(""); // State to hold the file URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
    validateForm();
  };

  const validateForm = () => {
    const requiredFields = ['name', 'location', 'address', 'type', 'price', 'monthly', 'nearelementary', 'nearhighschool', 'nearcollege', 'nearmall', 'nearchurch', 'numBedrooms', 'numBathrooms', 'typeoflot', 'familysize', 'businessready', 'description'];
    const isValid = requiredFields.every(field => property[field].trim() !== '');
    setFormValid(isValid);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(imageDb, `files/property/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setPropertyImage(file);
    setFileUrl(downloadURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("User data not found in local storage");
          // Handle the absence of user data here, such as redirecting to a login page
          return;
        }
        const userData = JSON.parse(userString);
        if (!userData || !userData.id) {
          console.error("User ID not found in local storage data");
          // Handle the absence of user ID here
          return;
        }
        const { id } = userData;
        toast.success('Application Submitted Successfully.');
        const response = await axios.post(
          `${backendurl}/api/post/crud/addproperties/${id}`,
          {
            ...property,
            imgsrc: fileUrl, // Update property object with file URL
          }
        );
        onClose();
        toast.success('Property Added Successfully.');
        console.log("Property added successfully!");
      } catch (err) {
        console.error(err);
        toast.error('Failed to add property. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };
  
  
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl shadow-black transform transition-all sm:my-8 sm:align-middle md:max-w-xl md:w-4/5">
          <form onSubmit={handleSubmit}>
            <h1 className='font-bold text-center text-3xl m-4'>PROPERTY DETAILS</h1>
            <div className="bg-white grid grid-cols-2 gap-4 px-8 pt-5 pb-4 sm:pb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Property Name</label>
                <input type="text" id="name" name="name" value={property.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Property Location</label>
                <select id="location" name="location" value={property.location} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Location</option>
                  <option value="Taguig">Taguig</option>
                  <option value="Parañaque">Parañaque</option>
                  <option value="San Juan">San Juan</option>
                  <option value="Navotas">Navotas</option>
                  <option value="Las Piñas">Las Piñas</option>
                  <option value="Valenzuela">Valenzuela</option>
                  <option value="Pateros">Pateros</option>
                  <option value="Quezon City">Quezon City</option>
                  <option value="Mandaluyong">Mandaluyong</option>
                  <option value="Calocan City">Calocan City</option>
                  <option value="Malabon">Malabon</option>
                  <option value="Muntinlupa">Muntinlupa</option>
                  <option value="Pasig">Pasig</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Property Address</label>
                <input type="text" id="address" name="address" value={property.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
                <select id="type" name="type" value={property.type} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Type</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio Apartment">Studio Apartment</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Property Price</label>
                <input type="text" id="price" name="price" value={property.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="monthly" className="block text-gray-700 text-sm font-bold mb-2">Monthly Installment</label>
                <input type="text" id="monthly" name="monthly" value={property.monthly} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="nearelementary" className="block text-gray-700 text-sm font-bold mb-2">Near an Elementary School</label>
                <select id="nearelementary" name="nearelementary" value={property.nearelementary} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="nearhighschool" className="block text-gray-700 text-sm font-bold mb-2">Near a High School</label>
                <select id="nearhighschool" name="nearhighschool" value={property.nearhighschool} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="nearcollege" className="block text-gray-700 text-sm font-bold mb-2">Near a College University</label>
                <select id="nearcollege" name="nearcollege" value={property.nearcollege} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="nearmall" className="block text-gray-700 text-sm font-bold mb-2">Near a Mall</label>
                <select id="nearmall" name="nearmall" value={property.nearmall} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="nearchurch" className="block text-gray-700 text-sm font-bold mb-2">Near a Church</label>
                <select id="nearchurch" name="nearchurch" value={property.nearchurch} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="numBathrooms" className="block text-gray-700 text-sm font-bold mb-2">Number of Bathrooms</label>
                <select id="numBathrooms" name="numBathrooms" value={property.numBathrooms} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Number of Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="numBedrooms" className="block text-gray-700 text-sm font-bold mb-2">Number of Bedrooms</label>
                <select id="numBedrooms" name="numBedrooms" value={property.numBedrooms} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Number of Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="typeoflot" className="block text-gray-700 text-sm font-bold mb-2">Type of Lot</label>
                <select id="typeoflot" name="typeoflot" value={property.typeoflot} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Number of Bedrooms</option>
                  <option value="End Lot">End Lot</option>
                  <option value="Corner Lot">Corner Lot</option>
                  <option value="Intersection Lot">Intersection Lot</option>
                  <option value="Through Lot">Through Lot</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="familysize" className="block text-gray-700 text-sm font-bold mb-2">Family Size Accomodation</label>
                <select id="familysize" name="familysize" value={property.familysize} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select Number of Bedrooms</option>
                  <option value="Small">1 - 3</option>
                  <option value="Medium">4 - 6</option>
                  <option value="Large">7 - 10</option>
                  <option value="EXtended">10 Above</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="businessready" className="block text-gray-700 text-sm font-bold mb-2">Business Space Ready</label>
                <select id="businessready" name="businessready" value={property.businessready} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled hidden>Select YES or NO</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Property Description</label>
                <input type="text" id="description" name="description" value={property.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="imgsrc" className="block text-gray-700 text-sm font-bold mb-2">Property Photo</label>
                <input type="file" id="imgsrc" name="imgsrc" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className={`hover:shadow-md hover:shadow-black w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white ${formValid ? 'hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500' : 'cursor-not-allowed bg-gray-300 text-gray-600'} sm:ml-3 sm:w-auto sm:text-sm`}>
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyModal;
