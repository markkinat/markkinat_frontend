import Image from "next/image";

import { useTheme } from "@/app/context/ThemeProvider";

export interface CheckoutProp {
  action: string;
}

const PaymentSuccessful = (prop: CheckoutProp) => {
  const { theme } = useTheme();
  return (
    <>
      {/* <button
        className="btn btn-secondary w-[45%]"
        onClick={() => {
          (document.getElementById("checkOut") as HTMLFormElement).showModal();
          console.log("ahaaaaaa");
        }}
      >
        {prop.action}
      </button> */}
      <dialog id="checkOut" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h2>Payment Successful</h2>
          <div className="">
            <div className="justify-center">
              <img src="nft1.png" alt="nft1" />
            </div>
          </div>
          <div>
            <p className="text-center">
              You successfully purchased{" "}
              <strong> Abstract Smoke Red Blue </strong> from <strong> </strong>
              <strong> Mia Ayana </strong>
            </p>
          </div>
          <div className="justify-center">
            <p className="font-bold">Share</p>
          </div>
          <div className="flex flex-row sm:mt-4">
            {[
              "/instagram.png",
              "/twitter.png",
              "/telegram.png",
              "/discord.png",
            ].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={`image ${index}`}>
                <Image
                  src={image}
                  key={index}
                  objectFit="contain"
                  width={24}
                  height={24}
                  alt="social"
                  className={theme === "cupcake" ? "filter invert" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default PaymentSuccessful;
