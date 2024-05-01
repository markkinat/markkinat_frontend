"use client"
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeProvider';
import { Button } from '../ui/button';

const FooterLinks = ({ heading, items, extraClasses }: any) => {
    const { theme } = useTheme();

    return (
        <div className={`flex-1 justify-start items-start ${extraClasses}`}>
            <h3 className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-xl mb-10`}>{heading}</h3>
            {items.map((item: any, index: any) => (
                <p key={item + index} className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-normal text-base cursor-pointer ${theme === 'dark' ? 'hover:text-nft-gray-1' : 'hover:text-nft-black-1'} my-3`}>{item}</p>
            ))}
        </div>
    );
};

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className={`flexCenter flex-col border-t ${theme === 'dark' ? 'border-nft-black-1' : 'border-nft-gray-1'} sm:py-8 py-16`}>
            <div className="w-full md:w-11/12 flex md:flex-row flex-col sm:px-4 px-16">
                <div className="flexStart flex-1 flex-col">
                    <div className="flexCenter cursor-pointer">
                        <Image src={"/logo02.png"} objectFit="contain" width={32} height={32} alt="logo" />
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-nft-dark'} font-semibold text-lg ml-1 font-grotesk`}>Markinnat</p>
                    </div>
                    <p className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-base mt-6`}>Get the latest updates</p>
                    <div className={`flexBetween md:w-[400px] w-[357px] mt-6 ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} border ${theme === 'dark' ? 'border-nft-black-2' : 'border-nft-gray-2'} rounded-md`}>
                        <input type="email" placeholder="Your Email" className={`h-full flex-1 w-full ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} px-4 rounded-md font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-normal text-xs lg:text-lg outline-none`} />
                        <div className="flex-initial">
                            <Button className="rounded-md btn-primary px-6 rounded-l-lg">Email me</Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flexBetweenStart flex-wrap md:ml-10 ml-0 mt-8">
                    <FooterLinks heading="Services" items={['MKNDAO','Collections','Hot Bids','DAO','How it Works', 'Contact Us']} />
                    <FooterLinks heading="Support" items={['Help Center', 'Terms of service', 'Legal', 'Privacy policy']} extraClasses="ml-4" />
                </div>
            </div>

            <div className={`flexCenter w-full mt-5 border-t ${theme === 'dark' ? 'border-nft-black-1' : 'border-nft-gray-1'} sm:px-4 px-16`}>
                <div className="flexBetween sm:flex-row w-full md:w-11/12 flex-col mt-7">
                    <p className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-base`}>Markinnat, Inc. All Rights Reserved</p>
                    <div className="flex flex-row sm:mt-4">
                        {["/instagram.png", "/twitter.png", "/telegram.png", "/discord.png"].map((image, index) => (
                            <div className="mx-2 cursor-pointer" key={`image ${index}`}>
                                <Image src={image} key={index} objectFit="contain" width={24} height={24} alt="social" className={theme === 'cupcake' ? 'filter invert' : undefined} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
