// ✅ Updated Home Page (Redesigned using existing structure)

import React, { useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import HomeFAQs from './components/HomeFAQ';
import ContactForm from './components/ContactForm';
import MainFooter from './components/MainFooter';
import InfoSection from './components/InfoSection';
import FeaturesGrid from './components/FeaturesGrid';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const Home: React.FC = () => {
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const FqRef = useRef(null);

  const scrollToSection = (ref: any) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const hcf = document.querySelector('.hcf-profile');
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > lastScrollTop) {
        hcf?.classList.add('hcf-profile-fixed');
      } else {
        hcf?.classList.remove('hcf-profile-fixed');
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      <HeroSection
        scrollToSection={scrollToSection}
        featuresRef={FqRef}
        contactRef={contactRef}
        aboutRef={aboutRef}
      />

      <section className="!bg-[#eff6ff] relative">
        <FeaturesGrid />
      </section>

      <section className="!bg-white relative" ref={aboutRef}>
        <InfoSection />
      </section>

      <section className="bg-white relative">
        <TestimonialsSection />
      </section>

      <section className="relative bg-white" ref={FqRef}>
        <HomeFAQs />
      </section>

      <section className="bg-white relative" ref={contactRef}>
        <ContactForm />
      </section>

      <CTASection />
      <MainFooter />
    </div>
  );
};

export default Home;
