import { useEffect, useState } from "react";

export const Forms = () => {
  const [questions, setQuestions] = useState();
  useEffect(() => {
    fetch("https://getallforms-dyrphw67va-uc.a.run.app", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      // .then((result) => setQuestions(result))
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <h1 className='text-lg font-medium text-center mb-4'>
        Forms Created by User
      </h1>
      <div className='w-full h-full space-y-4'>
        {questions?.map((e) => (
          <div key={e.id} className='w-72 bg-gray-400 shadow-lg rounded-lg p-4'>
            {e.title}
          </div>
        ))}
      </div>
    </>
  );
};
