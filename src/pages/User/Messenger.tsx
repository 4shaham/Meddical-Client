import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus, FaSmile, FaPaperPlane } from "react-icons/fa";
import Converasation from "../../components/User/Converasation";
import { getConverasation, getMessages } from "../../api/user";
import IConverasation, { IMessage } from "../../interface/chatingInterface";
import { io } from "socket.io-client";
// const [socket,setSocket]=useState<any>(null)

import { format } from "timeago.js";

function Messenger() {
  const [converasation, setConverasation] = useState<IConverasation[]>();
  const [currentChat, setCurrentChat] = useState<IConverasation | null>(null);
  const [message, setMessage] = useState<IMessage[]>();

  useEffect(() => {
    const socket = io("wss://localhost:5173");
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getConverasation();
        setConverasation(data.data.converasation);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const handleFn = async () => {
      const data = await getMessages(currentChat?._id as string);
      console.log("dfhdhfdjfh", data.data.messages);
      setMessage(data.data.messages);
    };
    handleFn();
  }, [currentChat]);

  const handleSubmit = () => {};

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

        <div className="mt-5">
          {converasation?.map((val, index) => (
            <div onClick={() => setCurrentChat(val)} key={index}>
              <Converasation data={val} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-5 overflow-y-scroll">
        {currentChat ? (
          <>
            <div className="flex mt-2">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <h1 className="mx-5 my-auto md:text-2xl"> Shaham salam</h1>
            </div>

            <div className="min-h-screen mt-1 rounded-md">
              {message?.map((val, index) => (
                <>
                  {currentChat.members[0].userId == val.sender ? (
                    <div className="mt-2 p-5">
                      <div className="flex items-center">
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 30, height: 30 }}
                        />
                        <h1 className="my-auto mx-5">{val.text}</h1>
                      </div>
                      <small className="my-auto mx-5 text-end">
                        {format(val.createdAt)}
                      </small>
                    </div>
                  ) : (
                    <div className="text-end mt-2 p-5">
                      <div className="flex justify-end items-center">
                        <p className="my-auto mx-5">{val.text}</p>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 30, height: 30 }}
                        />
                      </div>
                      <small className="my-auto mx-5 text-end">
                        {format(val.createdAt)}
                      </small>
                    </div>
                  )}
                </>
              ))}
            </div>
            {/* Right-aligned message */}

            <div className="flex items-center p-4 bg-gray-100 shadow rounded-lg m-2">
              <form
                onSubmit={handleSubmit}
                className="flex w-full items-center"
              >
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
                <button
                  className="text-white bg-blue-500 p-2 rounded-full ml-2"
                  type="submit"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </>
        ) : (
          <p className="text-black text-center ">
            Open Converasation lets Start
          </p>
        )}
      </div>
    </div>
  );
}

export default Messenger;
