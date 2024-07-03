import { Tooltip } from "@mui/material";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function DashboardComponent() {
  return (
    <div className="bg-red mt-5 rounded-lg p-4 flex gap-2">
      <div className="w-3/4 h-full bg-white rounded-md p-4">
        <h1 className="text-black font-medium text-2xl mx-5">
          Analytics DashBoard
        </h1>
        <div className="flex flex-row flex-wrap justify-center gap-10 mt-4">
          <div className="flex flex-col bg-yellow-50 rounded-lg p-4 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg">
            <div className="flex gap-2">
              <div className="font-mono font-bold">Pomodoro Time</div>
            </div>
            <div className="flex justify-center text-2xl">25</div>
          </div>
          <div className="flex flex-col bg-blue-100 rounded-lg p-4 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg">
            <div className="flex gap-2">
              <div className="font-mono font-bold">Short Break</div>
            </div>
            <div className="flex justify-center text-2xl">5</div>
          </div>
          <div className="flex flex-col bg-green-50 rounded-lg p-4 shadow-md hover:cursor-pointer hover:shadow">
            <div className="flex gap-2">
              <div className="font-bold text-lg">Long Break</div>
            </div>
            <div className="flex justify-center text-2xl">15</div>
          </div>
        </div>

        <div className="mt-5">
          <AreaChart
            width={900}
            height={350}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />

            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
      <div className="w-1/3 bg-white h-full rounded-md p-2">
          <h1 className="text-black font-bold text-center mt-1 mb-7">Today's Task</h1>
          <div className="w-full h-96 bg-gray-100 rounded-md mt-2 text-center ">
              <div className="w-full bg-gray-100 rounded-md">
                 <h1 className="text-red-500 font-medium">9:00am to 1:00pm</h1>
                 <p className="text-black font-medium">counsultaiton Time</p>
              </div>
              <div className="w-full bg-gray-100 rounded-md mt-2">
                 <h1 className="text-red-500 font-medium">9:00am to 1:00pm</h1>
                 <p className="text-black font-medium">counsultaiton Time</p>
              </div>
              <div className="w-full bg-gray-100 rounded-md mt-2">
                 <h1 className="text-red-500 font-medium">9:00am to 1:00pm</h1>
                 <p className="text-black font-medium">counsultaiton Time</p>
              </div>
          </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
