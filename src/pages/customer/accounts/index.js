import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Accounts</h1>
              {/* <a
                href="/customer/accounts/request"
                className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right no-underline"
              >
                Request New Account
              </a> */}
            </div>
            <table className="table-auto w-full border border-slate-500 border-collapse my-8">
              <thead>
                <tr>
                  <th className="border border-slate-500">Type</th>
                  <th className="border border-slate-500">Account Number</th>
                  <th className="border border-slate-500">Balance (SGD)</th>
                  <th className="border border-slate-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  accounts.map((acct) =>
                    <tr key={acct.account}>
                      <td>{acct.acct_type}</td>
                      <td>{acct.account}</td>
                      <td>{Number(acct.balance).toFixed(2)}</td>
                      <td><a href={`/customer/accounts/${acct.account}`}>View More</a></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
