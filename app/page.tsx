"use client"
import React, { useMemo, useState } from 'react';
import Banner from "@/components/sections/Banner";
import { useTypewriter } from 'react-simple-typewriter';
import NFTSection from '@/components/sections/NFTSection';
import TopSeller from '@/components/sections/TopSeller';
import { BackgroundCircles } from '@/components/designs/Home';
import Details from '@/components/sections/Details';
import { TopCollection } from '@/components/sections/TopCollection';

// Function to wrap each letter in the text with a span element
const wrapLettersWithSpan = (text:any, isTypedText:any) => {
    return text.split('').map((char:any, index:any) => (
        <span key={index} className={`lg:text-7xl md:text-5xl sm:text-3xl text-2xl ${index % 2 === 0 ? 'gradient-text' : ''} ${isTypedText ? 'text-white' : ''}`}>{char}</span>
    ));
};

export default function Home() {
    
    const [text] = useTypewriter({
        words: ['Discover', 'Collect', 'Sell', 'and Bid'],
        loop: 0,
        delaySpeed: 2000,
        typeSpeed: 100,
        deleteSpeed: 60,
    });
    
    const wrappedText = useMemo(() => wrapLettersWithSpan(text, false), [text]); // Memoize wrapped text

    return (
        <main className="min-h-screen min-w-full py-12">
           
            <div className="w-11/12 m-auto px-2 py-12">
                <Banner
                    name={(<>
                        <span className="lg:text-7xl md:text-5xl sm:text-3xl text-2xl">
                            {wrappedText}
                        </span>
                        <br /> extraordinary NFTs
                    </>)}
                    childStyles="md:text-4xl sm:text-2xl text-xl text-left"
                    parentStyle="justify-center sm:h-72 xs:h-60 xs:p-12 p-4 h-44 rounded-3xl"
                />
                <NFTSection name={"MKNDAO Collections"} />
                <TopCollection />
                <NFTSection name={"Hot Bids"} />
                <TopSeller />
                <Details />
            </div>
                <BackgroundCircles />

        </main>
    );
}
