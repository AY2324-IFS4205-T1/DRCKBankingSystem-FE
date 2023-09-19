import { useRouter } from "next/router";

async function handler(req, res) {
  res.redirect(307, "/customer/dashboard");
}

export default function CustomerLogin() {
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);
    const response = await fetch("http://localhost:8000/customer/login", {
      method: "POST",
      body: formData,
    });

    console.log("After POST");
    const data = await response.json();
    const dataJSON = JSON.parse(JSON.stringify(data));

    console.log(dataJSON);
    console.log(dataJSON.token);
    console.log(dataJSON.expiry);
    console.log(dataJSON.user.username);

    if (dataJSON.token != "") {
      console.log("inhere");
      router.push("/customer/dashboard");
    } else {
      console.log("outside");
    }
  }

  return (
    <div className="h-screen bg-cover bg-[url('/images/bg.jpg')]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto pt-16 sm:pt-24 lg:pt-28 max-w-min">
          <div className="text-center">
            <h1 className="text-9xl font-bold tracking-tight text-gray-900 font-JosefinSans">
                DRCK
            </h1>
            <div className="border-t-8 border-red-500"> </div>
            <div className="border-t-8 border-red-500"> </div>
          </div>

          
          <form className="mt-4" action="#" method="POST">
            <div className="my-2">
              <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input id="password" name="password" type="password" required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-black">
            Not a member?{' '}
            <a href="/customer/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register here!
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
