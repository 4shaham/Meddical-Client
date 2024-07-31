import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import Converasation from "../../components/Doctor/Converasation";
import { getMessages, storeMessage } from "../../api/user";
import IConverasation, { IMessage } from "../../interface/chatingInterface";
import { format } from "timeago.js";
import { doctorGetConverasation } from "../../api/doctor";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IUser } from "../../interface/interfaceUser";
// const [socket,setSocket]=useState<any>(null)

interface rootNode {
  doctorAuth: {
    doctor: {
      id: string;
      name: string;
      image: String;
      email: string;
    };
  };
}

interface OnlineUser {
  id: string;
  socketId: string;
}

function DoctorChatUi() {
  const doctorProfile = useSelector(
    (state: rootNode) => state.doctorAuth.doctor
  );
  const [converasation, setConverasation] = useState<IConverasation[]>([]);
  const [currentChat, setCurrentChat] = useState<IConverasation | null>(null);
  const [message, setMessage] = useState<IMessage[]>([]);
  const [userProfile,setUserProfile] = useState<IUser>();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:4001"));

  // messages string/image voice

  const [messages, setMessages] = useState<string>("");
  const [text, setText] = useState("");




  useEffect(() => {
    console.log(doctorProfile.id)
    socket.current.emit("addUser",doctorProfile.id);
    
    socket.current.on("getUsers",(datas) => {
      console.log(datas, "looooooooooooo");
      setOnlineUsers(datas);
    });

  },[currentChat]);

  // socket.current.on("getUsers",(datas) => {
  //   console.log(datas, "looooooooooooo");
  //   setOnlineUsers(datas);
  // });

 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await doctorGetConverasation();
        setConverasation(data.data.converasation);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

  },[]);

  useEffect(()=>{
    const handleFn = async () => {
      const data = await getMessages(currentChat?._id as string);
      setMessage(data.data.messages);
    };
    handleFn();
  }, [currentChat]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    try {
      if (text == "") {
        return;
      }

      const response = await storeMessage(
        currentChat?._id as string,
        currentChat?.members[0].doctorId as string,
        text as string
      );

      setMessage([...message, response.data.newMessage]);
      socket.current.emit(
        "message",
        { message: response.data.newMessage },
        currentChat?.members[0].userId
      );
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[message]);

  socket.current.on("message-content", (data: any) => {
    console.log("hidd jfffffffffffffffffffffffffff", data);
    setMessage([...message, data.message]);
  });

  
  socket.current.on("lostUsers", (datas) => {
     console.log(datas, "looooooooooooo");
     setOnlineUsers(datas)
     setConverasation([...converasation])
  });

  const isDoctorOnline = (id: string, users: OnlineUser[]): boolean => {
    return users.some(user => user.id === id);
  };



  const handleCallback=(data:any)=>{
      setUserProfile(data)    
  }

  return (
    <div className="w-full p-2 md:container max-h-screen mx-auto bg-gray-200 rounded-md flex  md:p-10 gap-10">
      <div className="bg-white min-h-[650px] max-h-[650px] w-1/2 rounded-md scroll-end overflow-y-scroll">
        <div className="p-7">
          <h1 className="text-black text-4xl font-medium">Chats</h1>
        </div>
        <div className="relative p-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearchOutline className="w-6 h-6 text-gray-500 mx-5" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            placeholder="Search here"
            // onChange={(e)=>handleFilter(e)}
          />
        </div>

        <div className="mt-5">
          {converasation?.map((val, index) => (
            <div onClick={() => setCurrentChat(val)} key={index}>
              <Converasation data={val} onlineStatus={isDoctorOnline(val.members[0].userId,onlineUsers)} callback={handleCallback}  />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-5 max-h-screen ">
        {currentChat ? (
          <>
            <div className="flex items-center mb-4 border-b pb-2">
             <Avatar alt={"jdfdj"} src={userProfile?.image?userProfile.image:"/static/images/avatar/1.jpg"} className="w-10 h-10 mr-2" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{userProfile?.userName}</h2>
              </div>
              <button className="text-blue-500">
                <FaPlus />
              </button>
            </div>

            <div className="max-h-[450px] min-h-[450px] mt-1 rounded-md overflow-y-scroll p-2">
              {message?.map((val, index) => (
                <div ref={scrollRef}>
                  <>
                    {currentChat.members[0].doctorId != val.sender ? (
                      <div
                        key={index}
                        className="mt-2 p-5 rounded-md flex items-start"
                      >
                         
                        <Avatar
                          alt="User Avatar"
                          src={userProfile?.image?userProfile.image:"/static/images/avatar/1.jpg"}
                          sx={{ width: 45, height: 45 }}
                        />
                        <div className="ml-3">
                          <div className="bg-blue-100 p-3 rounded-md">
                            <h1 className="text-sm">{val.text}</h1>
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
                          </div>
                          <small className="block text-gray-500 mt-1">
                            {format(new Date(val.createdAt), "p")}
                          </small>
                        </div>
                         <Avatar
                          alt="User Avatar"
                          src={
                            doctorProfile.image
                              ? (doctorProfile.image as string)
                              : "/static/images/avatar/1.jpg"
                          }
                          sx={{ width: 45, height: 45 }}
                        />
                      </div>
                    )}
                  </>
                </div>
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
                  inputClass="border border-black rounded-md"
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
          <div className="flex flex-col items-center justify-center h-2/3  text-white">
            <IoChatbubblesOutline className="w-16 h-16 mb-4 text-gray-400" />
            <h1 className="text-xl text-black">Open any conversation</h1>
            <p className="mt-2  text-black">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorChatUi;
