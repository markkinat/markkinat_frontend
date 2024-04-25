"use client"
import React, { useMemo } from 'react';
import Banner from "@/components/sections/Banner";
import Hotbids from "@/components/sections/Hotbids";
import Header from "@/components/shared/Header";
import { useTypewriter } from 'react-simple-typewriter';

// Function to wrap each letter in the text with a span element
const wrapLettersWithSpan = (text:any) => {
    return text.split('').map((char:any, index:any) => (
        <span key={index} className={index % 2 === 0 ? 'gradient-text' : ''}>{char}</span>
    ));
};

export default function Home() {
    const [text] = useTypewriter({
        words: ['Discover', 'Collect', 'Sell', 'and Bid'],
        loop: 2,
        delaySpeed: 1000,
        typeSpeed: 100,
        deleteSpeed: 80
    });
    const wrappedText = useMemo(() => wrapLettersWithSpan(text), [text]); // Memoize wrapped text

    return (
        <main className="min-h-screen min-w-full">
            <Header />
            <div className="w-11/12 m-auto py-12 px-2">
                <Banner
                    name={(<>
                        <span className="lg:text-7xl md:text-5xl sm:text-3xl text-2xl">
                            {wrappedText}
                        </span>
                        <br /> extraordinary NFTs
                    </>)}
                    childStyles="md:text-4xl sm:text-2xl text-xl text-left"
                    parentStyle="justify-start sm:h-72 xs:h-60 xs:p-12 p-4 h-44 rounded-3xl"
                />
                <Hotbids />
            </div>
        </main>
    );
}
