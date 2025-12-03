import Hero from '@/lib/components/Hero';
import ComparisonSection from '@/lib/components/ComparisonSection';
import Features from '@/lib/components/Features';
import SocialProof from '@/lib/components/SocialProof';
import WhyChooseUs from '@/lib/components/WhyChooseUs';
import HowItWorks from '@/lib/components/HowItWorks';
import TrustLayer from '@/lib/components/TrustLayer';
import MarketTicker from '@/lib/components/MarketTicker';
import RevenueCalculator from '@/lib/components/RevenueCalculator';
import Ecosystem from '@/lib/components/Ecosystem';
import TrustSignals from '@/lib/components/TrustSignals';
import Solutions from '@/lib/components/Solutions';
import ProblemSolution from '@/lib/components/ProblemSolution';
import GlobalScale from '@/lib/components/GlobalScale';
import BusinessTypes from '@/lib/components/BusinessTypes';

import React from 'react';

const Home: React.FC = () => {
    return (
        <>
            <Hero/>
            <SocialProof/>
            <ProblemSolution/>
            <ComparisonSection/>
            <GlobalScale/>
            <BusinessTypes/>
            <TrustLayer/>
            <MarketTicker/>
            <Ecosystem/>
            <Solutions/>
            <HowItWorks/>
            <WhyChooseUs/>
            <Features/>
            <RevenueCalculator/>
            <TrustSignals/>
        </>
    );
};

export default Home;
