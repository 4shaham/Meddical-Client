import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getPrescription } from "../../api/user";
import { useLocation } from "react-router-dom";
import {prescriptionData } from "../../interface/interfaceUser";
// Replace with your actual logo path

const Prescription = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string | null = searchParams.get("id");

  const pdfRef = useRef<any>();
  const [loader, setLoader] = useState(false);

  const [prescriptionData, setPrescriptionData] =
    useState<prescriptionData[]>();

  const downloadPDF = () => {
    setLoader(true);
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("prescription.pdf");
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    const handleFn = async () => {
      try {
        const data = await getPrescription(query as string);
        console.log(data.data.prescriptionData);
        setPrescriptionData(data.data.prescriptionData);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {prescriptionData?.map((val) => (
        <div>
          <div
            ref={pdfRef}
            className="bg-transparent p-8 rounded shadow-md w-full max-w-4xl"
          >
            <div className="p-6 bg-white relative">
              {/* Hospital Logo */}
              <div className="text-center">
                {/* <img src={logo} alt="Hospital Logo" className="h-16 mx-auto" /> */}
                <h1 className="text-black text-4xl font-extrabold">
                  <div className="flex items-center">
                    <div>
                      <p>
                        ME<span className="text-blue-400">D</span>
                      </p>
                    </div>
                    <div>
                      <p className="relative flex items-center rotate-180 text-red-600">
                        D
                      </p>
                    </div>
                    <div>
                      <p>ICAL</p>
                    </div>
                  </div>
                </h1>
              </div>

              {/* Doctor's Information */}
              <div className="text-center mt-7 mb-3">
                <h2 className="text-3xl font-bold text-blue-800">
                  Dr.{val.doctorName}
                </h2>
                <p className="text-gray-600">
                  Dentist, Oral and Maxillofacial Surgeon
                </p>
                <p className="text-gray-600">
                  BDS, M.Phil. Oral Pathology & Microbiology, FCPS Oral &
                  Maxillofacial Surgery
                </p>
                <p className="text-gray-600">
                 Meddical
                </p>
              </div>

              {/* Prescription Body */}
              <div className="mt-6 flex justify-between">
                <div className="flex flex-col w-1/3">
                  <p>
                    <span className="font-bold">Name:</span>
                    {val.userData[0].userName}
                  </p>
                  <p>
                    <span className="font-bold">Age:</span>
                    {val.userData[0].age}
                  </p>
                  <p>
                    <span className="font-bold">Sex:</span>
                    {val.userData[0].gender}
                  </p>
                  <p>
                    <span className="font-bold">Diagnosis:{val.diagnosis}</span>
                    {/* {val.diagnosis} */}
                  </p>
                </div>
                <div className="flex flex-col w-1/3 items-end">
                  <p className="text-red-500">
                    <span className="font-bold text-black">Date:</span>{" "}
                    {val.date.toString().split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-lg text-blue-800">
                  Prescription:
                </h3>


                <div className="px-10 w-full h-fit rounded-lg overflow-x-auto mt-3 mb-3 border border-black">
                  <table className="min-w-full font-roboto border border-gray-300 rounded-lg">
                    <thead>
                      <tr>
                       <th className="font-semibold text-sm text-left pl-6 py-3">
                          slNo
                        </th>
                        <th className="font-semibold text-sm text-left pl-6 py-3">
                          Medicine
                        </th>
                        <th className="font-semibold text-sm text-left pl-6 py-3">
                          Doos
                        </th>
                        <th className="font-semibold text-sm text-left pl-6 py-3">
                          instruction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {val.medicines.map((val,index) => (
                        <tr className="bg-gray-100">
                           <td className="font-normal text-sm text-left pl-6 py-3">
                            {index+1}
                          </td>
                          <td className="font-normal text-sm text-left pl-6 py-3">
                            {val.name}
                          </td>
                          <td className="font-normal text-sm text-left pl-6 py-3">
                            {val.dosage}
                          </td>
                          <td className="font-normal text-sm text-left pl-6 py-3">
                            {val.instructions}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mx-3">
                  <h1 className="font-medium">Recovery Steps</h1>
                  <div className="mx-4 mt-1">
                    {val.recoverySteps.map((val, index) => (
                      <h1>
                        <span>{index + 1} : </span>
                        {val}
                      </h1>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 border-t pt-4">
                <p className="text-center text-gray-600">Hospital/Meddical</p>
                <p className="text-center text-gray-600">
                  123-456-7890, 444-666-8899
                </p>
                <p className="text-center text-gray-600">
                  Street address here, City State, Zip Code
                </p>
              </div>

              {/* Background Image */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="https://img.freepik.com/free-vector/medical-prescription-concept-illustration_114360-6595.jpg?w=740&t=st=1722176048~exp=1722176648~hmac=2dc44763f8be45604242f2e66792c6248c1636716269177c8d042a60e15b9583"
                  alt="Background"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={downloadPDF}
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loader}
            >
              {loader ? "Downloading..." : "Download Prescription"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prescription;
