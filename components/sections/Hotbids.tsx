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
        <div className='py-12'>
            <div className='mb-6'>
                <h3> Hotbids</h3>
           </div>
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3].map((i) => (
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
