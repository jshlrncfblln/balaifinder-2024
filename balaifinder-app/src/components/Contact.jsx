import React, { useEffect } from 'react';

export default function Contact({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Enable scrolling when component unmounts
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="max-w-xl mx-auto flex flex-col outline outline-1 shadow-black shadow-lg rounded-lg bg-white p-8 relative">
        <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={onClose}>
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </div>
        <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
        <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share
          with us!
        </p>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
          <textarea id="message" name="message" className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
        </div>
        <button className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" onClick={onClose}>Send</button>
        <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
      </div>
    </div>
  )
}
