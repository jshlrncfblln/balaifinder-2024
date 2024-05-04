// components/ProductDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendurl } from "../../backend-connector";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiThumbsDownBold } from "react-icons/pi";
import { PiThumbsUpBold } from "react-icons/pi";

const PropertyDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    setLoading(true);
    fetchProductById(id);
    const timeout = setTimeout(() => {
      setLoading(false);
  }, 2000); // 2 seconds

  return () => clearTimeout(timeout);
}, [id]);

  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`${backendurl}/api/get/properties/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log("Error while fetching product by ID:", error);
    }
  };

  const handleAcceptClick = (productId) => {
    sendProductData(productId, 'ACCEPT');
  };

  const handleLikeClick = (productId) => {
    sendProductData(productId, 'LIKE');
  };

  const handleDenyClick = (productId) => {
    sendProductData(productId, 'DENY');
  };

  const sendProductData = (productId, action) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in local storage");
        return;
      }
      const { id } = JSON.parse(userString);

      axios.post(`${backendurl}/api/post/${id}/ald`, {
        productId: productId,
        action: action
      }, { withCredentials: true }) // Send cookies with the request
        .then(response => {
          console.log(response.data);
          toast.success(`${action} successfully!`);
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            toast.error(`${error.response.data.message}`);
          } else {
            console.error("Error inserting product data:", error);
          }
        });
    
    } catch (error) {
    toast.error("Ooopps! It didn't go well")
      console.log("Error submitting preferences:", error);
    }
  };

  if (!product || Object.keys(product).length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <Navbar/>
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
              <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex flex-col md:flex-row -mx-4">
                      <div class="md:flex-1 px-4">
                          <div class="h-[460px] rounded-lg bg-black dark:bg-gray-700 mb-4">
                              <img
                                  class="w-full h-full object-cover"
                                  src={product.imgsrc ? product.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'}
                                  alt="Product Image"
                              />
                          </div>
                          <div class="flex justify-center mb-4">
                              <div class="w-1/2 px-2">
                                  <button type="submit" onClick={() => handleLikeClick(product.id)} class="inline-flex items-center text-center justify-center hover:shadow-md hover:shadow-black hover:bg-sky-700 w-full bg-sky-500 text-white py-2 px-4 rounded-xl font-semibold">
                                    <PiThumbsUpBold className="mr-2" />
                                    Wishlists
                                  </button>
                              </div>
                          </div>
                      </div>
                      <div class="max-w-xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                        <p class="font-bold text-gray-800 mb-4">
                            Property Address: Not Available
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">

                            <div class="flex items-center">
                                <span class="font-semibold text-gray-800">Price:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">₱ {new Intl.NumberFormat().format(product.price)}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Monthly Installment:</span>
                                <div className='my-2'>
                                  <span class="text-gray-600">{product.monthly}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-semibold text-gray-800">City Located:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.location}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Type of Lot:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.typeoflot}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Family Size:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.familysize}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Business Ready:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.businesssready}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Number of Bedrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbedroom}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Number of Bathrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbathroom}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Near an Elementary School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearelementary}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Near a High School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearhighschool}</span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <span class="font-bold text-gray-800">Near a College University:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearcollege}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                          <span class="font-bold text-gray-800">Description:</span>
                          <div className="my-2">
                            <p class="text-gray-600 text-sm">{product.description}</p>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
        </div>
        <Footer/>
    </div>
  );
};

export default PropertyDetails;