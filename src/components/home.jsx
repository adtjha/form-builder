import { Link } from "react-router-dom";
import { Forms } from "./Forms";

export const Home = () => {
  return (
    <div className='bg-gray-200 h-screen w-screen p-4'>
      <h1 className='w-fit m-auto text-4xl font-semibold'>Home</h1>
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <div className='flex-grow mt-6 items-center'>
          <Forms />
        </div>
        <Link
          to='/create'
          className='my-32 py-4 px-6 bg-blue-300 rounded-md text-lg'>
          Create Form
        </Link>
      </div>
    </div>
  );
};
