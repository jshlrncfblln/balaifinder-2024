import React from 'react';

const TermsModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white px-8 py-6 rounded shadow-md max-w-2xl z-50">
        <h2 className="text-lg font-bold mb-4">Terms and Conditions</h2>
        {/**This is the terms content */}
        <div className="terms-content">
            <p className="mb-4">
                Welcome to BalaiFinder! These Terms and Conditions govern your access to and use of our services, including our website through which we provide our services. By accessing or using our System, you agree to be bound by these Terms. <br />
                <br />
                1. For Users: <br />
                <br />
                1.1.  Description of Service: BalaiFinder helps users discover houses based on their preferences. Users can input their criteria such as location, budget, size, amenities, and more to find suitable housing options. <br />
                <br />
                1.2. User Eligibility: You must be at least 18 years old to use BalaiFinder. By using our System, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein. <br />
                <br />
                1.3. Accuracy of Information: While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of any information provided through BalaiFinder. Users are responsible for verifying the accuracy of any information before making decisions based on it. <br />
                <br />
                1.4. Privacy Policy: Our Privacy Policy governs the collection, use, and disclosure of your personal information. By using BalaiFinder, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy. <br />
                <br />
                1.5. User Conduct: Users agree not to use BalaiFinder for any unlawful or prohibited purpose, including but not limited to violating any applicable laws or regulations, infringing upon the rights of others, or engaging in any activity that could harm our System or other users. <br />
                <br />
                1.6. Intellectual Property: All content and materials available on BalaiFinder, including but not limited to text, graphics, logos, images, and software, are the property of our company or its licensors and are protected by copyright, trademark, and other intellectual property laws. <br />
                <br />
                1.7. Third-Party Links: BalaiFinder may contain links to third-party websites or resources. We are not responsible for the availability or accuracy of such websites or resources, and we do not endorse or warrant the products, services, or content available through them. <br />
                <br />
                1.8. Limitation of Liability: To the fullest extent permitted by law, we disclaim any liability for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for lost profits, lost data, or other intangible losses, arising from or relating to your use of BalaiFinder. <br />
                <br />
                1.9. Indemnification: You agree to indemnify, defend, and hold harmless our company, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, arising from or relating to your use of BalaiFinder or any violation of these Terms. <br />
                <br />
                1.10. Changes to Terms: We reserve the right to modify or revise these Terms at any time by posting the updated Terms on BalaiFinder. Your continued use of BalaiFinder after any such changes constitutes your acceptance of the revised Terms. <br />
                <br />
                1.11. Governing Law: These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. <br />
                <br />
                1.12. Contact Us: If you have any questions or concerns about these Terms for users, please contact us using the provided contact information. <br />
                <br />
                2. For Realtors: <br />
                <br />
                2.1. Realtor Eligibility: To register and use BalaiFinder as a realtor, you must hold a valid real estate license in the relevant jurisdiction. By using our System as a realtor, you represent and warrant that you have the necessary qualifications and authority to provide real estate services. <br />
                <br />
                2.2. Listing Properties: As a realtor on BalaiFinder, you may list properties that you have the authorization to sell or rent. You are responsible for ensuring the accuracy and legality of all property listings, including any descriptions, photographs, and other information provided. <br />
                <br />
                2.3. Compliance with Laws and Regulations: Realtors using BalaiFinder agree to comply with all applicable laws, regulations, and professional standards governing the real estate industry in their jurisdiction. This includes but is not limited to fair housing laws, advertising regulations, and ethical guidelines. <br />
                <br />
                2.4. Communication with Users: Realtors are responsible for responding promptly and professionally to inquiries from users of BalaiFinder. Any communication with users must be truthful, transparent, and in compliance with applicable laws and regulations. <br />
                <br />
                2.5. Intellectual Property: By listing properties on BalaiFinder, realtors grant our company a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the listing content for the purpose of operating and promoting BalaiFinder. <br />
                <br />
                2.6. User Data: Realtors agree to handle user data obtained through BalaiFinder in accordance with our Privacy Policy. Realtors may only use user data for the purpose of providing real estate services and may not disclose or sell user data to third parties without consent. <br />
                <br />
                2.7. Fees and Payments: BalaiFinder may charge realtors fees for certain services, such as premium listings or advertising. Realtors are responsible for paying any applicable fees in a timely manner as outlined in our fee schedule. <br />
                <br />
                2.8. Indemnification: Realtors agree to indemnify, defend, and hold harmless our company, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs arising from or relating to their use of BalaiFinder or any violation of these Terms. <br />
                <br />
                2.9. Changes to Terms: We reserve the right to modify or revise these Terms for realtors at any time by posting the updated Terms on BalaiFinder. Continued use of BalaiFinder after any such changes constitutes acceptance of the revised Terms. <br />
                <br />
                2.10. Governing Law: These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. <br />
                <br />
                2.11. Contact Us: If you have any questions or concerns about these Terms for realtors, please contact us using the provided contact information. <br />
                <br />
                By using BalaiFinder as a user or realtor, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use BalaiFinder. <br />
            </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="text-white bg-sky-500 hover:bg-sky-700 hover:shadow-md hover:shadow-black px-3 py-2 rounded-md"           onClick={closeModal}
          >
            Read and Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
