import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-6xl md:text-9xl text-black">4 <span className="font-bold text-5xl md:text-8xl text-sky-500">0</span> 4</h1>
      <h2 className="text-2xl md:text-4xl text-gray-600 font-semibold">Page Not Found</h2>
      <div className="text-center max-w-lg mt-8">
        <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center">Oops! The page you're looking for seems to have gone missing. Don't worry, it happens to the best of us. You can try checking the URL for typos or head back to the homepage.</p>
      </div>
      <div className="mt-12">
        <Link to="/" className="flex items-center border border-sky-500 text-sky-500 hover:bg-sky-700 hover:text-white py-2 px-6 gap-2 rounded-xl inline-flex items-center">
          <button className="">Back to Homepage</button>
          <svg class="w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" className="w-6 h-6 ml-2">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
