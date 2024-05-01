import CheckoutModal from "@/components/modal/checkoutmodal";

const Collection = () => {
  return (
    <div className="mt-24 container">
      <div className="flex">
        <div className="w-[100%] p-12">
          <img src="nft1.png" alt="NFT" className=" rounded-2xl w-[80%]" />
        </div>
        <div className=" w-[35%]">
          <div className="py-4">
            <h2 className="text-2xl">Abstract Smoke Red Blue</h2>
            <p>
              from
              <strong className="text-white"> 4.5ETH </strong>
              20 of 25 available
            </p>
          </div>
          <div>
            <p>Creator</p>
            <div>
              <div className="flex">
                <img
                  src="creator.png"
                  alt="creator"
                  className="rounded-full w-6"
                />
                <h3 className="font-bold px-2">Mia's collection</h3>
              </div>
              <div role="tablist" className="tabs tabs-bordered mt-24 mb-12">
                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label="Details"
                  defaultChecked
                />
                <div role="tabpanel" className="tab-content">
                  <h4 className="">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book
                  </h4>
                  <div className="flex justify-between mt-4">
                    <CheckoutModal action="Buy for 4.5ETH"></CheckoutModal>
                    <button className="btn btn-neutral hover:text-white hover:bg-transparent text-sm w-[45%]">
                      Make Offer
                    </button>
                  </div>
                </div>

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label="Offers"
                />
                <div role="tabpanel" className="tab-content p-10 flex "></div>

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label="History"
                />
                <div role="tabpanel" className="tab-content p-10 flex "></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
