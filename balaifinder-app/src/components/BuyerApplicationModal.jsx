import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendurl } from '../../backend-connector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { imageDb } from '../../firebase';

const ApplyModal = ({ isOpen, onClose, propertyId, realtorId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [fileUrl, setFileUrl] = useState(null);
  const [companyIdFileUrl, setCompanyIdFileUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("User data not found in local storage");
          return;
        }
        const { id } = JSON.parse(userString);

        const response = await axios.get(`${backendurl}/api/users/${id}/profile`);
        const { firstName, lastName, email } = response.data;
        setFormData({ firstName, lastName, email });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(imageDb, `files/useruploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    if (e.target.name === 'certificate') {
      setFileUrl(downloadURL);
    } else if (e.target.name === 'companyId') {
      setCompanyIdFileUrl(downloadURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in local storage");
        return;
      }
      const { id } = JSON.parse(userString);
      const response = await fetch(`${backendurl}/api/post/apply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          realtorId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          fileUrl,
          companyIdUrl: companyIdFileUrl,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('Application Submitted Successfully.');
      } else if (response.status === 400 && responseData.message === 'You already applied') {
        toast.error('You already applied');
      } else {
        toast.error('Failed to Submit Application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to Submit Application');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="outline outline-1 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl shadow-black transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h1 className='font-bold text-center text-3xl m-4'>Want this Property?</h1>
              <h2 className="text-sm text-center text-gray-500 mb-2">Complete the form below to apply for this property</h2>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="certificate" className="block text-gray-700 text-sm font-bold mb-2">Certificate</label>
                <input type="file" id="certificate" name="certificate" onChange={handleFileChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="companyId" className="block text-gray-700 text-sm font-bold mb-2">Company ID</label>
                <input type="file" id="companyId" name="companyId" onChange={handleFileChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="hover:shadow-md hover:shadow-black w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm">
                Apply
              </button>
              <button onClick={onClose} type="button" className="hover:shadow-md hover:shadow-black mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
