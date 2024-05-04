import Navbar from "../components/navbar"
import Footer from "../components/Footer"


function Maintenance(){
    return(
        <div>
            <Navbar />
            <div className="flex bg-gray-100 p-4 justify-center items-center text-center">
                <div className="max-w-sm">
                    <img src="/assets/Maintenance.png" alt="" className="rounded-xl shadow-xl" />    
                    <h5 className="p-3 font-semibold text-4xl">This page is under development!</h5>       
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Maintenance