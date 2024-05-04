import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ApplyModal from '../components/BuyerApplicationModal';
import { backendurl } from "../../backend-connector";

const Orders = () => {
  const [application, setapplication] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [status, setStatus] = useState ([]);

  useEffect(() => {
      fetchApplications();
      fetchStatus();
  }, []);

  const fetchApplications = async () => {
      try {
         const userString = localStorage.getItem("user");
          if (!userString) {
            console.error("User data not found in local storage");
            return;
          }
          const { id } = JSON.parse(userString);
          
          const response = await fetch(`${backendurl}/api/get/${id}/user/application`);
          if (!response.ok) {
              throw new Error('Failed to fetch User application');
          }
          const data = await response.json();
          setapplication(data);
      } catch (error) {
          console.error('Error fetching application:', error);
      }
  };

  const fetchStatus = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in local storage");
        return;
      }
      const { id } = JSON.parse(userString);
  
      const response = await fetch(`${backendurl}/api/get/application/${id}/status`);
      if (!response.ok) {
        throw new Error('Failed to fetch application status');
      }
      const data = await response.json();
      console.log("Status data:", data);
      setStatus(data);
    } catch (error) {
      console.error('Error fetching application status:', error);
    }
  };

  const openApplyModal = (propertyId) => {
    setIsApplyModalOpen(true);
    setSelectedPropertyId(propertyId); // Set selected property_id
};


  const closeApplyModal = () => {
      setIsApplyModalOpen(false);
  };
      

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow shadow-md overflow-hidden shadow-md shadow-black outline outline-1 sm:rounded-lg mx-4 md:mx-10 mt-8 mb-24">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-500">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Assigned Realtor</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {application.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-center">
                  <p className="text-xl text-gray-400 mt-14">There's no house listed in your application. Browse property and add it here.</p>
                </td>
              </tr>
            ):(
              application.map((property, status, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <img src={property.imgsrc ? property.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'} alt={property.name} className="h-16 w-16 object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">Admin Josh</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{property.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{property.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{property.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">₱ {new Intl.NumberFormat().format(property.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span class="bg-green-500 text-white py-1 px-2 rounded-full text-xs">{status.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
      <ApplyModal isOpen={isApplyModalOpen} onClose={closeApplyModal} propertyId={selectedPropertyId} />
    </div>
  );
};

export default Orders;
