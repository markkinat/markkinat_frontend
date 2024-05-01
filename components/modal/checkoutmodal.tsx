export interface CheckoutProp {
  action: string;
}

const CheckoutModal = (prop: CheckoutProp) => {
  return (
    <>
      <button className="btn btn-secondary w-[45%]">{prop.action}</button>
      <dialog id="checkOut" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h2>Check Out</h2>
          <div className="">
            <div className="flex justify-between">
              <p className="font-bold">item</p>
              <p className="font-bold">Subtotal</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                <img src="nft1.png" alt="nft1" />
                <div>
                  <p className="font-bold">Mia Ayana</p>
                  <p className="">Abstract Smoke Red Blue</p>
                </div>
              </div>
              <p className="font-bold">4.5ETH</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold">4.5ETH</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="btn btn-secondary w-59">Buy for 4.5ETH</button>
            <button className="btn btn-neutral hover:text-white hover:bg-transparent text-sm w-59">
              Make Offer
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default CheckoutModal;
