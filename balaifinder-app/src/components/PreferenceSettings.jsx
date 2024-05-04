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

    return (
      <div>
        <ToastContainer />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 grid w-full md:w-auto gap-4 bg-background p-6 duration-200 rounded-3xl">
          <form onSubmit={handleSubmit} className="shadow-xl shadow-black px-4 sm:px-16 md:px-16 py-8 space-y-8 bg-white relative rounded-lg" 
              style={{ height: '60vh', maxHeight: '80vh', overflowY: 'auto' }}>
              <button onClick={onClose} className="px-2 py-2 absolute top-4 right-4 hover:bg-red-500 hover:text-white rounded-full">
                <GrClose />
              </button>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold">Setup your Preferences</h1>
                <p className="text-gray-600 text-lg">Let us know what property you want.</p>
              </div>

              {currentStep === 1 && (
                <div>
                  <div className="mb-4">
                      <p className="text-center text-lg mb-4 sm:text-sm">In what city do you prefer to stay?</p>
                      <select
    name="location"
    value={formData.location}
    onChange={(e) => setFormData(prevData => ({ ...prevData, location: e.target.value }))}
    className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]"
>
    <option selected disabled hidden value="">Please Select</option>
    {locationData.map((item, index) => (
        <option key={index} value={item.location}>{item.location}</option>
    ))}
</select>
                  </div>
                  <div className="mb-4">
                    <label className="text-lg mb-4 text-center sm:text-sm">What price of property do you afford?</label>
                    <Slider
                        min={Math.min(...priceData.map(item => item.price))}
                        max={Math.max(...priceData.map(item => item.price))}
                        step={1}
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <div className="text-center">Price: {formData.price != null ? `₱${new Intl.NumberFormat().format(formData.price)}` : 'Select a price'}</div>
                  </div>
                  <div className="mb-4">
                      <p className="text-center text-lg mb-4 sm:text-sm">What type of property you want to purchase?</p>
                      <select name="house_type" value={formData.house_type} onChange={e => setFormData(prevData => ({ ...prevData, house_type: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                          <option disabled hidden value="">Please Select</option>
                          {typeData && typeData.map((item, index) => (
                              <option key={index} value={item.type}>{item.type}</option>
                          ))}
                      </select>
                  </div>
                  <div className="mb-4">
                          <label className="text-center text-xl mb-4 sm:text-sm">What lot type do you want?</label>
                          <select name="typeoflot" value={formData.typeoflot} onChange={e => setFormData(prevData => ({ ...prevData, typeoflot: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                              <option selected disabled hidden value="">Please Select</option>
                              <option value="End Lot">End Lot</option>
                              <option value="Intersection Lot">Intersection Lot</option>
                              <option value="Through Lot">Through Lot</option>
                              <option value="Corner Lot">Corner Lot</option>
                          </select>
                  </div> 
                  <div className="mb-4">
                      <label className="text-center text-xl mb-4 sm:text-sm">Do you prefer your property is business space ready?</label>
                      <select name="businessready" value={formData.businessready} onChange={e => setFormData(prevData => ({ ...prevData, businessready: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                          <option selected disabled hidden value="">Please Select</option>
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                      </select>
                  </div>                     
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">Do you want your property near mall?</label>
                        <select name="near_mall" value={formData.near_mall} onChange={e => setFormData(prevData => ({ ...prevData, near_mall: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                  </div>                  
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">Do you want your property near Elementary School?</label>
                        <select name="near_elementary" value={formData.near_elementary} onChange={e => setFormData(prevData => ({ ...prevData, near_elementary: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                  </div>                  
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">Do you want your property has a nearby High School?</label>
                        <select name="near_highschool" value={formData.near_highschool} onChange={e => setFormData(prevData => ({ ...prevData, near_highschool: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                  </div>
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">Do you prefer for your property near College Universities?</label>
                        <select name="near_college" value={formData.near_college} onChange={e => setFormData(prevData => ({ ...prevData, near_college: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                  </div>
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">Do you want your property has a nearby Church?</label>
                        <select name="near_church" value={formData.near_church} onChange={e => setFormData(prevData => ({ ...prevData, near_church: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                  </div> 
                </div>
              )}

              {currentStep === 3 && (
                <div>                 
                  <div className="mb-4">
                      <label className="text-center text-xl mb-4 sm:text-sm">How many bedrooms do you want in your property?</label>
                        <select name="bedroom" value={formData.bedroom} onChange={e => setFormData(prevData => ({ ...prevData, bedroom: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                  </div> 
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">How many bathrooms do you prefer in your property?</label>
                        <select name="bathroom" value={formData.bathroom} onChange={e => setFormData(prevData => ({ ...prevData, bathroom: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                  </div>                  
                  <div className="mb-4">
                        <label className="text-center text-xl mb-4 sm:text-sm">How big your family size?</label>
                        <select name="familysize" value={formData.familysize} onChange={e => setFormData(prevData => ({ ...prevData, familysize: e.target.value }))} className="flex h-10 w-full items-center justify-between bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-full border-sky-500 border-[2px]">
                            <option selected disabled hidden value="">Please Select</option>
                            <option value="Small">1 - 3</option>
                            <option value="Medium">4 - 6</option>
                            <option value="Large">7- 10</option>
                            <option value="Extended">10 Above</option>
                        </select>
                  </div>                     
                </div>
              )}
              <div className="flex justify-between gap-8">
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
            </form>
          </div>
        </div>
      </div>
  );
}
