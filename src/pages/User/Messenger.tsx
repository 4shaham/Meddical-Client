import { Avatar } from "@mui/material";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus, FaSmile, FaPaperPlane } from "react-icons/fa";

function Messenger() {
  return (
    <div className="container min-h-screen mx-auto bg-gray-100 rounded-md flex p-2 md:p-10 gap-10 ">
      <div className="bg-white min-h-screen w-1/3 rounded-md">
        <div className="p-7">
          <h1 className="text-black text-4xl font-medium">Chats</h1>
        </div>
        <div className="relative p-3 ">
          <h1 className="absolute   mt-2 mx-1">
            <IoSearchOutline className="my-auto w-8 h-8 bg-gray-50" />
          </h1>
          <input
            type="text"
            className="bg-gray-50 h-10 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
            placeholder="Serach here"
          />
        </div>
        <div className="mt-5 p-5 ">
          <div className="w-ful h-auto flex">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <h1 className="font-medium mx-5 md:text-xl">shahm salam</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-5 overflow-y-scroll">
        <div className="flex mt-2">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <h1 className="mx-5 my-auto md:text-2xl"> Shaham salam</h1>
        </div>

        <div className="min-h-screen  mt-1"></div>

        <div className="flex items-center p-4 bg-white shadow rounded-lg m-2">
          <button className="text-blue-500 p-2">
            <FaPlus />
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            className="flex-grow p-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-500 p-2">
            <FaSmile />
          </button>
          <button className="text-white bg-blue-500 p-2 rounded-full ml-2">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
