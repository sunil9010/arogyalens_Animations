import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-secondary text-white py-8 border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <a href="/">
                <img 
                  src="/images/Logos  (500 x 200 px).svg" 
                  alt="arogyalens_logo" 
                  className="h-10 w-auto sm:h-12"
                />
              </a>
            </div>
            <p className="text-text-secondary text-sm mt-2">
              © {new Date().getFullYear()} ArogyaLens | Built with love in India
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a 
              href="https://arogyalens.com/terms-conditions" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              Terms & Conditions
            </a>
            <a 
              href="https://arogyalens.com/cancellation-refund" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              Cancellation & Refund
            </a>
            <a 
              href="https://arogyalens.com/contact-us" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              Contact Us
            </a>
            <Link 
              to="/privacy-policy" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://link.arogyalens.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://link.arogyalens.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
