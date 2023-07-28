import { useState } from "react";
import ClozeQuestion from "./questions/cloze";
import ComprehensionQuestion from "./questions/comprehension";
import CategorizeQuestion from "./questions/categorize";
import { useDispatch, useSelector } from "react-redux";
import parser, { encodeData } from "./parser";
import axios from "axios";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const AddQuestion = () => {
  // Access the dispatch function using useDispatch
  // const db = getFirestore();

  const questions = useSelector((state) => state.questions);

  const formId = useSelector((state) => state.forms.forms.id);

  console.log({ formId, type: "AddQuestion" });

  const [open, setOpen] = useState(false);

  const [questionType, setQuestionType] = useState("cloze");

  const handleOpenClick = () => {
    setOpen(true);
  };
  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const handlePublish = async () => {
    console.log(questions);
    const data = encodeData(Object.values(questions)[0]);
    console.log(data);
    for (let d in data) {
      await axios.post("http://127.0.0.1:5000/api/questions", {
        type: data[d].type,
        content: JSON.stringify(data[d].content),
        formId: data[d].content.formId,
      });
      console.log({ ...data[d] });
    }
  };

  return (
    <>
      <div className='flex'>
        <button
          className='w-fit mt-10 p-4 mx-auto flex flex-col items-center justify-evenly z-0 hover:bg-gray-200 rounded-md'
          onClick={handleOpenClick}>
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
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>{" "}
          Add Question
        </button>
        <button
          className='w-fit mt-10 p-4 mx-auto flex flex-col items-center justify-evenly z-0 hover:bg-gray-200 rounded-md'
          onClick={handlePublish}>
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
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
            />
          </svg>{" "}
          Publish Form
        </button>
      </div>

      {open && (
        <>
          <div className=' rounded overflow-hidden shadow-lg m-auto'>
            <div className='px-6 py-4 space-x-4 flex flex-row items-center justify-around'>
              <div className='flex flex-row items-center justify-evenly'>
                <label className='font-semibold text-xl'>Question Type</label>
                <select
                  name='questionType'
                  className='h-12 p-3'
                  value={questionType}
                  onChange={handleQuestionType}>
                  <option value='cloze'>Cloze</option>
                  <option value='comprehension'>Comprehension</option>
                  <option value='categorize'>Categorize</option>
                </select>
              </div>
              <button onClick={handleCloseClick}>
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            {questionType === "cloze" && <ClozeQuestion />}
            {questionType === "comprehension" && <ComprehensionQuestion />}
            {questionType === "categorize" && <CategorizeQuestion />}
          </div>
        </>
      )}
    </>
  );
};
