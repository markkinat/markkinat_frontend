"use client";
import { useTheme } from "@/app/context/ThemeProvider";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const Mint = () => {
  const { theme } = useTheme();
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
    console.log(file);
  };

  const [open, setOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<number>(0);

  const currencyType = ["ETH", "USDT", "BTC", "OPT"];

  return (
    <>
      <div className="container mt-24 md:w-[100%] lg:w-[50%] px-24  md:w-32 ">
        <h3 className="font-bold text-2xl text-white">Mint new item</h3>
        <div className="">
          <form className="gap-6 text-white">
            <div className="flex flex-col mt-8">
              <label
                className={`${
                  theme === "dark" ? "" : "text-black"
                } md:text-xl font-bold mb-2`}
              >
                Upload File <span className="text-red-400">*</span>
              </label>
              <FileUploader
                className=""
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              >
                {file ? (
                  <img src={file[0]} />
                ) : (
                  <div
                    className={`${
                      theme === "dark" ? "" : "text-black"
                    } md:text-xl`}
                  >
                    <div
                      className="border border-dashed  rounded-xl text-center p-5"
                      id="dragZone"
                    >
                      <h3 className="md:text-xl">
                        JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                      </h3>
                      <div className="flex justify-center mt-4">
                        <svg
                          width="137"
                          height="137"
                          viewBox="0 0 137 137"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M43.7615 125.583H93.2335C112.586 125.583 125.584 112.008 125.584 91.8087V45.1912C125.584 24.9917 112.586 11.4166 93.2392 11.4166H43.7615C24.4143 11.4166 11.417 24.9917 11.417 45.1912V91.8087C11.417 112.008 24.4143 125.583 43.7615 125.583ZM48.5146 62.7916C40.6449 62.7916 34.2503 56.3884 34.2503 48.5208C34.2503 40.6532 40.6449 34.25 48.5146 34.25C56.3787 34.25 62.779 40.6532 62.779 48.5208C62.779 56.3884 56.3787 62.7916 48.5146 62.7916ZM113.144 85.2479C115.056 90.1492 114.063 96.0402 112.019 100.894C109.597 106.667 104.959 111.039 99.1152 112.947C96.5206 113.795 93.7998 114.167 91.0847 114.167H42.9763C38.189 114.167 33.9528 113.018 30.48 110.879C28.3045 109.536 27.9199 106.438 29.5329 104.429C32.2307 101.071 34.8942 97.7014 37.5806 94.3023C42.7008 87.7987 46.1507 85.9136 49.9851 87.569C51.5407 88.2523 53.102 89.2773 54.7092 90.3613C58.9914 93.2714 64.944 97.2714 72.785 92.9297C78.1508 89.9245 81.263 84.7695 83.9732 80.2804L84.0185 80.2053C84.2106 79.8904 84.4009 79.5755 84.5907 79.2614C85.5015 77.7543 86.4001 76.2674 87.4167 74.8975C88.691 73.1833 93.4152 67.8225 99.5342 71.6398C103.432 74.0433 106.709 77.2952 110.217 80.7767C111.554 82.1081 112.507 83.622 113.144 85.2479Z"
                            className={`${
                              theme === "dark"
                                ? "fill-white"
                                : "fill-gray-700 rounded-xl"
                            } md:text-xl`}
                          />
                        </svg>
                      </div>
                      <p className="mt-4">Drag and Drop File</p>
                      <p>or browse media on your device</p>
                    </div>
                  </div>
                )}
              </FileUploader>
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${
                  theme === "dark" ? "" : "text-black"
                } md:text-xl font-bold mb-2`}
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-lg"
                placeholder=""
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${
                  theme === "dark" ? "" : "text-black"
                } md:text-xl font-bold mb-2`}
              >
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                className="input border-nft-black-2 bg-[#0e0c15]/90 w-full placeholder:text-neutral-500 rounded-lg p-3 h-56"
                placeholder=""
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className={`${
                  theme === "dark" ? "" : "text-black"
                } md:text-xl font-bold mb-2`}
              >
                Price <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="input border-nft-black-2 bg-[#0e0c15]/90 outline-none w-full placeholder:text-neutral-500 rounded-lg"
                  placeholder=""
                />
                <div className="p-[1px] cursor-pointer rounded-3xl hover:bg-gradient-to-r from-spi-pink via-spi-blue to-spi-purple z-10">
                  <div
                    className="relative bg-hero rounded-3xl pl-5 pr-4 py-4"
                    onClick={() => setOpen(!open)}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-5">
                        <p className="w-2 h-2 my-auto bg-gradient-to-r rounded-full from-spi-pink via-spi-blue to-spi-purple"></p>
                        <div
                          className={`${
                            theme === "dark" ? "" : "text-black"
                          } md:text-xl font-medium`}
                        >
                          {currencyType[currency]}
                        </div>
                      </div>
                      <div className="my-auto">
                        {/* {PadAsset().arrowdown()} */}
                      </div>
                    </div>
                    {open && (
                      <div className="font-medium text-neutral-300 pt-2">
                        {currencyType.map((item, index) => {
                          if (currency !== index) {
                            return (
                              <p
                                key={index}
                                className="py-2 px-7 hover:bg-black rounded-3xl cursor-pointer"
                                onClick={() => setCurrency(index)}
                              >
                                {item}
                              </p>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end my-4 y-3">
              <button className="btn btn-secondary rounded-lg font-code px-4 py-2 text-base font-medium z-10 relative border border-black bg-gradient-to-r from-[#C053AB] to-[#F4E077] text-black hover:brightness-125">
                Mint Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Mint;
