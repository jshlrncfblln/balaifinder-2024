import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import PropLists from '../components/PropertyList';
import Footer from '../components/Footer';
import { backendurl } from "../../backend-connector";


function Properties() {
    const [page, setPage] = useState(1);
    const limit = 20; // Limit to 20 results per page
    const [locations, setLocations] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);

    useEffect(() => {
        // Fetch locations from the API
        console.log("Fetching Locations Data...")
        fetch(`${backendurl}/api/get/option/location`)
            .then(response => response.json())
            .then(data => {
                console.log('Locations fetch successfully', data);
                setLocations(data);
            })
            .catch(error => console.error('Error fetching locations:', error));

        // Fetch property types from the API
        console.log("Fetching Property type Data....")
        fetch(`${backendurl}/api/get/option/type`)
            .then(response => response.json())
            .then(data => setPropertyTypes(data))
            .catch(error => console.error('Error fetching property types:', error));
    }, []);
    return (
        <div>
            <Navbar />
            <div>
                <div className="bg-center bg-cover bg-opacity-50">{/**Make this bg image position properly */}
                    <div className="mx-auto flex flex-col flex-grow items-center py-12 sm:py-24">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-black font-bold leading-10">
                                Looking for
                                <span className="text-sky-500"> Ideal Home </span>
                                for your family?
                            </h1>
                        </div>

                        
                        <div className="flex gap-2 w-11/12 md:w-8/12 xl:w-6/12">
                            <select
                                className="w-1/3 p-3 rounded-md border border-1 border-sky-500 text-sm">
                                <option value="" disabled hidden selected>Select Price Range</option>
                                <option value="">Below - ₱ 50,000</option>
                                <option value="">₱ 50,000 - ₱ 100,000</option>
                                <option value="">₱ 100,000 - ₱ 500,000</option>
                                <option value="">₱ 500,000 - ₱ 1,000,000</option>
                                <option value="">₱ 1,000,000 - ₱ 5,000,000</option>
                                <option value="">₱ 5,000,000 - Above</option>

                            </select>

                            <select
                                className="w-1/3 p-3 rounded-md border border-1 border-sky-500 text-sm">
                                <option value=""disabled selected hidden>Select Location</option>
                                {/* FETCH THE LOCATION IN THE DATABASE*/}
                                {location.map(location => (
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                ))}
                            </select>
                            <select
                                className="w-1/3 p-3 rounded-md border border-1 border-sky-500 text-sm">
                                <option value=""disabled selected hidden>Property Type</option>
                                {/*FETCH ALSO THE PROPERTY TYPE IN THE DATABASE*/}
                                {propertyTypes.map(propertyTypes => (
                                    <option key={propertyTypes.id} value={propertyTypes.id}> {propertyTypes.name} </option>
                                ))}
                            </select>
                        </div>
    
                    </div>
                </div>
                {/* Pass page and limit props to PropLists */}
                <div>
                    <PropLists
                        page={page}
                        limit={limit}
                        setPage={setPage} // Pass setPage function
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Properties;
