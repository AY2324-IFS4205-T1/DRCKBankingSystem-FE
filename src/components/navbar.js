import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  async function handleLogout(event) {
    event.preventDefault();
    const token = getCookie("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    // Check if cookie is deleted by user or response not ok, if so, redirect to /
    if (!response.ok || token === "") {
      toast.error("Something went wrong, Please login again.", {
        autoClose: 5000,
      });
      router.push("/");
    } else {
      // response ok, delete token and redirect
      deleteCookie("token");
      router.push("/");
      toast.success("Logout successful.", {
        autoClose: 5000,
      });
    }
  }

  const pathName = router.asPath;
  console.log(pathName);
  const navigation = [
    { name: "Home", href: "/customer/dashboard", current: pathName === "/customer/dashboard" },
    {
      name: "Accounts",
      href: "/customer/accounts",
      current: pathName.startsWith("/customer/accounts"),
    },
    { name: "ATM", href: "/customer/atm", current: pathName === "/customer/atm" },
    { name: "Transfer", href: "/customer/transfer", current: pathName === "/customer/transfer" },
    { name: "Tickets", href: "/customer/tickets", current: pathName === "/customer/tickets" },
    // { name: "Profile", href: "/customer/profile", current: pathName === "/customer/profile" },
  ];
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="/images/logo.png" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium no-underline",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 no-underline hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
