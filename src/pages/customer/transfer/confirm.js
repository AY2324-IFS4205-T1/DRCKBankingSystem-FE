import Navbar from "@/components/navbar";

let t_id = "1234456";
let sender = "12345678-12345678-12345678"
let recipient = "00000000-00000000-00000000";
let amount = "500.00";

export default function Transfer() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Transfer</h1>
            <h2 className="text-xl">The transaction was successful.</h2>
            <p>
                Transaction ID: {t_id}<br/>
                From: {sender}<br/>
                To: {recipient}<br/>
                Amount: ${amount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
