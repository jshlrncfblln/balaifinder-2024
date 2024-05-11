// components/ProductDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendurl } from "../../backend-connector";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiThumbsUpBold } from "react-icons/pi";


const Spinner = () => (
  <div class="flex flex-row gap-2">
    <div class="w-4 h-4 rounded-full bg-sky-500 animate-bounce"></div>
    <div class="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:-.5s]"></div>
    <div class="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:-.1s]"></div>
  </div>
);

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

  const handleLikeClick = (productId) => {
    sendProductData(productId, 'Added to your wishlist');
  };

  const sendProductData = (productId, action) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in local storage");
        toast.warning("You must login first to add products to your wishlist");
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

  if (loading || !product || Object.keys(product).length === 0) {
    return (
      <div>
        <Navbar/>
        <div className="flex justify-center items-center h-screen bg-white flex-col">
          <Spinner />
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
        <div class="bg-gray-100 py-8">
              <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex flex-col md:flex-row -mx-4">
                      <div class="md:flex-1 px-4">
                          <div class="h-[460px] rounded-lg bg-black mb-4">
                              <img
                                  class="w-full h-full object-cover"
                                  src={product.imgsrc ? product.imgsrc : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
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
                        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">{product.name}</h2>
                        <p class="font-semibold text-gray-800 mb-4 mx-4">
                            Property Address: <span class="text-gray-600 font-normal">{product.address ? product.address : 'No Available Address'}</span>
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4 mx-4">
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Price:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">₱ {new Intl.NumberFormat().format(product.price)}</span>
                                </div>
                            </div>
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Monthly Installment:</span>
                                <div className='my-2'>
                                  <span class="text-gray-600">{product.monthly}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">City Located:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.location}</span>
                                </div>
                            </div>
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Type of Lot:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.typeoflot}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Family Size:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.familysize}</span>
                                </div>
                            </div>
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Business Ready:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.businesssready}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Number of Bedrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbedroom}</span>
                                </div>
                            </div>
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Number of Bathrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbathroom}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Near an Elementary School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearelementary}</span>
                                </div>
                            </div>
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Near a High School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearhighschool}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center">
                                <span class="font-semibold text-gray-800">Near a College University:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearcollege}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="mx-4 mt-2">
                          <span class="font-semibold text-gray-800">Description:</span>
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