import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main/Main";
import { Quiz_1 } from "./components/Quiz_1/Quiz_1";

function App() {
  const [selectData, setSelectData] = React.useState("");

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main setSelectData={setSelectData} />} />
        <Route path="/quiz" element={<Quiz_1 selectData={selectData} />} />
      </Routes>
    </Router>
  );
}

export default App;
