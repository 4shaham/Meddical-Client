import  { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { specalityChartData } from "../../api/admin";
import { SpecialityChart } from "../../interface/interfaceAdmin";
import { BarChart } from "@mui/x-charts/BarChart";
interface ChartData {
  id: number;
  value: number;
  label: string;
}

function DashBoardComponent() {
  
  const [chartValue, setChartValues] = useState<ChartData[]>();
  const [totalDoctor, setTotalDoctor] = useState<number>();

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await specalityChartData();
        let data: SpecialityChart[] = response.data.specalityChartData;
        let total = data.reduce(
          (total: number, values: SpecialityChart) => values.totalCount + total,
          0
        );
        let chartData: ChartData[] = [];
        setTotalDoctor(total);
        for (let val of data) {
          console.log((val.totalCount / total) * 100);
          let percentage = (val.totalCount / total) * 100;
          const chartDataItem: ChartData = {
            id: 0,
            value: percentage,
            label: val._id,
          };
          chartData.push(chartDataItem);
        }
        setChartValues(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    handleFn();
  }, []);

  return (
    <div className="bg-red mt-5 rounded-lg">
      <div className="mx-auto flex justify-center gap-20  ">
        <div className="bg-gray-50 h-40 shadow-2xl w-40 justify-center text-center rounded-lg">
          <svg
            viewBox="0 0 940 1000"
            fill="currentColor"
            height="5em"
            width="5em"
            className="text-center mx-10 mt-5"
          >
            <path d="M736 722c136 48 204 88.667 204 122v106H470 0V844c0-33.333 68-74 204-122 62.667-22.667 105.333-45.667 128-69s34-55 34-95c0-14.667-7.333-31-22-49s-25.333-42.333-32-73c-1.333-8-4.333-14-9-18s-9.333-6.667-14-8c-4.667-1.333-9.333-7-14-17s-7.667-24.333-9-43c0-10.667 1.667-19.333 5-26 3.333-6.667 6.333-10.667 9-12l4-4c-5.333-33.333-9.333-62.667-12-88-2.667-36 11-73.333 41-112s82.333-58 157-58 127.333 19.333 158 58 44 76 40 112l-12 88c12 5.333 18 19.333 18 42-1.333 18.667-4.333 33-9 43s-9.333 15.667-14 17c-4.667 1.333-9.333 4-14 8s-7.667 10-9 18c-5.333 32-15.667 56.667-31 74s-23 33.333-23 48c0 40 11.667 71.667 35 95s65.667 46.333 127 69" />
          </svg>{" "}
          <p className="text-black font-medium text-center">users</p>
          <p className="text-black font-medium text-center">10</p>
        </div>
        <div className="bg-gray-50 h-40 shadow-2xl w-40 justify-center text-center rounded-lg ">
          <svg
            viewBox="0 0 448 512"
            fill="currentColor"
            height="5em"
            width="5em"
            className="text-center mx-10 mt-5"
          >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-96 55.2C54 332.9 0 401.3 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1c-6-.6-12.1-.9-18.3-.9h-91.4c-6.2 0-12.3.3-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7v-59.1zM144 448c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" />
          </svg>
          <p className="text-black font-medium text-center">Doctors</p>
          <p className="text-black font-medium text-center">{totalDoctor}</p>
        </div>
      </div>

      <div className="mt-10 p-5 w-full flex gap-5 ">
        <div className="mt-10 w-1/3">
          <h1 className="text-center font-medium mb-2 text-xl">
            Percentage of Doctors per Specialty
          </h1>

          <PieChart
            className="w-full mx-auto"
            series={[
              {
                data: chartValue ? chartValue : [],
              },
            ]}
            width={500}
            height={300}
          />
        </div>

        <div className="mt-10 w-2/3 mx-2">
          <h1 className="text-center font-medium text-xl">Income chart</h1>
          <BarChart
            className="mx-auto"
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            // width={400}
            height={400}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default DashBoardComponent;
