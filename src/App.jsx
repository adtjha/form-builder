import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { FormCreator } from "./components/FormCreator";
import { Answer } from "./components/Answer";

export default function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='create' element={<FormCreator />} />
          <Route path='answer/:formId' element={<Answer />} />
        </Routes>
      </>
    </div>
  );
}
