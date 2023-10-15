import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
  const [welcome, setWelcome] = useState({
    first_name: null,
    last_name: null,
    last_login: null,
  });

  useEffect(() => {
    async function getData() {
      try {
        // Get welcome message
        let response = await axiosConfig.get("/staff/welcome");
        setWelcome({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          last_login: response.data.last_login,
        });
      } catch (err) {}
    }
    getData();
  }, []);

  return (
    <>
      <Navbar_Staff props={props}/>
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">
              Welcome back, {welcome.first_name} {welcome.last_name}
            </h1>
            <h2 className="text-xl">Your last login was on {welcome.last_login}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export { default as getServerSideProps } from "../../serverProps";