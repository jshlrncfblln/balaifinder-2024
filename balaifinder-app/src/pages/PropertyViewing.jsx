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

const PropertyViewing = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    fetchProductById(id);
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
    axios.post(`${backendurl}/api/post/ald`, {
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
  };

  if (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
              <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex flex-col md:flex-row -mx-4">
                      <div class="md:flex-1 px-4">
                          <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                              <img
                                  class="w-full h-full object-cover"
                                  src="https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380"
                                  alt="Product Image"
                              />
                          </div>
                          <div class="flex justify-center mb-4">
                              <div class="w-1/2 px-2">
                                  <button type="submit" onClick={() => handleLikeClick(product.id)} class="inline-flex items-center text-center justify-center hover:shadow-md hover:shadow-black hover:bg-sky-700 w-full bg-sky-500 text-white py-2 px-4 rounded-xl font-semibold">
                                    <PiThumbsUpBold className="mr-2" />
                                    Like
                                  </button>
                              </div>
                              <div class="w-1/2 px-2">
                                  <button type="submit" onClick={() => handleDenyClick(product.id)} class="inline-flex items-center text-center justify-center text-center hover:shadow-md hover:shadow-black hover:bg-sky-700 w-full bg-sky-500 text-white py-2 px-4 rounded-xl font-semibold">
                                    <PiThumbsDownBold className="mr-2" />
                                    Dislike
                                  </button>
                              </div>
                          </div>
                      </div>
                      <div class="max-w-xl mx-auto px-4 py-6 bg-white shadow-md rounded-xl">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            ADDRESS:
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">₱ {new Intl.NumberFormat().format(product.price)}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Location:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.location}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Number of Bedrooms:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.numberofbedroom}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Number of Bathrooms:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.numberofbathroom}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Near an Elementary School:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.nearelementary}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Near a High School:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.nearhighschool}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Near a College University:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.nearcollege}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Family Size:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.familysize}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Monthly Installment:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.monthly}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Type of Lot:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.typeoflot}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Business Ready:</span>
                                <span class="ml-2 text-gray-600 dark:text-gray-300">{product.businesssready}</span>
                            </div>
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                            <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">{product.description}</p>
                        </div>
                      </div>
                  </div>
              </div>
        </div>
        <Footer/>
    </div>
  );
};

export default PropertyViewing;