import Navbar from "@/components/navbar";
import axiosConfig from "../../../axiosConfig";
import { useState, useEffect } from "react";
import moment from 'moment';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Get accounts
        let response = await axiosConfig.get("/customer/tickets");
        setTickets(response.data.tickets);
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
            <div>
              <h1 className="inline text-3xl">Tickets</h1>
              <a
                href="/customer/tickets/create"
                className="float-right rounded-md bg-indigo-600 p-2 text-white no-underline shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Ticket
              </a>
            </div>
            <table className="my-8 w-full table-auto border-collapse border border-slate-500">
              <thead>
                <tr>
                <th className="border border-slate-500">Ref No</th>
                  <th className="border border-slate-500">Type</th>
                  <th className="border border-slate-500">Status</th>
                  <th className="border border-slate-500">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.ticket}>
                    <td>{ticket.ticket}</td>
                    <td>{ticket.ticket_type}</td>
                    <td>{ticket.status}</td>
                    <td>{moment(ticket.created_date).format('DD/MM/YYYY HH:mm:ss')}</td>
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
