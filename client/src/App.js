import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoTable from "./components/TodoTable";
import TodoTableAlt from "./components/TodoTableAlt";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoTableAlt />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
