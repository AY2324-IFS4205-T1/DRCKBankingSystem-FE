import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function verifyTwoFA(props) {
  const router = useRouter();

  const [otp, setOtp] = useState();

  const submitTwoFaCode = async function () {
    try {
      let data = {
        otp: otp,
      };
      let response = await axiosConfig.post("/verify_2FA", data);
      if (!response.data["2FA success"]) {
        toast.error("One-time password do not match.");
        setOtp("");
        return;
      }

      router.push("/staff/dashboard");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">Two-FA Authentication</h1>
            <h2 className="text-xl">Please enter the One-Time Password from your Authenticator App.</h2>
          </div>
          <div className="py-8">
            <div className="align-top">
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
