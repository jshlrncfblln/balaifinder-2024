import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ApplyModal from '../components/BuyerApplicationModal';
import { backendurl } from "../../backend-connector";

const Orders = () => {
  const [application, setApplication] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userString = localStorage.getItem("user");
          if (!userString) {
            console.error("User data not found in local storage");
            return;
          }
          const { id: userId } = JSON.parse(userString);
          
          const applicationResponse = await fetch(`${backendurl}/api/get/${userId}/user/application`);
          if (!applicationResponse.ok) {
              throw new Error('Failed to fetch User application');
          }
          const applicationData = await applicationResponse.json();
          setApplication(applicationData);

          const statusResponse = await fetch(`${backendurl}/api/get/${userId}/user/status`);
          if (!statusResponse.ok) {
            throw new Error('Failed to fetch application status');
          }
          const statusData = await statusResponse.json();
          console.log("Status data:", statusData);
          setStatus(statusData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

      fetchUserData();
  }, []);

    
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow shadow-md overflow-hidden shadow-md shadow-black outline outline-1 sm:rounded-lg mx-4 md:mx-10 mt-8 mb-24">
          {application.length === 0 ? (
            <div className="px-6 py-4 whitespace-nowrap text-center">
              <p className="text-xl text-gray-400 mt-14">There's no house listed in your application. Browse property and add it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {application.map((property, index) => (
                <div key={index} className="bg-white rounded-lg border border-1 border-gray-400 shadow-md p-4 relative">
                  <img
                    src={property.imgsrc ? property.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'}
                    alt={property.name}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  {status && (
                    <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs absolute top-2 right-2">{status.status}</span>
                  )}
                  <div className="mt-2">
                    <h2 className="text-lg font-bold">{property.name}</h2>
                    <p className="text-sm text-gray-500">{property.type} - {property.location}</p>
                    <p className="text-lg font-bold mt-2">₱ {new Intl.NumberFormat().format(property.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;