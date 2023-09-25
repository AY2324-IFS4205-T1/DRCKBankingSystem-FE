import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Transfer() {
  const router = useRouter();

  const [accounts, setAccounts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recipient, setRecipient] = useState();
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    async function getData() {
      try {
        // Get accounts
        let response = await axiosConfig.get('/customer/accounts');
        setAccounts(response.data.accounts);
      } catch (err) {

      }
    }

    getData();
  }, []);

  const transferAccount = async function() {
    let data = {
      sender_id: accounts[selectedIndex].account,
      recipient_id: recipient,
      amount: amount,
      description: message
    };
    try {
      let response = await axiosConfig.post('/customer/transfer', data);
      console.log(response.data);
      router.push({
        pathname: '/customer/transfer/confirm',
        query: { transaction: JSON.stringify(response.data) }
      }, '/customer/transfer/confirm')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Transfer</h1>
            <div className="border-b border-gray-900/10 py-2">
              <h2 className="text-2xl leading-7">From</h2>
              <label htmlFor="sender" className="p-3 text-xl font-medium leading-6 text-gray-900">
                Bank Account
              </label>
              <select name="sender" id="sender"
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setSelectedIndex(e.target.selectedIndex)}
              >
                {
                  accounts.map((acct) =>
                    <option key={acct.account}>{acct.acct_type} {acct.account}</option>
                  )
                }
              </select>
            </div>
            <div className="border-b border-gray-900/10 py-2">
              <h2 className="text-2xl leading-7">To</h2>
              <div>
                <label htmlFor="recipient" className="p-3 text-xl font-medium leading-6 text-gray-900">
                  Recipient
                </label>
                <input type="text" name="recipient" id="recipient"
                  className="w-64 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="amount" className="p-3 text-xl font-medium leading-6 text-gray-900">
                  Amount
                </label>
                <input type="text" name="amount" id="amount"
                  className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="border-b border-gray-900/10 py-2">
              <h2 className="text-2xl leading-7">Message</h2>
              <textarea name="message" id="message" rows="4"
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your message here"
                onChange={(e) => setMessage(e.target.value)}
              >
              </textarea>
            </div>
            <div className="my-3">
              <button type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={transferAccount}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
