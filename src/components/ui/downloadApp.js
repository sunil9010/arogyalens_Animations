// src/utils/downloadApp.js

export const handleAppDownload = (isDesktop, openModal) => {
  if (!isDesktop) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = 'https://apps.apple.com/in/app/arogyalens/id6503949015';
    } else {
      alert('App download is only supported on Android or iOS devices.');
    }
  } else {
    // Open QR modal for desktop
    openModal();
  }
};
