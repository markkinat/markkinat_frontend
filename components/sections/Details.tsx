import React from 'react'
import { Button } from '../ui/button'

const Details = () => {
    return (
        <div className='my-[4rem] text-center'>
            <div>
                <Button className='px-24 text-base rounded-md'>
                    Load More
                </Button>
            </div>
            <div className="container relative z-2 lg:mt-[10rem]">
                <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
                    <img
                        src={"/sphere.png"}
                        className="relative z-1"
                        width={255}
                        height={255}
                        alt="Sphere"
                    />
                <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <img
                    src={"/stars.svg"}
                    className="w-full"
                    width={950}
                    height={400}
                    alt="Stars"
                    />
                </div>
                </div>
                    <div className='text-center'>
                    <div className='font-bold text-5xl'>
                        <h2 className='leading-7'>THE ULTIMATE NFT MARKETPLACE</h2>
                    </div>
                            <div className='mt-6 text-xl font-medium flex flex-wrap max-w-[56%] item-center justify-center m-auto'>
                                <p>
                                    Say goodbye to delays. Trade faster, empower DAOs, transact gaslessly, and bid without loss on Markkinat.
                                </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Details