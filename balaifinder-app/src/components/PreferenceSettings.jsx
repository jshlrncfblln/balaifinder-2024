import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from "../../backend-connector";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export default function PreferenceSettings({ onClose, onSubmit }) {
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
    const [resultsData, setResultsData] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            const [locationResponse, typeResponse, priceResponse,] = await Promise.all([
                axios.get(`${backendurl}/api/get/option/location`),
                axios.get(`${backendurl}/api/get/option/type`),
                axios.get(`${backendurl}/api/get/option/price`),
            ]);

            setLocationData(locationResponse.data);
            setTypeData(typeResponse.data);
            // Mock price data for demonstration
            const mockPriceData = [
              { price: 50000 },
              { price: 100000 },
              { price: 150000 },
              { price: 200000 },
              { price: 300000 },
              { price: 400000 },
              { price: 500000 },
              { price: 600000 },
              { price: 700000 },
              { price: 800000 },
              { price: 900000 },
              { price: 1000000 },
              { price: 1250000 },
              { price: 1500000 },
              { price: 1750000 },
              { price: 2000000 },
              { price: 2250000 },
              { price: 2500000 },
              { price: 2750000 },
              { price: 3000000 },
          ];  
            setPriceData(mockPriceData);
        };

        loadData();
    }, []);

    const handleChange = (value) => {
        // Find the nearest price based on the slider value
        const nearestPrice = priceData.reduce((prev, curr) =>
            Math.abs(curr.price - value) < Math.abs(prev.price - value) ? curr : prev
        );
        setFormData(prevData => ({ ...prevData, price: nearestPrice.price }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Validate form data
        if (Object.values(formData).some((value) => value === "")) {
            toast.error("Please fill out all fields");
            return;
        }

        try {
            const userString = localStorage.getItem("user");
            if (!userString) {
                return;
            }
            const { id } = JSON.parse(userString);
            
            const response = await axios.post(`${backendurl}/api/post/${id}/submitpreferences`, formData);
            setResultsData(response.data);
            // Show a success toast
            toast.success("Preferences Set Success");
            if (onSubmit) {
                onSubmit(response.data);
            }
        } catch (error) {
            toast.error("Login to Match Up!");
            console.log("Error submitting preferences:", error);
        }
    };

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    //THIS IS FOR THE PROGRESS STEPPER INDICATOR
    const renderStepIndicator = () => {
      const steps = [
        {number: 1, title: 'Basic Preference'},
        {number: 2, title: 'Prefered Neighborhood'},
        {number: 3, title: 'Prefered Amenities'}
      ];
      return (
        <div className="flex justify-center mb-4">
          {steps.map(step => (
            <div
              key={step.number}
              className={`flex-1 text-center sm:text-sm md:text-sm text-lg py-2 border-b-4 ${currentStep === step.number ? 'border-sky-500 text-sky-500' : 'border-gray-300'}`}
            >
             Step {step.number}: {step.title} {/**here goes the title of the step */}
            </div>
          ))}
        </div>
      );
    };

    return (
      <>
        <ToastContainer />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="shadow-xl inset-0 max-w-5xl md:max-w-5xl px-4 py-4 bg-white rounded-lg overflow-y-auto">
            <form onSubmit={handleSubmit} className="relative flex flex-col">
                  <button onClick={onClose} className="px-2 py-2 absolute top-4 right-4 hover:bg-red-500 hover:text-white rounded-full">
                    <GrClose />
                  </button>
                  <div className="text-center mb-4 px-24">
                    <h1 className="text-2xl font-semibold">Setup your Preferences</h1>
                    <p className="text-gray-600 text-sm">Let us know what property you want.</p>
                  </div>
                  {renderStepIndicator()}
                  <div className="px-24 sm:px-8">
                        {/**THIS IS FOR THE STEP 1 */}
                        <div>
                          {currentStep === 1 && (
                            <div>
                              <div className="mb-2">
                                  <p className="text-center text-lg mb-2 sm:text-sm">In what city do you prefer to stay?</p>
                                  <select
                                      name="location"
                                      value={formData.location}
                                      onChange={(e) => setFormData(prevData => ({ ...prevData, location: e.target.value }))}
                                      className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]"
                                  >
                                      <option selected disabled hidden value="">Please Select</option>
                                      {locationData.map((item, index) => (
                                          <option key={index} value={item.location}>{item.location}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className="mb-2">
                                <p className="text-lg mb-2 text-center sm:text-sm">What price of property do you afford?</p>
                                <Slider
                                    min={Math.min(...priceData.map(item => item.price))}
                                    max={Math.max(...priceData.map(item => item.price))}
                                    step={1}
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                                <div className="text-center sm:text-sm mt-2">Price: {formData.price != null ? `₱${new Intl.NumberFormat().format(formData.price)}` : 'Select a price'}</div>
                              </div>
                              <div className="mb-2">
                                  <p className="text-center text-lg mb-2 sm:text-sm">What type of property you want to purchase?</p>
                                  <select name="house_type" value={formData.house_type} onChange={e => setFormData(prevData => ({ ...prevData, house_type: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                      <option disabled hidden value="">Please Select</option>
                                      {typeData && typeData.map((item, index) => (
                                          <option key={index} value={item.type}>{item.type}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className="mb-2">
                                      <p className="text-center text-lg mb-2 sm:text-sm">What lot type do you want?</p>
                                      <select name="typeoflot" value={formData.typeoflot} onChange={e => setFormData(prevData => ({ ...prevData, typeoflot: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                          <option selected disabled hidden value="">Please Select</option>
                                          <option value="End Lot">End Lot</option>
                                          <option value="Intersection Lot">Intersection Lot</option>
                                          <option value="Through Lot">Through Lot</option>
                                          <option value="Corner Lot">Corner Lot</option>
                                      </select>
                              </div> 
                              <div className="mb-2">
                                  <p className="text-center text-lg mb-2 sm:text-sm">Do you prefer your property is business space ready?</p>
                                  <select name="businessready" value={formData.businessready} onChange={e => setFormData(prevData => ({ ...prevData, businessready: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                      <option selected disabled hidden value="">Please Select</option>
                                      <option value="YES">YES</option>
                                      <option value="NO">NO</option>
                                  </select>
                              </div>                     
                            </div>
                          )}
                          {/**THIS IS FOR THE STEP 2 */}
                          {currentStep === 2 && (
                            <div>
                              <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-xs">Do you want your property near mall?</p>
                                    <select name="near_mall" value={formData.near_mall} onChange={e => setFormData(prevData => ({ ...prevData, near_mall: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                        <option selected disabled hidden value="">Please Select</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                              </div>                  
                              <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-xs">Do you want your property near Elementary School?</p>
                                    <select name="near_elementary" value={formData.near_elementary} onChange={e => setFormData(prevData => ({ ...prevData, near_elementary: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                        <option selected disabled hidden value="">Please Select</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                              </div>                  
                              <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-sm">Do you want your property has a nearby High School?</p>
                                    <select name="near_highschool" value={formData.near_highschool} onChange={e => setFormData(prevData => ({ ...prevData, near_highschool: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                        <option selected disabled hidden value="">Please Select</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                              </div>
                              <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-xs">Do you prefer for your property near College Universities?</p>
                                    <select name="near_college" value={formData.near_college} onChange={e => setFormData(prevData => ({ ...prevData, near_college: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                        <option selected disabled hidden value="">Please Select</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                              </div>
                              <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-xs">Do you want your property has a nearby Church?</p>
                                    <select name="near_church" value={formData.near_church} onChange={e => setFormData(prevData => ({ ...prevData, near_church: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                        <option selected disabled hidden value="">Please Select</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                              </div> 
                            </div>
                          )}
                          {/**THIS IS FOR THE STEP 3 */}
                          {currentStep === 3 && (
                              <div>                 
                                <div className="mb-2">
                                    <p className="text-center text-xl mb-2 sm:text-xs">How many bedrooms do you want in your property?</p>
                                      <select name="bedroom" value={formData.bedroom} onChange={e => setFormData(prevData => ({ ...prevData, bedroom: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                          <option selected disabled hidden value="">Please Select</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                      </select>
                                </div> 
                                <div className="mb-2">
                                      <p className="text-center text-xl mb-2 sm:text-xs">How many bathrooms do you prefer in your property?</p>
                                      <select name="bathroom" value={formData.bathroom} onChange={e => setFormData(prevData => ({ ...prevData, bathroom: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                          <option selected disabled hidden value="">Please Select</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                      </select>
                                </div>                  
                                <div className="mb-24">
                                      <p className="text-center text-xl mb-2 sm:text-xs">How big your family size?</p>
                                      <select name="familysize" value={formData.familysize} onChange={e => setFormData(prevData => ({ ...prevData, familysize: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm sm:text-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                                          <option selected disabled hidden value="">Please Select</option>
                                          <option value="Small">1 - 3</option>
                                          <option value="Medium">4 - 6</option>
                                          <option value="Large">7- 10</option>
                                          <option value="Extended">10 Above</option>
                                      </select>
                                </div>                     
                              </div>
                          )}
                        </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 mt-4 mb-2">
                      {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="mx-auto mt-2 border border-1 border-sky-500 hover:bg-sky-500 hover:border-sky-700 hover:text-white w-9/12 px-3 py-2 text-gray-800 font-bold rounded-lg">
                          Previous
                        </button>                   
                      )}

                      {currentStep < 3 && (
                        <button type="button" onClick={nextStep} className="mx-auto mt-2 bg-sky-500 hover:bg-sky-700 w-9/12 px-3 py-2 text-white font-bold rounded-lg">
                          Next
                        </button>
                      )}

                      {currentStep === 3 && (
                        <button type="submit" className="mx-auto mt-2 bg-sky-500 hover:bg-sky-700 w-9/12 px-3 py-2 text-white font-bold rounded-lg">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
            </form>
          </div>
        </div>
      </>
  );
}
