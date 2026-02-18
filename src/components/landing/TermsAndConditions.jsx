import React from "react";
import Footer from "./Footer";
import Header from './Header'

const TermsAndConditions = () => {
  return (
    <>
<Header/>
    <div className="max-w-5xl mx-auto px-6 py-12 text-white leading-relaxed bg-gray-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        In addition to our{" "}
        <a
          href="https://arogyalens.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          privacy practices
        </a>
        , when using Arogyalens, all users must adhere to certain terms of use designed to protect everyone’s interests (especially ours, as the platform provider). Below are key user responsibilities and acknowledgments:
      </p>

      {/* User Responsibilities */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibilities</h2>

      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>Account Security:</strong> Users must provide accurate information, keep credentials secure, and report unauthorized access. We may suspend compromised or misused accounts.
        </li>
        <li>
          <strong>Accuracy of Information:</strong> Users (including doctors) are responsible for providing truthful information. We verify some content but disclaim responsibility for user-submitted data.
        </li>
        <li>
          <strong>Prohibited Uses:</strong> Do not engage in unlawful, harmful, or disruptive activities. Misuse can lead to suspension or legal action.
        </li>
        <li>
          <strong>User-Generated Content:</strong> Users must follow content guidelines when posting reviews, ratings, or feedback. We may moderate, but are not liable for such content.
        </li>
        <li>
          <strong>No Emergency Services:</strong> Arogyalens is not for emergency use. In critical situations, contact emergency services or visit a hospital.
        </li>
        <li>
          <strong>Applicable Medical Guidelines:</strong> Users and providers must comply with Telemedicine Guidelines and relevant laws. Violations may result in suspension or legal action.
        </li>
      </ul>

      {/* Third-Party Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Links and Services</h2>

      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>Third-Party Websites:</strong> Clicking external links takes you out of Arogyalens. We don’t control or guarantee third-party content or practices.
        </li>
        <li>
          <strong>Third-Party Services within Arogyalens:</strong> Services like lab bookings may be fulfilled by partners. Their terms and privacy policies apply.
        </li>
        <li>
          <strong>Social Media Plugins:</strong> Interaction with plugins like Facebook or Twitter is governed by the social media platform's policies.
        </li>
      </ul>

      {/* Disclaimers Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Platform Disclaimers and Limitations
      </h2>

      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>No Medical Advice:</strong> Arogyalens is a tech platform. Medical advice comes from independent practitioners.
        </li>
        <li>
          <strong>No Endorsements:</strong> We don’t recommend or guarantee any specific doctor or provider listed.
        </li>
        <li>
          <strong>“As Is” Services:</strong> We offer the platform without warranties. You use it at your own risk.
        </li>
        <li>
          <strong>Healthcare Outcomes:</strong> We are not responsible for the outcome of any medical interaction or treatment.
        </li>
        <li>
          <strong>User Conduct:</strong> We are not liable for user actions or content posted on the platform.
        </li>
        <li>
          <strong>Transactions:</strong> Payments made are non-refundable unless required by law or approved by us.
        </li>
        <li>
          <strong>Limitation of Damages:</strong> We are not responsible for indirect or consequential damages.
        </li>
        <li>
          <strong>Cap on Liability:</strong> Our total liability is limited to the amount paid by you (if any) within 6 months.
        </li>
        <li>
          <strong>Indemnification:</strong> You agree to defend and indemnify us against legal claims related to your misuse of the platform.
        </li>
        <li>
          <strong>Safe Harbor as Intermediary:</strong> As an intermediary under Indian law, we are not liable for third-party content but act on takedown requests where appropriate.
        </li>
      </ul>

      <p className="mt-8 text-sm text-gray-300">
        If you do not agree with these terms, please refrain from using the Arogyalens platform. Your continued use implies acceptance of all terms stated above.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;
