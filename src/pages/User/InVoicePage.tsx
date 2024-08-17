import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInvoiceData } from "../../api/user";
import { InvoiceData } from "../../interface/interfaceUser";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function InVoicePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string | null = searchParams.get("id");

  const [invoiceData, setInvoiceData] = useState<InvoiceData[]>();
  const pdfRef = useRef<any>();
  const [loader, setLoader] = useState(false);

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
        pdf.save("invoice.pdf");
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
        const response = await getInvoiceData(query as string);
        console.log(response.data.invoiceData);
        setInvoiceData(response.data.invoiceData);
      } catch (error) {
        console.log(error);
      }
    };
    handleFn();
  }, []);

  // let subtotal = 0;
  //   transactionHistory.forEach((item) => {
  //     subtotal += item.quantity * item.unitPrice;
  //   });
  // const taxRate = 0.1;
  // const taxAmount = subtotal * taxRate;
  // const totalAmountDue = subtotal + taxAmount;

  return (
    <div className="bg-gray-100 p-8">
      {invoiceData?.map((val) => (
        <>
          <div
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
            ref={pdfRef}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-700">Invoice</h1>
                <p className="text-gray-500">Invoice Number:12333</p>
                <p className="text-gray-500">
                  Date:{val.createdAt.toString().split("T")[0]}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-700">MEDDICAL</h2>
                <p className="text-gray-500">kannur,kerala</p>
                <p className="text-gray-500">Phone:9895948261</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700">
                Bill To:{val.userData.userName}
              </h3>
              <p className="text-gray-500">{val.userData.email}</p>
              <p className="text-gray-500">{val.userData.phoneNumber}</p>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-700">
                      Description
                    </th>
                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-700">
                      slotNumber
                    </th>
                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-700">
                      Unit Price
                    </th>
                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">
                      DoctorAppointment
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {val.bookingData.slotNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {val.amount}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {val.amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="text-right my-8">
              <p className="text-gray-700">Subtotal: {val.amount}</p>
              {/* <p className="text-gray-700">
                Tax (10%): ${taxAmount.toFixed(2)}
              </p> */}
              <h3 className="text-2xl font-bold text-gray-700">
                Total Amount Due: {val.amount}
              </h3>
            </div>

            {/* Payment Terms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Payment Terms:
              </h3>
              <p className="text-gray-500">Due within 30 days</p>
            </div>
          </div>
        </>
      ))}

      <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loader}
        >
          {loader ? "Downloading..." : "Download Invoice"}
        </button>
      </div>
    </div>
  );
}

export default InVoicePage;
