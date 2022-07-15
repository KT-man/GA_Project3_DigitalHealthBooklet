import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SplashPage from "./components/SplashPage";
import Signup from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
