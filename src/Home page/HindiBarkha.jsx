import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logo from '../assets/logo.png'

const HindiBarkha = () => {
  const verses = [
    "श्री सद्गुरु की है समाधी",
    "सुंदर बनी यह टेकड़ी", 
    "कीर्ति ध्वजा लहरे सदा",
    "महिमा यहाँ की है बड़ी",
    "देव भक्ति देश भक्ति की दिशा मिलती यहाँ"
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        controls.start({
          x: [-containerWidth/4, -containerWidth/2],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          },
        });
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [controls]);

  return (
    <div className="w-full bg-[#f36219] overflow-hidden z-20 h-[70px] flex items-center justify-center  relative">
      <div className="overflow-hidden whitespace-nowrap w-full">
        <motion.div
          ref={containerRef}
          className="inline-block whitespace-nowrap"
          animate={controls}
        >
          {[...Array(6)].map((_, i) => (
            verses.map((verse, index) => (
              <span 
                key={`${i}-${index}`}
                className="text-[#ffffff] font-semibold text-xl  mx-5 inline-block"
              >
                <div className='flex items-center justify-items-center gap-10'>{verse}
                <img src={logo} className='h-[50px]' alt="" /></div>
              </span>
            ))
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HindiBarkha;
