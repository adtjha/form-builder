import React, { useEffect, useState } from "react";

const ClozeQuestion = ({ content, image }) => {
  const [sentence, setSentence] = useState();
  const [words, setWords] = useState([]);
  const [blank, setBlanks] = useState([]);
  const [question, setQuestion] = useState();

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

  return (
    <div className='m-4'>
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
        <span className='text-gray-700'>Words</span>
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
        <span className='text-gray-700'>Options</span>
        <ol className='w-full flex flex-col flex-wrap items-start justify-start gap-2 list-decimal mx-4'>
          {blank.map((b, i) => (
            <li>
              <button
                id={i}
                type='button'
                className='px-2 py-1 border-2 border-gray-800 rounded-md'
                onClick={() => console.log("yay")}>
                {b}
              </button>
            </li>
          ))}
        </ol>
      </label>
      {/* Additional logic and UI elements specific to Cloze questions can be added here */}
    </div>
  );
};

export default ClozeQuestion;
