"use client"
import { useNFTContext } from "@/app/context/NFTContext";
import { useTheme } from "@/app/context/ThemeProvider";
import { useState } from "react";

const CreateProposal = () => {
  const [title, setTitle]: any = useState()
  const [deadline, setDeadline]:any = useState()
  const [desc, setDesc]:any = useState()

  const { theme } = useTheme();
  const { createProprosal } = useNFTContext()
  
  createProprosal(title, deadline, desc);

  return (
    <>
      <div className="container mt-24 mb-12">
        <div className="py-10 flex justify-between">
          <div className="w-full pr-5">
            <form className="gap-6 text-white w-full]">
              <div className="flex flex-col">
                <label className={`${theme ==='dark'? "" : "text-black"} text-xl`}>
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className="input border border-nft-black-2 outline-none w-full placeholder:text-neutral-500 bg-[#0e0c15]/90 rounded-3xl"
                  placeholder=""
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className={`${theme ==='dark'? "" : "text-black"} text-xl`}>Deadline <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                  placeholder=""
                  value={deadline}
                  onChange={(e)=>setDeadline(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className={`${theme ==='dark'? "" : "text-black"} text-xl`}>Description <span className="text-red-400">*</span></label>
                <textarea
                  className="input border-nft-black-2 bg-[#0e0c15]/90 w-full placeholder:text-neutral-500 rounded-3xl p-3 h-56"
                  placeholder=""
                  value={desc}
                  onChange={(e)=>setDesc(e.target.value)}
                />
                {/* <ErrorHandler
                        error={errors.name?.type}
                        patternMessage="Number input is required, decimal number is not allowed"
                        /> */}
              </div>
            </form>
          </div>

          <div className="py-2 pl-2">
            <div className="gap-9 flex flex-col p-6 border-[0.5px] border-neutral-700 w-96 rounded-lg text-center">
              <button className="border-[0.5px] rounded-full py-2">
                Preview
              </button>
              <button className="bg-white rounded-full py-2 text-black font-bold">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProposal;
