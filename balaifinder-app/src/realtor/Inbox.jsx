import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendurl } from "../../backend-connector";

const MessageList = ({ messages, onSelectMessage }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState('');

    const handleUpdateButtonClick = async (message) => {
        setSelectedMessage(message);
        setShowModal(true);
        try {
            const response = await axios.get(`${backendurl}/api/get/application/${message.id}/status`);
            setStatus(response.data.status);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching status and comments:', error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setSelectedStatus(value);
        } else if (name === 'comments') {
            setComments(value);
        }
    };
    

    const handleStatusUpdate = async () => {
        try {
            await axios.put(`${backendurl}/api/update/application/${selectedMessage.id}/status`, {
                status: selectedStatus,
                comments: selectedMessage.comments
            });
            // Optionally, you can fetch updated messages here
            setShowModal(false);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleStatusUpdate();
    };

    return (
        <div className="">
            <div className="grid grid-cols-3 gap-4">
                {messages.map((message) => (
                    <div className="relative p-8 border border-gray-400 rounded-lg shadow-md flex flex-col" key={message.id}>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold">{message.comments}</h3>
                            <p className="absolute top-0 py-1.5 px-4 bg-sky-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">{message.status}</p>
                            <p className="mt-4 flex items-baseline ">
                                <span className="text-base font-bold tracking-tight">{message.name}</span><span className="ml-1 text-base font-semibold">{message.price}</span>
                            </p>
                            <p className="mt-6 ">{message.status}</p>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 text-base">First Name: {message.first_name}</span></li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 text-base">Last Name: {message.last_name}</span></li>
                                <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg><span className="ml-3 text-base">Email: {message.email}</span></li>
                            </ul>
                        </div>
                        <button onClick={() => handleUpdateButtonClick(message)} className="bg-sky-500 text-white hover:bg-sky-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">UPDATE APPLICATION STATUS</button>
                    </div>
                ))}
            </div>
            {showModal && selectedMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-2xl font-semibold mb-4">Update Application Status</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">APPLICATION STATUS</label>
                                <input type="text" id="status" name="status" value={status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">REALTOR COMMENTS</label>
                                <input type="text" id="comments" name="comments" value={comments} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <button type="submit" className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">UPDATE APPLICATION</button>
                            <button className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">MARK APPLICATION AS DONE</button>
                            <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const MessageDetail = ({ message }) => {
    return (
        <div className="p-4">
            <div className="font-bold">{message.sender}</div>
            <div>{message.subject}</div>
            <div>{message.body}</div>
        </div>
    );
};

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${backendurl}/api/get/applications`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="flex items-center">
            <div className="w-4/5">
                <MessageList messages={messages} onSelectMessage={setSelectedMessage} />
                {selectedMessage && <MessageDetail message={selectedMessage} />}
            </div>
        </div>
    );
};

export default Inbox;
