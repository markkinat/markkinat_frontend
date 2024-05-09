"use client";
import { FormEvent, useState } from "react";
import { useTheme } from "@/app/context/ThemeProvider";
import useCreateListing from "@/app/hooks/useCreateListing";

export interface CreateListing {
  assetContract: string;
  tokenId: string;
  quantity: number;
  currency: string;
  price: number;
  startTimestamp: number;
  endTimestamp: number;
  reserved: boolean;
  tokenType: number;
}

const CreateListing = () => {
  const [assetAddress, setAssetAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [reserved, setReserved] = useState(false);
  const [tokenType, setTokenType] = useState(0);

  const { theme } = useTheme();

  const submit = useCreateListing();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const unixStartTime = Date.parse(startTimestamp) / 1000;
    const unixEndTime = Date.parse(endTimestamp) / 1000;
    console.log(assetAddress, unixStartTime, unixEndTime);

    submit(
      assetAddress,
      tokenId,
      quantity,
      currency,
      price,
      Number(unixStartTime),
      Number(unixEndTime),
      reserved,
      tokenType
    );
  };

  return (
    <div className="container mt-24 mb-12">
      <form onSubmit={handleSubmit} className="gap-6 text-white w-full">
        <div className="py-10 flex justify-between">
          <div className="w-full pr-5">
            <div className="flex flex-col"></div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                assetAddress <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                placeholder=""
                value={assetAddress}
                onChange={(e) => setAssetAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                Token ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                placeholder=""
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                Quantity <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                placeholder=""
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                Currency address<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                placeholder=""
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                placeholder=""
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                Start Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                placeholder=""
                value={startTimestamp}
                onChange={(e) => setStartTimestamp(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${theme === "dark" ? "" : "text-black"} text-xl`}
              >
                End Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                placeholder=""
                value={endTimestamp}
                onChange={(e) => setEndTimestamp(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-white rounded-full py-2 text-black font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
