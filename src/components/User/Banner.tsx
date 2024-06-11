import React from "react";
import banner from "../../assets/banner.jpg";

function Banner() {
  return (
    <div className="w-full relative ">
      <img className="w-full h-full object-contain " src={banner} alt="" />
      <h1 className="absolute text-6xl text-white inset-0 flex items-center justify-center text-center">
        Your Health Our Priority
      </h1>
    </div>
  );
}

export default Banner;
