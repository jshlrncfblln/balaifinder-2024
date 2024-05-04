export default function Product() {
    return (
        <div class="bg-gray-100 dark:bg-gray-800 py-8">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                        <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-sky-500 mb-4">
                            <img
                                class="w-full h-full object-cover"
                                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                                alt="Product Image"
                            />
                        </div>
                        <div class="flex -mx-2 mb-4">
                            <div class="w-1/2 px-2">
                                <button class="w-full bg-gray-900 dark:bg-sky-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    Accept
                                </button>
                            </div>
                            <div class="w-1/2 px-2">
                                <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                    Ignore
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="md:flex-1 px-4">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            House Name
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Q23J+R9M, Congressional Rd Ext, Barangay 171,
                            Caloocan, Metro Manila
                        </p>
                        <div class="flex mb-4">
                            <div class="mr-4">
                                <span class="font-bold text-gray-700 dark:text-gray-300">
                                    Price:
                                </span>
                                <span class="text-gray-600 dark:text-gray-300">
                                    2000,0000
                                </span>
                            </div>
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">
                                    Property Type:
                                </span>
                                <span class="text-gray-600 dark:text-gray-300">
                                    Condominium
                                </span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <span class="font-bold text-gray-700 dark:text-gray-300">
                                Select Color:
                            </span>
                            <div class="flex items-center mt-2">
                                <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <span class="font-bold text-gray-700 dark:text-gray-300">
                                Good for Family Member:
                            </span>
                            <div class="flex items-center mt-2">
                                <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                    4
                                </button>
                                <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                    5
                                </button>
                                <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                    6
                                </button>
                                <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                    7
                                </button>
                                <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                    10
                                </button>
                            </div>
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300">
                                House Description:
                            </span>
                            <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                3 bedrooms, 1 master bedroom, 1 garage, 1 front
                                and 1 back door, 1 storey
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
