import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="space-y-16 md:space-y-20 min-h-[65dvh]">
        <Outlet />
      </main>

      <footer className="bg-base-200 rounded p-10">
        <Footer />
      </footer>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default RootLayout;
