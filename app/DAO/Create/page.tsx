"use client"
import { useTheme } from "@/app/context/ThemeProvider";

const CreateProposal = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-11/12 mt-24 mb-12">
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
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className={`${theme ==='dark'? "" : "text-black"} text-xl`}>Description <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className={`${theme ==='dark'? "" : "text-black"} text-xl`}>Discussion <span className="text-red-400">*</span></label>
                <textarea
                  className="input border-nft-black-2 bg-[#0e0c15]/90 w-full placeholder:text-neutral-500 rounded-3xl p-3 h-56"
                  placeholder=""
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
