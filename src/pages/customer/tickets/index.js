import Navbar from "@/components/navbar";
export default function Tickets() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Tickets</h1>
              <a
                href="/customer/tickets/create"
                className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right no-underline"
              >
                Create Ticket
              </a>
            </div>
            <table className="table-auto w-full border border-slate-500 border-collapse my-8">
              <thead>
                <tr>
                  <th className="border border-slate-500">Type</th>
                  <th className="border border-slate-500">Status</th>
                  <th className="border border-slate-500">Created Date</th>
                  <th className="border border-slate-500">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Request for opening bank account</td>
                  <td>Open</td>
                  <td>17-09-2023</td>
                  <td><a href="/customer/tickets/1">View More</a></td>
                </tr>
                <tr>
                  <td>Request for opening bank account</td>
                  <td>Open</td>
                  <td>17-09-2023</td>
                  <td><a href="/customer/tickets/2">View More</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
