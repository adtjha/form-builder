import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { v4: uuidv4 } = require("uuid");

const Item = ({ id, item, setItem }) => {
  let i = item.findIndex((e) => e.id === id);

  const handleChange = (e) => {
    let obj = [...item];
    obj[i].val = e.target.value;
    setItem(obj);
  };
  return (
    <input
      id={id}
      value={item[i].val}
      onChange={handleChange}
      type='text'
      className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
      placeholder='Type your question here...'
    />
  );
};
const BelongsTo = ({ id, belong, setBelong }) => {
  let i = belong.findIndex((e) => e.id === id);

  const handleChange = (e) => {
    let obj = [...belong];
    obj[i].val = e.target.value;
    setBelong(obj);
  };

  return (
    <input
      id={id}
      value={belong[i].val}
      onChange={handleChange}
      type='text'
      className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
      placeholder='Type your question here...'
    />
  );
};

const CategorizeQuestion = ({ content, image }) => {
  const uid = uuidv4(); // unique uid for eac
  const [item, setItem] = useState([{ id: uid, val: "" }]);
  const [belong, setBelong] = useState([{ id: uid, val: "" }]);

  const dispatch = useDispatch();
  const formId = useSelector((state) => state.forms.forms.id);

  const handleClick = () => {
    console.log("Clicked");
    let uid = uuidv4();
    setItem([...item, { id: uid, val: "" }]);
    setBelong([...belong, { id: uid, val: "" }]);
  };

  useEffect(() => {
    console.log(item, belong);
  }, [item, belong]);

  const handleSave = () => {
    console.log("Save Comprehension");
    dispatch({
      type: "ADD_QUESTION",
      payload: {
        type: "categorize",
        item: item,
        belong: belong,
        formId: formId,
      },
    });
  };

  return (
    <div>
      <div className='m-4 grid grid-cols-2 gap-4'>
        {/* {image && <img src={image} alt="Question Image" />} */}
        <label className='block'>
          <span className='text-gray-700'>Item</span>
          {item?.map((e, i, item) => (
            <Item id={e.id} item={item} setItem={setItem} />
          ))}
        </label>
        <label className='block'>
          <span className='text-gray-700'>Belongs to</span>
          {belong?.map((e, i, belong) => (
            <BelongsTo id={e.id} belong={belong} setBelong={setBelong} />
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
        className='w-full bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md'
        onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CategorizeQuestion;
