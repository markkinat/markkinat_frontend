"use client"
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Banner = ({ name, childStyles, parentStyle }:any) => {
    gsap.registerPlugin(useGSAP);

    const container = useRef(null);


   useGSAP(() => {
        gsap.from(".leading-10", { x: "100%", duration: 3, ease: "power1.inOut" });
    }, [])

    useEffect(() => {
        const tlMovement = gsap.timeline({ repeat: -1, yoyo: true }); // Timeline for continuous back and forth movement
        tlMovement.fromTo(
            ".white-bg",
            { x: 0, y: 0, ease: "power1.inOut" }, // Start position
            { x: "random(-100, 100)", y: "random(-100, 100)", ease: "power1.inOut", duration: 3 } // End position with random x and y values
        );
    }, []);

    return (
        <div ref={container} className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyle}`}>
            <p className={`font-poppins font-bold lg:text-5xl text-white p-6 leading-10 ${childStyles}`}>{name}</p>
            <div className="absolute sm:w-48 sm:h-48 w-32 h-32 rounded-full -top-9 -left-16 -z-5 white-bg" />
            <div className="absolute sm:w-72 sm:h-72 w-56 h-56 rounded-full -bottom-24 -right-14 -z-5 white-bg" />
            <div className="absolute sm:w-80 sm:h-80 w-72 h-72 rounded-full -top-10 -left-20 -z-5 white-bg" />
            <div className="absolute sm:w-56 sm:h-56 w-48 h-48 rounded-2xl -top-4 right-20 -z-5 white-bg" />
        </div>
    );
};

export default Banner;

