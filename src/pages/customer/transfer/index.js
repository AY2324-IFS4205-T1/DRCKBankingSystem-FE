import Navbar from "@/components/navbar";
export default function Transfer() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Transfer</h1>
            <form className="mt-4" action="#" method="POST">
              <div className="border-b border-gray-900/10 py-2">
                <h2 className="text-2xl leading-7">From</h2>
                <label htmlFor="sender" className="p-3 text-xl font-medium leading-6 text-gray-900">
                  Bank Account
                </label>
                <select name="sender" id="sender"
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option defaultValue={"12345678-12345678-12345678"}>Savings Account 12345678-12345678-12345678</option>
                  <option defaultValue={"00000000-00000000-00000000"}>Platnium Account 00000000-00000000-00000000</option>
                </select>
              </div>
              <div className="border-b border-gray-900/10 py-2">
                <h2 className="text-2xl leading-7">To</h2>
                <div>
                  <label htmlFor="recipient" className="p-3 text-xl font-medium leading-6 text-gray-900">
                    Recipient
                  </label>
                  <input type="text" name="recipient" id="recipient" required
                    className="w-64 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="p-3 text-xl font-medium leading-6 text-gray-900">
                    Amount
                  </label>
                  <input type="text" name="amount" id="amount" required
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="my-3">
                <button type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
