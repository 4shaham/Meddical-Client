import React from "react";
import banner from "../../assets/banner.jpg";
import profileImage from "../../assets/doctoProfiler.jpg";

function Banner() {
  return (
    <div className="p-10">
      <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 rounded-lg shadow-md">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Health Solution <br /> For a Better Life
          </h2>
          <p className="mt-4 text-gray-600">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece.
          </p>
          <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600">
            Book an Appointment
          </button>
          <div className="mt-8 flex justify-around">
            <div className="text-center">
              <span className="block text-2xl font-bold">10k</span>
              <span className="text-gray-600">Customer</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">90%</span>
              <span className="text-gray-600">Satisfaction</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">100+</span>
              <span className="text-gray-600">Doctor</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
          <img
            src="https://i.pinimg.com/736x/60/1c/3a/601c3a9cc68c8c71d9ad1ca9e68ec805.jpg"
            alt="Doctor"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
