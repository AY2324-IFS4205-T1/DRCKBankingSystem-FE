import Navbar_Staff from "@/components/navbar_staff";

let username = "test";

export default function createTicket() {
    return (
        <>
            <Navbar_Staff />
            <div className="bg-gray-200 h-screen">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
                    <div className="py-8">
                        <h1 className="text-3xl">View Ticket</h1>
                        <form className="mt-4">
                            <div className="my-3">
                                <p className="block text-xl font-medium leading-6 text-gray-900">Requested by:</p>
                                <p className="block text-base leading-6">{username} View Profile</p>
                            </div>
                            <div className="my-3">
                                <label htmlFor="sender" className="block text-xl font-medium leading-6 text-gray-900">
                                    Type of Request
                                </label>
                                <select disabled name="sender" id="sender"
                                    className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option defaultValue={"12345678-12345678-12345678"}>Opening a bank account</option>
                                    <option defaultValue={"00000000-00000000-00000000"}>Closing a bank account</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <label htmlFor="recipient" className="block text-xl font-medium leading-6 text-gray-900">
                                    Message
                                </label>
                                <textarea disabled id="message" rows="4" class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
