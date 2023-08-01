import { useState } from "react";
import ClozeQuestion from "./questions/cloze";
import ComprehensionQuestion from "./questions/comprehension";
import CategorizeQuestion from "./questions/categorize";
import { useSelector } from "react-redux";
import { encodeData } from "./parser";
import axios from "axios";

export const AddQuestion = () => {
  // Access the dispatch function using useDispatch
  // const db = getFirestore();

  const questions = useSelector((state) => state.questions);

  const formId = useSelector((state) => state.forms.forms.id);
  const formName = useSelector((state) => state.forms.forms.name);
  const formHeaderImage = useSelector((state) => state.forms.forms.image);

  console.log({ formId, type: "AddQuestion" });

  const [open, setOpen] = useState(false);

  const [questionType, setQuestionType] = useState("cloze");

  const handleOpenClick = () => {
    setOpen(true);
  };
  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const handlePublish = async () => {
    console.log(questions);
    const data = encodeData(Object.values(questions)[0]);
    let questionIdsArray = [];
    console.log(data);
    for (let d in data) {
      const resp = await axios.post(
        "https://cautious-top-coat-tuna.cyclic.cloud/api/questions",
        {
          type: data[d].type,
          content: JSON.stringify(data[d].content),
          formId: data[d].content.formId,
        }
      );
      questionIdsArray.push(resp.data._id);
      console.log({ ...data[d] });
    }
    const resp = await axios.post(
      "https://cautious-top-coat-tuna.cyclic.cloud/api/forms",
      {
        title: formName || "",
        headerImage: formHeaderImage || "",
        questions: [...questionIdsArray],
        formId: formId,
      }
    );
  };

  return (
    <div className='flex flex-col items-start justify-evenly gap-4'>
      {/* {open && ( */}
      <div className='w-full bg-gray-50 overflow-hidden p-8 border-2 border-dashed border-gray-300 rounded-lg'>
        <div className=' flex flex-row items-center justify-around'>
          <div className='w-full flex flex-col items-start justify-evenly'>
            <label for='questionType' className='text-gray-700'>
              Question Type
            </label>
            <select
              name='questionType'
              id='questionType'
              className='h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
              value={questionType}
              onChange={handleQuestionType}>
              <option value='cloze'>Cloze</option>
              <option value='comprehension'>Comprehension</option>
              <option value='categorize'>Categorize</option>
            </select>
          </div>
        </div>
        {questionType === "cloze" && <ClozeQuestion />}
        {questionType === "comprehension" && <ComprehensionQuestion />}
        {questionType === "categorize" && <CategorizeQuestion />}
      </div>
      {/* )} */}

      <button
        className='w-full p-4 mx-auto flex flex-row items-center justify-center gap-4 hover:bg-gray-200 rounded-md'
        onClick={handlePublish}>
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
            d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
          />
        </svg>{" "}
        Publish Form
      </button>
    </div>
  );
};
