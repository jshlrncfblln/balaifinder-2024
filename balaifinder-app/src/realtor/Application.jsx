import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendurl } from "../../backend-connector";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    

    useEffect(() => {
        // Fetch applications data when the component mounts
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        try {
            const userString = localStorage.getItem("user");
            if (!userString) {
              console.error("User data not found in local storage");
              return;
            }
            const { id: userId } = JSON.parse(userString);
            axios.get(`${backendurl}/api/get/${userId}/applications`)
            .then(response => {
                // Map through applications and fetch property details for each
                Promise.all(response.data.map(application =>
                    axios.get(`${backendurl}/api/get/properties/${application.property_id}`)
                ))
                .then(propertyResponses => {
                    // Update applications with property details
                    const updatedApplications = response.data.map((application, index) => ({
                        ...application,
                        property_name: propertyResponses[index].data.name,
                        property_price: propertyResponses[index].data.price,
                        property_location: propertyResponses[index].data.location
                    }));
                    setApplications(updatedApplications);
                })
                .catch(error => {
                    console.error('Error fetching property details:', error);
                    // Handle error
                });
            })
        } catch (error) {
            console.error('Error fetching Applications:', error);
        }
    };

    const handleUpdateButtonClick = (application) => {
        setSelectedApplication(application);
        // Fetch status and comments for the selected application
        axios.get(`${backendurl}/api/get/application/${application.id}/status`)
            .then(response => {
                setStatus(response.data.status);
                setComments(response.data.comments);
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error fetching status and comments:', error);
                // Handle error
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setStatus(value);
        } else if (name === 'comments') {
            setComments(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if status or comments have changed
        if (status !== selectedApplication.status || comments !== selectedApplication.comments) {
            // Update status and comments for the selected application
            axios.put(`${backendurl}/api/update/application/${selectedApplication.id}/status`, {
                status: status,
                comments: comments
            })
                .then(response => {
                    // Handle success
                    console.log('Status and comments updated successfully');
                    setShowModal(false);
                    toast.success('Status and comments updated successfully');
                    // Optionally, you can fetch applications data again to reflect the changes immediately
                    fetchApplications();
                })
                .catch(error => {
                    console.error('Error updating status and comments:', error);
                    toast.error('Error updating status and comments');
                });
        } else {
            // No changes, close the modal without updating
            setShowModal(false);
        }
    };
    

    return (
        <div>
            <div className="mt-24 grid grid-cols-4 gap-4 sm:grid-cols-1">
                {applications.map(application => (
                    <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col" key={application.id}>
                        <div className="flex-1">

                            <p className="absolute top-0 py-1.5 px-4 bg-sky-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">{application.status}</p>
                            <p className="mt-4 flex items-baseline ">
                                <span className="text-5xl font-extrabold tracking-tight">{application.property_name}</span><span className="ml-1 text-xl font-semibold">₱ {new Intl.NumberFormat().format(application.property_price)}</span>
                            </p>
                            <h3 className="text-xl font-semibold">Realtor Comments: {application.comments}</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 ">{application.first_name}</span></li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 ">{application.last_name}</span></li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 ">{application.email}</span></li>
                            </ul>
                        </div>
                        <button onClick={() => handleUpdateButtonClick(application)} className="bg-sky-500 text-white hover:bg-sky-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">UPDATE APPLICATION STATUS</button>
                        <button onClick={() => setShowImageModal(true)} className="bg-sky-500 text-white hover:bg-sky-700 mt-2 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">View Uploaded Images</button>
                    </div>
                ))}
            </div>
            {showModal && selectedApplication && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Update Application Status</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">APPLICATION STATUS</label>
                                <select id="status" name="status" value={status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="Approve">APPROVE</option>
                                    <option value="Pending">PENDING</option>
                                    <option value="Rejected">REJECTED</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">REALTOR COMMENTS</label>
                                <input type="text" id="comments" name="comments" value={comments} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <button type="submit" className="bg-sky-500 text-white hover:bg-sky-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">UPDATE APPLICATION</button>
                            <button onClick={() => setShowImageModal(false)} className="text-gray-800 hover:bg-sky-500 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">CLOSE</button>
                        </form>
                    </div>
                </div>
            )}
            {showImageModal && selectedApplication && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Uploaded Images</h2>
                        <div className="flex items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Company ID</h3>
                                <img className="mt-2 h-40 w-40" src={selectedApplication.companyid ? selectedApplication.companyid : "https://www.asiaoceania.org/aogs2021/img/no_uploaded.png"} alt="Company ID" />
                            </div>
                            <div className="ml-8">
                                <h3 className="text-lg font-semibold">Certificate of Employment</h3>
                                <img className="mt-2 h-40 w-40" src={selectedApplication.certificate ? selectedApplication.certificate : "https://www.asiaoceania.org/aogs2021/img/no_uploaded.png"} alt="Certificate of Employment" />
                            </div>
                        </div>
                        <button onClick={() => setShowImageModal(false)} className="w-full border border-1 border-sky-500 hover:bg-sky-500 text-gray-800 font-semibold py-2 px-4 mt-4 rounded-md">CLOSE</button>
                    </div>
                </div>
            )}
        </div>
    );
};
//comment
export default ApplicationList;
