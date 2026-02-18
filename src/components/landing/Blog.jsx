import React from 'react';
import { motion } from 'framer-motion';

const articles = [
  {
    title: "The Future of AI in Healthcare Management",
    excerpt: "Exploring how artificial intelligence is transforming patient care and administrative efficiency.",
    date: "March 15, 2024",
    readTime: "5 min read"
  },
  {
    title: "Preventing Healthcare Worker Burnout",
    excerpt: "Evidence-based strategies for monitoring and preventing burnout in healthcare settings.",
    date: "March 10, 2024",
    readTime: "7 min read"
  },
  {
    title: "HIPAA Compliance in the Digital Age",
    excerpt: "Essential guidelines for maintaining patient privacy in modern healthcare systems.",
    date: "March 5, 2024",
    readTime: "6 min read"
  }
];

const Blog = ({ handleFeatureClick }) => {
  return (
    <section id="blog" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Latest Healthcare Insights
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Stay updated with the latest trends and best practices in healthcare management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-light-blue/50 rounded-2xl overflow-hidden card-hover cursor-pointer"
              onClick={handleFeatureClick}
            >
              <img 
                className="w-full h-48 object-cover" 
                alt={`Blog post: ${article.title}`}
               src="/images/background.png" />
              
              <div className="p-6">
                <div className="flex items-center text-sm text-text-gray mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-text-dark">{article.title}</h3>
                <p className="text-text-gray">{article.excerpt}</p>
                
                <div className="mt-4">
                  <span className="text-primary-blue font-semibold hover:text-primary-blue-dark transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;