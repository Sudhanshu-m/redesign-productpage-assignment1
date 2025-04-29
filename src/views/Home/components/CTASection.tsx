// src/components/CTASection.tsx
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join us and take your experience to the next level with our top-notch services. 
          Don't wait, start today!
        </p>
        <a
          href="#contact"
          className="bg-yellow-500 text-gray-800 py-3 px-8 rounded-full font-semibold transition-all hover:bg-yellow-400"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default CTASection;
