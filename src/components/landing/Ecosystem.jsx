import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CreditCard, MessageCircle, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ecosystemFeatures = [
  {
    icon: FileText,
    title: "EMR & Appointments",
    description: "Digitize patient records, manage appointments effortlessly, and enable secure patient portals."
  },
  {
    icon: CreditCard,
    title: "Billing & Inventory",
    description: "Automate billing accurately, manage pharmacy inventory in real-time, prevent costly stock-outs."
  },
  {
    icon: MessageCircle,
    title: "Patient Engagement",
    description: "Enhance patient communication via automated reminders, patient portals, and integrated telehealth."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Gain real-time insights with customizable dashboards and MIS reports, aiding strategic decisions."
  }
];

const Ecosystem = ({ handleFeatureClick }) => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            One Platform for Your Entire Healthcare Ecosystem
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="flex justify-center items-center mb-6">
                <div className="bg-light-blue w-20 h-20 rounded-full flex items-center justify-center">
                  <feature.icon className="h-10 w-10 text-primary-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-text-dark">{feature.title}</h3>
              <p className="text-text-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button onClick={handleFeatureClick} size="lg" variant="link" className="text-primary-blue text-lg">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Ecosystem;