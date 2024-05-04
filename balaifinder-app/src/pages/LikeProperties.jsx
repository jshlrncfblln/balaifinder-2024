import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ApplyModal from '../components/BuyerApplicationModal';
import { backendurl } from "../../backend-connector";

const PropertyCheckoutPage = () => {
  const [likes, setlikes] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
      fetchlikes();
  }, []);

  const fetchlikes = async () => {
      try {
         const userString = localStorage.getItem("user");
          if (!userString) {
            console.error("User data not found in local storage");
            return;
          }
          const { id } = JSON.parse(userString);
          
          const response = await fetch(`${backendurl}/api/get/${id}/likes`);
          if (!response.ok) {
              throw new Error('Failed to fetch User likes');
          }
          const data = await response.json();
          setlikes(data);
      } catch (error) {
          console.error('Error fetching likes:', error);
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
      <div className="flex-grow shadow-md overflow-hidden shadow-md outline outline-1 sm:rounded-lg mx-4 md:mx-10 mt-8 mb-24">
        {likes.length === 0 ? (
          <div className="px-6 py-4 whitespace-nowrap text-center">
            <p className="text-xl text-gray-400 mt-14">There's no house listed in your wishlist. Browse property and add it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {likes.map((property, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 relative border border-1 border-gray-400">
                <img
                  src={property.imgsrc ? property.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'}
                  alt={property.name}
                  className="h-40 w-full object-cover rounded-lg"
                />
                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs absolute top-2 right-2">AVAILABLE</span>
                <div className="mt-2">
                  <h2 className="text-lg font-bold">{property.name}</h2>
                  <p className="text-sm text-gray-500">{property.type} - {property.location}</p>
                  <p className="text-lg font-bold mt-2">₱ {new Intl.NumberFormat().format(property.price)}</p>
                </div>
                <button
                  onClick={() => openApplyModal(property.id)}
                  className="font-semibold mt-4 w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-700"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <ApplyModal isOpen={isApplyModalOpen} onClose={closeApplyModal} propertyId={selectedPropertyId} />
    </div>
  );
};

export default PropertyCheckoutPage;
