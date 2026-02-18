import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, ScanFace } from 'lucide-react';

const wellbeingFeatures = [
  {
    icon: HeartPulse,
    title: "Burnout Monitoring",
    description: "Monitor staff burnout with AI-driven dashboards. Early alerts to maintain staff health.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Shield,
    title: "Incident Logging",
    description: "Report workplace violence securely and anonymously. Foster a safer working environment.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: ScanFace,
    title: "Facial Recognition Attendance",
    description: "Effortlessly manage attendance with facial recognition technology – quick, secure, and precise.",
    color: "bg-green-100 text-green-600"
  }
];

const WellbeingSafety = ({ handleFeatureClick }) => {
  return (
    <section id="features" className="section-padding bg-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Beyond Basic Management: Enhancing Well-being & Safety
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {wellbeingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover cursor-pointer"
              onClick={handleFeatureClick}
            >
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mr-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark">{feature.title}</h3>
              </div>
              <p className="text-text-gray text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WellbeingSafety;