import { useState, useContext } from 'react';
import { RiDashboardLine, RiSettingsLine, RiInboxLine, RiHomeGearLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '/assets/Balaifinder.png';
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosLogOut } from "react-icons/io";

export default function DashboardSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { rellogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = async () => {
        setShowLogoutDialog(false); // Close the logout confirmation dialog
        try {
            await rellogout();
            navigate("/realtor");
            toast.success('Logout successful!');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className={`bg-white transition-all duration-300 ease-in-out h-screen lg:flex lg:flex-row lg:h-screen lg:w-72 border-e ${sidebarOpen ? 'lg:w-20' : ''}`}>
            {/* Hamburger Menu */}
            <div className="lg:hidden flex justify-end pr-4 pt-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 focus:outline-none focus:text-gray-800 flex items-center justify-center shadow border px-2 py-2 ml-3" 
                    style={{ minWidth: '2rem' }} // Ensure button doesn't collapse when empty
                >
                    {sidebarOpen ? (
                        <RiCloseLine className="h-6 w-6" />
                    ) : (
                        <MdMenu size={32} /> 
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`lg:flex lg:flex-col h-screen ${sidebarOpen ? 'block' : 'hidden'}`}
            >
                <div className="lg:flex lg:items-center lg:justify-center w-full pt-2">
                    <span className="flex items-center px-8 py-3 place-content-center rounded-lg text-3xl font-bold">
                        <img src={logo} width="64" className="mr-1" alt="logo" />
                        Balai<span className="text-sky-500">Finder</span>
                    </span>
                </div>
                <div className="px-4 py-2">
                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link
                                to="/realtor/manage-property"
                                className="block flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-sky-500 hover:text-white"
                            >
                                <span className="flex items-center">
                                    <RiHomeGearLine className="mr-2" />
                                    Manage Property
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/realtor/application"
                                className="block flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-sky-500 hover:text-white"
                            >
                                <span className="flex items-center">
                                    <RiInboxLine className="mr-2" />
                                    Applications
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/realtor/settings"
                                className="block flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-sky-500 hover:text-white"
                            >
                                <span className="flex items-center">
                                    <RiSettingsLine className="mr-2" />
                                    Manage Property Assets
                                </span>
                            </Link>
                        </li>
                        <li>
                            <div className="block flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-sky-500 hover:text-white">
                                <span className='flex item-center cursor-pointer' onClick={() => setShowLogoutDialog(true)}><IoIosLogOut className='mr-2' />Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Logout Dialog */}
                {showLogoutDialog && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md shadow-md max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Logout</h2>
                            <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
                            <div className="flex justify-center">
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md mr-4">Yes</button>
                                <button onClick={() => setShowLogoutDialog(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
