import Navbar_Staff from "@/components/navbar_staff";
import { isUserAuthenticated } from "@/middleware";
import { getCookie } from "cookies-next";

let first_name = "First";
let last_name = "Last";
let last_login = "yesterday";
export async function getServerSideProps() {
  const token = getCookie("token");
  const userType = getCookie("userType");
  // Check if the user is authenticated using the isUserAuthenticated function
  await isUserAuthenticated(token, userType);
  return {
    props: {},
  };
}
export default function Dashboard() {
  return (
    <>
      <Navbar_Staff />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">
              Welcome back, {first_name} {last_name}
            </h1>
            <h2 className="text-xl">Your last login was on {last_login}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
