import { Routes, Route } from "react-router-dom";
import "./App.css";
import SplashPage from "./components/SplashPage";
import Register from "./components/Register";

import WelcomePage from "./components/WelcomePage";
import "./App.css";
import ChildData from "./components/ModalComponents/ChildData";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<WelcomePage></WelcomePage>} />
        <Route path="/children" element={<ChildData></ChildData>} />
        <Route path="/" element={<SplashPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
