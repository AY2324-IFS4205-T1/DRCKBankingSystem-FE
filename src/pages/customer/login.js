import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function CustomerLogin() {
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
      const username = formValues.username;
      const password = formValues.password;

      console.log("before fetch");

      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Wrong username/password");
      }

      const data = await response.json();
      const dataJSON = JSON.parse(JSON.stringify(data));
      setCookie("token", dataJSON.token);
      setCookie("tokenExpiry", dataJSON.expiry);
      console.log("cookie set");
      console.log(dataJSON); //send me another field like auth:pass/fail, and type of user:? so i can check before push
      // const token = dataJSON.token;
      // const expiry = dataJSON.expiry;
      // const user = dataJSON.user.username;
      event.target.reset();
      // No error redirect user
      router.push("/customer/dashboard");
    } catch (isError) {
      // Capture the error message to display to the user
      setIsError(isError.message);
      console.error(isError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="DRCK BANKING"
          />
          {isError && (
            <div class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
              {isError}
            </div>
          )}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Customer Portal
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit} method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up for a new account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
