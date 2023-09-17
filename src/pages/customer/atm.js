import Navbar from "@/components/navbar";

let balance = 12.03;

export default function Deposit() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">ATM</h1>
            <p className="text-lg">Your balance is: ${balance}</p>
            <div className="my-2">
              <input type="text" name="deposit" id="deposit" required
                className="rounded-md border-0 mx-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button type="submit"
                className="rounded-md bg-indigo-600 ml-3 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Deposit
              </button>
            </div>
            <div className="my-2">
              <input type="text" name="withdraw" id="withdraw" required
                className="rounded-md border-0 mx-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button type="submit"
                className="rounded-md bg-indigo-600 ml-3 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
