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
    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 3;

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        axios.get(`${backendurl}/api/get/applications`)
            .then(response => {
                Promise.all(response.data.map(application =>
                    axios.get(`${backendurl}/api/get/properties/${application.property_id}`)
                ))
                .then(propertyResponses => {
                    const updatedApplications = response.data.map((application, index) => ({
                        ...application,
                        property_name: propertyResponses[index].data.name,
                        property_price: propertyResponses[index].data.price,
                        property_location: propertyResponses[index].data.location,
                        property_image: propertyResponses[index].data.imgsrc
                    }));
                    setApplications(updatedApplications);
                })
                .catch(error => {
                    console.error('Error fetching property details:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching applications:', error);
            });
    };

    const handleUpdateButtonClick = (application) => {
        setSelectedApplication(application);
        axios.get(`${backendurl}/api/get/application/${application.id}/status`)
            .then(response => {
                setStatus(response.data.status);
                setComments(response.data.comments);
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error fetching status and comments:', error);
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
        if (status !== selectedApplication.status || comments !== selectedApplication.comments) {
            axios.put(`${backendurl}/api/update/application/${selectedApplication.id}/status`, {
                status: status,
                comments: comments
            })
                .then(response => {
                    console.log('Status and comments updated successfully');
                    setShowModal(false);
                    toast.success('Status and comments updated successfully');
                    fetchApplications();
                })
                .catch(error => {
                    console.error('Error updating status and comments:', error);
                    toast.error('Error updating status and comments');
                });
        } else {
            setShowModal(false);
        }
    };

    const indexOfLastApplication = currentPage * applicationsPerPage;
    const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
    const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
    const totalPages = Math.ceil(applications.length / applicationsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Approve':
                return 'bg-green-500 text-white';
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Rejected':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className='flex-grow shadow-md overflow-hidden shadow-md outline outline-1 sm:rounded-lg mx-4 md:mx-10 mt-8 mb-24'>
            <h1 className='text-3xl font-bold text-gray-800 uppercase text-center mt-8 mb-8'>LIST OF APPLICATIONS</h1>
            {applications.length === 0 ? (
                <p className="text-center text-lg text-gray-800">No buyers yet want to apply.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {currentApplications.map(application => (
                        <div key={application.id} className="bg-white rounded-lg shadow-md p-4 relative border border-1 border-gray-400">
                            <img
                                src={application.property_image ? application.property_image : 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380'}
                                className="h-40 w-full object-cover rounded-lg"
                            />
                            <span className={`${getStatusClass(application.status)} py-1 px-2 rounded-full text-xs absolute top-2 right-2`}>{application.status}</span>
                            <div className="mt-2">
                                <h2 className="text-lg font-bold">{application.property_name}</h2>
                                <p className="text-lg text-gray-800 mt-2">₱ {new Intl.NumberFormat().format(application.property_price)}</p>
                                <p className="text-lg text-gray-800 mt-2 font-semibold">Applicants Name:  <span className='uppercase font-normal'>{application.last_name}, {application.first_name}</span></p>
                                <p className="text-lg text-gray-800 mt-2 font-semibold">Applicants Email:  <span className='font-normal'>{application.email}</span></p>
                                <p className="text-lg text-gray-800 mt-2 font-semibold">Note: <span className='font-normal'>{application.comments}</span></p>
                            </div>
                            <button onClick={() => handleUpdateButtonClick(application)} className="bg-sky-500 text-white text-lg sm:text-sm hover:bg-sky-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center">Update Status</button>
                            <button onClick={() => setShowImageModal(true)} className="hover:bg-sky-500 text-gray-800 hover:text-white outline outline-1 outline-sky-500 text-lg sm:text-sm mt-2 block w-full py-3 px-6 border border-transparent rounded-md text-center">View Credentials</button>
                        </div>
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
            {showModal && selectedApplication && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-8">Update Application Status</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">APPLICATION STATUS</label>
                                <select id="status" name="status" value={status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option disabled hidden>Update Status to?</option>
                                    <option value="Approve">APPROVE</option>
                                    <option value="Pending">PENDING</option>
                                    <option value="Rejected">REJECTED</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">REALTOR COMMENTS</label>
                                <textarea id="comments" name="comments" value={comments} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <button type="submit" className="bg-sky-500 text-white hover:bg-sky-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">Update Application</button>
                            <button onClick={() => setShowModal(false)} className="text-gray-800 hover:bg-sky-500 mt-2 block w-full py-3 px-6 outline outline-1 outline-sky-500 hover:text-white rounded-md text-center font-medium">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            {showImageModal && selectedApplication && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Buyers Credentials</h2>
                        <div className="flex items-center justify-center">
                            <div>
                                <h3 className="text-lg font-semibold text-center">Company ID</h3>
                                <img className="mt-2 h-60 w-60" src={selectedApplication.companyid ? selectedApplication.companyid : "https://www.asiaoceania.org/aogs2021/img/no_uploaded.png"} alt="Company ID" />
                            </div>
                            <div className="ml-8">
                                <h3 className="text-lg font-semibold text-center">Certificate of Employment</h3>
                                <img className="mt-2 h-60 w-60" src={selectedApplication.certificate ? selectedApplication.certificate : "https://www.asiaoceania.org/aogs2021/img/no_uploaded.png"} alt="Certificate of Employment" />
                            </div>
                        </div>
                        <button onClick={() => setShowImageModal(false)} className="w-full border border-1 border-sky-500 hover:bg-sky-500 text-gray-800 hover:text-white font-normal py-2 px-4 mt-4 rounded-md">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationList;
