import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { notify } from "./notify";
import { ToastContainer } from "react-toastify";

export const Forms = () => {
  const [forms, setForms] = useState();
  useEffect(() => {
    axios
      .get("https://cautious-top-coat-tuna.cyclic.cloud/api/forms")
      .then((result) => setForms(result.data))
      .catch((error) => console.log("error", error));

    notify("Fetched forms successfully.");
  }, []);

  return (
    <>
      <ToastContainer />
      <h1 className='text-lg font-medium text-center mb-4'>
        Forms Created by User
      </h1>
      <div className='w-full h-full space-y-4'>
        {forms?.map((e) => (
          <Link
            to={`/answer/${e.formId}`}
            className='p-4 rounded-full text-gray-500 hover:text-gray-800'>
            <div
              key={e.id}
              className='w-[640px] bg-[aliceblue] hover:bg-cyan-50 shadow-sm hover:shadow-lg rounded-lg p-4 flex flex-row items-center justify-between'>
              <div className='flex flex-col items-start justify-start'>
                <h1 className='text-xl font-bold'>{e.title}</h1>
                <p>{e.description}</p>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
