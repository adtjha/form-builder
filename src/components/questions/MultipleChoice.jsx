import React, { useEffect, useState } from "react";
const { v4: uuidv4 } = require("uuid");

export const MultipleChoice = ({
  id,
  removeQuestion,
  questions,
  setQuestions,
}) => {
  // useEffect(() => {
  //   console.log(id, removeQuestion, questions, setQuestions);
  // });

  // const [que, setQue] = useState({
  //   id: id,
  //   text: "",
  //   opt0: "",
  //   opt1: "",
  //   opt2: "",
  //   opt3: "",
  // });
  let i = questions.findIndex((e) => e.id === id);

  const handleChange = (value, type) => {
    let updatedQuestions;
    switch (type) {
      case "que":
        updatedQuestions = [...questions];
        updatedQuestions[i].text = value;
        setQuestions(updatedQuestions);
        break;
      case "opt0":
        updatedQuestions = [...questions];
        updatedQuestions[i].options[0] = value;
        setQuestions(updatedQuestions);
        break;
      case "opt1":
        updatedQuestions = [...questions];
        updatedQuestions[i].options[1] = value;
        setQuestions(updatedQuestions);
        break;
      case "opt2":
        updatedQuestions = [...questions];
        updatedQuestions[i].options[2] = value;
        setQuestions(updatedQuestions);
        break;
      case "opt3":
        updatedQuestions = [...questions];
        updatedQuestions[i].options[3] = value;
        setQuestions(updatedQuestions);
        break;

      default:
        console.log("Wrong Type");
        break;
    }
  };

  // useEffect(() => {
  //   setQuestions((questions) => {
  //     questions?.forEach((q) => {
  //       if (q.id === que.id) {
  //         q.text = que.text;
  //         q.options = [que.opt0, que.opt1, que.opt2, que.opt3];
  //       }
  //     });
  //   });
  // }, [que]);

  return (
    <div
      id={id}
      className='relative bg-gray-50 border border-gray-400 my-4 p-4 rounded-md'>
      <button
        onClick={() => removeQuestion(id)}
        className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4 h-4'>
          <path
            fillRule='evenodd'
            d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <input
        value={questions[i].text}
        onChange={(e) => handleChange(e.target.value, "que")}
        className='h-12 p-3 mt-4 mb-6 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
        placeholder='Type your question here...'
      />
      <div className='grid grid-cols-2 gap-4'>
        <label className='w-full flex flex-row items-center justify-center my-2 gap-2'>
          <input type='checkbox' name='q1' value='a' />
          <input
            value={questions[i].options[0] || ""}
            onChange={(e) => handleChange(e.target.value, "opt0")}
            type='text'
            className='h-8 p-2 mr-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='option 1'
          />
        </label>
        <label className='w-full flex flex-row items-center justify-center my-2 gap-2'>
          <input type='checkbox' name='q1' value='b' />
          <input
            value={questions[i].options[1] || ""}
            onChange={(e) => handleChange(e.target.value, "opt1")}
            type='text'
            className='h-8 p-2 mr-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='option 2'
          />
        </label>
        <label className='w-full flex flex-row items-center justify-center my-2 gap-2'>
          <input type='checkbox' name='q1' value='c' />
          <input
            value={questions[i].options[2] || ""}
            onChange={(e) => handleChange(e.target.value, "opt2")}
            type='text'
            className='h-8 p-2 mr-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='option 3'
          />
        </label>
        <label className='w-full flex flex-row items-center justify-center my-2 gap-2'>
          <input type='checkbox' name='q1' value='d' />
          <input
            value={questions[i].options[3] || ""}
            onChange={(e) => handleChange(e.target.value, "opt3")}
            type='text'
            className='h-8 p-2 mr-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='option 3'
          />
        </label>
      </div>
    </div>
  );
};
