import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
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
    console.log(res);

    if (loginData.status === "error") {
      alert(`Please enter username and password`);
    }
    console.log(props.childData.length);
    props.childData.length === 0
      ? console.log("Hello")
      : navigate("/dashboard");

    // : navigate("/children");
  };

  return (
    <div>
      <header class="bg-aquamarine"></header>
      <h1 class="text-3xl text-slate-600"> Welcome!</h1>
      <h2>Please Login </h2>

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
          <div class="block">
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
