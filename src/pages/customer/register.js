export default function Home() {

    return (
        <div className="h-screen bg-cover bg-[url('/images/bg.jpg')]">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-min pt-16 sm:pt-24 lg:pt-28">
                    <div className="text-center">
                        <h1 className="text-9xl font-bold tracking-tight text-gray-900 font-JosefinSans">
                            DRCK
                        </h1>
                        <div className="border-t-8 border-red-500"> </div>
                        <div className="border-t-8 border-red-500"> </div>
                    </div>
                </div>

                <form>
                    <div className="mx-auto mt-10 grid grid-cols-4 w-1/3">
                        <div className="col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
  }