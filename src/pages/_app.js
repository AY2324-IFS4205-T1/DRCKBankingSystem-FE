import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </NextUIProvider>
  );
}
