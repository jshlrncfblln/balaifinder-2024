import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendurl } from '../../backend-connector';
import { useNavigate } from 'react-router-dom';

function VerifyEmailPage() {
  const [verificationMessage, setVerificationMessage] = useState(null);

  useEffect(() => {
    // Extract verification token from URL pathname
    const pathname = window.location.pathname;
    const token = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Make a request to the server to verify the email
    axios.put(`${backendurl}/api/auth/verify/${token}`)
      .then(response => {
        // Handle successful verification
        setVerificationMessage(response.data.message);
        setTimeout(() => {
            navigate('/');
          }, 3000);
      })
      .catch(error => {
        // Handle verification error
        setVerificationMessage(error.response.data.error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Email Verification</h1>
      {verificationMessage && (
        <div className={verificationMessage.startsWith('Error') ? 'error-message' : 'success-message'}>
          {verificationMessage}
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
