import React from 'react';
import HeroSection from '../About Page/HeroSection';
import OurBooks from './OurBooks';
import Footer from '../components/Footer';

const Books = () => {
  return (
    <div className='mt-16'>
      <HeroSection />
      <OurBooks />
      <Footer/>
    </div>
  );
};

export default Books; 