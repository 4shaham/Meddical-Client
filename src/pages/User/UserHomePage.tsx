import React, { useEffect, useState } from "react";
import Banner from "../../components/User/Banner";
import paiedratrics from "../../assets/paiedratrics.png";
import CardComponent from "../../components/User/CardComponent";
import hospital from "../../assets/hospital.jpg";
import Slider from "react-slick";
import { getAllDoctors, getSpecality, getToken } from "../../api/user";
import { ISpecality } from "../../interface/interfaceDoctor";

function UserHomePage() {
  const [datas, setDatas] = useState([]);
  const [specality, setSpecality] = useState<ISpecality[]>();

  useEffect(() => {
    const handleSyncFn = async () => {
      try {
        const specality = await getSpecality();
        setSpecality(specality.data.data);
        console.log(specality.data);
        const data = await getAllDoctors();
        setDatas(data.data);
        console.log(data.data, "looo");
      } catch (error) {
        console.log(error);
      }
    };
    handleSyncFn();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Banner />

      <div className="bg-gray-200 shadow-xl py-12 mt-10 mx-10 rounded-lg">
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
            {specality?.slice(0, 4)?.map((values, index) => (
              <div className="bg-white  p-6 flex rounded-lg  hover:bg-gradient-to-r hover:to-blue-100  hover:from-white hover:font-bold  hover:translate-x-2 transition-all duration-300 hover:shadow-xl ">
                <div className="w-1/2" key={index}>
                  <img
                    src={values.image}
                    alt="Cardiology"
                    className="w-full h-full "
                  />
                </div>
                <p className="my-auto mx-auto">{values.name}</p>
              </div>
            ))}
            <div className="text-center block">
              <button className="bg-btnColor border text-white hover:bg-white  px-16 py-3 rounded-md shadow-md hover:border-black hover:text-black transition duration-300">
                Explore our all services
              </button>
            </div>
          </div> 
        </div>

        {/* Explore All Services Button */}
      </div>

      {/* <div className=" object-fill p-6 rounded-2xl">
        <h1 className=" text-center text-2xl font-bold mt-10 mb-7">
          Over View{" "}
        </h1>
        <img
          className="h-auto w-full rounded-2xl mb-5 "
          src={hospital}
          alt="image description"
        />
      </div> */}

      <div className=" bg-gray-100 shadow-lg w-[90%] mx-auto rounded-lg mt-3">
        <h1 className="text-4xl text-center mx-10 pt-10 font-medium">
          Meet Our Doctors
        </h1>
        <div className="mt-5 p-7">
          <Slider {...settings}>
            {datas.map((values, index) => (
              <CardComponent index={index} datas={values} />
            ))}
          </Slider>
        </div>
      </div>

      {/* <div className='bg-white mx-10 container mx-auto gap-5 grid grid-cols-3'>
          <div className='bg-btnColor w-2/3'>hoo</div>
          <div className='bg-btnColor w-2/3'>hoo</div>
          <div className='bg-btnColor w-2/3'>hoo</div>
      </div> */}
    </div>
  );
}

export default UserHomePage;
