import { Link } from "react-router-dom"


function Offers(){
    return (
        <section className="bg-[#F5FEFD] px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="mx-auto max-w-7xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-black  xl:text-5xl lg:text-3xl">Looking For?</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">Trouble in finding your ideal house? This site offers different categories of property that suites in your taste.</p>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-lg gap-24 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1 shadow-black">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src="https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?t=st=1710318322~exp=1710321922~hmac=1797b6b00add732c13f15b3160cb99f3c7e6fe2e9fb745a53d801c74a968fe8b&w=1380" alt="" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">For Rent Properties</p>
                                </div>
                                <p className="mt-2 block">
                                    <p className="text-base text-black">Looking for your next home sweet home? Explore our collection of available rental properties, each offering a unique blend of comfort and convenience. </p>
                                </p>
                                <div className="mt-6 flex items-center">
                                    <Link to="/properties" className="flex-shrink-0">
                                        <button className="px-5 py-3 bg-sky-500 rounded-full text-white hover:bg-sky-700 hover:shadow-md hover:shadow-black hover:shadow-md">View More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1 shadow-black">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Brand New Properties</p>
                                </div>
                                <p className="mt-2 block">
                                    <p className="text-base text-black">Be the first to experience the allure of our latest additions to the housing market - brand new properties awaiting your personal touch.</p>
                                </p>
                                <div className="mt-6 flex items-center">
                                    <Link to="/properties" className="flex-shrink-0">
                                        <button className="px-5 py-3 bg-sky-500 rounded-full text-white hover:bg-sky-700 hover:shadow-md hover:shadow-black">View More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1 shadow-black">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Luxurious Properties</p>
                                </div>
                                <p className="mt-2 block">
                                    <p className="text-base text-black">Indulge in the pinnacle of sophisticated living with our Luxurious properties. Each residence exudes opulence and elegance, offering an unparalled living experience.</p>
                                </p>
                                <div className="mt-6 flex items-center">
                                    <Link to="/properties" className="flex-shrink-0">
                                        <button className="px-5 py-3 bg-sky-500 rounded-full text-white hover:bg-sky-700 hover:shadow-md hover:shadow-black">View More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    )
}

export default Offers