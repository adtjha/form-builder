import React, { useEffect, useState } from "react";
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
const BelongsTo = ({ id, belong, setBelong, categories }) => {
  // let i = belong.findIndex((e) => e.id === id);

  // const handleChange = (e) => {
  //   let obj = [...belong];
  //   obj[i].val = e.target.value;
  //   setBelong(obj);
  // };

  // return (
  //   <input
  //     id={id}
  //     value={belong[i].val}
  //     onChange={handleChange}
  //     type='text'
  //     className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
  //     placeholder='Type your question here...'
  //   />
  // );
  return (
    <select class='block h-12 w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
      {categories.map((c) => (
        <option>{c}</option>
      ))}
    </select>
  );
};

const CategorizeQuestion = ({ content, image }) => {
  const uid = uuidv4(); // unique uid for eac
  const [item, setItem] = useState([{ id: uid, val: "" }]);
  const [belong, setBelong] = useState([{ id: uid, val: "" }]);
  const [categories, SetCategories] = useState([""]);

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
        categories: categories,
        formId: formId,
      },
    });
    reset();
  };

  const reset = () => {
    setItem([{ id: uid, val: "" }]);
    setBelong([{ id: uid, val: "" }]);
    SetCategories([]);
  };

  const handleChange = (index, event) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = event.target.value;
    SetCategories(updatedCategories);
  };

  const removeCategory = (e) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(e, 1);
    SetCategories(updatedCategories);
  };

  return (
    <div className='mt-10 flex flex-col items-start justify-evenly gap-8'>
      <div className='w-full'>
        <div className='w-full flex flex-row items-center justify-evenly gap-2'>
          <label htmlFor='categories'>Categories</label>
          <button
            className='w-full'
            onClick={() => SetCategories([...categories, ""])}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-slate-500 hover:text-slate-600 '>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>
        </div>
        {categories.length > 0 &&
          categories.map((e, i) => (
            <div className='mb-4 flex flex-row items-center justify-between'>
              <input
                id='categories'
                value={categories[i]}
                onChange={(e) => handleChange(i, e)}
                type='text'
                className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
                placeholder='Categories'
              />
              <svg
                onClick={() => removeCategory(i)}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='ml-4 w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          ))}
      </div>
      <div className='w-full grid grid-cols-2 gap-4'>
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
            <BelongsTo
              id={e.id}
              belong={belong}
              setBelong={setBelong}
              categories={categories}
            />
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
        className='w-full px-4 bg-gray-100 hover:bg-gray-300 font-semibold text-lg m-auto py-4 border border-gray-50 rounded-bl-md flex flex-row items-center justify-center gap-4'
        onClick={handleSave}>
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
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
        Add Question
      </button>
    </div>
  );
};

export default CategorizeQuestion;
