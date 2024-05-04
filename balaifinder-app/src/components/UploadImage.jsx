import React, { useEffect, useState } from "react";
import { imageDb } from '../../firebase.js'; // Importing the Firebase database reference
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"; // Importing Firebase storage functions
import { v4 } from "uuid"; // Importing UUID for generating unique identifiers
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadFile({ onClose }) {
    const [img, setImg] = useState(''); // State to store the selected image file
    const [imgUrl, setImgUrl] = useState([]); // State to store the URLs of uploaded images
    const [previewImage, setPreviewImage] = useState(null); // State to store the preview image

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Validate that the file is an image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImg(file);
        }
    }

    const handleClick = () => {
        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then(value => {
                console.log(value);
                getDownloadURL(value.ref).then(url => {
                    setImgUrl(data => [...data, { url, original: value.metadata.fullPath }]);
                    setPreviewImage(null);
                    setImg(null);
                    document.getElementById("fileInput").value = "";
                    toast.success('Property Image uploaded successfully');
                });
            }).catch(error => {
                console.error('Error uploading image:', error);
                toast.error('Error uploading image. Please try again.');
            });
        }
    };

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
        }).catch(error => {
            console.error('Error listing images:', error);
        });
    },[]);

    return (
        <div>
            <ToastContainer />
            <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg relative">
                        <button className="absolute top-2 right-2 text-gray-800 rounded-full px-2 py-2 hover:bg-red-500 hover:text-white" onClick={onClose} >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Upload Property File</h2>
                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-6 py-8 text-center">
                            <label htmlFor="fileInput">
                                {previewImage ? (
                                    <div className='h-40 w-40 mx-auto mb-4'>
                                        <img src={previewImage} className="h-full w-full object-contain" alt="Preview" />
                                    </div>
                                ) : (
                                    <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
                                    </svg>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-400">Click here to upload your files here or <label htmlFor="fileInput" className="cursor-pointer text-blue-500 hover:underline">browse</label> to upload.</p>
                            </label>
                            <input type="file" className="hidden" id="fileInput" onChange={handleFileInputChange} />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50" onClick={handleClick}>Upload</button>
                    </div>
                </div>
            </div>
         </div>   
    );
}

export default UploadFile;
