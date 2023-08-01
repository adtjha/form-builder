import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormatQuestion } from "./FormatQuestion";
import { decodeData } from "./parser";
import { notify } from "./notify";
import { ToastContainer } from "react-toastify";

export const Answer = () => {
  const formId = useParams("formId");
  const [questions, setQuestions] = useState([]);
  const [forms, setForms] = useState([]);

  console.log(formId);
  // get form from server,

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://cautious-top-coat-tuna.cyclic.cloud/api/questions"
      ); // Replace with your API URL
      questions.length === 0 && setQuestions(decodeData(response.data)); // Assuming the API returns an array of data
    } catch (error) {
      notify("Error fetching questions data.");
      console.error("Error fetching questions data:", error);
    }
  };

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        "https://cautious-top-coat-tuna.cyclic.cloud/api/forms"
      );
      forms.length === 0 && setForms(response.data[0]);

      // console.log(forms);
    } catch (error) {
      notify("Error in fetching forms.");
      console.error("Error fetching forms data:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchForms();
    notify("Fetch forms successful.");
  }, []);
  // store user response,
  return (
    <div className='relative'>
      <ToastContainer />
      <Link
        to='/'
        className='absolute top-10 left-10 rounded-lg px-4 py-2 cursor-pointer hover:border border-gray-800 flex flex-row items-center justify-evenly gap-2'>
        <span>
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
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
        </span>
        <span>Home</span>
      </Link>
      <div className='w-[480px] m-auto p-8'>
        <div className='text-4xl font-bold text-center mb-2'>
          {forms["title"]}
        </div>
        <div className='text-base font-serif text-center mb-2'>
          {forms["description"]}
        </div>
        <img
          className='text-base font-serif text-center h-20 m-auto mb-8'
          src={forms["headerImage"]}
          alt='Header Img'
        />

        <div className='grid grid-cols-1 gap-8'>
          {questions && questions.map((q) => FormatQuestion({ q }))}
        </div>
      </div>
    </div>
  );
};
