import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../../../backend-connector';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const EditPropertyModal = ({ isOpen, onClose, onEditProperty, propertyToEdit }) => {
  const [property, setProperty] = useState(propertyToEdit);

  useEffect(() => {
    setProperty({...propertyToEdit});
  }, [propertyToEdit]);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: files[0]
      }));
    } else {
      if (name === 'description') {
        // For textarea, directly update the value
        setProperty((prevProperty) => ({
          ...prevProperty,
          [name]: value
        }));
      } else {
        // For other inputs, update the value normally
        setProperty((prevProperty) => ({
          ...prevProperty,
          [name]: value
        }));
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out unchanged fields
      const changedFields = Object.keys(property).filter(key => property[key] !== propertyToEdit[key]);
      const updatedData = changedFields.reduce((acc, key) => {
        acc[key] = property[key];
        return acc;
      }, {});
  
      await axios.put(
        `${backendurl}/api/update/crud/updproperties/${property.id}`,
        updatedData
      );
      toast.success('Property Updated Successfully.');
      onClose(); // Close the modal
    } catch (err) {
      toast.error("Something went wrong in updating")
      console.error(err);
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
        <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl shadow-black transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-2/3">
          <form onSubmit={handleSubmit}>
            <h1 className='font-bold text-center text-3xl m-4'>PROPERTY DETAILS</h1>
            <p className='text-gray-500 text-center text-xl m-2'>General & Other Details</p>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className='grid grid-cols-2 gap-4'>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Property Name</label>
                  <input type="text" id="name" name="name" value={property.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Property Location</label>
                  <select id="location" name="location" value={property.location} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                  <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
                  <select id="type" name="type" value={property.type} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                    <option value={property.nearelementary} disabled hidden>{property.nearelementary}</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="nearhighschool" className="block text-gray-700 text-sm font-bold mb-2">Near a High School</label>
                  <select id="nearhighschool" name="nearhighschool" value={property.nearhighschool} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value={property.nearhighschool} disabled hidden>{property.nearhighschool}</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="nearcollege" className="block text-gray-700 text-sm font-bold mb-2">Near a College University</label>
                  <select id="nearcollege" name="nearcollege" value={property.nearcollege} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value={property.nearcollege} disabled hidden>{property.nearcollege}</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="mb-4">
                <label htmlFor="nearmall" className="block text-gray-700 text-sm font-bold mb-2">Near a Mall</label>
                <select id="nearmall" name="nearmall" value={property.nearmall} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value={property.nearmall} disabled hidden>{property.nearmall}</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="nearchurch" className="block text-gray-700 text-sm font-bold mb-2">Near a Church</label>
                <select id="nearchurch" name="nearchurch" value={property.nearchurch} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value={property.nearchurch} disabled hidden>{property.nearchurch}</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="numBathrooms" className="block text-gray-700 text-sm font-bold mb-2">Number of Bathrooms</label>
                <select id="numBathrooms" name="numBathrooms" value={property.numBathrooms} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="numBedrooms" className="block text-gray-700 text-sm font-bold mb-2">Number of Bedrooms</label>
                <select id="numBedrooms" name="numBedrooms" value={property.numBedrooms} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="typeoflot" className="block text-gray-700 text-sm font-bold mb-2">Type of Lot</label>
                <select id="typeoflot" name="typeoflot" value={property.typeoflot} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="End Lot">End Lot</option>
                  <option value="Corner Lot">Corner Lot</option>
                  <option value="Intersection Lot">Intersection Lot</option>
                  <option value="Through Lot">Through Lot</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="familysize" className="block text-gray-700 text-sm font-bold mb-2">Family Size Accomodation</label>
                <select id="familysize" name="familysize" value={property.familysize} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="Small">1 - 3</option>
                  <option value="Medium">4 - 6</option>
                  <option value="Large">7 - 10</option>
                  <option value="EXtended">10 Above</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="businessready" className="block text-gray-700 text-sm font-bold mb-2">Business Space Ready</label>
                <select id="businessready" name="businessready" value={property.businessready} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="imgsrc" className="block text-gray-700 text-sm font-bold mb-2">Image Link from Firebase</label>
                  <input type="text" placeholder='files%2F35abbcb4-5df7-469a-aff3-aa1dfbd3cabc' id="imgsrc" name="imgsrc" value={property.imgsrc} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
              </div>
              <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Property Description</label>
                  <textarea id="description" name="description" value={property.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="hover:shadow-md hover:shadow-black w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm">
                Save Changes
              </button>
              <button onClick={onClose} type="button" className="hover:shadow-md hover:shadow-black mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
