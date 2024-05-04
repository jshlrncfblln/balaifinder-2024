import { FaUser } from "react-icons/fa";
export default function DashboardNavbar(){
    return(
        <nav className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                    <span className="text-black text-lg font-bold">Dashboard</span>
                </div>
                </div>
                <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                    <span className="text-black">John Doe</span>
                    <button className="ml-4 text-black shadow-md px-2 py-2 rounded-xl"><FaUser /></button>
                </div>
                </div>
            </div>
            </div>
        </nav>
    )
}