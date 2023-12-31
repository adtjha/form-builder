import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../notify";
import { ToastContainer } from "react-toastify";

const ClozeQuestion = () => {
  const [sentence, setSentence] = useState();
  const [words, setWords] = useState([]);
  const [blank, setBlanks] = useState([]);
  const [question, setQuestion] = useState();

  const dispatch = useDispatch();
  const formId = useSelector((state) => state.forms.forms.id);

  const handleSentence = (e) => {
    setWords(e.target.value.split(" ").map((e, i) => ({ id: i, val: e })));
    setSentence(e.target.value);
    // setBlanks(e.target.value)
  };

  const handleClick = (e) => {
    console.log(e.target.id);
    const wordId = e.target.id;
    const word = words[wordId];
    if (blank.includes(word)) {
      setBlanks(blank.filter((w) => w !== word));
    } else {
      console.log(blank);
      setBlanks([...blank, word]);
    }

    console.log(blank);
  };

  useEffect(() => {
    let que = [];
    words.forEach((e, i) => {
      if (blank.includes(e)) {
        que[i] = new Array(e.val.length).fill("_").join("");
      } else {
        que[i] = e.val;
      }
    });

    setQuestion(que.join(" "));
  }, [words, blank]);

  const handleSave = () => {
    console.log("Save Cloze", question, blank, formId);
    dispatch({
      type: "ADD_QUESTION",
      payload: {
        type: "cloze",
        question: question,
        options: blank,
        formId: formId,
      },
    });
    reset();
  };

  const reset = () => {
    setSentence("");
    setBlanks([]);
    setWords([]);
    setQuestion();
  };

  const handleAddOption = () => {
    if (blank.length < 4) {
      setBlanks([...blank, ""]);
    } else {
      notify("You can only have four options.");
    }
  };

  const removeBlank = (e) => {
    const updatedBlanks = [...blank];
    updatedBlanks.splice(e, 1);
    setBlanks([...updatedBlanks]);
  };

  return (
    <>
      <ToastContainer />
      <div className='w-full grid grid-flow-row gap-8'>
        <label className='block mt-8'>
          <span className='text-gray-700'>Sentence</span>
          <textarea
            type='text'
            value={sentence}
            onChange={handleSentence}
            className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Type your question here...'
          />
        </label>
        <label className='block mt-4'>
          <span className='text-gray-700'>
            Words{" "}
            <span className='text-sm text-gray-00'>
              (Click on words which you want to fill in.)
            </span>
          </span>
          <div className='w-fit flex flex-row flex-wrap items-start justify-start gap-2'>
            {words.map((w, i) => {
              if (blank.includes(i)) {
                return (
                  <button
                    id={i}
                    type='button'
                    className='px-2 py-1 border-2 border-gray-800 rounded-md'
                    onClick={handleClick}>
                    {w.val}
                  </button>
                );
              } else {
                return (
                  <button
                    id={i}
                    type='button'
                    className='px-2 py-1 border border-gray-400 rounded-md'
                    onClick={handleClick}>
                    {w.val}
                  </button>
                );
              }
            })}
          </div>
        </label>
        <label className='block mt-4'>
          <span className='text-gray-700'>Preview</span>
          <input
            type='text'
            value={question}
            className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Your question...'
          />
        </label>
        <label className='block mt-4'>
          <div className='text-gray-700 flex flex-row items-center justify-start gap-4'>
            Options{" "}
            <button
              className='w-8 h-8 rounded-full hover:bg-slate-300'
              onClick={handleAddOption}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 m-auto'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
          </div>
          <ol className='w-fit flex flex-col flex-wrap items-start justify-start gap-2 list-decimal my-4'>
            {blank.map((b, i) => (
              <li
                id={i}
                className='flex flex-row items-center justify-between gap-2'>
                <input
                  id={i}
                  value={b.val}
                  onChange={(e) => {
                    let val = e.target.value;
                    console.log("====================================");
                    console.log("Here", val, blank, words);
                    console.log("====================================");
                    if (val !== "" && val !== undefined && val !== null) {
                      const updatedBlank = [...blank];
                      updatedBlank[i] = {
                        id: `${i}_edited`,
                        val: e.target.value,
                      };
                      setBlanks(updatedBlank);
                    }
                  }}
                  type='text'
                  className='px-2 py-1 border-gray-300 bg-gray-100 rounded-md'
                />
                <button onClick={() => removeBlank(i)}>
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
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ol>
        </label>
        {/* Additional logic and UI elements specific to Cloze questions can be added here */}
        <button
          className='w-fit px-4 bg-gray-100 hover:bg-gray-300 m-auto py-4 border border-gray-50 rounded-bl-md flex flex-row items-center justify-center gap-4'
          onClick={handleSave}>
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
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add Question
        </button>
      </div>
    </>
  );
};

export default ClozeQuestion;
