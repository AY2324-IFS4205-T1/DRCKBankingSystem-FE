import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";

const ticket_types = [
  { key: 'Opening Account', label: 'Opening a bank account' },
  { key: 'Closing Account', label: 'Closing a bank account' },
]

export default function createTicket() {
  const [selectedTicket, setSelectedTicket] = useState(ticket_types[0].key);
  const [accountTypes, setAccountTypes] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Get account types
        let response = await axiosConfig.get('/customer/account_types');
        setAccountTypes(response.data.account_types);
      } catch (err) {

      }
    }
    getData();
  }, []);

  const newTicket = async function () {
    let data = {
      account_type: selectedTicket
    };
    try {
      // let response = await axiosConfig.post('/customer/apply', data);
      // console.log(response.data);
      // router.push({
      //   pathname: '/customer/transfer/confirm',
      //   query: { transaction: JSON.stringify(response.data) }
      // }, '/customer/transfer/confirm')
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
            <h1 className="text-3xl">Create Ticket</h1>
            <div className="my-3">
              <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                Type of Request
              </label>
              <select name="sender" id="sender"
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setSelectedTicket(e.target.value)}
              >
                {
                  ticket_types.map((ticket) =>
                    <option key={ticket.key} value={ticket.key}>{ticket.label}</option>
                  )
                }
              </select>
            </div>

            <div className="my-3">
              <button type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={newTicket}
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
