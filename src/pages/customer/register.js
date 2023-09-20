export default function Register() {
  return (
    <div className="bg-[url('/images/bg.jpg')] bg-cover bg-fixed">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-min pt-16 sm:pt-24 lg:pt-28">
          <div className="text-center">
            <h1 className="font-JosefinSans text-9xl font-bold tracking-tight text-gray-900">DRCK</h1>
            <div className="border-t-8 border-red-500"> </div>
            <div className="border-t-8 border-red-500"> </div>
          </div>
        </div>

        <div className="mx-auto mt-6 bg-white/75 lg:w-2/5">
          <form>
            <div className="border-b border-gray-900/10 pb-5">
              <h2 className="p-3 text-3xl leading-7 text-gray-900">Account Information</h2>
              <div className="mx-auto grid grid-cols-6 gap-x-1 gap-y-2 p-3">
                <div className="col-span-6">
                  <label htmlFor="username" className="block text-xl font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2 lg:w-3/5">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2 lg:w-3/5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2 lg:w-4/5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="password2" className="block text-xl font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2 lg:w-4/5">
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label htmlFor="phone_no" className="block text-xl font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2 lg:w-2/3">
                    <input
                      type="number"
                      name="phone_no"
                      id="phone_no"
                      required
                      className="inline-block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="ml-3 inline-block rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-5">
              <h2 className="p-3 text-3xl leading-7 text-gray-900">Personal Information</h2>
              <div className="mx-auto grid grid-cols-6 gap-x-1 gap-y-2 p-3">
                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="first_name" className="block text-xl font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2 lg:w-4/5">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="last_name" className="block text-xl font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2 lg:w-4/5">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <label htmlFor="identity_no" className="block text-xl font-medium leading-6 text-gray-900">
                    Identity No
                  </label>
                  <div className="mt-2 lg:w-3/5">
                    <input
                      type="text"
                      name="identity_no"
                      id="identity_no"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
                    Date of Birth
                  </label>
                  <div className="mt-2 lg:w-3/5">
                    <input
                      type="date"
                      name="birth_date"
                      id="birth_date"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label htmlFor="gender" className="block text-xl font-medium leading-6 text-gray-900">
                    Gender
                  </label>
                  <div className="mt-2 lg:w-2/5">
                    <select
                      name="gender"
                      id="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option defaultValue={"Male"}>Male</option>
                      <option defaultValue={"Female"}>Female</option>
                      <option defaultValue={"Others"}>Others</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-6">
                  <label htmlFor="citizenship" className="block text-xl font-medium leading-6 text-gray-900">
                    Citizenship
                  </label>
                  <div className="mt-2 lg:w-3/5">
                    <select
                      name="gender"
                      id="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option defaultValue={"CITIZEN"}>Singaporean Citizen</option>
                      <option defaultValue={"PR"}>Singaporean PR</option>
                      <option defaultValue={"NON_SINGAPOREAN"}>Non-Singaporean</option>
                    </select>
                    {/* <input type="text" name="citizenship" id="citizenship" required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        /> */}
                  </div>
                </div>
                <div className="col-span-3">
                  <label htmlFor="address" className="block text-xl font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3 lg:pl-8">
                  <label htmlFor="postal_code" className="block text-xl font-medium leading-6 text-gray-900">
                    Postal Code
                  </label>
                  <div className="mt-2 lg:w-2/5">
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-min">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
