import React, { useRef, useState } from "react";
const { v4: uuidv4 } = require("uuid");

const Item = (id) => (
  <input
    id={id}
    type='text'
    class='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
    placeholder='Type your question here...'
  />
);

const BelongsTo = (id) => (
  <input
    id={id}
    type='text'
    class='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
    placeholder='Type your question here...'
  />
);

const CategorizeQuestion = ({ content, image }) => {
  const uid = uuidv4();
  const [item, setItem] = useState([uid]);
  const [belong, setBelong] = useState([uid]);

  const handleClick = () => {
    console.log("Clicked");
    let uid = uuidv4();
    setItem([...item, uid]);
    setBelong([...belong, uid]);
  };

  return (
    <div>
      <div className='m-4 grid grid-cols-2 gap-4'>
        {/* {image && <img src={image} alt="Question Image" />} */}
        <label class='block'>
          <span class='text-gray-700'>Item</span>
          {item.map((e) => (
            <Item id={e} />
          ))}
        </label>
        <label class='block'>
          <span class='text-gray-700'>Belongs to</span>
          {belong.map((e) => (
            <BelongsTo id={e} />
          ))}
        </label>
        {/* Additional logic and UI elements specific to Categorize questions can be added here */}
      </div>
      <button className='w-full' onClick={handleClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6 m-auto'>
          <path
            fillRule='evenodd'
            d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <button
        class='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md'
        onClick={() => console.log("Save Categorize")}>
        Save
      </button>
    </div>
  );
};

export default CategorizeQuestion;
