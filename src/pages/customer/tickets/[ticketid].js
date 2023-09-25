import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import axiosConfig from "../../../axiosConfig";

export default function TicketId() {
  const router = useRouter();

  const [ticket, setTicket] = useState({
    "ticket": null,
    "ticket_type": null,
    "status": null,
    "value": null,
    "created_date": null,
    "closed_by": null,
    "closed_date": null
  });

  // Get data when the router is ready to get query param
  useEffect(() => {
    if (!router.isReady) return;
    
    async function getData() {
      try {
        let response = await axiosConfig.get(`/customer/ticket/${router.query.ticketid}`);
        setTicket(response.data.ticket);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [router.isReady]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Ticket {ticket.ticket}</h1>
            <p>
                Status: {ticket.status}<br/>
                Type: {ticket.ticket_type}<br/>

                {ticket.ticket_type == 'Opening Account' && 'Type of account to be created: '}
                {ticket.ticket_type == 'Closing Account' && 'Acconut to be closed: '}
                {ticket.value}
                <br/>

                Created Date: {ticket.created_date}<br/>
                Closed By: {ticket.closed_by}<br/>
                Closed Date: {ticket.closed_date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
