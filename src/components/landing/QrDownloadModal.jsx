import React from 'react';

const QrDownloadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        {/* ✖ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-xl text-cyan-600 font-semibold mb-3">Scan to Download</h2>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fappurl.io%2F5hTnayms-O"
            alt="Download App QR"
            className="mx-auto mb-4"
          />
        </div>

        <p className="text-gray-700 mt-4 text-sm">
          Point your mobile camera at the QR code to download the app.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>

          <a
            href="https://apps.apple.com/in/app/arogyalens/id6503949015"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default QrDownloadModal;
