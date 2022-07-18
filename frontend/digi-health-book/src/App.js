import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SplashPage from "./components/SplashPage";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import "./App.css";
import ChildData from "./components/ModalComponents/ChildData";
import Login from "./components/Login";

function App() {
  const [childData, setChildData] = useState([]);
  const [error, setError] = useState(null);

  const fetchChildData = async (url, config) => {
    try {
      const res = await fetch(url, config);
      const data = await res.json();
      // console.log(`data ${data}`);
      // console.log("line 20");
      // console.log(data);
      // console.log(data[0].children);

      if (res.status !== 200 && data.message === "no children found!") {
        throw new Error("Couldnt fetch child data");
      }

      setChildData(data[0].children);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    //=> to doublecheck on url
    const url = `/users/children`; //=> to doublecheck
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetchChildData(url, config);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/dashboard"
          element={<WelcomePage childData={childData}></WelcomePage>}
        />
        <Route
          path="/children"
          element={<ChildData childData={childData}></ChildData>}
        />
        <Route path="/" element={<SplashPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login childData={childData} />} />
      </Routes>
    </div>
  );
}

export default App;
