import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";

// interface Of Medicien

interface Medicine {
  medicine: string;
  dosage: string;
  instruction: string;
}

export function PrescriptionModal() {
  const [openModal, setOpenModal] = useState(false);
  const [showAddMedicienForm, setAddMedicienForm] = useState<boolean>(false);

  const [medicines, setMedicine] = useState<Medicine[]>([]);
  const [description, setDescription] = useState<string>();
  const [recoveryStep, setRecoveryStep] = useState<string>();

  // add Medicien states
  const [med, setMed] = useState<string>();
  const [dos, setDos] = useState<string>();
  const [instruction, setInstruction] = useState<string>();

  const addPrescriptionSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    // Your submit logic here
    try {

         if(!medicines || !description || !recoveryStep) {
            toast.error("all fields are required");
            return
          }
          



    } catch (error){
        console.log(error,"kjdfjdkjf")
    }
  };

  const handleAddMedicine = () => {
    if (!med || !instruction || !dos) {
      toast.error("all fields are required koo");
      return;
    }
    console.log("jdhf", med);
    setMedicine([
      ...medicines,
      { medicine: med, dosage: dos, instruction: instruction },
    ]);
    setMed("");
    setDos("");
    setInstruction("");
    setAddMedicienForm(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
        <div className="bg-white p-5 rounded w-1/2 mx-auto h-auto ">
          <h2 className="text-xl font-bold mb-4">Add Prescription</h2>
          <form onSubmit={addPrescriptionSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Description
              </label>
              <textarea
                id="notes"
                placeholder="Enter any additional notes"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {medicines.length != 0 && (
              <div className="px-10 w-full h-fit rounded-lg overflow-x-auto">
                <table className="min-w-full font-roboto border border-gray-300 rounded-lg">
                  <thead>
                    <tr>
                      <th className="font-semibold text-sm text-left pl-6 py-3">
                        Medicien
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
                    {medicines.map((val) => (
                      <tr className="bg-gray-100">
                        <td className="font-normal text-sm text-left pl-6 py-3">
                          {val.medicine}
                        </td>
                        <td className="font-normal text-sm text-left pl-6 py-3">
                          {val.dosage}
                        </td>
                        <td className="font-normal text-sm text-left pl-6 py-3">
                          {val.instruction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mb-4 mt-2 mx-1">
              <button
                className="bg-btnColor text-white px-2 py-1 rounded-sm"
                type="button"
                onClick={() => setAddMedicienForm(true)}
              >
                Add Medicine
              </button>

              {showAddMedicienForm && (
                <div className="bg-gray-100 rounded-md flex mt-2  p-2 mb-5">
                  <label htmlFor="" className="mx-3 font-medium">
                    Medicine
                  </label>
                  <input
                    type="text"
                    className="bg-white border mb-2 rounded-md py-0 mx-1"
                    value={med}
                    onChange={(e) => setMed(e.target.value)}
                  />
                  <label htmlFor="" className="mx-3 font-medium">
                    dosage
                  </label>
                  <input
                    type="number"
                    className="bg-white border mb-2 rounded-md py-0 mx-1"
                    value={dos}
                    onChange={(e) => setDos(e.target.value)}
                  />
                  <label htmlFor="" className="mx-3 font-medium">
                    instruction
                  </label>
                  <input
                    type="text"
                    className="bg-white border mb-2 rounded-md py-0 mx-1"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />

                  <button
                    className="bg-black  rounded-md text-white mx-auto px-6 "
                    type="button"
                    onClick={handleAddMedicine}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Recovery steps
              </label>
              <textarea
                id="notes"
                placeholder="Enter any additional notes"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                value={recoveryStep}
                onChange={(e) => setRecoveryStep(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PrescriptionModal;

// import React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";

// function PrescriptionModal() {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => setOpen(!open);

//   return (
//     <>
//       <button onClick={handleOpen}>
//         Create Prescription
//       </button>
//       <Dialog open={open} handler={handleOpen} className="w-1/2 mx-auto bg-gray-100">
//         <DialogHeader>It's a simple dialog.</DialogHeader>
//         <DialogBody>
//           The key to more success is to have a lot of pillows. Put it this way,
//           it took me twenty-five years to get these plants, twenty-five years of
//           blood, sweat, and tears, and I'm never giving up, I'm just
//           getting started. I'm up to something. Fan luv.
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={handleOpen}
//             className="mr-1"
//           >
//             <span>Cancel</span>
//           </Button>
//           <Button variant="gradient" color="green" onClick={handleOpen}>
//             <span>Confirm</span>
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// }

// export default PrescriptionModal;
