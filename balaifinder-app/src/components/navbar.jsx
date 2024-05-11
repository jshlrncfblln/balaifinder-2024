import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login"; // Import the Login component
import { Transition } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { BsHouseCheckFill } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isOpenPopMenu, setIsOpenPopMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpenPopMenu(false);
    }
  };

  const togglePopMenu = () => {
    setIsOpenPopMenu(!isOpenPopMenu);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setIsOpen(false); // Close the sidebar
    setIsOpenLogin(!isOpenLogin);
  };

  const confirmLogout = async () => {
    console.log("Confirming logout...");
    setShowLogoutDialog(false); // Close the logout confirmation dialog
    setIsOpen(false);
    try {
      await logout();
      navigate("/");
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    setShowLogoutDialog(true); // Show logout confirmation dialog
  };

  const cancelLogout = () => {
    console.log("Cancelling logout...");
    setShowLogoutDialog(false); // Close the logout confirmation dialog
  };

  const handleMatchupClick = () => {
    if (!currentUser) {
      toast.warn("Login to match up");
      setIsOpenLogin(true);
    } else {
      // Redirect to the match up page
      navigate("/matching");
    }
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="flex bg-white shadow items-center justify-between gap-8 p-3 w-full">
        <div className="flex items-center">
          <img src="/assets/Balaifinder.png" alt="" height={50} width={50} />
          <Link to="/" className="font-bold text-3xl">
            Balai<span className="text-sky-500">Finder</span>
          </Link>
        </div>
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center mr-4">
            {currentUser ? (
              <div>
                <button
                  onClick={togglePopMenu}
                  className="rounded-full border px-2 py-2"
                >
                  <FaUser />
                </button>
                <Transition
                  show={isOpenPopMenu}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {/* Menu items */}
                      <Link
                        to="/user-profile-settings"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500 hover:text-white"
                        role="menuitem"
                      >
                        Profile Settings
                      </Link>
                      <Link
                        to="/property-wishlists"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500 hover:text-white"
                      >
                        Wishlists
                      </Link>
                      <Link
                      to="/orders"
                      className="hover:text-white block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500"
                      role="menuitem"
                    >
                        Application
                      </Link>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500 cursor-pointer"
                        role="menuitem"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </Transition>
              </div>
            ) : (
              <div>
                <button
                  onClick={toggleLogin}
                  className="rounded-full bg-sky-500 px-8 py-1.5 hover:bg-sky-700 text-white"
                >
                  Login
                </button>
                <Login
                isOpen={isOpenLogin}
                onClose={() => setIsOpenLogin(false)}
              />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div
              className={`fixed top-0 right-0 w-3/5 h-full bg-gray-700 z-50 transition-all duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                onClick={toggleMenu}
                className="absolute top-3 right-3 text-white outline outline-1 px-1 py-1 rounded focus:outline-sky-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="flex flex-col items-center justify-center text-2xl h-full gap-10 text-white">
                <li>
                  <CustomLink
                    to="/"
                    className="p-2 underline-hover relative font-semibold"
                  >
                    Home
                  </CustomLink>
                </li>
                <li>
                  <CustomLink
                    to="/about"
                    className="underline-hover relative p-2 font-semibold"
                  >
                    About
                  </CustomLink>
                </li>
                <li>
                  <CustomLink
                    to="/properties"
                    className="underline-hover relative p-2 font-semibold"
                  >
                    Properties
                  </CustomLink>
                </li>
                <li>
                  <button
                    onClick={handleMatchupClick}
                    className="underline-hover relative p-2 font-semibold"
                  >
                    Match Up
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="hidden md:flex gap-4 p-2 items-center">
          <li>
            <CustomLink
              to="/"
              className="p-2 underline-hover relative font-semibold"
            >
              Home
            </CustomLink>
          </li>
          <li>
            <CustomLink
              to="/about"
              className="underline-hover relative p-2 font-semibold"
            >
              About
            </CustomLink>
          </li>
          <li>
            <CustomLink
              to="/properties"
              className="underline-hover relative p-2 font-semibold"
            >
              Properties
            </CustomLink>
          </li>
          <li>
            <button
              onClick={handleMatchupClick}
              className="underline-hover relative p-2 font-semibold"
            >
              Match Up
            </button>
          </li>
          {currentUser ? (
            <li>
              <button
                onClick={togglePopMenu}
                className="rounded-full border hover:bg-sky-500 hover:text-white px-2 py-2"
              >
                <FaUser />
              </button>
              <Transition
                show={isOpenPopMenu}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {/* Menu items */}
                    <Link
                      to="/user-profile-settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-500 hover:text-white"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/property-wishlists"
                      className="hover:text-white block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500"
                      role="menuitem"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/orders"
                      className="hover:text-white block px-4 py-2 text-sm text-gray-800 hover:bg-sky-500"
                      role="menuitem"
                    >
                      Application
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-800 hover:text-white hover:bg-sky-500 cursor-pointer"
                      role="menuitem"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </Transition>
            </li>
          ) : (
            <li>
              <button
                onClick={toggleLogin}
                className="rounded-full text-white bg-sky-500 px-8 py-1.5 hover:bg-sky-700 hover:bg-sky-700 hover:shadow-md hover:shadow-black"
              >
                Login
              </button>
              <Login
                isOpen={isOpenLogin}
                onClose={() => setIsOpenLogin(false)}
              />
            </li>
          )}
        </ul>
      </div>
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-xl shadow-md max-w-md">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={cancelLogout}
                className="ml-auto inline-flex items-center rounded-full bg-transparent p-1.5 text-sm text-gray-400 hover:bg-red-500 hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg
                className="mx-auto h-20 w-20 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-6 mt-5 text-xl font-normal text-gray-500">
                Are you sure you want to logout?
              </h3>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="mr-2 w-full items-center rounded-full bg-sky-500 px-3 py-2 text-center text-base font-medium text-white hover:bg-sky-700"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={cancelLogout}
                  className="w-full items-center rounded-full bg-black px-3 py-2 text-center text-base font-medium text-white hover:bg-gray-500 hover:text-white"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive === to ? "active" : ""}>
      <Link
        to={to}
        {...props}
        className="relative transition-colors duration-300 hover:text-sky-500 group font-semibold"
      >
        {children}
        <span className="absolute inset-x-0 bottom-0 h-1 bg-sky-500 origin-left transform scale-x-0 transition-transform transition duration-300 ease-in-out group-hover:scale-x-100 translate-y-2"></span>
      </Link>
    </li>
  );
}
