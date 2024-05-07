"use client";
import { useNFTContext } from "@/app/context/NFTContext";
import { useTheme } from "@/app/context/ThemeProvider";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


const DAODetails = ({params}: {params: { daodetailsId: string }}) => {
  const { theme } = useTheme();
  // const { useVoteOnProposal:vote } = useNFTContext()
  const { proposal } = useNFTContext();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [vote, setVote] = useState(2);

  const handleVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVote(parseInt(e.target.value, 10));
   };
  console.log("PARAMSSSSS ", params.daodetailsId);
  console.log(vote);
  
  
  
  useEffect(() => {
    setLoading(proposal.loading);
    setData(proposal.data[params.daodetailsId])
  }, [params.daodetailsId, proposal]);

  console.log("Proposalsssss ", proposal.data);

  if (loading) {
    return (
      <div className="flexCenter min-h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <>
      <div className="md:w-11/12 mt-24 mb-12 m-auto">
        <div className="p-10 md:flex">
          <div className="flex flex-col gap-8 px-5 text-neutral-100">
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <div className="mr-">
                  <p className="bg-[#68CE78] rounded-xl px-4">Active</p>
                </div>
              </div>
            </div>
            <div>
              <h3
                className={`${
                  theme === "dark" ? "" : "text-black"
                } text-2xl font-bold`}
              >
                #32 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                ad minim veniam, quis nostrud exercitation ullamco nisi ut
                aliquip ex ea commodo consequat.
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex gap-3 py-4 items-center">
                  <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                  <p className={theme === "dark" ? "" : "text-black"}>
                    Web3BridgeDAODetails
                  </p>
                  <p
                    className={`${
                      theme === "dark" ? "" : "text-black"
                    } border-[0.5px] border-neutral-700 rounded-xl px-2`}
                  >
                    core
                  </p>
                </div>
                <div className="flex">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5L11.6464 4.64645L12 4.29289L12.3536 4.64645L12 5ZM12.5 14C12.5 14.2761 12.2761 14.5 12 14.5C11.7239 14.5 11.5 14.2761 11.5 14L12.5 14ZM6.64645 9.64645L11.6464 4.64645L12.3536 5.35355L7.35355 10.3536L6.64645 9.64645ZM12.3536 4.64645L17.3536 9.64645L16.6464 10.3536L11.6464 5.35355L12.3536 4.64645ZM12.5 5L12.5 14L11.5 14L11.5 5L12.5 5Z"
                      fill={theme === "dark" ? "#FFFFFF" : "#000000"}
                    />
                    <path
                      d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                      stroke={theme === "dark" ? "#FFFFFF" : "#000000"}
                    />
                  </svg>

                  <h3
                    className={`${theme === "dark" ? "" : "text-black"} px-2`}
                  >
                    share
                  </h3>
                  <h3 className={theme === "dark" ? "" : "text-black"}>...</h3>
                </div>
              </div>
              <div
                className={`${theme === "dark" ? "" : "text-black"} leading-7`}
              >
                <h3 className="">Proposal Category: Treasury Stewardship</h3>
                <h3 className="">Adekunle Stephen - Team Lead</h3>
                <h3 className="">Apollo - Co-lead</h3>
                <h3 className="">Okekunle - Senior Dev</h3>
                <p className="mt-2">
                  Proposal Description: <br /> Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit,
                </p>
              </div>
            </div>
{/* 
            <div
              className={`${
                theme === "dark" ? "" : "text-black"
              } gap-3 p-8 border-[0.5px] border-neutral-700 rounded-lg mt-9`}
            > */}
              <div className={`${
                theme === "dark" ? "" : "text-black"
              } gap-3 p-8 border-[0.5px] border-neutral-700 rounded-lg mt-9`}>
              <div className="">
                <h3 className="font-bold text-xl">Cast Your Vote</h3>
              </div>
              <div className="mt-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={2}
                    checked={vote === 2}
                    onChange={handleVoteChange}
                  />
                  For
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={1}
                    checked={vote === 1}
                    onChange={handleVoteChange}
                  />
                  Against
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={0}
                    checked={vote === 0}
                    onChange={handleVoteChange}
                  />
                  Abstain
                </label>
              </div>
              <div className="mt-4 flexCenter">
                <Button
                  onClick={() => {}}
                  className={`w-1/2 p-2 rounded-3xl border-[0.5px] ${
                    theme === "dark" ? "bg-white text-black" : ""
                  } font-bold`}
                >
                  Vote
                </Button>
              </div>
            </div>
            {/* </div> */}

            <div
              className={`${
                theme === "dark" ? "" : "text-black"
              } gap-3 p-2 border-[0.5px] border-neutral-700 rounded-lg mt-9 text-xs md:p-8`}
            >
              <div>
                <h3 className="font-bold text-xl">Votes</h3>
              </div>
              <div className="mt-3"></div>
              <div className="mt-4">
                <div className="flex gap-2 p-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                    <p>Web3BridgeDAODetails</p>
                  </div>
                  <div>
                    <h3>For</h3>
                  </div>
                  <div>
                    <h3 className="">1K VOTES</h3>
                  </div>
                </div>
                <div className="flex gap-2 p-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                    <p>Web3BridgeDAODetails</p>
                  </div>
                  <div>
                    <h3>For</h3>
                  </div>
                  <div>
                    <h3>1K VOTES</h3>
                  </div>
                </div>
                <div className="flex gap-2 p-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                    <p>Web3BridgeDAODetails</p>
                  </div>
                  <div>
                    <h3>For</h3>
                  </div>
                  <div>
                    <h3>1K VOTES</h3>
                  </div>
                </div>
                <div className="flex gap-2 p-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                    <p>Web3BridgeDAODetails</p>
                  </div>
                  <div>
                    <h3>For</h3>
                  </div>
                  <div>
                    <h3>1K VOTES</h3>
                  </div>
                </div>
                <div className="flex gap-2 p-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
                    <p>Web3BridgeDAODetails</p>
                  </div>
                  <div>
                    <h3>For</h3>
                  </div>
                  <div>
                    <h3>1K VOTES</h3>
                  </div>
                </div>

                <div className="mt-4 flexCenter">
                  <div className="w-1/2 p-2 rounded-3xl border-[0.5px] border-neutral-700 text-center mt-2">
                    View all
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-2">
            <div className="gap-2 p-6 border-[0.5px] border-neutral-700 w-96 rounded-lg">
              <div className="flex">
                <h3
                  className={`${
                    theme === "dark" ? "text-white" : ""
                  } font-bold text-xl`}
                >
                  Sales live
                </h3>
              </div>
              <div className="flex justify-between mt-3">
                <h3>Strategies</h3>
                <div className="w-4 h-4 rounded-full bg-neutral-500 md:w-7 md:h-7"></div>
              </div>
              <div className="flex justify-between mt-2">
                <h3>IPFS</h3>
                <div className="flex items-center gap-1">
                  <h3
                    className={`${
                      theme === "dark" ? "text-white" : ""
                    } font-semibold px-1`}
                  >
                    #bafkrel
                  </h3>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.77778V15H1V2H7.5"
                      stroke={theme === "dark" ? "#fff" : "#000"}
                      stroke-width="1.5"
                    />
                    <path
                      d="M15 1V0.25H15.75V1H15ZM6.53033 10.5303C6.23744 10.8232 5.76256 10.8232 5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967L6.53033 10.5303ZM14.25 5.64286V1H15.75V5.64286H14.25ZM15 1.75H9.64286V0.25H15V1.75ZM15.5303 1.53033L6.53033 10.5303L5.46967 9.46967L14.4697 0.46967L15.5303 1.53033Z"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <h3>Voting System</h3>
                <h3
                  className={`${
                    theme === "dark" ? "text-white" : ""
                  } font-semibold px-1`}
                >
                  Single choice voting
                </h3>
              </div>
              <div className="flex justify-between mt-2">
                <h3>Start date</h3>
                <h3
                  className={`${
                    theme === "dark" ? "text-white" : ""
                  } font-semibold px-1`}
                >
                  Apr 17, 2024, 7:10 PM
                </h3>
              </div>
              <div className="flex justify-between mt-2">
                <h3>End date</h3>
                <h3
                  className={`${
                    theme === "dark" ? "text-white" : ""
                  } font-semibold px-1`}
                >
                  Apr 17, 2024, 7:10 PM
                </h3>
              </div>
              <div className="flex justify-between mt-2">
                <h3>Snapshot</h3>
                <div className="flex items-center">
                  <h3
                    className={`${
                      theme === "dark" ? "text-white" : ""
                    } font-semibold px-1`}
                  >
                    55,9937,032
                  </h3>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.77778V15H1V2H7.5"
                      stroke={theme === "dark" ? "#fff" : "#000"}
                      stroke-width="1.5"
                    />
                    <path
                      d="M15 1V0.25H15.75V1H15ZM6.53033 10.5303C6.23744 10.8232 5.76256 10.8232 5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967L6.53033 10.5303ZM14.25 5.64286V1H15.75V5.64286H14.25ZM15 1.75H9.64286V0.25H15V1.75ZM15.5303 1.53033L6.53033 10.5303L5.46967 9.46967L14.4697 0.46967L15.5303 1.53033Z"
                      fill={theme === "dark" ? "#fff" : "#000"}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className={`${
                theme === "dark" ? "text-white" : ""
              } gap-2 p-6 border-[0.5px] border-neutral-700 w-96 rounded-lg mt-9`}
            >
              <div className="flex">
                <h3 className="font-bold text-xl">Current result</h3>
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <h3 className="">For</h3>
                  <h3 className="">1.3K VOTES 99.53%</h3>
                </div>
                <div className="w-full h-3 rounded-3xl bg-neutral-700">
                  <p
                    className={`${
                      theme === "dark" ? "bg-white" : "bg-secondary"
                    } w-[98.53%] h-3 rounded-3xl`}
                  ></p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <h3 className="">Abstain</h3>
                  <h3 className="">6 VOTES 0.47%</h3>
                </div>
                <div className="w-full h-3 rounded-3xl bg-neutral-700">
                  <p
                    className={`${
                      theme === "dark" ? "bg-white" : "bg-secondary"
                    } w-[3%] h-3 rounded-3xl`}
                  ></p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <h3 className="">Against</h3>
                  <h3 className="">0 VOTES 0%</h3>
                </div>
                <div className="w-full h-3 rounded-3xl bg-neutral-700">
                  {/* <p className={`${theme === 'dark' ? "bg-white" : "bg-secondary"} w-[98.53%] h-3 rounded-3xl`}></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DAODetails;
