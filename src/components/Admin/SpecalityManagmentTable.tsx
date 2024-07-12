import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { deleteSpecality, findspecality } from "../../api/admin";
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../Redux/slice/AdminSpecality";
import { Link } from "react-router-dom";



interface Root{

    specality:{
      specality:[]
    }
    
}

interface vlaues{
  _id:string,
  name:string,
  image:string,
}

const TABLE_HEAD: string[] = ["Image", "specality Name", "Action"];


const MyComponent: React.FC = () => {
 

  const states:any=useSelector<Root>((state)=>state.specality.specality)
  const dispatch=useDispatch()

  console.log(states,"hiiiiiiiii")
  
  const handleDelet=async(id:string)=>{
        console.log(id)
        try {
           
        const response=await deleteSpecality(id)

        // if(response.data.status){
          let array=states.filter((values:vlaues)=>values._id!=id)
          dispatch(add(array))
        // }
        } catch (error) {
           console.log(error)
        }
  }

  useEffect(() => {
    const hadnleAsyncronus = async () => {
      console.log('hii heloo bro how are youe')
      let response:any = await findspecality();
      dispatch(add(response.data))
    };
    hadnleAsyncronus();
  }, []);

 
  return (

  <div className="px-5 py-5">
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto  text-center">
        <thead className="">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
              >
                <Typography
                  variant="body2"
                  className="font-medium text-2lg leading-none text-black"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states?.map((name:vlaues,index:number) => (
            <tr
              key={name._id}
              //   className={index % 2 === 0 ? 'bg-blue-gray-50/50' : ''}
              className="text-center"
            >
              <td className="p-4">
                <Avatar  
                  src={name.image}
                  alt={"sjsj"}
                  size="md"
                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                />
              </td>
              <td className="p-4">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="font-normal"
                >{name.name}</Typography>
              </td>
              <td className="p-4">
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary"
                  className="font-medium p-4"
                ><Link to={`/admin/editSpecality?specalityId=${name._id}`}><button className="bg-btnColor text-white px-3 py-1 rounded-lg">Edit</button></Link>
                </Typography>
                <Typography
                  component="a"
                  variant="body2"
                  color="primary"
                  className="font-medium"
                >
                 <button className="bg-red-500 text-white px-5 py-1 rounded-lg" onClick={()=>handleDelet(name._id)}>Delete</button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div> 

  );
};

export default MyComponent;
