import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Transfer() {
  const router = useRouter();

  const [transaction, setTransaction] = useState({
    "amount": null,
    "date": null,
    "description": null,
    "recipient": null,
    "sender": null,
    "transaction": null
  });

  useEffect(() => {
    setTransaction(JSON.parse(router.query.transaction))
  }, [router.query]);
  
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Transfer</h1>
            <h2 className="text-xl">The transaction was successful.</h2>
            <p>
                Transaction ID: {transaction.transaction}<br/>
                Date: {transaction.date}<br/>
                From: {transaction.sender}<br/>
                To: {transaction.recipient}<br/>
                Amount: ${transaction.amount}<br/>
                Message: {transaction.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
