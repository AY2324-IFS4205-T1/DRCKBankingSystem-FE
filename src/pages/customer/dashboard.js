import Navbar from "@/components/navbar";
import axiosConfig from "../../axiosConfig";
import { useState, useEffect } from "react";
import moment from 'moment';

export default function Dashboard() {
  const [welcome, setWelcome] = useState({
    first_name: null,
    last_name: null,
    last_login: null,
  });
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Get welcome message
        let response = await axiosConfig.get("/customer/welcome");
        setWelcome({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          last_login: response.data.last_login,
        });

        // Get accounts
        response = await axiosConfig.get("/customer/accounts");
        setAccounts(response.data.accounts);
      } catch (err) {}
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">
              Welcome back, {welcome.first_name} {welcome.last_name}
            </h1>
            <h2 className="text-xl">Your last login was on {moment(welcome.last_login).format('DD/MM/YYYY HH:mm:ss')}</h2>
          </div>
          <div className="py-8">
            <h1 className="text-3xl">Quick Summary</h1>
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
