import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('arogyaLensCookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = (consentType) => {
    localStorage.setItem('arogyaLensCookieConsent', consentType);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-dark-secondary border-t border-border-color p-4 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Cookie className="h-8 w-8 text-accent-blue flex-shrink-0" />
              <p className="text-text-secondary text-sm md:text-base">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                <a  href='https://arogyalens.com/privacy-policy' className="text-cyan-500 font-semibold text-sm md:text-base" >    Learn More</a>
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <Button
                onClick={() => handleAccept('necessary')}
                variant="outline"
                className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-dark-primary"
              >
                Accept Only Necessary
              </Button>
              <Button
                onClick={() => handleAccept('all')}
                className="bg-accent-blue text-dark-primary hover:bg-accent-blue/90"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;