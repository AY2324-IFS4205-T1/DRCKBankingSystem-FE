import NavbarStaff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function setupTwoFA() {
  const router = useRouter();

  const [dataImage, setDataImage] = useState("");
  const [otp, setOtp] = useState();

  useEffect(() => {
    async function getData() {
      try {
        let response = await axiosConfig.get("/setup_2FA");
        setDataImage(Buffer.from(response.data, "binary").toString("base64"));
      } catch (err) {}
    }
    getData();
  }, [router.isReady]);

  const submitTwoFaCode = async function () {
    try {
      let data = {
        otp: otp,
      };
      let response = await axiosConfig.post("/verify_2FA", data);
      router.push("/staff/dashboard");
    } catch (err) {}
  };

  return (
    <>
      <NavbarStaff />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">Welcome</h1>
            <h2 className="text-xl">Please setup your Two-Factor Authentication</h2>
            <p>
              You can use Google Authenticator, Microsoft Authenticator or any authenticator app of your own choice.
            </p>
          </div>
          <div className="py-8">
            <img className="inline" src={`data:image/png;base64,${dataImage}`}></img>
            <div className="mx-6 inline-block align-top">
              <h2 className="text-xl">Enter your code here</h2>
              <input
                type="text"
                className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submitTwoFaCode}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
