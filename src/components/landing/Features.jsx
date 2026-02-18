import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, BarChart3, Stethoscope, Database, Users } from 'lucide-react';

const coreFeatures = [
  { icon: FileText, title: "Electronic Medical Records", desc: "Secure, comprehensive patient records with easy access and updates" },
  { icon: Calendar, title: "Appointment Scheduling", desc: "Smart scheduling system with automated reminders and conflict resolution" },
  { icon: BarChart3, title: "Billing & Insurance", desc: "Streamlined billing process with insurance claim management" },
  { icon: Stethoscope, title: "Pharmacy Management", desc: "Complete medication tracking and prescription management" },
  { icon: Database, title: "Inventory Control", desc: "Real-time inventory tracking for medical supplies and equipment" },
  { icon: Users, title: "Staff Management", desc: "Comprehensive staff scheduling and performance tracking" }
];

const Features = ({ handleFeatureClick }) => {
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
            Complete Healthcare Management Suite
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Everything you need to run your healthcare facility efficiently, from patient care to administrative tasks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-light-blue/50 p-8 rounded-2xl shadow-lg card-hover cursor-pointer"
              onClick={handleFeatureClick}
            >
              <div className="bg-light-blue w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-text-dark">{feature.title}</h3>
              <p className="text-text-gray">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;