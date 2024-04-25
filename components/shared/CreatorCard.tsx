import { useTheme } from '@/app/context/ThemeProvider';
import Image from 'next/image';


const CreatorCard = ({ rank, creatorImage, creatorAddress, creatorEths }: any) => {
    const { theme } = useTheme();

    return (
        <div className={`min-w-[190px] lg:min-w-[240px] ${theme === 'dark' ? 'bg-nft-black-3 border-nft-black-3' : 'bg-white border-nft-gray-1'} border rounded-3xl flex flex-col p-4 m-4`}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-nft-red-violet flexCenter">
                <p className="font-poppins text-white font-semibold text-base lg:text-lg">{rank}</p>
            </div>

            <div className="my-2 flex justify-center">
                <div className="relative w-20 h-20 lg:w-28 lg:h-28">
                    <Image
                        src={creatorImage}
                        layout="fill"
                        objectFit="cover"
                        alt="creator"
                        className="rounded-full"
                    />
                    <div className="absolute w-4 h-4 lg:w-7 lg:h-7 bottom-2 -right-0">
                        <Image
                            src={"/tick.png"}
                            layout="fill"
                            objectFit="contain"
                            alt="tick"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
                <p className={`font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-base`}>{creatorAddress}</p>
                <p className={`mt-1 font-poppins ${theme === 'dark' ? 'text-white' : 'text-nft-black-1'} font-semibold text-base`}>
                    {creatorEths.toFixed(2)} <span className="font-normal">ETH</span>
                </p>
            </div>
        </div>
)};
export default CreatorCard;