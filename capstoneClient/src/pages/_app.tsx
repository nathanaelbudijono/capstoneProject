import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { SidebarProvider } from "@/hooks/useSidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <SidebarProvider>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          height={2}
          showOnShallow={true}
        />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </SidebarProvider>
    </main>
  );
}
