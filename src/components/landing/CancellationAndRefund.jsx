import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header at top */}
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-12 text-white leading-relaxed bg-gray-900 rounded-xl shadow-lg mt-12">
          <h1 className="text-4xl font-extrabold mb-6 border-b border-gray-700 pb-2">
            Cancellation and Refund
          </h1>

          <p className="mb-4">
            <span className="font-semibold">Transactions and Payments:</span>{" "}
            Any payments you make for services through Arogyalens 
            (such as consultation fees, lab test fees, medicine orders, or hospital booking fees) 
            are non-refundable by default. All sales are final, and we offer no returns or refunds 
            on services availed, except in cases where we decide (at our sole discretion) that a refund 
            is justified or where required by applicable law.
          </p>

          <p className="mb-4">
            For instance, if a service you paid for is not delivered at all due to a fault on our or 
            the provider’s part, we may consider a refund or re-service on a case-by-case basis 
            raised via a support ticket in the app. However, if you are unhappy with a completed 
            consultation or change your mind after a service is rendered, you will not be entitled 
            to a refund.
          </p>

          <p className="mb-4">
            If we collect payments on behalf of a provider (e.g., facilitating payment of a doctor’s fee),
            any decision on refunds of that fee will typically lie with the provider and their refund 
            policy. We disclaim responsibility for such financial disputes.
          </p>

          <p className="mb-4">
            We strongly encourage users to carefully review all service details before making any payment.
          </p>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default CancellationAndRefund;
