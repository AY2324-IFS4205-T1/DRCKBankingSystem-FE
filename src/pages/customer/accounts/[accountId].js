import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

export default function AccountsDetail() {
  const router = useRouter();
  const accountId = router.query.accountId;

  return (
    <>
      <Navbar />
      <h1>Details about {accountId}</h1>;
    </>
  );
}
