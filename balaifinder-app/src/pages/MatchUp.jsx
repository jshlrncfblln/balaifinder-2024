import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import PreferenceSettingsModal from '../components/PreferenceSettings';
import ResultSection from '../components/ResultSection';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../transition.css';

export default function Introduction() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultsData, setResultsData] = useState([]);


  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };
  
  const closeResultModal = () => {
    setShowResultModal(false);
  }

  const handleSubmitSettings = () => {
    // Submit settings data here
    setResultsData([...resultsData]); // Update resultsData with the submitted data
    closeSettingsModal(); //close the settings modal after successful setup
    setShowResultModal(true);
  };

  const handleReset = () => {
    setShowSettingsModal(false);
    setShowResultModal(false);
    setResultsData([]);
  };

  return (
    <div>
      <Navbar />
      <div className="m-12">
        <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-10">
              Find your house in Balai<span className="text-sky-500">Finder </span>
              a <span className="text-sky-500">Matching </span> site for Home<span
              className="text-sky-500">buyers. </span>
            </h1>
            <p className="mt-3 sm:mt-5 lg:w-10/12 text-gray-500 font-normal text-center text-lg">
              BalaiFinder is a matching site that uses advanced algorithms to help home buyers find their dream homes effortlessly.
            </p>
          </div>
          <div className="flex w-full items-center justify-center text-center">
            <button onClick={openSettingsModal} className="text-center items-center w-2/5 gap-2 bg-sky-500 text-white text-base hover:shadow-md hover:shadow-black font-semibold py-3 px-6 rounded-full hover:bg-sky-700 sm:py-2 sm:px-4">
                Find My Property
            </button>
          </div>
        </div>
      </div>
      {showSettingsModal && (
        <TransitionGroup>
          <CSSTransition
            in={showSettingsModal} // Use the showSettingsModal state variable here
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <PreferenceSettingsModal onClose={closeSettingsModal} onSubmit={handleSubmitSettings} />
          </CSSTransition>
        </TransitionGroup>
      )}
      {showResultModal && <ResultSection resultsData={resultsData} onClose={closeResultModal}/>}
      <Footer />
    </div>
  );
}
