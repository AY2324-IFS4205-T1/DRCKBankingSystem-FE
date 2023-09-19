import Navbar_Staff from "@/components/navbar_staff";

let first_name = "First";
let last_name = "Last";
let last_login = "yesterday";

export default function Dashboard() {
  return (
    <>
      <Navbar_Staff />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-5xl">Welcome back, {first_name} {last_name}</h1>
            <h2 className="text-xl">Your last login was on {last_login}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
