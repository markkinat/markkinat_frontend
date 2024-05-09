"use client";
import { useEffect, useState } from "react";
import { useNFTContext } from "../context/NFTContext";
import { useTheme } from "../context/ThemeProvider";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import { Text } from "@radix-ui/themes";

const DAO = () => {
  const { theme } = useTheme();
  const { proposal } = useNFTContext();

  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]); // State variable for proposals

  useEffect(() => {
    setLoading(proposal.loading);
    setProposals(proposal.data)
  }, [proposal]);

  console.log("Proposalsssss ", proposals);

  return (
    <div className="container m-auto">
      <div role="tablist" className="tabs tabs-bordered mt-24 mb-12">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Proposal"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10 flex ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 text-gray-400 p-2 rounded-3xl bg-[#0e0c15]/90 w-56 justify-between">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-6 h-6 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p>Search</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-6 border-l-2 border-gray-400"></div>
                <div className="px-2">
                  <svg
                    width="21"
                    height="18"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.78906 10.1021L3.78906 1.34695"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.1475 18.8572L19.1475 16.6684"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.78906 18.8572L3.78906 14.4796"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.1475 10.1021L19.1475 1.34695"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11.4688 4.63013L11.4688 1.34696"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11.4688 18.8572L11.4687 10.1021"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx="3.78888"
                      cy="12.2908"
                      rx="2.19415"
                      ry="2.18878"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx="11.4686"
                      cy="6.8189"
                      rx="2.19415"
                      ry="2.18878"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx="19.1483"
                      cy="13.3853"
                      rx="2.19415"
                      ry="2.18878"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Link href={"/DAO/Create"}>
              <button
                className={`btn hidden ${
                  theme === "dark" ? "" : "hover:text-black"
                } lg:flex border-[#0F172A] rounded-2xl text-sm text-white bg-[#0e0c15]/90`}
              >
                New Proposal
              </button>
            </Link>
          </div>
          {loading ? (
            <div className="flexCenter min-h-screen mt-6">
              <Loader />
            </div>
          ) : (
            proposals.length === 1 ? (
              <Text className="text-5xl flexCenter">No Proposal Yet</Text>
            ) : (proposals?.map((prop, index)=>(
              <Link
                key={index}
                href={`/DAO/${1}`}
                className="flex flex-col gap-8 my-5 bg-[#0e0c15]/90 rounded-2xl p-5 text-neutral-100 cursor-pointer"
              >
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-neutral-500"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 p-2 items-center">
                        <p>Web3BridgeDAO</p>
                        <p className="border-[0.5px] border-neutral-700 rounded-xl px-2">
                          core
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mr-">
                    <p className="bg-[#68CE78] rounded-md px-2">Active</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    #32 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    ad minim veniam, quis nostrud exercitation ullamco nisi ut
                    aliquip ex ea commodo consequat.
                  </h3>
                  <p className="mt-2 leading-7">
                    {prop}
                  </p>
                  <p className="text-sm mt-3 text-[#D9D9D9] font-light">
                    Ends in 6 days
                  </p>
                </div>
          </Link>
            )))
          )}
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Delegate"
          disabled
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>
      </div>
    </div>
  );
};

export default DAO;
