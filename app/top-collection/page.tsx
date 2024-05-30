"use client";
import { TopCollection } from "@/components/shared/TopCollection";
import { useEffect, useState } from "react";
import useGetAllListings from "../hooks/useGetAllListings";

const Home = () => {
  const listings = useGetAllListings();
  console.log(listings);

  return (
    <div className="w-11/12 m-auto h-screen">
      <div className="py-16">
        {listings.length == 0 ?
          <p className="flexCenter sm:p-4 p-16 font-poppins text-3xl font-extrabold">No collections yet</p>
          : <TopCollection />}
      </div>
    </div>
  );
};

export default Home;