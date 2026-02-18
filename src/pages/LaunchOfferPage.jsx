import React from 'react';
import { useEffect,useState} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, CheckCircle, Building, User, Gift, MessageSquare, Tag } from 'lucide-react';
import QrModal from '../components/landing/QrDownloadModal'; 
const faqs = [
  {
    q: "How long will the launch offer be available?",
    a: "This offer is valid for a limited time during our launch period. We recommend claiming it early to lock in your benefits."
  },
  {
    q: "Can I choose my website design?",
    a: "We provide clean, professional templates designed for medical professionals. While you can’t request custom layouts, branding and content will be tailored for your practice. All you have to do is provide us with basic information and few pictures(optional)."
  },
  {
    q: "What does “verification” mean for this offer?",
    a: "To qualify, users must complete their Arogya Lens profile and confirm their identity or association with a valid registration number(as per your speciality/branch) . This ensures the offer is given to real, practicing professionals. Verification process takes upto 72 hours after submission, in case of any issues please email to cs@arogyalens.com or raise a support ticket on the app and our team will take care of it."
  },
  {
    q: "Who handles the domain and hosting?",
    a: "Everything is included and taken care of under the Arogya Lens launch offer for the first year."
  },
  {
    q: "Can I edit or update the website later?",
    a: "Major redesigns are not covered under this launch offer. However you can request changes for a minimal fee."
  }
];

const CtaButtons = ({ onClaimClick }) => {

   

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
        <Button  onClick={onClaimClick} size="lg" className="w-full sm:w-auto bg-accent-blue text-dark-primary font-bold hover:bg-accent-blue/90 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6">
          <Tag className="mr-3 h-6 w-6" />
          Claim This Offer
        </Button>
      

       <a href="https://wa.me/918595467431" target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="w-full sm:w-auto bg-dark-secondary text-accent-cyan border-2 border-accent-cyan hover:bg-accent-cyan hover:text-dark-primary font-bold transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6">
          <MessageSquare className="mr-3 h-6 w-6" />
          WhatsApp Us
        </Button>
      </a>
    </div>
  );
};



const LaunchOfferPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
    if (isModalOpen) {
      const handleScroll = () => {
        setIsModalOpen(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isModalOpen]);
 const handleClaimClick = () => {
    const isDesktop = window.innerWidth >= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (!isDesktop) {
      if (/android/i.test(userAgent)) {
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens';
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href =
          'https://apps.apple.com/in/app/arogyalens/id6503949015';
      } else {
        alert('App download is only supported on Android or iOS devices.');
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Launch Offer - Arogya Lens</title>
        <meta name="description" content="Get a free professional website for your clinic or a personal portfolio website for just ₹999 with your ArogyaLens subscription. Exclusive limited-time launch offer for verified doctors and clinics." />
        <meta name="keywords" content="launch offer, free website, doctor portfolio, clinic website, arogyalens offer, healthcare promotion" />
        <meta property="og:title" content="Launch Offer - Arogya Lens" />
        <meta property="og:description" content="Get a free professional website for your clinic or a personal portfolio website for just ₹999 with your ArogyaLens subscription." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.arogyalens.com/launch-offer" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Launch Offer - Arogya Lens" />
        <meta name="twitter:description" content="Get a free professional website for your clinic or a personal portfolio website for just ₹999 with your ArogyaLens subscription." />
      </Helmet>
      
      <div className="bg-dark-primary text-text-primary">
        <header className="sticky top-0 w-full bg-dark-primary/80 backdrop-blur-lg border-b border-border-color z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
  <a href="/">
    <img 
      src="/images/Logos  (500 x 200 px).svg" 
      alt="arogyalens_logo" 
      className="h-10 w-auto sm:h-12"
    />
  </a>
</div>

              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="section-padding text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-cyan/10"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold text-gradient mb-4">
                Get a Website with Your ArogyaLens Subscription
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-text-secondary">
                Exclusively for verified clinics and doctors. No setup hassle, no hidden charges.
              </motion.p>
            </div>
          </section>

          <section className="section-padding bg-dark-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">What You Get</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="card-glow-border p-8 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Building className="h-8 w-8 text-accent-blue mr-4" />
                    <h3 className="text-2xl font-bold text-text-primary">For Clinics and Hospitals</h3>
                  </div>
                  <ul className="space-y-3 text-text-secondary text-lg flex-grow">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Professionally designed website — absolutely free</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Mobile responsive, fast loading</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Customized with your branding</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Only for verified Arogya Lens subscribers</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />We handle everything — design, content, and setup</li>
                  </ul>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="card-glow-border p-8 flex flex-col">
                  <div className="flex items-center mb-4">
                    <User className="h-8 w-8 text-accent-blue mr-4" />
                    <h3 className="text-2xl font-bold text-text-primary">For Individual Doctors</h3>
                  </div>
                  <ul className="space-y-3 text-text-secondary text-lg flex-grow">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Personal portfolio website at just ₹999</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Mobile-friendly, optimized for search</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Showcase clinic timings, specialization & contact info</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Only for verified doctors on Arogya Lens</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-accent-cyan mr-3 mt-1 flex-shrink-0" />Get a polished, professional web presence</li>
                  </ul>
                  <div className="mt-6 p-4 bg-dark-primary rounded-lg border border-accent-cyan/30">
                    <p className="text-text-primary font-semibold"><Gift className="inline h-5 w-5 mr-2 text-accent-cyan" />Refer a verified clinic or hospital and get your fee waived off — we’ll refund the full ₹999 as a thank you.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Why This Matters</h2>
              <ul className="space-y-4 text-text-primary text-xl text-left inline-block">
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-accent-blue mr-4 mt-1 flex-shrink-0" />A verified web presence builds credibility</li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-accent-blue mr-4 mt-1 flex-shrink-0" />Stand out online and attract more patients</li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-accent-blue mr-4 mt-1 flex-shrink-0" />Your digital reputation is now your first impression</li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-accent-blue mr-4 mt-1 flex-shrink-0" />Search engines prefer verified, secure medical listings</li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-accent-blue mr-4 mt-1 flex-shrink-0" />Link your Arogya Lens profile directly on the site</li>
              </ul>
              <div className="mt-12">
                <CtaButtons onClaimClick={handleClaimClick} />

              </div>
            </div>
          </section>

          <section className="section-padding bg-dark-secondary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left text-text-primary">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-text-secondary text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="section-padding">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">Ready to Go Digital?</h2>
              <p className="text-xl text-text-secondary mb-8">Claim your professional website today and build the trust you deserve.</p>
             <CtaButtons onClaimClick={handleClaimClick} />

            </div>
          </section>
        </main>

        <footer className="bg-dark-secondary border-t border-border-color py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
                <p>© {new Date().getFullYear()} ArogyaLens | All Rights Reserved</p>
            </div>
            <QrModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </footer>
      </div>
    </>
  );
};

export default LaunchOfferPage;