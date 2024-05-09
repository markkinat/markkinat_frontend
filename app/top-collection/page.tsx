"use client";
import { TopCollection } from "@/components/shared/TopCollection";
import { useEffect, useState } from "react";
import useGetAllListings from "../hooks/useGetAllListings";

const Home = () => {
  const listings = useGetAllListings();
  console.log(listings);

  return (
    <div className="w-11/12 m-auto">
      <div className="py-16">
        {listings.length == 0 ? <p>No collections yet</p> : <TopCollection />}
      </div>
    </div>
  );
};

export default Home;