import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import useRouteLoader from "../hooks/useRouteLoader";
import PageSpinner from "../components/PageSpinner/PageSpinner";

const RootLayout = () => {
  const loading = useRouteLoader();

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="space-y-16 md:space-y-20 w-full min-h-[65dvh] grid grid-cols-1 place-items-center">
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
