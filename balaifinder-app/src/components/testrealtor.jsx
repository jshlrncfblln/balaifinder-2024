import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from "../../backend-connector";
import SecondModal from "../components/ScoringSettings"

export default function test({ onClose, onSubmit }) {
    
    const [locationData, setLocationData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [formData, setFormData] = useState({
      price: "",
      location: "",
      house_type: "",
      near_mall: "",
      near_elementary: "",
      near_highschool: "",
      near_college: "",
      near_church: "",
      businessready: "",
      bedroom: "",
      bathroom: "",
      familysize: "",
      typeoflot: "",
    });
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [resultsData, setResultsData] = useState([]);
    const [showSecondModal, setShowSecondModal] = useState(false)

    const loadData = async () => {
        const [locationResponse, typeResponse, priceResponse,] = await Promise.all([
            axios.get(`${backendurl}/api/get/option/location`),
            axios.get(`${backendurl}/api/get/option/type`),
            axios.get(`${backendurl}/api/get/option/price`),
        ]);

        setLocationData(locationResponse.data);
        setTypeData(typeResponse.data);
        setPriceData(priceResponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        // Validate form data
        if (
          Object.values(formData).some((value) => value === "")
        ) {
          toast.error("Please fill out all fields");
          return;
        }
    
        try {
          const response = await axios.post(`${backendurl}/api/post/submitpreferences`, formData);
          setResultsData(response.data);
          setShowResultsModal(true);
          setShowSecondModal(true)
          if (onSubmit) {
            onSubmit(response.data);
          }
        } catch (error) {
          console.log("Error submitting preferences:", error);
        }
      };
    const handleCloseResultsModal = () => {
        setShowResultsModal(false);
    }
    const [step , setStep] = useState(1)
    //this code is for incrementing the steps
    const handleNextStep = () => {
      setStep((prevStep) => prevStep + 1)
    }
    //this code is for decrementing the steps
    const handlePrevStep = () =>{
      setStep((prevStep) => prevStep - 1)
    }
    //this code is for determining the last step of the multiform
    const isLastStep = step === 13

  return (
        <div>
          <ToastContainer />
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 grid w-full md:w-auto gap-4 bg-background p-6 duration-200 rounded-3xl">
              <form onSubmit={handleSubmit} className="outline outline-1 shadow-xl shadow-black px-4 sm:px-8 md:px-16 py-8 space-y-8 bg-white relative rounded-md"
                  style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <button onClick={onClose} className="px-2 py-2 absolute top-4 right-4 hover:bg-red-500 hover:text-white rounded-full">
                  <GrClose />
                </button>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-semibold">Setup your Preferences</h1>
                  <p className="text-gray-600 text-lg">Let us know what property you want.</p>
                </div>
                <div className="flex flex-col items-center">
                
                  {/* QUESTION #1 LOCATION PREFERRED */}
                  {step === 1 && (
                    <div className="flex flex-col mb-4">
                      <label className="text-center text-xl mb-4">In what location do you prefer to stay?</label>
                      <select name="location" value={formData.location} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                          <option selected disabled hidden value="">Please Select</option>
                          {locationData.map((item, index) => (
                          <option key={index} value={item.location}>{item.location}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* QUESTION #2 TYPE OF PROPERTY PREFERRED */}
                  {step === 2 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">What type of property you want to purchase?</label>
                        <select name="house_type" value={formData.house_type} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            {typeData.map((item, index) => (
                            <option key={index} value={item.type}>{item.type}</option>
                            ))}
                        </select>
                    </div>
                  )}
                  {/*QUESTION #3 PRICE */}
                  {step === 3 && (
                    <div className="flex flex-col mb-4">
                      <label className="text-xl mb-4 text-center">What price of property do you afford?</label>
                      <select name="price" value={formData.price} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                        <option selected disabled hidden value="">Please Select</option>
                        {priceData
                            .slice() // create a shallow copy to avoid mutating the original array
                            .sort((a, b) => a.price - b.price) // Sort the array by price in ascending order
                            .map((item, index) => (
                                <option key={index} value={item.price}>
                                    ₱ {new Intl.NumberFormat().format(item.price)}
                                </option>
                            ))
                        }
                      </select>
                    </div>                  
                  )}
                  {/**QUESTION #4 DO YOU WANT YOUR PROPERTY NEAR A MALL */}
                  {step === 4 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">Do you want your property near mall?</label>
                        <select name="near_mall" value={formData.mall} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>                  
                  )}
                  {/**QUESTION #5 DO YOU WANT YOUR PROPERTY NEAR AN ELEMENTARY SCHOOL */}
                  {step === 5 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">Do you want your property near Elementary School?</label>
                        <select name="near_elementary" value={formData.near_elementary} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>                  
                  )}

                  {step === 6 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">Do you want your property has a nearby High School?</label>
                        <select name="near_highschool" value={formData.near_highschool} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>                  
                  )}

                  {step === 7 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">Do you prefer for your property near College Universities?</label>
                        <select name="near_college" value={formData.near_college} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>                  
                  )}

                  {step === 8 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">Do you want your property has a nearby Church?</label>
                        <select name="near_church" value={formData.near_church} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                  )}

                  {step === 9 && (
                    <div className="flex flex-col mb-4">
                      <label className="text-center text-xl mb-4">How many bedrooms do you want in your property?</label>
                        <select name="bedroom" value={formData.bedroom} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div> 
                  )}

                  {step === 10 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">How many bathrooms do you prefer in your property?</label>
                        <select name="bathroom" value={formData.bathroom} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>                  
                  )}

                  {step === 11 && (
                    <div className="flex flex-col mb-4">
                        <label className="text-center text-xl mb-4">How big your family size?</label>
                        <select name="familysize" value={formData.familysize} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="Small">1 - 3</option>
                            <option value="Medium">4 - 6</option>
                            <option value="Large">7- 10</option>
                            <option value="Extended">10 Above</option>
                        </select>
                    </div>
                  )}

                  {step === 12 && (
                    <div className="flex flex-col mb-4">
                      <label className="text-center text-xl mb-4">Do you prefer your property is business space ready?</label>
                      <select name="businessready" value={formData.businessready} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                          <option selected disabled hidden value="">Please Select</option>
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                      </select>
                    </div>
                  )}

                  {step === 13 && (
                    <div className="flex flex-col mb-4">
                          <label className="text-center text-xl mb-4">What lot type do you want?</label>
                          <select name="typeoflot" value={formData.typeoflot} onChange={handleChange} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[3px]">
                              <option selected disabled hidden value="">Please Select</option>
                              <option value="End Lot">End Lot</option>
                              <option value="Intersection Lot">Intersection Lot</option>
                              <option value="Through Lot">Through Lot</option>
                              <option value="Corner Lot">Corner Lot</option>
                          </select>
                    </div>                         
                  )}
                </div>
                <div className="flex justify-between gap-8">
                  {step !== 1 && (
                    <button type="button" onClick={handlePrevStep} className="hover:shadow-md hover:shadow-black mx-auto mt-8 bg-gray-400 hover:bg-gray-700 w-9/12 px-3 py-2 text-white font-bold rounded-full">
                      Previous
                    </button>
                  )}

                  {isLastStep ? (
                    <button type="submit" className="hover:shadow-md hover:shadow-black mx-auto mt-8 bg-sky-500 hover:bg-sky-700 w-9/12 px-3 py-2 text-white font-bold rounded-full">
                      Submit
                    </button>
                  ):(
                    <button type="button" onClick={handleNextStep} className="hover:shadow-md hover:shadow-black mx-auto mt-8 bg-sky-500 hover:bg-sky-700 w-9/12 px-3 py-2 text-white font-bold rounded-full">
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {showResultsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md">
                {/* Check if resultsData is an array before mapping */}
                {Array.isArray(resultsData) ? (
                  <ul>
                    {resultsData.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p>Preferences Set Success</p>
                    <button onClick={handleCloseResultsModal} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4" >See Match Result</button>
                  </div>
                )}
            </div>
            </div>
          )}
          {showSecondModal && <SecondModal onClose={() => setShowSecondModal(false)} />}
        </div>
    );
}
