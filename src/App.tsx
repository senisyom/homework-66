import { Route, Routes } from "react-router-dom";
import "./App.css";
import ToolBar from "./components/ToolBar/ToolBar";
import AddNewMeal from "./components/AddNewMeal/AddNewMeal";
import Home from "./containers/Home/Home";

const App = () => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new-meal" element={<AddNewMeal />} />
          <Route path="/add-new-meal/:id/edit" element={<AddNewMeal />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
