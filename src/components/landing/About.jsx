import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "500+", label: "Healthcare Facilities" },
  { value: "1M+", label: "Patients Served" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];

const About = () => {
  return (
    <section className="section-padding bg-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              className="w-full h-auto rounded-2xl shadow-2xl" 
              alt="ArogyaLens team working on healthcare solutions"
             src="/images/about.png" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              About ArogyaLens
            </h2>
            
            <p className="text-xl text-text-gray mb-6">
              Founded by healthcare professionals and technology experts, ArogyaLens was born from the need to address real challenges in healthcare management.
            </p>
            
            <p className="text-lg text-text-gray mb-8">
              Our mission is to empower healthcare providers with intelligent tools that not only streamline operations but also prioritize the wellbeing of both patients and staff. We believe that technology should enhance human care, not replace it.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-blue mb-2">{stat.value}</div>
                  <div className="text-text-gray">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;