import React from "react";

import doctorImg from "../../assets/docterimage3.jpg";
import { useNavigate } from "react-router-dom";

interface CardComponentProps {
  index: number;
  datas:{image:string,specialty:string,name:string,_id:string}
}

const CardComponent: React.FC<CardComponentProps> = ({ index,datas }) => {


  const navigate=useNavigate()
  
  const handleOnClickViewMore=(id:string)=>{
        navigate(`/doctorProfile?doctorId=${id}`)
  }

  return (
    <div
      className="m-5 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-black"
      key={index}
    >
      <a href="#!">
        <img
          className="rounded-t-lg object-fill h-60 w-80"
          src={datas.image}
          alt="Doctor"
        />
      </a>
      <div className="p-6 bg-white rounded-b-lg">
        <h5 className="text-center text-xl font-medium leading-tight">
          Dr: {datas.name}
        </h5>
        <p className="text-base text-center">{datas.specialty}</p>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="mx-auto mt-2 inline-block border-solid border-blue-600 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-red-600 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700"
            onClick={()=>handleOnClickViewMore(datas._id)}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
