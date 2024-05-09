"use client"
import { useNFTContext } from "@/app/context/NFTContext";
import { useTheme } from "@/app/context/ThemeProvider";
import useMints from "@/app/hooks/useMints";
import useMkdaoItems from "@/app/hooks/useMkdaoItems";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";

interface Item {
  image: string;
  name: string;
  edition: number;
  // Add more properties as needed
}

const Home = ({ params }: { params: { tokenId: number } }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Item | null>(null); // Properly type the useState hook
  const { theme } = useTheme();
  const mint = useMints();
  const items = useMkdaoItems();

  useEffect(() => {
    setLoading(false);
    setData(items[params.tokenId - 21]);
  }, [items, params.tokenId]);

  if (loading || !data) {
    return (
      <div className="flexCenter min-h-screen">
        <Loader />
      </div>
    );
  }
  
  return (
    <>
      <div className="mt-24 container">
        <div className="lg:flex justify-center">
          <div className="w-[100%] p-12">
              <img src={data.image || `/nft1.png`} alt="NFT" className=" rounded-2xl md:w-[80%]" />
          </div>
          <div className=" md:w-[45%] p-12">
            <div className="space-y-4">
                <h2 className="text-2xl">{data.name }</h2>
              <p>
                from
                <strong className="text-white"> 0.01ETH </strong>
                {data.edition} of 100 available
              </p>
            </div>
            <div>
              <p>Creator</p>
              <div>
                <div className="flex gap-4">
                  <img
                    src="/nft1.png"
                    alt="creator"
                    className="rounded-full w-6"
                  />
                  <h3 className="font-bold px-2">Markkinat&apos;s collection</h3>
                </div>
                <div className="mt-6">
                  <button onClick={mint} className="btn btn-neutral hover:text-white text-sm w-[45%]">
                      Mint
                    </button>
                </div>  
                <div role="tablist" className="tabs tabs-bordered mt-12 mb-12">
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Details"
                    defaultChecked
                  />
                  <div role="tabpanel" className="tab-content">
                    <h4 className="text-justify leading-7 ">
                      Markkinat DAO collection: A Rare Integrated NFT Marketplace and Governance, representing a groundbreaking initiative aimed at revolutionizing decentralized governance and economic activity within the blockchain ecosystem.
                    </h4>
                    <div className="flex justify-between mt-4">
                    
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Offers"
                  />
                  <div role="tabpanel" className="tab-content p-10 flex "></div>

                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="History"
                  />
                  <div role="tabpanel" className="tab-content p-10 flex "></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
};

export default Home;
