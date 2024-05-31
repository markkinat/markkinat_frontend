"use client";
import { FormEvent, useState } from "react";
import { useTheme } from "@/app/context/ThemeProvider";
import useCreateListing from "@/app/hooks/useCreateListing";
import { Button } from "@/components/ui/button";

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
    <div className="container mt-24 mb-12 mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Asset Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={assetAddress}
              onChange={(e) => setAssetAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Token ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Quantity <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Currency Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Price <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Start Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className="input border border-gray-400 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-lg px-4 py-2"
              value={startTimestamp}
              onChange={(e) => setStartTimestamp(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              End Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className="input border border-gray-400 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-lg px-4 py-2"
              value={endTimestamp}
              onChange={(e) => setEndTimestamp(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 text-gray-600 mr-4"
              checked={reserved}
              onChange={(e) => setReserved(e.target.checked)}
            />
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Reserved
            </label>
          </div>
          <div>
            <label className={`block text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
              Token Type
            </label>
            <select
              className="input border border-gray-400 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-lg px-4 py-2"
              value={tokenType}
              onChange={(e) => setTokenType(Number(e.target.value))}
            >
              <option value={0}>ERC721</option>
              <option value={1}>ERC1155</option>
            </select>
          </div>
        </div>
        <div className="mt-8 w-full flex justify-center mt-8">
          <Button
            type="submit"
            className="px-24 bg-blue-600 hover:btn-primary text-white hover:text-white font-bold rounded-md mx-6"
          >
            Create Listing
          </Button>

          <Button
            type="submit"
            className='px-24 rounded-md bg-gradient-to-r from-[#C053AB] to-[#F4E077] text-black mx-6'>
              Create Bid
            </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
