"use client"
import { useMemo } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import Banner from '../shared/Banner';
import { useTheme } from '@/app/context/ThemeProvider';


const wrapLettersWithSpan = (text:any, isTypedText:any) => {
    return text.split('').map((char:any, index:any) => (
        <span key={index} className={`lg:text-7xl md:text-5xl sm:text-3xl text-2xl ${index % 2 === 0 ? 'gradient-text' : ''} ${isTypedText ? 'text-white' : ''}`}>{char}</span>
    ));
};

const Hero = () => {
    const { theme } = useTheme();

    const [text] = useTypewriter({
        words: ['Discover', 'Collect', 'Sell', 'and Bid'],
        loop:0,
        delaySpeed: 2000,
        typeSpeed: 100,
        deleteSpeed: 60,
    });
    
    const wrappedText = useMemo(() => wrapLettersWithSpan(text, false), [text]);

  return (
    <div>
        <Banner
              name={(<>
                  <span className="lg:text-7xl md:text-6xl text-2xl sm:text-3xl">
                      {wrappedText}
                  </span>
                  <br /> extraordinary NFTs
              </>)}
              childStyles="text-left"
              parentStyle={`justify-center sm:h-72 xs:h-60 xs:p-12 p-4 h-44 rounded-3xl ${theme ==='dark'? "":"nft-gradient relative mb-8"}`}
        />
    </div>
  )
}

export default Hero