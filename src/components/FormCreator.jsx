import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddQuestion } from "./AddQuestion";
import { Fragment, useEffect, useState } from "react";
const { v4: uuidv4 } = require("uuid");

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const FormatQuestion = ({ q }) => {
  console.log(q);
  switch (q.type) {
    case "cloze":
      return (
        <div className='w-full p-4 flex flex-col items-center justify-evenly gap-4 border-2 border-gray-600 rounded-lg'>
          <div className='w-full'>{q.question}</div>
          <div className='w-full grid grid-cols-2 gap-2'>
            {q?.options?.map((e, index) => {
              // Use index to determine which column the option should be placed in
              const column = index % 2 === 0 ? 1 : 2;

              return (
                <label
                  className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                  <input type='checkbox' name='q1' value={e} />
                  <div>{e}</div>
                </label>
              );
            })}
          </div>
        </div>
      );
    case "categorize":
      const dragStartHandler = (ev) => {
        ev.dataTransfer.setData("text/plain", ev.target.id);
      };

      const dragOverHandler = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
      };

      const dropHandler = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);
        ev.target.appendChild(draggedElement);
      };
      let all = [...q.item.map((e) => e.val), ...q.belong.map((e) => e.val)];
      const len = q.item.length;
      all = shuffle(all);
      return (
        <>
          <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
            {/* Render the draggable elements */}
            <div className='grid grid-cols-4 items-center justify-evenly gap-2'>
              {all.map((e, index) => (
                <div
                  className='bg-gray-300 p-2 rounded-md text-center cursor-grab'
                  draggable
                  onDragStart={dragStartHandler}
                  id={`drag-${index}`} // Set a unique id for each draggable element
                >
                  {e}
                </div>
              ))}
            </div>

            {/* Render the drop area */}
            <div
              className='mt-4 w-full grid grid-cols-2 gap-2 justify-items-center p-4 border border-gray-600 rounded-lg'
              onDragOver={dragOverHandler}
              onDrop={dropHandler}>
              {new Array(len * 2).fill("").map((e, index) => (
                <div
                  key={`drop-${index}`} // Set a unique key for each drop area
                  className='bg-gray-300 h-auto w-full text-center p-2 rounded-md'></div>
              ))}
            </div>
          </div>
        </>
      );
    case "comprehension":
      return (
        <>
          <div className='w-full max-w-full m-auto p-8 gap-8 flex flex-col items-center justify-evenly border-2 border-gray-600 rounded-lg'>
            {q.img && (
              <img
                className='w-full m-auto'
                src={q.img}
                alt='Converted to Base64'
              />
            )}
            <div>{q.paragraph}</div>
            <div className='w-full px-2 mt-2 flex flex-col items-center content-center justify-center flex-wrap gap-8'>
              {q?.mcq?.map((m) => (
                <div className='w-full max-w-md m-auto p-4 flex flex-col items-center justify-evenly bg-gray-200 rounded-lg'>
                  <div className='w-full'>{m["text"]}</div>
                  <div className='w-full grid grid-cols-2 gap-2'>
                    {m["options"]?.map((e, index) => {
                      // Use index to determine which column the option should be placed in
                      const column = index % 2 === 0 ? 1 : 2;
                      return (
                        <label
                          className={`w-full flex flex-row items-center justify-start my-2 gap-2 col-${column}`}>
                          <input type='checkbox' name='q1' value={e} />
                          <div>{e}</div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
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
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const formId = useSelector((state) => state.forms.forms.id);
  const formName = useSelector((state) => state.forms.forms.name);
  const [base64Image, setBase64Image] = useState("");

  const handleFormNameChange = (e) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        id: formId,
        name: e.target.value,
      },
    });
  };

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
    <div className='w-full min-h-screen grid grid-cols-8'>
      <div
        className='relative w-full p-8 grid justify-stretch gap-6 col-span-4 border-r-2 border-dashed border-stone-500'
        style={{ alignItems: "start" }}>
        <div className='absolute top-0 right-0 p-4 font-mono font-bold underline'>
          Editor
        </div>
        <div className='flex flex-row items-center justify-start gap-4'>
          <Link
            to={"/"}
            className='p-4 w-fit flex flex-row items-start justify-start space-x-2 hover:bg-gray-300 rounded-full'>
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
          </Link>
          <h1 className='w-fit text-xl font-semibold'>Form Creator</h1>
        </div>

        <div className='flex flex-col items-start justify-evenly gap-2'>
          <label htmlFor='formId'>Form Id : </label>
          <span className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'>
            {formId}
          </span>
        </div>
        <div className='flex flex-col items-start justify-evenly gap-2 border-dotted border-gray-300'>
          <label htmlFor='FormName'>Form Name : </label>
          <input
            type='text'
            name='FormName'
            id='FormName'
            value={formName}
            onChange={handleFormNameChange}
            className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
            placeholder='Form name goes here.'
          />
        </div>
        <div className='flex flex-col items-start justify-evenly gap-2 border-dotted border-gray-300'>
          <label htmlFor='headerImg'>Form's Header Image</label>
          <input
            type='file'
            name='headerImg'
            id='headerImg'
            onChange={handleImageChange}
          />
        </div>
        <AddQuestion />
      </div>
      <div className='relative bg-stone-100 col-span-4 px-8 py-4 flex flex-col items-stretch justify-stretch gap-4'>
        <div className='absolute top-0 left-0 p-4 font-mono font-bold underline'>
          Preview
        </div>
        <div className='text-center text-4xl font-bold'>{formName}</div>
        {base64Image && (
          <img
            className='w-fit h-64'
            src={base64Image}
            alt='Converted to Base64'
          />
        )}
        <ol className='list-decima flex flex-col flex-wrap justify-evenly items-stretch gap-4'>
          {questions?.map((q) => (
            <li>
              <FormatQuestion q={q} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
