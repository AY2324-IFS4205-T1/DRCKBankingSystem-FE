import Navbar_Staff from "@/components/navbar_staff";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import axiosConfig from "../../../axiosConfig";

export default function createTicket() {
  const router = useRouter();

  const [ticket, setTicket] = useState({
    "ticket": null,
    "ticket_type": null,
    "created_date": null,
    "status": null,
    "value": null,
  });
  const [customer, setCustomer] = useState({
    "first_name": null,
    "last_name": null,
    "email": null,
    "phone_no": null,
    "birth_date": null,
    "gender": null,
    "citizenship": null,
    "address": null,
    "postal_code": null,
  });

  useEffect(() => {
    if (!router.isReady) return;

    async function getData() {
      try {
        let response = await axiosConfig.get(`/staff/ticket/${router.query.ticketid}`);
        console.log(response);
        setTicket(response.data.ticket);
        setCustomer(response.data.customer);

      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [router.isReady]);

  async function approveTicket() {
    try {
      let response = await axiosConfig.post(`/staff/ticket/${ticket.ticket}/approve`);
      console.log(response.data);
      router.push({
        pathname: '/staff/tickets/'
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function rejectTicket() {
    try {
      let response = await axiosConfig.post('/staff/ticket/reject', { ticket: ticket.ticket });
      console.log(response.data);
      router.push({
        pathname: '/staff/tickets/'
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar_Staff />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <div>
              <h1 className="text-3xl">Approve Ticket</h1>
              <div className="float-right">
                <button type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 mr-4 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={approveTicket}
                >
                  Approve
                </button>
                <button type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={rejectTicket}
                >
                  Reject
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="my-3">
                <p className="block text-xl font-medium leading-6 text-gray-900">Requested by</p>
                <p className="block text-base leading-6">{customer.first_name} {customer.last_name}</p>
              </div>
              <div className="my-3">
                <label htmlFor="request_type" className="block text-xl font-medium leading-6 text-gray-900">
                  Type of Request
                </label>
                <p name="request_type"
                  className="rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {ticket.ticket_type}<br />
                  {ticket.ticket_type == 'Opening Account' && 'Type of account to be created: '}
                  {ticket.ticket_type == 'Closing Account' && 'Acconut to be closed: '}
                  {ticket.value}
                </p>
              </div>
              <div className="my-3">
                <p className="block text-xl font-medium leading-6 text-gray-900">Status</p>
                <p className="block text-base leading-6">{ticket.status}</p>
              </div>
            </div>
          </div>
          <div className="py-8">
            <h1 className="text-3xl">Customer Details</h1>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Full Name</p>
                <p className="block text-base leading-6">{customer.first_name} {customer.last_name}</p>
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
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Gender</p>
                <p className="block text-base leading-6">{customer.gender}</p>
              </div>
              <div className="col-span-2">
                <p className="block text-xl font-medium leading-6 text-gray-900">Citizenship</p>
                <p className="block text-base leading-6">{customer.citizenship}</p>
              </div>
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Address</p>
                <p className="block text-base leading-6">{customer.address}</p>
              </div>
              <div className="col-span-1">
                <p className="block text-xl font-medium leading-6 text-gray-900">Postal Code</p>
                <p className="block text-base leading-6">{customer.postal_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
