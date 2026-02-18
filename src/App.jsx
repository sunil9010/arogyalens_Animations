import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { pageView } from './analytics';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import NewFeatures from '@/components/landing/NewFeatures';
import WhyUs from '@/components/landing/WhyUs';
import Security from '@/components/landing/Security';
import LaunchOffer from '@/components/landing/LaunchOffer';
import NewPricing from '@/components/landing/NewPricing';
import Testimonials from '@/components/landing/Testimonials';
import Contact from '@/components/landing/Contact';
import CtaBanner from '@/components/landing/CtaBanner';
import Footer from '@/components/landing/Footer';
import BackToTop from '@/components/ui/BackToTop';
import LaunchOfferPage from '@/pages/LaunchOfferPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import OfferPopup from '@/components/landing/OfferPopup';
import RoiMetrics from '@/components/landing/RoiMetrics';
import FullFeatureList from '@/components/landing/FullFeatureList';
import CookieConsent from '@/components/ui/CookieConsent';
import ContactUs from './components/landing/ContactUs';
import TermsAndConditions from './components/landing/TermsAndConditions';
import CancellationAndRefund from './components/landing/CancellationAndRefund';

const HomePage = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  
  React.useEffect(() => {
    const hasVisited = localStorage.getItem('arogyaLensVisited');
    if (!hasVisited) {
        const timer = setTimeout(() => {
            setShowPopup(true);
            localStorage.setItem('arogyaLensVisited', 'true');
        }, 10000); 

        return () => clearTimeout(timer);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);

  return (
    <main>
      <Helmet>
        <title>Arogya Lens - India's Most Doctor-Friendly Hospital Management App</title>
        <meta name="description" content="ArogyaLens offers a complete hospital management solution with EMR, billing, appointment scheduling, and unique features like staff burnout alerts and SOS tools, all built by doctors for doctors." />
        <meta name="keywords" content="hospital management app, EMR, electronic medical records, doctor-friendly software, clinic management, ArogyaLens, healthcare IT, medical billing, staff burnout, India" />
        <meta property="og:title" content="Arogya Lens - India's Most Doctor-Friendly Hospital Management App" />
        <meta property="og:description" content="ArogyaLens offers a complete hospital management solution with EMR, billing, appointment scheduling, and unique features like staff burnout alerts and SOS tools, all built by doctors for doctors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.arogyalens.com/" />
        <meta property="og:image" content="https://storage.googleapis.com/hostinger-horizons-assets-prod/333d5985-985f-4e9a-be89-e846d9cb7525/fdf0cb903ac40c9987b36ffc27a43ab7.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arogya Lens - India's Most Doctor-Friendly Hospital Management App" />
        <meta name="twitter:description" content="ArogyaLens offers a complete hospital management solution with EMR, billing, appointment scheduling, and unique features like staff burnout alerts and SOS tools, all built by doctors for doctors." />
        <meta name="twitter:image" content="https://storage.googleapis.com/hostinger-horizons-assets-prod/333d5985-985f-4e9a-be89-e846d9cb7525/fdf0cb903ac40c9987b36ffc27a43ab7.jpg" />
      </Helmet>
      <Hero />
      <NewFeatures />
      <WhyUs />
      <FullFeatureList />
      <Security />
      <LaunchOffer />
      <NewPricing />
      <RoiMetrics />
      <Testimonials />
      <Contact />
      <CtaBanner />
      <OfferPopup isOpen={showPopup} onOpenChange={setShowPopup} />
    </main>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-dark-primary text-text-primary">
        <Toaster />
        
        {isHomePage && <Header 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
        />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/launch-offer" element={<LaunchOfferPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
           <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
             <Route path="/cancellation-refund" element={<CancellationAndRefund />} />
        </Routes>

        {isHomePage && <Footer />}

        {isHomePage && <BackToTop />}
        <CookieConsent />
      </div>
    </>
  );
}

export default App;