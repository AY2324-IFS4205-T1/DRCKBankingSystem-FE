import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ticket_types = [
  { key: "", label: "Select Request" },
  { key: "Opening Account", label: "Opening a bank account" },
  { key: "Closing Account", label: "Closing a bank account" },
];

export default function createTicket() {
  const router = useRouter();

  const [selectedTicketType, setSelectedTicketType] = useState(ticket_types[0].key);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    async function getData() {
      try {
        // Get account types
        let response = await axiosConfig.get("/customer/account_types");
        setAccountTypes(response.data.account_types);

        // Get accounts that user have
        response = await axiosConfig.get("/customer/accounts");
        setAccounts(response.data.accounts);
      } catch (err) {
        toast.error(err.response.data);
      }
    }
    getData();
  }, []);

  const newTicket = async function () {
    if (selectedTicketType == "" || value == "") {
      return;
    }

    let data = {
      ticket_type: selectedTicketType,
      value: value,
    };

    try {
      await axiosConfig.post("/customer/tickets", data);

      router.push({
        pathname: "/customer/tickets",
      });
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl">Create Ticket</h1>
            <div className="my-3">
              <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                Type of Request
              </label>
              <select
                name="sender"
                id="sender"
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setSelectedTicketType(e.target.value);
                  setValue("");
                }}
              >
                {ticket_types.map((ticket) => (
                  <option key={ticket.key} value={ticket.key}>
                    {ticket.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedTicketType == "Opening Account" && (
              <div className="my-3">
                <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                  Account Type
                </label>
                <select
                  name="sender"
                  id="sender"
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option key="" value=""></option>
                  {accountTypes.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedTicketType == "Closing Account" && (
              <div className="my-3">
                <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                  Select Account
                </label>
                <select
                  name="sender"
                  id="sender"
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option key="" value=""></option>
                  {accounts.map((acct) => (
                    <option key={acct.account} value={acct.account}>
                      {acct.acct_type} {acct.account}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="my-3">
              <button
                type="submit"
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
