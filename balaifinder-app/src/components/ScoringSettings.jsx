import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendurl } from "../../backend-connector";

function ScoringSettings({ onClose, onSubmit }) {
  const [rangeValues, setRangeValues] = useState({
    location: 0,
    type: 0,
    price: 0,
    nearelementary: 0,
    nearhighschool: 0,
    nearcollege: 0,
    nearmall: 0,
    nearchurch: 0,
    bedroom: 0,
    bathroom: 0,
    familysize: 0,
    businessready: 0,
    lottype: 0,
  });
  // setting the submit button to disabled if the value is 0 and below 98
  const [submitDisabled, setSubmitDisabled] = useState(false);
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRangeValues((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${backendurl}/api/post/submitpriority`,
        rangeValues
      );
      console.log(response.data.message);
      toast.success("Your prioritization submitted successfully");
      onSubmit()
    } catch (error) {
      console.error("Error submitting preferences:", error);
      toast.error("Oopps! submitting preferences gone wrong. Try Again");
    }
  };
  //
  const totalValue = Object.values(rangeValues).reduce(
    (acc, val) => acc + val,
    0
  );
  //
  useEffect(() => {
    if (totalValue < 98 || totalValue > 100) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [totalValue]);
  //
  return (
    <div>
      <ToastContainer />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="px-16 py-4 space-y-8 bg-white text-center items-center relative outline outline-1 shadow-xl shadow-black rounded-xl"
        >
          <button
            onClick={onClose}
            className="px-2 py-2 absolute top-4 right-4 hover:bg-red-500 hover:text-white rounded-full"
          >
            <GrClose className="h-4 w-4" />
          </button>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Priority Tuning</h1>
            <p className="text-gray-600 text-sm mt-2 text-center">
              Fine-tune Your Priorities for More Relevant Results. You can use the slider or type the score of prioritization.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 justify-center items-center mx-auto">
            {/*COLUMN 1 */}
            <div className="lg:col-span-1">
              {/**This is for the Location */}
              <div className="input-group mb-2">
                <label className="flex justify-between items-center font-semibold text-gray-800 mb-2">
                  Location
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="location"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.location}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4"
                    type="number"
                    name="location"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Property Type */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Property Type
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="type"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.type}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-500 text-center ml-4"
                    type="number"
                    disabled
                    name="type"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.type}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Price */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">Price</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="price"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.price}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-500 text-center ml-4"
                    type="number"
                    name="price"
                    disabled
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Lot type */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Property Lot Type
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="lottype"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.nearmall +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready)
                    }
                    step="0.1"
                    value={rangeValues.lottype}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-500 text-center ml-4"
                    disabled
                    type="number"
                    name="lottype"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.lottype}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/** This is for the Family Size */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Family Size
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="familysize"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.nearmall +
                        rangeValues.bathroom +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.familysize}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="familysize"
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.familysize}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/*COLUMN 2 */}
            <div className="lg:col-span-1">
              {/**This is for Number of bedrooms */}
              <div className="input-group mb-2">
                <label className="flex mb-2 justify-between items-center font-semibold text-gray-800">
                  Number of Bedrooms
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="bedroom"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.bedroom}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    type="number"
                    disabled
                    name="bedroom"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.bedroom}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Number of bathrooms */}
              <div className="input-group mb-2">
                <label className="flex mb-2 justify-between items-center font-semibold text-gray-800">
                  Number of Bathroom
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="bathroom"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.nearmall +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.bathroom}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="bathroom"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.bathroom}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for the near elementary school */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Near Elementary School
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="nearelementary"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.nearelementary}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="nearelementary"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.nearelementary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for the Near High school */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Near High School
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="nearhighschool"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.nearhighschool}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    name="nearhighschool"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.nearhighschool}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for the Near College Universities */}
              <div className="input-group mb-2">
                <label className="mb-2 flex justify-between items-center font-semibold text-gray-800">
                  Near College University
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="nearcollege"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.nearcollege}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="nearcollege"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.nearcollege}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/*COLUMN 3 */}
            <div className="lg:col-span-1">
              {/**This is for Near Mall/Commercial Spaces */}
              <div className="input-group mb-2">
                <label className="flex mb-2 justify-between items-center font-semibold text-gray-800">
                  Near Commercial Spaces/Mall
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="nearmall"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearchurch +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.nearmall}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="nearmall"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.nearmall}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Near Church */}
              <div className="input-group mb-2">
                <label className="flex mb-2 justify-between items-center text-gray-800 font-semibold">
                  Near Church
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="nearchurch"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.bedroom +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.businessready +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.nearchurch}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="nearchurch"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.nearchurch}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/**This is for Business space ready */}
              <div className="input-group mb-2">
                <label className="flex mb-2 justify-between items-center text-gray-800 font-semibold">
                  Business Space Ready
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="businessready"
                    min="0"
                    className="appearance-none w-full h-2 bg-gray-200 rounded-full outline-none opacity-50 hover:opacity-100 transition-opacity"
                    max={
                      100 -
                      (rangeValues.location +
                        rangeValues.type +
                        rangeValues.price +
                        rangeValues.nearelementary +
                        rangeValues.nearhighschool +
                        rangeValues.nearcollege +
                        rangeValues.nearmall +
                        rangeValues.nearchurch +
                        rangeValues.nearmall +
                        rangeValues.bathroom +
                        rangeValues.familysize +
                        rangeValues.lottype)
                    }
                    step="0.1"
                    value={rangeValues.businessready}
                    onChange={handleChange}
                  />
                  <input
                    className="text-gray-800 text-center ml-4 bg-white"
                    disabled
                    type="number"
                    name="businessready"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rangeValues.businessready}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="m-4">
            <p className="text-center text-2xl font-bold text-black">
              {totalValue}
            </p>
          </div>
          <button
            type="submit"
            disabled={submitDisabled}
            className={`mx-auto block py-2 w-full rounded-xl ${
              submitDisabled
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-blue-500 text-white font-semibold"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScoringSettings;
