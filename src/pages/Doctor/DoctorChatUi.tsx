import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus,FaPaperPlane } from "react-icons/fa";
import Converasation from "../../components/Doctor/Converasation";
import { getMessages, storeMessage } from "../../api/user";
import IConverasation,{ IMessage } from "../../interface/chatingInterface";
import { format } from "timeago.js";
import { doctorGetConverasation } from "../../api/doctor";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
// const [socket,setSocket]=useState<any>(null)

interface rootNode {
  doctorAuth: {
    doctor: {
      name: string;
      image: String;
      email: string;
    };
  };
}

function DoctorChatUi() {

  const doctorProfile=useSelector((state:rootNode)=>state.doctorAuth.doctor)
  const [converasation, setConverasation] = useState<IConverasation[]>();
  const [currentChat, setCurrentChat] = useState<IConverasation | null>(null);
  const [message, setMessage] = useState<IMessage[]>();
  const [userProfile, setDoctorProfile] = useState();
  

  // messages string/image voice

  const [messages,setMessages]=useState<string>("");
  const [text, setText] = useState("");


    const socket = io("ws://localhost:4001");

   

     
  

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await doctorGetConverasation();
        console.log("hjhjhjh",data);
        setConverasation(data.data.converasation);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  },[]);


  useEffect(() => {
    const handleFn = async () => {
      const data = await getMessages(currentChat?._id as string);
      setMessage(data.data.messages);
    };
    handleFn();
  }, [currentChat]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      if(text==""){
        return
      }

      await storeMessage(
        currentChat?._id as string,
        currentChat?.members[0].doctorId as string,
        text as string
      );
      socket.emit("message",{message:{
        converasationId:currentChat?._id as string,
        senderId:currentChat?.members[0].doctorId as string,
        text:text as string},recieverId:currentChat?.members[0].userId})
      setText("");
    } catch (error) {
      console.log(error);
    }
  };




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

      <div className="w-full bg-white rounded-md p-5 max-h-screen ">
        {currentChat ? (
          <>
            <div className="flex items-center mb-4 border-b pb-2">
              {/* <Avatar alt={shahah} src={dfdfsd} className="w-10 h-10 mr-2" /> */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">"dkfdf"</h2>
                <small className="text-gray-500">Members: 5</small>
              </div>
              <button className="text-blue-500">
                <FaPlus />
              </button>
            </div>

            <div className="max-h-[600px] mt-1 rounded-md overflow-y-scroll p-2">
              {message?.map((val, index) => (
                <>
                  {currentChat.members[0].doctorId != val.sender ? (
                    <div
                      key={index}
                      className="mt-2 p-5 rounded-md flex items-start"
                    >
                      <Avatar
                        alt="User Avatar"
                        src={doctorProfile.image?doctorProfile.image as string:"/static/images/avatar/1.jpg"}
                        sx={{ width: 45, height: 45 }}
                      />
                      <div className="ml-3">
                        <div className="bg-blue-100 p-3 rounded-md">
                          <h1 className="text-sm">{val.text}</h1>
                          {val && (
                            <div className="flex mt-2">
                              <h1 className="text-black">hiii</h1>
                              {/* {val.images.map((img, i) => (
                                        <img key={i} src={img} alt="shared" className="w-20 h-20 mr-2 rounded-lg" />
                                      ))}*/}
                            </div>
                          )}
                        </div>
                        <small className="block text-gray-500 mt-1">
                          {format(new Date(val.createdAt), "p")}
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 p-5  rounded-md flex items-start justify-end">
                      <div className="mr-3 text-right">
                        <div className="bg-blue-100 p-3 rounded-md">
                          <h1 className="text-sm">{val.text}</h1>
                          {val && (
                            <div className="flex mt-2 justify-end">
                              {/* {message.images.map((img, i) => (
                              <img key={i} src={img} alt="shared" className="w-20 h-20 ml-2 rounded-lg" />
                            ))} */}
                            </div>
                          )}
                        </div>
                        <small className="block text-gray-500 mt-1">
                          {format(new Date(val.createdAt), "p")}
                        </small>
                      </div>
                      <Avatar
                        alt="User Avatar"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 30, height: 30 }}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
            {/* Right-aligned message */}
            <div className="flex items-center p-4 bg-gray-100 shadow rounded-lg m-2">
              <form
                className="flex w-full items-center"
                onSubmit={handleSubmit}
              >
                <button className="text-blue-500 p-2">
                  <FaPlus />
                </button>
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  placeholder="Type a message"
                />
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

export default DoctorChatUi;
