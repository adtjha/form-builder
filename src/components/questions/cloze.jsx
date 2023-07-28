import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClozeQuestion = ({ content, image }) => {
  const [sentence, setSentence] = useState();
  const [words, setWords] = useState([]);
  const [blank, setBlanks] = useState([]);
  const [question, setQuestion] = useState();

  const dispatch = useDispatch();
  const formId = useSelector((state) => state.forms.forms.id);

  const handleSentence = (e) => {
    setWords(e.target.value.split(" "));
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
        que[i] = new Array(e.length).fill("_").join("");
      } else {
        que[i] = e;
      }
    });

    setQuestion(que.join(" "));
  }, [words, blank]);

  const handleSave = () => {
    console.log("Save Cloze");
    dispatch({
      type: "ADD_QUESTION",
      payload: {
        type: "cloze",
        question: question,
        options: blank,
        formId: formId,
      },
    });
  };

  const handleAddOption = () => {
    setBlanks([...blank, ""]);
  };

  return (
    <div className='m-4 grid grid-flow-row gap-4'>
      {image && <img src={image} alt='Question Image' />}
      <label className='block'>
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
        <div className='w-full flex flex-row flex-wrap items-start justify-start gap-2'>
          {words.map((w, i) => {
            if (blank.includes(i)) {
              return (
                <button
                  id={i}
                  type='button'
                  className='px-2 py-1 border-2 border-gray-800 rounded-md'
                  onClick={handleClick}>
                  {w}
                </button>
              );
            } else {
              return (
                <button
                  id={i}
                  type='button'
                  className='px-2 py-1 border border-gray-400 rounded-md'
                  onClick={handleClick}>
                  {w}
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
          placeholder='Type your question here...'
        />
      </label>
      <label className='block mt-4'>
        <div className='text-gray-700 flex flex-row items-center justify-between'>
          Options{" "}
          <button onClick={handleAddOption}>
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
        </div>
        <ol className='w-full flex flex-col flex-wrap items-start justify-start gap-2 list-decimal mx-4'>
          {blank.map((b, i) => (
            <li>
              <input
                id={i}
                value={b}
                onChange={(e) => {
                  const updatedBlank = [...blank];
                  updatedBlank[i] = e.target.value;
                  setBlanks(updatedBlank);
                }}
                type='text'
                className='px-2 py-1 border-2 border-gray-800 rounded-md'
              />
            </li>
          ))}
        </ol>
      </label>
      {/* Additional logic and UI elements specific to Cloze questions can be added here */}
      <button
        className='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md'
        onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ClozeQuestion;
