import { useState } from "react";
import ClozeQuestion from "./questions/cloze";
import ComprehensionQuestion from "./questions/comprehension";
import CategorizeQuestion from "./questions/categorize";
import { useDispatch } from "react-redux";

export const AddQuestion = () => {
  // Access the dispatch function using useDispatch
  const dispatch = useDispatch();

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
