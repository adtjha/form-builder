import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddQuestion } from "./AddQuestion";
import { Fragment, useEffect, useState } from "react";
import { FormatQuestion } from "./FormatQuestion";
const { v4: uuidv4 } = require("uuid");

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const FormCreator = () => {
  // const [question, setQuestion] = useState([]);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const formId = useSelector((state) => state.forms.forms.id);
  const formName = useSelector((state) => state.forms.forms.name);
  const [base64Image, setBase64Image] = useState("");

  const handleFormNameChange = (e) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        id: formId,
        name: e.target.value,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='w-full min-h-screen grid grid-cols-8'>
      <div
        className='relative w-full p-8 grid justify-stretch gap-6 col-span-4 border-r-2 border-dashed border-stone-500'
        style={{
          alignItems: "start",
          // gridTemplateRows: "60px 120px 120px 120px 360px",
        }}>
        <div className='absolute top-0 right-0 p-4 font-mono font-bold underline'>
          Editor
        </div>
        <div className='flex flex-row items-center justify-start gap-4'>
          <Link
            to={"/"}
            className='p-4 w-fit flex flex-row items-start justify-start space-x-2 hover:bg-gray-300 rounded-full'>
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
                d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
              />
            </svg>
          </Link>
          <h1 className='w-fit text-xl font-semibold'>Form Creator</h1>
        </div>

        <div className='flex flex-col items-start justify-evenly gap-2'>
          <label htmlFor='formId'>Form Id : </label>
          <span className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'>
            {formId}
          </span>
        </div>
        <div className='flex flex-col items-start justify-evenly gap-2 border-dotted border-gray-300'>
          <label htmlFor='FormName'>Form Name : </label>
          <input
            type='text'
            name='FormName'
            id='FormName'
            value={formName}
            onChange={handleFormNameChange}
            className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Form name goes here.'
          />
        </div>
        <div className='flex flex-col items-start justify-evenly gap-2 border-dotted border-gray-300'>
          <label htmlFor='headerImg'>Form's Header Image</label>
          <input
            type='file'
            name='headerImg'
            id='headerImg'
            onChange={handleImageChange}
          />
        </div>
        <AddQuestion />
      </div>
      <div className='relative bg-stone-100 col-span-4 px-8 py-4 flex flex-col items-stretch justify-stretch gap-4'>
        <div className='absolute top-0 left-0 p-4 font-mono font-bold underline'>
          Preview
        </div>
        <div className='text-center text-4xl font-bold'>{formName}</div>
        {base64Image && (
          <img
            className='w-fit h-64'
            src={base64Image}
            alt='Converted to Base64'
          />
        )}
        <ol className='list-decima flex flex-col flex-wrap justify-evenly items-stretch gap-4'>
          {questions?.map((q) => (
            <li>
              <FormatQuestion q={q} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
