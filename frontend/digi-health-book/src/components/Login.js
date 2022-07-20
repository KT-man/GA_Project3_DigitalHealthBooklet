import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [failedLogin, setFailedLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const url = "/users/login";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const loginData = await res.json();
    console.log(res.status);
    console.log(loginData);

    if (loginData.status === "error") {
      console.log(loginData.message);
      alert(`Unauthorized. Please try again`);
    } else {
      setFailedLogin(!failedLogin);
      failedLogin ? navigate("/dashboard") : console.log("No change");
    }
  };

  return (
    <div>
      <header class="bg-aquamarine flex">
        <img src="./2.png" alt="digiHealth logo"></img>
      </header>
      <h1 class="text-3xl text-slate-600"> </h1>
      <div class="block h-40">
        <h2>Please enter username and password </h2>
      </div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <div class="block">
            <label> Username </label>
            <input
              type="text"
              name="username"
              ref={usernameRef}
              placeholder="Username"
            />
          </div>
          <div class="block py-5 ">
            <label> Password </label>
            <input
              type="text"
              name="password"
              ref={passwordRef}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="px-5 py-1 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
