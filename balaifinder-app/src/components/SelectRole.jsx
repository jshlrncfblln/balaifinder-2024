import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserAlt, FaUserTie } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { Navigate, useNavigate } from 'react-router-dom';

function RoleCard({ icon, title, onClick }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white outline outline-1 rounded-lg shadow-lg hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-black" onClick={onClick}>
      <div className="rounded-full p-3">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    </div>
  );
}

function SelectRole({ isOpen, onClose }) {
  const { selectRole } = useContext(AuthContext);
  const modalRef = useRef(null);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close the modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleRoleSelect = (role) => {
    selectRole(role);
    onClose(); // Close the modal after selecting a role
    if (role === 'buyer') {
      setIsOpenLoginModal(true); // Open the login modal for the "buyer" role
    } else if (role === 'realtor') {
      navigate("/realtor_login"); // Navigate to the realtor login for the "realtor" role
    }
  };
  
  
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full md:w-[90%] max-w-md md:max-w-lg overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Please select your role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          <RoleCard
            icon={<FaUserAlt className="w-24 h-24" />}
            title="Buyer"
            onClick={() => handleRoleSelect("buyer")}
          />
          <RoleCard
            icon={<FaUserTie className="w-24 h-24" />}
            title="Realtor"
            onClick={() => handleRoleSelect("realtor")}
          />
        </div>
      </div>
      {isOpenLoginModal && <LoginModal isOpen={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />}
    </div>
  );
}


export default React.memo(SelectRole);
