import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../api/user";
import { IPaymentData } from "../../interface/interfaceUser";

function TransactionHistoryPage() {
  const [transactionData, setTransactionData] = useState<IPaymentData[]>();

  useEffect(() => {
    const handleFn = async () => {
      const response = await getTransactionHistory();
      console.log(response.data.transactionData);
      setTransactionData(response.data.transactionData);
    };
    handleFn();
  }, []);

  return (
    <div className="p-5">
      <div className="bg-gray-200 h-auto md:min-h-screen p-5 rounded-md">
        <h1 className="text-center font-medium text-2xl">
          Transaction History{" "}
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  TransactionId
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionData?.map((val, index) => (
                <tr className={index%2==0?"bg-gray-200 border-b da": "bg-white border-b da"}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap "
                  >
                    {val.createdAt}
                  </th>
                  <td className="px-6 py-4 text-black">{val.transactionId}</td>
                  <td className="px-6 py-4 text-black">{val.paymentMethod}</td>
                  <td className="px-6 py-4 text-black">{val.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistoryPage;
