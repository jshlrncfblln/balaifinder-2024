import React, { useEffect, useState } from "react";
import { imageDb } from '../../firebase.js';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import UploadFile from "../components/UploadImage.jsx";

export default function Settings(){

    const [imgUrl, setImgUrl] = useState([]);
    const [showModal, setShowModal] = useState(false); // State variable to manage modal visibility
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(()=>{
        listAll(ref(imageDb, "files")).then(imgs=>{
            console.log(imgs);
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=>{
                    // Ensure metadata is available and contains firebaseStorageDownloadTokens property
                    const firebaseStorageDownloadTokens = val.metadata ? val.metadata.firebaseStorageDownloadTokens : null;
                    // Construct full URL
                    const fullUrl = `https://firebasestorage.googleapis.com/v0/b/${imageDb.app.options.storageBucket}/o/${encodeURIComponent(val.fullPath)}?alt=media&token=${firebaseStorageDownloadTokens}`;
                    setImgUrl(data=>[...data, { url: fullUrl, original: val.fullPath }]);
                });
            });
        });
    },[]);

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = imgUrl.slice(indexOfFirstItem, indexOfLastItem);


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(imgUrl.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div> 
            <div className="mb-4">
                <button className="top-0 rounded-full right-0 mt-4 mr-4 py-2.5 px-2.5 bg-sky-500 hover:bg-sky-700 text-white" onClick={() => setShowModal(!showModal)}>Upload Property Assets</button>
            </div>
            {/* Pass setShowModal as a prop to the UploadFile component */}
            <div className="shadow-md shadow-black rounded-md overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr class="bg-gray-300">
                        <th class="w-20 py-4 px-6 text-center text-gray-800 font-bold uppercase">Property Image</th>
                        <th class="w-20 py-4 px-6 text-center text-gray-800 font-bold uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        {currentItems.map((dataVal) => (
                        <tr key={dataVal.url} className="border border-gray-400">
                            <td className="flex items-center justify-center p-2">
                                <img
                                    src={`https://firebasestorage.googleapis.com/v0/b/${imageDb.app.options.storageBucket}/o/${encodeURIComponent(dataVal.original)}?alt=media`}
                                    alt="Uploaded"
                                    height="100px"
                                    width="100px"
                                />
                            </td>
                            <td className="p-2 items-center justify-center">
                                <div className="flex">
                                    <div className="">
                                        <button className="bg-red-500 rounded-md hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1">
                                            Delete
                                        </button>
                                    </div>
                                    <div className="">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1"
                                            onClick={() => {
                                                navigator.clipboard.writeText(dataVal.url);
                                                alert('URL copied to clipboard');
                                            }}
                                        >
                                            Copy URL
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                )}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${currentPage === number ? 'bg-gray-400' : ''}`}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < pageNumbers.length && (
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
            {showModal && <UploadFile setImgUrl={setImgUrl} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
        </div>
    )
}
