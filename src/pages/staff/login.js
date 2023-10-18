import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function StaffLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setIsError(null); // Clear previous errors when a new request starts
    try {
      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/staff/login`,
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      sessionStorage.setItem("token", response.data.token);

      event.target.reset(); // Reset form fields
      router.push("/staff/dashboard");
    } catch (isError) {
      setIsError(isError.message); // Capture the error message to display to the user
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="h-screen bg-[url('/images/bg.jpg')] bg-cover">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-min pt-16 sm:pt-24 lg:pt-28">
          <div className="text-center">
            <h1 className="font-JosefinSans text-9xl font-bold tracking-tight text-gray-900">DRCK</h1>
            <div className="border-t-8 border-red-500"> </div>
            <div className="border-t-8 border-red-500"> </div>
          </div>
          {isError && (
            <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
              {isError}
            </div>
          )}
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Staff Portal
            </h2>
          </div>
          <form className="mt-4" onSubmit={onSubmit} method="POST">
            <div className="my-2">
              <label htmlFor="username" className="block text-xl font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
