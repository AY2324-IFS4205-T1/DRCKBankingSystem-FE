import Navbar from "@/components/navbar";
import axiosConfig from "../../axiosConfig";
import { useState, useEffect } from "react";

export default function Deposit() {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        // Get accounts
        let response = await axiosConfig.get('/customer/accounts');
        setAccounts(response.data.accounts);
        setBalance(response.data.accounts[0].balance);
      } catch (err) {

      }
    }
    
    getData();
  }, []);

  function setSelectedAccount(index) {
    // Set value of selectedAccount and update the balance shown
    setSelectedIndex(index);
    setBalance(accounts[index].balance); 
  }

  const depositAccount = async function() {
    let data = {
      account_id: accounts[selectedIndex].account,
      amount: depositAmount
    };
    try {
      let response = await axiosConfig.post('/customer/deposit', data);
      setBalance(response.data.new_balance);
      updateAccounts(response.data.new_balance);
    } catch (err) {

    }
  }

  const withdrawAccount = async function() {
    let data = {
      account_id: accounts[selectedIndex].account,
      amount: withdrawAmount
    };
    try {
      let response = await axiosConfig.post('/customer/withdraw', data);
      setBalance(response.data.new_balance);
      updateAccounts(response.data.new_balance);
    } catch (err) {

    }

  }

  // Updates the balance in accounts array
  const updateAccounts = function(new_balance) {
    const new_accounts = accounts.map((acct, i) => {
      if (i != selectedIndex) return acct;
      acct.balance = new_balance;
      return acct;
    });
    setAccounts(new_accounts);
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">ATM</h1>
            <div>
              <p className="text-lg inline mr-3">Account</p>
              <select name="sender" id="sender"
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setSelectedAccount(e.target.selectedIndex)}
              >
                {
                  accounts.map((acct) =>
                    <option key={acct.account}>{acct.acct_type} {acct.account}</option>
                  )
                }
              </select>
            </div>
            <p className="text-lg">Your balance is: ${Number(balance).toFixed(2)}</p>
            <div className="my-2">
              <input type="text" name="deposit" id="deposit" required
                className="rounded-md border-0 mx-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e => {setDepositAmount(e.currentTarget.value)}}
              />
              <button type="submit"
                className="rounded-md bg-indigo-600 ml-3 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={depositAccount}
              >
                Deposit
              </button>
            </div>
            <div className="my-2">
              <input type="text" name="withdraw" id="withdraw" required
                className="rounded-md border-0 mx-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e => {setWithdrawAmount(e.currentTarget.value)}}
              />
              <button type="submit"
                className="rounded-md bg-indigo-600 ml-3 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={withdrawAccount}
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
