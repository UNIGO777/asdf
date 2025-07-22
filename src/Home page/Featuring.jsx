import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            className={`p-10 ${index % 2 === 0 ? 'bg-amber-900' : 'bg-orange-500'} text-white flex flex-col h-full`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
        >
            <div className="text-3xl mb-4">
                <span className="text-3xl">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ">{feature.title}</h3>
            <p className="text-sm mb-4">{feature.description}</p>
        </motion.div>
    )
}

const Featuring = () => {
    const [whatWeOfferData, setWhatWeOfferData] = useState({
        sectionTitle: "What We Offer",
        features: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWhatWeOfferData = async () => {
            try {
                const response = await fetch('https://narayan-website-backend.onrender.com/api/what-we-offer');
                const result = await response.json();
                
                if (result.success) {
                    setWhatWeOfferData(result.data);
                }
            } catch (error) {
                console.error('Error fetching what we offer data:', error);
                // Keep default data on error
            } finally {
                setLoading(false);
            }
        };

        fetchWhatWeOfferData();
    }, []);

    return (
        <section className="py-10 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 kalam-regular text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {loading ? 'Loading...' : whatWeOfferData.sectionTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {!loading && whatWeOfferData.features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Featuring