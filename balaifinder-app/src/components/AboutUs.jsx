import {Link} from 'react-router-dom'


export default function AboutUs(){
    return(
        <section className="bg-[#F5FEFD]">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center font-extrabold text-black sm:text-4xl mb-4">Who <span className='text-sky-500'> We </span> Are?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
                    <div className="mt-12 md:mt-0 outline outline-1 shadow-black shadow-lg rounded-lg">
                        <img src="/assets/Syntax.jpg" className="object-cover rounded-lg" />
                    </div>
                    <div className="max-w-lg">
                        <p className="mt-4 text-gray-600 text-lg">Hi there! we are Syntax Finders! We are a group of fourth-year students pursuing a Bachelor's degree in Computer Science at the University of Caloocan City. In our quest to apply our programming skills to real-world problems, we created BalaiFinder site for home buyers. Our platform is designed to help users find their ideal home by using our matching algorithm and matched them with properties that meet their specific criteria. Wether you're looking for a cozy apartment or a spacious house, our site simplifies the searching and matching process, making it easier for you to find your dream home. Join us on our mission to revolutionize the way people find homes!</p>
                        <div className="mt-8">
                            <Link to="/about">
                                <button className="text-white bg-sky-500 px-5 py-3 rounded-full hover:bg-sky-700 hover:shadow-md hover:shadow-black font-semibold">Learn more about us</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}