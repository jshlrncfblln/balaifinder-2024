import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

function Hero() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: window.innerWidth >= 768 ? true : false // Show arrows only if screen width is greater than or equal to 768px
    };

    // CSS styles for carousel images
    const imageStyle = {
        width: "736px",
        height: "450px",
        objectFit: "cover"
    };

  return (
    <section className="bg-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold text-sky-500 xl:text-5xl lg:text-3xl">
              <span className="block w-full">Discover Your Perfect Match</span> with Our Advanced Matching Algorithm
            </h1>
            <p className="py-4 text-lg text-black 2xl:py-8 md:py-6 2xl:pr-5">
              Finding the right match can be challenging, whether you're looking for a partner, a job, or a place to live. Our platform simplifies this process by utilizing a sophisticated matching algorithm that takes into account your preferences, needs, and unique characteristics.
            </p>
            <div className='flex gap-4'>
              <Link to='/matching' class="mt-4">
                  <button class="px-5 py-3 text-lg tracking-wider text-white bg-sky-500 rounded-full md:px-8 hover:bg-sky-700 hover:shadow-md hover:shadow-black group"><span>Find Match</span> </button>
              </Link>
              <Link to='/properties' class="mt-4">
                  <button class="px-5 py-3 text-lg tracking-wider text-black bg-white outline outline-sky-500 outline-2 rounded-full md:px-8 hover:bg-sky-700 hover:shadow-md hover:shadow-black hover:text-white hover:outline-none group"><span>See Properties</span> </button>
              </Link>  
            </div>         
          </div>
          <div className="mt-12 md:mt-0">
            <Slider {...settings}>
              <div className='rounded-lg'>
                <img src="/assets/house-image-1.jpg" alt="Slide 1" style={imageStyle} />
              </div>
              <div className='rounded-lg'>
                <img src="/assets/condo-image-2.jpg" alt="Slide 2" style={imageStyle} />
              </div>
              <div className='rounded-lg'>
                <img src="/assets/townhouse-image-3.jpg" alt="Slide 3" style={imageStyle} />
              </div>
              {/* Add more slides as needed */}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
