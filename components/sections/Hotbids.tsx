"use client"
import React, { useEffect, useState } from 'react';
import NFTCard from '../shared/NFTCard';
import makeIdAddress from '@/utils/makeIdAddress';

const sliceAddress = (address:any) => {
    if (!address || address.length < 3) return address;
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
};

const Hotbids = () => {
    const [sellerAddress, setSellerAddress] = useState('');
    const [slicedSellerAddress, setSlicedSellerAddress] = useState('');

    useEffect(() => {
        const address = `0x${makeIdAddress()}`;
        setSellerAddress(address);
        setSlicedSellerAddress(sliceAddress(address));
    }, []); 

    return (
        <div className='py-14 px-2'>
            <div className='font-poppins font-semibold text-2xl'>
                <h3>Hot Bids</h3>
           </div>
            <div className="pt-4 w-full flex flex-wrap justify-center md:justify-start">
            {[1, 2, 3, 4].map((i) => (
                <NFTCard
                    key={`nft-${i}`}
                    nft={{
                        i,
                        name: `Nifty NFT ${i}`,
                        price: (10 - i * 0.534).toFixed(2),
                        seller: slicedSellerAddress, 
                        owner: slicedSellerAddress, 
                        description: 'Cool NFT on Sale',
                    }}
                />
            ))}
                </div>
        </div>
    );
};

export default Hotbids;
