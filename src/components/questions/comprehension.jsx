import React, { useEffect, useRef, useState } from "react";
import { MultipleChoice } from "./MultipleChoice";
import { useDispatch } from "react-redux";
const { v4: uuidv4 } = require("uuid");

const ComprehensionQuestion = ({ content, image }) => {
  const [questions, setQuestions] = useState({});
  const [para, setPara] = useState("");

  const dispatch = useDispatch();

  const addQuestion = (e) => {
    let uid = uuidv4();
    setQuestions({
      ...questions,
      [uid]: {
        text: "",
        options: [],
      },
    });
    console.log(questions);
  };

  const removeQuestion = (id) => {
    // setQuestions(questions?.filter((e) => e.qid !== id));
    setQuestions((questions) =>
      Object.keys(questions).map((e) => e.qid !== id)
    );
  };

  const handleSave = () => {
    console.log("Save Cloze");
    dispatch({
      type: "ADD_QUESTION",
      payload: {
        type: "comprehension",
        paragraph: para,
        mcq: questions,
      },
    });
  };

  return (
    <div className='m-4 w-11/12'>
      {image && <img src={image} alt='Question Image' />}
      <label className='block'>
        <span className='text-gray-700'>Comprehension</span>
        <textarea
          value={para}
          onChange={(e) => setPara(e.target.value)}
          type='text'
          className='h-12 p-3 mt-4 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
          placeholder='Type your comprehension here...'
        />
      </label>
      <button className='block mt-4' onClick={addQuestion}>
        <span className='text-gray-700'>Add Questions</span>
      </button>
      <div className='p-2 mt-4 flex flex-col items-start justify-evenly'>
        {/* {questions?.map((e, i) => {
          return (
            <MultipleChoice
              key={e}
              id={e}
              removeQuestion={removeQuestion}
              questions={questions}
              setQuestions={setQuestions}
            />
          );
        })} */}
        {Object.keys(questions).map((e) => (
          <MultipleChoice
            key={e}
            id={e}
            removeQuestion={removeQuestion}
            questions={questions}
            setQuestions={setQuestions}
          />
        ))}
      </div>

      <button
        className='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md'
        onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ComprehensionQuestion;
