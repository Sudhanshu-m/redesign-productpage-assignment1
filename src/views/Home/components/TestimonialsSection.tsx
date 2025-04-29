// src/components/TestimonialsSection.tsx
import React from 'react';

const testimonials = [
  {
    name: 'John Doe',
    photo: '/path-to-photo.jpg', // Replace with actual image path
    testimonial: 'This is an amazing product! It has helped me a lot in my daily work.',
  },
  {
    name: 'Jane Smith',
    photo: '/path-to-photo.jpg', // Replace with actual image path
    testimonial: 'Fantastic experience! The service was outstanding and efficient.',
  },
  // Add more testimonials as needed
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">What Our Customers Say</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 text-center italic">"{testimonial.testimonial}"</p>
            <p className="mt-4 text-center font-semibold text-gray-700">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
