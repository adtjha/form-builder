import React, { useState, useEffect, useRef } from "react";
import { MultipleChoice } from "./MultipleChoice";
import { useDispatch, useSelector } from "react-redux";

const ImageToBase64Converter = ({ base64Image, setBase64Image }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type='file' onChange={handleImageChange} />
      {base64Image && (
        <img
          className='w-[240px] m-auto'
          src={base64Image}
          alt='Converted to Base64'
        />
      )}
    </div>
  );
}; // Import the component

const { v4: uuidv4 } = require("uuid");

const ComprehensionQuestion = () => {
  const [base64Image, setBase64Image] = useState("");

  const formId = useSelector((state) => state.forms.forms.id);

  let uid = uuidv4();
  const [questions, setQuestions] = useState([
    {
      id: uid,
      text: "",
      options: ["", "", "", ""],
    },
  ]);

  const [para, setPara] = useState("");

  const dispatch = useDispatch();

  const addQuestion = (e) => {
    let uid = uuidv4();
    console.log("addQuestion", questions);
    setQuestions([
      ...questions,
      {
        id: uid,
        text: "",
        options: [],
      },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions((questions) => questions?.filter((e) => e.id !== id));
    console.log("here", questions);
  };

  const handleSave = () => {
    console.log("Save Comprehension");
    dispatch({
      type: "ADD_QUESTION",
      payload: {
        type: "comprehension",
        paragraph: para,
        img: base64Image,
        mcq: questions,
        formId: formId,
      },
    });
  };

  const [image, setImage] = useState(false);

  return (
    <div className='m-4 w-11/12'>
      <label className='block'>
        <div className='flex flex-row justify-between items-center flex-wrap'>
          <button
            className={`text-gray-700  ${!image && "underline"}`}
            onClick={() => setImage(false)}>
            Comprehension
          </button>
          <button
            className={`text-gray-700  ${image && "underline"}`}
            onClick={() => setImage(true)}>
            Image
          </button>
        </div>
        {image ? (
          <ImageToBase64Converter
            base64Image={base64Image}
            setBase64Image={setBase64Image}
          /> // Use the ImageToBase64Converter component here
        ) : (
          <textarea
            value={para}
            onChange={(e) => setPara(e.target.value)}
            type='text'
            className='h-12 p-3 mt-4 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Type your comprehension here...'
          />
        )}
      </label>
      <button className='block mt-4' onClick={addQuestion}>
        <span className='text-gray-700'>Add Questions</span>
      </button>
      <div className='p-2 mt-4 flex flex-col items-start justify-evenly'>
        {questions?.map((e) => (
          <MultipleChoice
            key={e.id}
            id={e.id}
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
