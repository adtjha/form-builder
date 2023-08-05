import React, { useState } from "react";
import { MultipleChoice } from "./MultipleChoice";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const ImageToBase64Converter = ({ base64Image, setBase64Image }) => {
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

    const storageRef = ref(storage, `question_${formId}`);
    // upoad image to firebase storage.
    if (!para) {
      uploadString(storageRef, base64Image, "data_url").then((snapshot) => {
        console.log("Uploaded a base64 string!", snapshot);
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          dispatch({
            type: "ADD_QUESTION",
            payload: {
              type: "comprehension",
              paragraph: para,
              img: downloadURL,
              mcq: questions,
              formId: formId,
            },
          });
        });
      });
    } else {
      dispatch({
        type: "ADD_QUESTION",
        payload: {
          type: "comprehension",
          paragraph: para,
          img: "",
          mcq: questions,
          formId: formId,
        },
      });
    }
    reset();
  };

  const reset = () => {
    setBase64Image("");
    setPara("");
    setQuestions([
      {
        id: uid,
        text: "",
        options: ["", "", "", ""],
      },
    ]);
  };

  const [image, setImage] = useState(false);

  return (
    <div className='w-full mt-4 gap-6'>
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
            className='h-24 p-3 my-4 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Type your comprehension here...'
          />
        )}
      </label>
      <button className='block mt-4' onClick={addQuestion}>
        <span className=' py-2 px-4 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-300'>
          Add comprehension question
        </span>
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
        className='w-full px-4 py-6 bg-gray-100 hover:bg-gray-300 rounded-md flex flex-row items-center justify-center gap-4'
        onClick={handleSave}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
        Add Question
      </button>
    </div>
  );
};

export default ComprehensionQuestion;
