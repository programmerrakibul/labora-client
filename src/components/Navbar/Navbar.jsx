import { NavLink, useNavigate } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import useAuthInfo from "../../hooks/useAuthInfo";
import { useState } from "react";
import getAuthErrorMessage from "../../utilities/getAuthErrorMessage";
import { toast } from "react-toastify";
import ActionSpinner from "../ActionSpinner/ActionSpinner";
import useMySwal from "../../hooks/useMySwal";

const Navbar = () => {
  const navigate = useNavigate();
  const mySwal = useMySwal();
  const [loading, setLoading] = useState(false);
  const { currentUser, logoutUser } = useAuthInfo();
  const navLinks = ["home", "all jobs", "add job", "my accepted tasks"].map(
    (link) => (
      <li key={link}>
        <NavLink
          to={link === "home" ? "/" : link.replaceAll(" ", "-")}
          className="nav_links"
        >
          {link}
        </NavLink>
      </li>
    )
  );

  const handleLogoutUser = async () => {
    setLoading(true);

    try {
      await logoutUser();

      mySwal.fire({
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-base-100 shadow-sm">
      <MyContainer>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks}
              </ul>
            </div>
            <a className="text-2xl font-bold">Labora</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>

          <div className="navbar-end">
            {currentUser ? (
              <>
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 size-10 rounded-full ring-2">
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  onClick={handleLogoutUser}
                  className="btn btn-primary"
                >
                  {loading ? <ActionSpinner /> : "Logout"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="btn btn-primary"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/auth/register")}
                  className="btn btn-primary btn-outline"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </MyContainer>
    </nav>
  );
};

export default Navbar;
