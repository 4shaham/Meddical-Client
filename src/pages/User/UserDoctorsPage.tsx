import { useEffect, useState } from "react";
import { getAllDoctors, getSpecality, sortDoctorsWithSpecality } from "../../api/user";
import Slider from "react-slick";
import { ISpecality } from "../../interface/interfaceDoctor";
import { useNavigate } from "react-router-dom";

function UserDoctorsPage() {
  const [datas, setDatas] = useState([]);
  const [specality, setSpecality] = useState<ISpecality[]>();
  const navigate=useNavigate()

  useEffect(() => {
    const handleSyncFn = async () => {
      const specality = await getSpecality();
      setSpecality(specality.data.data);
      const data = await getAllDoctors();
      setDatas(data.data);
    };
    handleSyncFn();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };




  const handleViewMoreClick=(id:string)=>{
         navigate(`/doctorprofile?doctorId=${id}`)
  }

  const handleClickSpeaciltySort=async(name:string)=>{
         console.log(name)
        try {
          
          const response=await sortDoctorsWithSpecality(name)

          setDatas(response.data.doctorData)

        } catch (error) {
           console.log(error)
        }
         
  }


  return (
    <div className="w-full p-5">
      <div className="text-center">
        <h1 className="text-black font-bold text-4xl mt-5">
          TOP MULTISPECALITY DOCTORS AT MEDDICAL
        </h1>
      </div>

      <div className="w-1/2 mx-auto mt-3 mb-9">
        <div className="slider-container ">
          <Slider {...settings}>
            {specality?.map((values, index) => (
              <div className="flex justify-center mx-auto p-5" key={index} onClick={()=>handleClickSpeaciltySort(values.name)}>
                <div className="bg-gray-200 shadow-lg flex items-center w-full   rounded-xl hover:bg-violet-50 hover:scale-110">
                  <img
                    src={values.image}
                    height={200}
                    alt=""
                    className="rounded-md  mx-auto h-[150px] w-[150px]"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full grid gap-10 grid-cols-1 sm:grid-cols-2  md:grid-cols-4 mt-5 px-16">
        {datas.map(
          (
            values: {
              image: string;
              name: string;
              _id: string;
              specialty: string;
            },
            index
          ) => (
            <div key={index} className="mt-5  bg-gray-100 rounded-lg p-2">
              <img
                src={values.image as string}
                alt=""
                width={100}
                height={200}
                className="h-[250px] w-full object-fill rounded-t-lg "
              />
              <h1 className="text-center font-medium mt-1">Dr.{values.name}</h1>
              <h1 className="text-center">{values.specialty}</h1>
              <button className="text-center text-sm mx-auto flex bg-btnColor  md:px-5 md:py-1 rounded-md text-white mb-3">
                Book an appintment
              </button>
              <div className="w-full bg-gray-50">
                <h1 className="text-center text-blue-500" onClick={()=>handleViewMoreClick(values._id)}>view more</h1>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UserDoctorsPage;
