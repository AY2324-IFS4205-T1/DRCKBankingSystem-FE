import Navbar_Staff from "@/components/navbar_staff";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axiosConfig from "../../../axiosConfig";

export default function getTicket(props) {
  const router = useRouter();
  const { ticketid } = router.query;

  const [ticket, setTicket] = useState({
    ticket_type: null,
    created_date: null,
    status: null,
    value: null,
  });
  const [customer, setCustomer] = useState({
    first_name: null,
    last_name: null,
    email: null,
    phone_no: null,
    birth_date: null,
    citizenship: null,
  });
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    async function getData() {
      try {
        let response = await axiosConfig.get(`/staff/ticket/${ticketid}`);
        setTicket(response.data.ticket);
        setCustomer(response.data.customer);
        setAccounts(response.data.accounts);
      } catch (err) {
        toast.error(err.response.data);
      }
    }
    getData();
  }, [router.isReady]);

  async function approveTicket() {
    try {
      await axiosConfig.post(`/staff/ticket/${ticketid}/approve`);
      router.push({
        pathname: "/staff/tickets/",
      });
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  async function rejectTicket() {
    try {
      await axiosConfig.post(`/staff/ticket/${ticketid}/reject`);
      router.push({
        pathname: "/staff/tickets/",
      });
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  return (
    <>
      <Navbar_Staff role={props} />
      <div className="h-screen bg-gray-200 pt-8">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div>
              <h1 className="text-3xl">Approve Ticket</h1>
              { ticket.status === 'Open' &&
                <div className="float-right">
                <button
                  type="submit"
                  className="mr-4 rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={approveTicket}
                >
                  Approve
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={rejectTicket}
                >
                  Reject
                </button>
              </div>
              }
            </div>
            <div className="mt-4">
              <div className="my-3">
                <p className="block text-xl font-medium leading-6 text-gray-900">Requested by</p>
                <p className="block text-base leading-6">
                  {customer.first_name} {customer.last_name}
                </p>
              </div>
              <div className="my-3">
                <label htmlFor="request_type" className="block text-xl font-medium leading-6 text-gray-900">
                  Type of Request
                </label>
                <p
                  name="request_type"
                  className="rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {ticket.ticket_type}
                  <br />
                  {ticket.ticket_type == "Opening Account" && "Type of account to be created: "}
                  {ticket.ticket_type == "Closing Account" && "Acconut to be closed: "}
                  {ticket.value}
                </p>
              </div>
              <div className="my-3">
                <p className="block text-xl font-medium leading-6 text-gray-900">Status</p>
                <p className="block text-base leading-6">{ticket.status}</p>
              </div>
            </div>
          </div>
          <div className="my-8">
            <h1 className="text-3xl">Customer Details</h1>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Full Name</p>
                <p className="block text-base leading-6">
                  {customer.first_name} {customer.last_name}
                </p>
              </div>
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Email</p>
                <p className="block text-base leading-6">{customer.email}</p>
              </div>
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Phone Number</p>
                <p className="block text-base leading-6">{customer.phone_no}</p>
              </div>
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Date of Birth</p>
                <p className="block text-base leading-6">{customer.birth_date}</p>
              </div>
              <div className="col-span-2">
                <p className="block text-xl font-medium leading-6 text-gray-900">Citizenship</p>
                <p className="block text-base leading-6">{customer.citizenship}</p>
              </div>
            </div>
          </div>
          <div className="my-8">
            <h1 className="text-3xl">Owned Accounts</h1>
            <div className="mt-4">
              <table className="w-full table-auto border-collapse border border-slate-500">
                <thead>
                  <tr>
                    <th className="border border-slate-500">Type</th>
                    <th className="border border-slate-500">Status</th>
                    <th className="border border-slate-500">Date Created</th>
                    <th className="border border-slate-500">Balance (SGD)</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((acct, index) => (
                    <tr key={index}>
                      <td>{acct.type}</td>
                      <td>{acct.status}</td>
                      <td>{acct.date_created}</td>
                      <td>{Number(acct.balance).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
