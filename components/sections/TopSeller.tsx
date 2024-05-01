"use client"
import { useTheme } from '@/app/context/ThemeProvider';
import { useRef, useState, useEffect } from 'react';
import CreatorCard from '../shared/CreatorCard';
import makeIdAddress from '@/utils/makeIdAddress';
import Image from 'next/image';

const sliceAddress = (address: string) => {
    if (!address || address.length < 3) return address;
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

const TopSeller = () => {
    const [slicedSellerAddress, setSlicedSellerAddress] = useState('');

    const parentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null); 

    const { theme } = useTheme();

    const [hideButtons, setHideButtons] = useState(false);

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
        <div className='pt-8 pb-4 -ml-3'>
            <h1 className="font-poppins text-2xl font-semibold ml-4 xs:ml-0">Top Sellers</h1>
            <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
                    {[1, 2, 3, 4,6,7,8,9,10].map((i) => (
                        <CreatorCard
                            key={`creator-${i}`}
                            rank={i}
                            creatorImage={`/creator${i}.png`}
                            creatorAddress={slicedSellerAddress}
                            creatorEths={10 - i * 0.534}
                        />
                    ))}
                    {!hideButtons && (
                        <>
                            <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 lg:w-12 lg:h-12 top-[45%] cursor-pointer left-0">
                                <Image src={"/left.png"} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'cupcake' ? 'filter invert' : undefined} />
                            </div>
                            <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 lg:w-12 lg:h-12 top-[45%] cursor-pointer right-0">
                                <Image src={"/right.png"} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'cupcake' ? 'filter invert' : undefined} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopSeller;