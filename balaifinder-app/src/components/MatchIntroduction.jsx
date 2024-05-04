import Footer from "./Footer";
import Navbar from "./navbar";

export default function Introduction() {
    return (
        <div>
            <Navbar />
            <div class="mx-auto flex flex-col items-center py-12 sm:py-24">
                <div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <h1 class="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-10">
                        Find your house in Balai<span class="text-sky-500">Finder </span>
                        a <span class="text-sky-500">Matching </span> site for Home<span
                            class="text-sky-500">buyers. </span>
                    </h1>
                    <p class="mt-3 sm:mt-5 lg:w-10/12 text-gray-500 font-normal text-center text-lg">
                        BalaiFinder is a matching site that uses advanced algorithms to help home buyers find their dream homes effortlessly.
                    </p>
                </div>
                <div class="flex w-11/12 md:w-8/12 xl:w-6/12">
                    <div class="flex rounded-md w-full items-center justify-center">
                        <button class="flex items-center gap-2 bg-sky-500 text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-sky-700 sm:py-2 sm:px-4">
                            <span>Find My House Now!</span>
                            <svg class="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
                                viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                xml:space="preserve">
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
