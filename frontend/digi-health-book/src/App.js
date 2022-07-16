import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SplashPage from "./components/SplashPage";
import Signup from "./components/Register";
import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import "./App.css";
import ChildData from "./components/ModalComponents/ChildData";

function App() {
  const [childData, setChildData] = useState("");
  const [error, setError] = useState(null);

  const fetchChildData = async (url, config) => {
    try {
      const res = await fetch(url, config);

      if (res.status !== 200) {
        throw new Error("Couldnt fetch child data");
      }

      const data = await res.json();
      setChildData(data.children);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    //=> to doublecheck on url
    const url = `http://localhost:5001/users/get`; //=> to doublecheck
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //to double cehck on authorization
        Authorization: `Bearer ${token}`,
      },
    };
    fetchChildData(url, config);
  }, []);

  const inputChildLog = async (url, config) => {
    try {
      const res = await fetch(url, config);

      if (res.status !== 200) {
        throw new Error("Couldnt fetch child data");
      }

      const data = await res.json();
      setChildData(data.children);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect((input) => {
    //=> to doublecheck on url
    const url = `http://localhost:5001/users/adddLog`; //=> to doublecheck
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //to double cehck on authorization
        Authorization: `Bearer ${token}`,
      },
      body: {},
    };
    inputChildLog(url, config);
  }, []);

  return (

  <div className="App">
    <WelcomePage childData = {childData}></WelcomePage>
    <ChildData childData = {childData}></ChildData>
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </div>


  );
}

export default App;
