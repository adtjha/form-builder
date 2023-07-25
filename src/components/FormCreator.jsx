/**
 * Creator form,
 *
 * editable question input
 * editable answer tab
 * save button
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import ClozeQuestion from "./questions/cloze";
import ComprehensionQuestion from "./questions/comprehension";
import CategorizeQuestion from "./questions/categorize";
import axios from "axios";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const [questions, setQuestion] = useState([]);

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

  const handleSave = () => {
    console.log("save");
  };

  return (
    <>
      <button
        className='mt-10 flex flex-col items-center justify-evenly z-0'
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
        </svg>
      </button>
      {open && (
        <>
          <div class=' rounded overflow-hidden shadow-lg m-auto'>
            <div class='px-6 py-4 space-x-4'>
              <label class='font-semibold text-xl mb-2'>Question Type</label>
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
            {questionType === "cloze" && <ClozeQuestion />}
            {questionType === "comprehension" && <ComprehensionQuestion />}
            {questionType === "categorize" && <CategorizeQuestion />}
            <div className='w-full flex flex-row items-center justify-evenly'>
              <button
                class='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md'
                onClick={handleSave}>
                Save
              </button>
              <button
                class='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-br-md'
                onClick={handleCloseClick}>
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const FormCreator = () => {
  const [question, setQuestion] = useState([]);

  return (
    <div className='p-2 flex flex-col justify-evenly'>
      <Link
        to={"/"}
        className='w-fit flex flex-row items-start justify-evenly space-x-2 mb-4'>
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
        <span className='font-medium text-base'>back</span>
      </Link>
      <h1 className='w-fit m-auto text-4xl font-semibold'>Form Creator</h1>
      <AddQuestion setQuestion={setQuestion} />
    </div>
  );
};
