import React from "react";
import NavBar from "../../components/User/NavBar";
import Banner from "../../components/User/Banner";
import paiedratrics from "../../assets/paiedratrics.png";
import CardComponent from "../../components/User/CardComponent";
import hospital from "../../assets/hospital.jpg"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function UserHome() {

  let val=[1,2,3,4,56,6]

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 


  return (
    <div>
      <NavBar />
      {/* <Banner/> */}

      <div className="bg-serviceColors py-12 mt-10 mx-10 rounded-lg">
        <div className="container mx-auto px-6 flex flex-col md:flex-row  justify-between">
          {/* Left Section */}
          <div className="md:w-1/2 text-center">
            <h2 className="text-center pt-14 text-3xl font-bold my-auto ">
              Our Services <br /> <span>Find the care You Need</span>
            </h2>
            <button className="items-center my mt-14 border bg-white  border-btnColor text-btnColor px-14 py-3 rounded-md hover:bg-btnColor hover:text-white transition duration-300">
              Book tokens
            </button>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 md:mt-0 md:w-1/2">
            {/* Cardiology */}
            <div className="bg-white  p-6 flex rounded-lg  hover:bg-gray-200 transition duration-300">
              <div className="w-1/2">
                <img
                  src={paiedratrics}
                  alt="Cardiology"
                  className="w-full h-full"
                />
              </div>

              <p className="my-auto mx-auto">Cardiology</p>
            </div>
            {/* Dermatology */}
            <div className="bg-white  p-6 flex rounded-lg  hover:bg-gray-200 transition duration-300">
              <div className="w-1/2">
                <img
                  src={paiedratrics}
                  alt="Cardiology"
                  className="w-full h-full"
                />
              </div>

              <p className="my-auto mx-auto">Cardiology</p>
            </div>
            {/* ENT */}
            <div className="bg-white  p-6 flex rounded-lg  hover:bg-gray-200 transition duration-300">
              <div className="w-1/2">
                <img
                  src={paiedratrics}
                  alt="Cardiology"
                  className="w-full h-full"
                />
              </div>

              <p className="my-auto mx-auto">Cardiology</p>
            </div>
            {/* Paediatrics */}
            <div className="bg-white  p-6 flex rounded-lg  hover:bg-gray-200 transition duration-300">
              <div className="w-1/2">
                <img
                  src={paiedratrics}
                  alt="Cardiology"
                  className="w-full h-full"
                />
              </div>

              <p className="my-auto mx-auto">Cardiology</p>
            </div>
            <div className="text-center block">
              <button className="bg-white text-gray-700 px-16 py-3 rounded-md shadow-md hover:bg-btnColor hover:text-white transition duration-300">
                Explore our all services
              </button>
            </div>
          </div>
        </div>

        {/* Explore All Services Button */}
      </div>

      <div className=" object-fill p-6 rounded-2xl">
           <h1 className=" text-center text-2xl font-bold mt-10 mb-7">Over View </h1>
           <img className="h-auto w-full rounded-2xl mb-5 " src={hospital} alt="image description"/>
      </div>

      <div className=" bg-serviceColors w-[90%] mx-auto rounded-lg">
        <h1 className="text-4xl text-start mx-10 pt-10">Our Doctors</h1>
        <p className="text-2xl text-start mx-10 ">we have some of best the world specality  doctors around the world</p>
        <div className="mt-5 p-7">
        <Slider  {...settings}>    
        {val.map((values,index)=>(  <CardComponent index={index}/>))}
        </Slider>
        </div>
      </div>
    
    </div>
  );
}

export default UserHome;
