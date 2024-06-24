import React, { useState } from "react";
import SpecalityManagmentTable from "../../components/Admin/SpecalityManagmentTable";

function SpecalityManagement() {
  const [componentStatus, setComponentStatus] = useState<boolean>(false);

  return (
    <div className="w-full mx-2 mt-11">
      {componentStatus ? (
        <button
          onClick={() => setComponentStatus(false)}
          className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
        >
          Back to
        </button>
      ) : (
        <button
          onClick={() => setComponentStatus(true)}
          className="bg-btnColor text-white px-14 py-1 rounded-md mb-10 ml-2"
        >
          Add Specality
        </button>
      )}

      {componentStatus ? <>giiii</> : <SpecalityManagmentTable />}
    </div>
  );
}

export default SpecalityManagement;
