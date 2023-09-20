import Navbar_Staff from "@/components/navbar_staff";

let username = "test";

export default function createTicket() {
    return (
        <>
            <Navbar_Staff />
            <div className="bg-gray-200 h-screen">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
                    <div className="py-8">
                        <div>
                            <h1 className="text-3xl">Approve Ticket</h1>
                            <div className="float-right">
                                <a
                                    href="/customer/tickets/create"
                                    className="rounded-md bg-indigo-600 p-2 mr-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Approve
                                </a>
                                <a
                                    href="/customer/tickets/create"
                                    className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Reject
                                </a>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="my-3">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Requested by:</p>
                                <p className="block text-base leading-6">{username}</p>
                            </div>
                            <div className="my-3">
                                <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                                    Type of Request
                                </label>
                                <p name="sender" id="sender"
                                    className="rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                >
                                    Opening a bank account
                                </p>
                            </div>
                            {/* <div className="my-3">
                                <label htmlFor="recipient" className="block text-xl font-medium leading-6 text-gray-900">
                                    Message
                                </label>
                                <textarea disabled id="message" rows="4" class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div> */}
                        </div>
                    </div>
                    <div className="py-8">
                        <h1 className="text-3xl">Customer Details</h1>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Full Name</p>
                                <p className="block text-base leading-6">First Last</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Email</p>
                                <p className="block text-base leading-6">test@gmail.com</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Identity No</p>
                                <p className="block text-base leading-6">S1234567A</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Phone Number</p>
                                <p className="block text-base leading-6">68262626</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Date of Birth</p>
                                <p className="block text-base leading-6">01/01/2023</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Gender</p>
                                <p className="block text-base leading-6">Others</p>
                            </div>
                            <div className="col-span-2">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Citizenship</p>
                                <p className="block text-base leading-6">Singaporean Citizen</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Address</p>
                                <p className="block text-base leading-6">Blk 123 Jurong West</p>
                            </div>
                            <div className="col-span-1">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Postal Code</p>
                                <p className="block text-base leading-6">123456</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
