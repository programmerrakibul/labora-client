import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="space-y-16 md:space-y-20 min-h-[65dvh]">
        <Outlet />
      </main>

      <footer className="bg-base-200 rounded py-10">
        <Footer />
      </footer>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default RootLayout;
