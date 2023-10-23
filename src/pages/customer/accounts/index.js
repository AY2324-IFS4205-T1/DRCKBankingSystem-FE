import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Get accounts
        let response = await axiosConfig.get("/customer/accounts");
        setAccounts(response.data.accounts);
      } catch (err) {
        toast.error(err.response.data);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Accounts</h1>
            </div>
            <table className="my-8 w-full table-auto border-collapse border border-slate-500">
              <thead>
                <tr>
                  <th className="border border-slate-500">Type</th>
                  <th className="border border-slate-500">Account Number</th>
                  <th className="border border-slate-500">Balance (SGD)</th>
                  <th className="border border-slate-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acct) => (
                  <tr key={acct.account}>
                    <td>{acct.acct_type}</td>
                    <td>{acct.account}</td>
                    <td>{Number(acct.balance).toFixed(2)}</td>
                    <td>
                      <a href={`/customer/accounts/${acct.account}`}>View More</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
