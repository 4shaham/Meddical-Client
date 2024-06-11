import React from "react";
// import { TERipple } from 'tw-elements-react';
import doctorImg from "../../assets/docterimage3.jpg"

export default function CardComponent(): JSX.Element {
  return (
    <div className="m-5 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-black">
      <a href="#!">
        <img
          className="rounded-t-lg"
          src={doctorImg}
          alt=""
        />
      </a>
      <div className="p-6 bg-white rounded-b-lg">
        <h5 className=" text-center text-xl font-medium leading-tight">
          Dr:shahma salam
        </h5>
        <p className=" text-base text-center ">Cardiology</p>
        <div className="flex justify-center items-center ">
          <button
            type="button"
            className="mx-auto mt-2 inline-block border-solid border-blue-600 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-red-600 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 "
          >
            view More
          </button>
        </div>
      </div>
    </div>
  );
}
