"use client";
import { useNFTContext } from "@/app/context/NFTContext";
import { useTheme } from "@/app/context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NFTCard = ({ nft }: any) => {
  const { nftCurrency } = useNFTContext();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [link, setLink] = useState<any | string>();
  const router = useRouter();
  useEffect(() => {
    const isCollectionPage = pathname === `/collection/${nft.address}`;

    setLink(isCollectionPage ? `/nft` : `/collection/${nft.address}`);
  }, [nft.address, pathname]);

  return (
    <div onClick={() => router.push(`${link}`)} className="z-1">
      <div
        className={`flex-1 min-w-64 max-w-max md:min-w-64 lg:min-w-[300px] ${
          theme === "dark" ? "bg-[#2e2b44]" : "bg-white"
        } rounded-2xl p-4 lg:mr-8 mr-6 my-2 mx-2 cursor-pointer shadow-[#251e67] shadow-md`}
      >
        <div className="relative w-full h-52 sm:h-36 xs:h-56 md:h-60 lg:h-[300px] rounded-2xl overflow-hidden">
          <Image
            src={nft.image || `/nft${nft.i}.png`}
            fill
            className="image"
            alt="nft01"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p
            className={`font-poppins ${
              theme === "dark" ? "text-white" : "text-nft-black-1"
            } font-semibold text-sm lg:text-xl`}
          >
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p
              className={`font-poppins ${
                theme === "dark" ? "text-white" : "text-nft-black-1"
              } font-semibold text-xs lg:text-lg`}
            >
              {nft.price}
              <span className="font-normal">0.01{nftCurrency}</span>
            </p>
            {nft.features && nft.features.length > 0 && (
              <p
                className={`font-poppins ${
                  theme === "dark" ? "text-white" : "text-nft-black-1"
                } font-semibold text-xs lg:text-lg`}
              >
                {nft.features[0].value}
              </p>
            )}
          </div>
          <div className="mt-1 lg:mt-3 flexBetween flex-row" />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
