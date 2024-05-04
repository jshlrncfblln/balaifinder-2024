import { IoSearch } from "react-icons/io5"
import { IoMdAddCircleOutline } from "react-icons/io"
import React, { useEffect, useState } from 'react'
import AddPropertyModal from "../components/realtor-components/AddPropertyModal"
import EditPropertyModal from "../components/realtor-components/EditPropertyModal"
import axios from "axios"
import { backendurl } from "../../backend-connector"

export default function ManageProperty(){
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [propertyToEdit, setPropertyToEdit] = useState(null);

    const openAddModal = () => {
      setIsAddModalOpen(true);
    };
  
    const closeAddModal = () => {
      setIsAddModalOpen(false);
    };

    const openEditModal = (property) => {
      setPropertyToEdit(property);
      setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
      setPropertyToEdit(null);
      setIsEditModalOpen(false);
    };

    const handleAddProperty = (property) => {
      // Handle adding property logic here
      console.log('Adding property:', property);
      closeAddModal();
    };

    const handleEditProperty = (property) => {
      // Handle editing property logic here
      console.log('Editing property:', property);
      closeEditModal();
    };

    const [properties, setProperties] = useState([]);

    useEffect(() => {
      getProperties();
    }, []);
  
    const getProperties = async () => {
      try {
          const response = await axios.get(`${backendurl}/api/get/properties`);
          console.log('Properties response:', response.data);
          setProperties(response.data);
      } catch (error) {
          console.error('Error fetching properties:', error);
      }
  };
  

    console.log(ManageProperty);

    const deleteProperty = async (id) => {
      try {
        await axios.delete(`${backendurl}/api/delete/crud/delproperties/${id}`); // Assuming your API endpoint for deleting a property is '/api/properties/:id'
        getProperties(); // Refetch properties after deletion to update the table
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    };

    const confirmDeletion = (callback) => {
      const confirmed = window.confirm("Are you sure you want to delete this property? This cannot be undone.");
    
      if (confirmed) callback();
    };

    return(
        <div>
            <div className="m-4">
                <h1 className="text-2xl font-semibold">MANAGE PROPERTY</h1>
            </div>
          
            <div class="flex mx-4 md:mx-10 mb-4 justify-between">
                <div class="flex items-center">
                    <input type="text" placeholder="Search here..." class="w-72 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-sky-500" />
                    <button class="ml-2 flex items-center py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-700 hover:shadow-md hover:shadow-black">
                        Search
                        <IoSearch class="ml-2" />
                    </button>
                </div>
                <button onClick={openAddModal} class="flex items-center px-4 py-2 text-white hover:bg-sky-700 hover:shadow-md hover:shadow-black bg-sky-500 rounded-md">
                    Add Property
                    <IoMdAddCircleOutline class="ml-2 h-6 w-6" />
                </button>
            </div>
 
            <div class="shadow-md outline outline-1 shadow-black rounded-md overflow-hidden mx-4 md:mx-10">
                <table class="w-full table-fixed">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="w-20 py-4 px-6 text-center text-gray-600 font-bold uppercase">ID</th>
                            <th class="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Property Name</th>
                            <th class="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Property Type</th>
                            <th class="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Location</th>
                            <th class="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Price</th>
                            {/*<th class="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Status</th>*/}
                            <th class="w-44 py-4 px-6 text-center text-gray-600 font-bold uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        {properties.map(property => (
                            <tr key={property.id}>
                            <td class="py-4 px-6 border-b border-gray-200 text-center">{property.id}</td>
                            <td class="py-4 px-6 border-b border-gray-200 text-center truncate">{property.name}</td>
                            <td class="py-4 px-6 border-b border-gray-200 text-center">{property.type}</td>
                            <td class="py-4 px-6 border-b border-gray-200 text-center">{property.location}</td>
                            <td class="py-4 px-6 border-b border-gray-200 text-center">{property.price}</td>
                             {/*<td class="py-4 px-6 border-b border-gray-200 text-center">
                                <span class="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Available</span>
                            </td>*/}
                            <td class="py-4 px-6 border-b border-gray-200 text-center items-center justify-center">
                                <div class="flex gap-1">
                                    <div class="flex-1">
                                        <button onClick={() => openEditModal(property)} class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-md text-xs sm:text-sm md:text-sm">Edit</button>
                                    </div>
                                    <div class="flex-1">
                                        <button onClick={() => confirmDeletion(() => deleteProperty(property.id))} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-md text-xs sm:text-sm md:text-sm">Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))}     
                    </tbody>
                </table>
            </div>
            <AddPropertyModal isOpen={isAddModalOpen} onClose={closeAddModal} onAddProperty={handleAddProperty} />
            {isEditModalOpen && <EditPropertyModal isOpen={isEditModalOpen} onClose={closeEditModal} onEditProperty={handleEditProperty} propertyToEdit={propertyToEdit} />}
        </div>  
    )
}
