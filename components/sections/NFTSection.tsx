"use client"
import React, { useEffect, useState, useRef } from 'react';
import NFTCard from '../shared/NFTCard';
import makeIdAddress from '@/utils/makeIdAddress';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeProvider';
// import { useNFTContext } from '@/app/context/NFTContext';
import useMkdaoItems from '@/app/hooks/useMkdaoItems';

const sliceAddress = (address: any) => {
    if (!address || address.length < 3) return address;
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

const NFTSection = ({ name }: any) => {
    const [slicedSellerAddress, setSlicedSellerAddress] = useState('');
    const [hideButtons, setHideButtons] = useState(false);
    const [metaNFTs, setMetaNFTs] = useState<any[] | null>(null);
    const items = useMkdaoItems();
    console.log(items);
    
    const parentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const handleScroll = (direction: 'left' | 'right') => {
        const { current } = scrollRef;

        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

        if (current) {
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    const isScrollable = () => {
        const { current: scrollCurrent } = scrollRef;
        const { current: parentCurrent } = parentRef;

        if (scrollCurrent && parentCurrent) {
            if (scrollCurrent.scrollWidth >= parentCurrent.offsetWidth) {
                setHideButtons(false);
            } else {
                setHideButtons(true);
            }
        }
    };

    useEffect(() => {
        const address = `0x${makeIdAddress()}`;
        setSlicedSellerAddress(sliceAddress(address));
        isScrollable();
        window.addEventListener('resize', isScrollable);

        return () => {
            window.removeEventListener('resize', isScrollable);
        };
    }, []);

    return (
        <div className='pb-4'>
            <div className='font-poppins ml-2 font-semibold text-2xl'>
                <h3>{name}</h3>
            </div>
            <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none justify-start" ref={scrollRef}>
                    {items.map((item,i) => (
                        <NFTCard
                        key={`nft-${i}`}
                        nft={{
                            i,
                            name: `${item.name}`,
                            description: `${item.features[0].trait_type}`,
                            image: `${item.image}`,
                            edition: `${item.edition}`
                    }}
                        />
                    ))}
                    {!hideButtons && (
                        <div className='z-2'>
                            <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 lg:w-12 lg:h-12 top-[42%] cursor-pointer lg:-left-6 -left-">
                                <Image src={"/left.png"} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'cupcake' ? 'filter invert' : undefined} />
                            </div>
                            <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 lg:w-12 lg:h-12 top-[42%] cursor-pointer right-0">
                                <Image src={"/right.png"} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'cupcake' ? 'filter invert' : undefined} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTSection;
