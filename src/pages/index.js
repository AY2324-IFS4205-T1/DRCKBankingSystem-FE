export default function Home() {
  return (
    <div className="h-screen bg-[url('/images/bg.jpg')] bg-cover">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-min pt-16 sm:pt-24 lg:pt-28">
          <div className="text-center">
            <h1 className="font-JosefinSans text-9xl font-bold tracking-tight text-gray-900">DRCK</h1>
            <div className="border-t-8 border-red-500"> </div>
            <div className="border-t-8 border-red-500"> </div>

            <p className="text-4xl font-bold tracking-tight text-gray-900">Your one-stop banking application</p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/customer/register"
                className="rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </a>
              <a
                href="/customer/login"
                className="rounded-md bg-slate-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
