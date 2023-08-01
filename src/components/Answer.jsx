import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Answer = () => {
  const formId = useParams("formId");

  console.log(formId);
  // get form from server,
  useEffect(() => {
    axios
      .get("https://cautious-top-coat-tuna.cyclic.cloud/api/questions")
      .then((res) => {
        console.log({ res });
      })
      .catch(console.error);
  }, []);
  // store user response,
  return <div>Answer</div>;
};
