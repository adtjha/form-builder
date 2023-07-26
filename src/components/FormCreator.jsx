/**
 * Creator form,
 *
 * editable question input
 * editable answer tab
 * save button
 */
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddQuestion } from "./AddQuestion";
const { v4: uuidv4 } = require("uuid");

const FormatQuestion = ({ q }) => {
  console.log(q);
  switch (q.type) {
    case "cloze":
      return (
        <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
          <div className='w-full border border-gray-200'>{q.question}</div>
          <div className='w-full grid grid-cols-2 gap-2'>
            {q?.mcq?.options?.map((e, index) => {
              // Use index to determine which column the option should be placed in
              const column = index % 2 === 0 ? 1 : 2;

              return (
                <label
                  className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                  <input type='radio' name='q1' value={e} />
                  <div>{e}</div>
                </label>
              );
            })}
          </div>
        </div>
      );
    case "categorize":
      return <h1>Categorize</h1>;
    case "comprehension":
      return (
        <>
          <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
            <div>{q.paragraph}</div>
            <div>
              {Object.keys(q.mcq).map((m) => {
                <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
                  <div className='w-full border border-gray-200'>
                    {q.mcq["text"]}
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    {q.mcq["options"]?.map((e, index) => {
                      // Use index to determine which column the option should be placed in
                      const column = index % 2 === 0 ? 1 : 2;

                      return (
                        <label
                          className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                          <input type='radio' name='q1' value={e} />
                          <div>{e}</div>
                        </label>
                      );
                    })}
                  </div>
                </div>;
              })}
            </div>
          </div>
        </>
      );
    default:
      console.Error("Type unknown");
      break;
  }
};

export const FormCreator = () => {
  // const [question, setQuestion] = useState([]);
  const formId = uuidv4();
  const questions = useSelector((state) => state.questions.questions);

  return (
    <div className='p-2 flex flex-col justify-evenly space-y-4'>
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
      <h1 className='w-fit m-auto text-4xl font-semibold inline-flex flex-col items-center'>
        Form Creator
        <span className='text-xs text-gray-400'>{formId}</span>
      </h1>
      {questions.map((q) => (
        <FormatQuestion q={q} />
      ))}
      <AddQuestion />
    </div>
  );
};
