import Navbar from "@/components/navbar";
import Link from "next/link";
export default function Accounts({ accountId = 10 }) {
  //can pass in variable here
  return (
    <>
      <Navbar />
      <h1>I am at accounts main</h1>
      <h1>
        <Link href="/customer/accounts/1">account 1</Link>
      </h1>
      <h1>
        <Link href="/customer/accounts/2">account 2</Link>
      </h1>
      <h1>
        <Link href="/customer/accounts/3">account 3</Link>
      </h1>
      <h1>
        <Link href={`/customer/accounts/${encodeURIComponent(accountId)}`}>account {accountId}</Link>
      </h1>
    </>
  );
}
