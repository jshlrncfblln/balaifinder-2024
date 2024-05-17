import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { backendurl } from "../../backend-connector";
import { GrClose, GrNext, GrPrevious } from "react-icons/gr";
import './CubeLoader.css'



function ResultSection({ onClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadData = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/get`);
      setData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }finally{
      setLoading(false);
      // Simulate loading time with setTimeout
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the time in milliseconds (here, 2 seconds)
    }
  };

  useEffect(() => {
    setCurrentIndex(0); // Reset currentIndex when data changes
    loadData(); // Load data initially
    const intervalId = setInterval(loadData, 2000); // Refresh data every 5 seconds (adjust interval as needed)

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleClose = () => {
    console.log("Close button clicked!"); // Add console log statement
    onClose();
  };

  // Badge logic based on data
  let badgeText = '';
  if (data.length > 0 && currentIndex < data.length) {
    const score = data[currentIndex].score;
    if (score === 13) {
      badgeText = 'Perfect Match';
      // if SCORE IS 8 or 95% IT WILL SHOW HIGHLY RECOMMENDED
    } else if (score >= 8) {
      badgeText = 'Highly Recommended';
    } else {
      badgeText = 'You Might Also Like';
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50'>
        {loading ? (
          <div className="flex justify-center items-center h-screen bg-white flex-col">
            <div className="cube-loader">
                <div className="cube-top"></div>
                <div className="cube-wrapper">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="cube-span" style={{ '--i': i }}>
                      <img src="/assets/Balaifinder.png" alt="logo" />
                    </span>
                  ))}
                </div>
              </div>
            <div className="mt-14 font-semibold text-xl">Loading...</div>
          </div>
        ):(
          <div className='shadow-xl shadow-black px-8 sm:py-4 md:py-4 sm:px-8 md:px-16 py-4 space-y-8 bg-white relative rounded-xl relative' style={{ maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
          <button onClick={onClose} className="px-2 py-2 absolute top-4 right-4 hover:bg-red-500 hover:text-white rounded-full">
            <GrClose />
          </button>
          {/** PREVIOUS ARROW BUTTON*/}
          <div style={{ position: 'absolute', left: '64px', top: '50%', transform: 'translateY(-50%)' }}>
            {currentIndex > 0 && (
              <button onClick={handlePrevious} className="bg-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-4 px-4 rounded-full">
                <GrPrevious />
              </button>
            )}
          </div>
          {/** NEXT ARROW BUTTON*/}          
          <div style={{ position: 'absolute', right: '64px', top: '50%', transform: 'translateY(-50%)' }}>
            {currentIndex < data.length - 1 && (
              <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-4 px-4 rounded-full">
                <GrNext />
              </button>
            )}
          </div>
          {data.length > 0 && currentIndex < data.length ? (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">You've Got a Match!</h2>
              <div className="w-full mx-auto flex items-center justify-center">
                <div key={data[currentIndex].id} className="relative bg-white shadow-md shadow-black rounded-xl duration-500 hover:scale-105">
                  {/* Badge */}
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ${badgeText === 'Perfect Match' ? 'bg-green-500 text-white' : badgeText === 'Highly Recommended' ? 'bg-sky-500 text-white' : badgeText === 'You Might Also Like' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white' }`}>
                      {badgeText}
                    </span>
                  </div>
                  <Link to={`/details/${data[currentIndex].id}`}>
                    <img src={data[currentIndex].imgsrc ? data[currentIndex].imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'} alt="Product" className="h-48 md:h-56 w-full object-cover rounded-t-xl" />
                    <div className="px-4 py-3">
                      <span className="text-gray-400 mr-3 uppercase text-xs">{data[currentIndex].type}</span>
                      <p className="text-lg font-bold text-black truncate block capitalize">{data[currentIndex].name}</p>
                      <p className="text-lg font-bold text-black truncate block capitalize">{data[currentIndex].location}</p>
                      {/*<p className="text-lg font-bold text-black truncate block capitalize">Match Percentage {(data[currentIndex].score * 100).toFixed(0)}%</p>
                      <p className="text-lg font-bold text-black truncate block capitalize">Match Percentage = {(
                      data[currentIndex].score === 13 ? 100 :
                      data[currentIndex].score === 12 ? 99 :
                      data[currentIndex].score === 11 ? 98 :
                      data[currentIndex].score === 10 ? 97 :
                      data[currentIndex].score === 9 ? 96 :
                      data[currentIndex].score === 8 ? 95 :
                      data[currentIndex].score === 7 ? 94 :
                      data[currentIndex].score === 6 ? 93 :
                      data[currentIndex].score === 5 ? 92 :
                      data[currentIndex].score === 4 ? 91 :
                      data[currentIndex].score === 3 ? 90 :
                      data[currentIndex].score === 2 ? 89 :
                      data[currentIndex].score === 1 ? 88 :
                      data[currentIndex].score === 0 ? 0 : 0)}%</p>
                      */}
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">₱{new Intl.NumberFormat().format(data[currentIndex].price)}</p>
                      <div className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div> 
          ) : (
            <div className="p-6 pt-0 text-center">
              <svg
                className="mx-auto h-20 w-20 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-6 mt-5 text-xl font-normal text-gray-500">
                NO MATCH FOUND, TRY AGAIN.
              </h3>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={onClose}
                  className="w-full items-center rounded-full bg-black px-3 py-2 text-center text-base font-medium text-white hover:bg-gray-500 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/** SIMILAR PROPERTIES*/}
          {data.length > 0 && currentIndex < data.length && data.filter((_, index) => index !== currentIndex).length > 0 && (
            <section className='bg-white'>
              {/* Similar Properties Section */}
              <h3 className="text-xl font-bold text-center mt-8">Similar Properties</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                {data.map((property, index) => (
                  index !== currentIndex && (
                    <div key={property.id} className="w-72 bg-white shadow-md shadow-black rounded-lg duration-500 hover:scale-105">
                      <Link to={`/details/${property.id}`}>
                        <img src={property.imgsrc ? property.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'} alt="Product" className="h-52 w-full" />
                        <div className="px-4 py-3">
                          <span className="text-gray-400 mr-3 uppercase text-xs">{property.type}</span>
                          <p className="text-lg font-bold text-black truncate block capitalize">{property.name}</p>
                          <p className="text-lg font-bold text-black truncate block capitalize">{property.location}</p>
                          <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">₱{new Intl.NumberFormat().format(property.price)}</p>
                            <div className="ml-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultSection;
