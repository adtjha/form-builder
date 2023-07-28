import { Link } from "react-router-dom";
import { Forms } from "./Forms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { v4: uuidv4 } = require("uuid");

export const Home = () => {
  const dispatch = useDispatch();
  const formIdCreated = useSelector((state) => state.forms.forms.created);

  const createFormId = () => {
    if (!formIdCreated) {
      const formId = uuidv4();
      dispatch({
        type: "ADD_FORM",
        payload: {
          id: formId,
          created: true,
        },
      });
      console.log({ formId });
    }
  };

  return (
    <div className='bg-gray-200 h-screen w-screen p-4'>
      <h1 className='w-fit m-auto text-4xl font-semibold'>Home</h1>
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <div className='flex-grow mt-6 items-center'>
          <Forms />
        </div>
        <Link
          to='/create'
          className='my-32 py-4 px-6 bg-blue-300 rounded-md text-lg'
          onClick={() => createFormId()}>
          Create Form
        </Link>
      </div>
    </div>
  );
};
