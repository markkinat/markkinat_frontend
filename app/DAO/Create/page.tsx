const CreateProposal = () => {
  return (
    <>
      <div className="container mt-24">
        <div className="p-10 flex justify-between">
          <div>
            <form className="gap-6 text-white w-[300%]">
              <div className="flex flex-col">
                <label className="text-xl">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className="input border-0 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-xl">Description (optional)</label>
                <input
                  type="text"
                  className="input border-0 outline-none w-full placeholder:text-neutral-500 rounded-3xl"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-xl">Discussion (optional)</label>
                <textarea
                  className="input border-[0.5px] w-full placeholder:text-neutral-500 rounded-3xl p-3 h-56"
                  placeholder=""
                />
                {/* <ErrorHandler
                        error={errors.name?.type}
                        patternMessage="Number input is required, decimal number is not allowed"
                        /> */}
              </div>
            </form>
          </div>

          <div>
            <div className="gap-2 p-6 border-[0.5px] border-neutral-700 w-96 rounded-lg text-center">
              <button className="border-[0.5px] rounded-full px-24 py-2">
                Preview
              </button>
              <button className="bg-white rounded-full px-24 py-2 text-black mt-5 font-bold">
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
