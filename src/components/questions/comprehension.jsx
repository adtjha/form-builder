import React, { useEffect, useRef, useState } from "react";
import { MultipleChoice } from "./MultipleChoice";
const { v4: uuidv4 } = require("uuid");

const ComprehensionQuestion = ({ content, image }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();
  const questionContainer = useRef();

  const addQuestion = (e) => {
    setQuestions([...questions, uuidv4()]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((e) => e !== id));
  };

  return (
    <div className='m-4 w-11/12'>
      {image && <img src={image} alt='Question Image' />}
      <label class='block'>
        <span class='text-gray-700'>Comprehension</span>
        <textarea
          type='text'
          class='h-12 p-3 mt-4 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
          placeholder='Type your comprehension here...'
        />
      </label>
      <button className='block mt-4' onClick={addQuestion}>
        <span class='text-gray-700'>Add Questions</span>
      </button>
      <div
        class='p-2 mt-4 flex flex-col items-start justify-evenly'
        ref={questionContainer}>
        {questions.map((e, i) => {
          return (
            <MultipleChoice key={e} id={e} removeQuestion={removeQuestion} />
          );
        })}
      </div>
    </div>
  );
};

export default ComprehensionQuestion;
