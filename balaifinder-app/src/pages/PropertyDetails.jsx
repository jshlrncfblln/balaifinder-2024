// components/ProductDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendurl } from "../../backend-connector";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiHomeHeart } from "react-icons/bi";
import { Link } from "react-router-dom";


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
  const [randomProperties, setRandomProperties] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id);
    fetchRandomProperties(); //fetching random properties when components mounts
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

      axios.post(`${backendurl}/api/post/${id}/like`, {
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

  //add logic on how to map random properties here
  const fetchRandomProperties = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/get/properties?limit=6`);
      const filteredProperties = response.data.filter(property => property.id !== id);
      setRandomProperties(filteredProperties);
      console.log("Fetching properties successfully!")
    } catch (error) {
      console.log("Error while fetching random properties:", error);
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
                      </div>
                      <div class="max-w-xl w-full mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
                        <h2 class="text-2xl sm:text-sm font-bold text-center text-gray-800 mb-2">{product.name}</h2>
                        <p class="font-semibold sm:text-sm text-gray-800 mb-4 mx-4">
                            Property Address: <span class="text-gray-600 font-normal">{product.address ? product.address : 'No Available Address'}</span>
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4 mx-4">
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Price:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">₱ {new Intl.NumberFormat().format(product.price)}</span>
                                </div>
                            </div>
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Monthly Installment:</span>
                                <div className='my-2'>
                                  <span class="text-gray-600">{product.monthly}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">City Located:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.location}</span>
                                </div>
                            </div>
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Type of Lot:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.typeoflot}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Family Size:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.familysize}</span>
                                </div>
                            </div>
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Business Ready:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.businesssready}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Number of Bedrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbedroom}</span>
                                </div>
                            </div>
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Number of Bathrooms:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.numberofbathroom}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Near an Elementary School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearelementary}</span>
                                </div>
                            </div>
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Near a High School:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearhighschool}</span>
                                </div>
                            </div>
                            <hr /><hr />
                            <div class="items-center sm:text-sm">
                                <span class="font-semibold text-gray-800">Near a College University:</span>
                                <div className="my-2">
                                  <span class="text-gray-600">{product.nearcollege}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="mx-4 mt-2 sm:text-sm">
                          <span class="font-semibold text-gray-800">Description:</span>
                          <div className="my-2">
                            <p class="text-gray-600 text-sm">{product.description}</p>
                          </div>
                        </div>
                        <div class="w-full my-4 px-2">
                          <button type="submit" onClick={() => handleLikeClick(product.id)} class="inline-flex items-center text-center justify-center hover:shadow-md hover:shadow-black hover:bg-sky-700 w-full bg-sky-500 text-white py-2 px-4 rounded-xl font-semibold">
                            <BiHomeHeart className="mr-2" />
                            Add to Wishlists
                          </button>
                        </div>
                      </div>
                  </div>
              </div>
        </div> 
        <div className="bg-white my-8 w-full">
          <h3 className="text-4xl font-bold mb-4 text-gray-800">Suggested <span className="text-sky-500">Properties</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*here should put the random properties*/}
            {randomProperties.length > 0 ? (
              randomProperties.map((property) => (
                <div key={property.id} className="w-72 bg-white shadow-md shadow-black rounded-lg duration-500 hover:scale-105 relative">
                  <Link to={`/details/${property.id}`}>
                    <img src={property.imgsrc ? property.imgsrc : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'} alt="Property" className="h-52 w-full" />
                    <div className="px-4 py-3 w-72">
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
              ))
            ) :(
              <div>NO SUGGESTED PROPERTIES AVAILABLE</div>
            )}
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default PropertyDetails;