import Navbar from "@/components/navbar";

let first_name = "First";
let last_name = "Last";
let last_login = "yesterday";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">
              Welcome back, {first_name} {last_name}
            </h1>
            <h2 className="text-xl">Your last login was on {last_login}</h2>
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
                <tr>
                  <td>Savings Account</td>
                  <td>12345678-12345678-12345678</td>
                  <td>500.75</td>
                  <td>
                    <a href="/customer/accounts/1">View More</a>
                  </td>
                </tr>
                <tr>
                  <td>Platinum Account</td>
                  <td>87654321-87654321-87654321</td>
                  <td>9.99</td>
                  <td>
                    <a href="/customer/accounts/2">View More</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
