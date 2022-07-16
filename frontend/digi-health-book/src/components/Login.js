import React, { useRef } from "react";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

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

    if (loginData.status === "error") {
      alert(`Please enter username and password`);
    }
  };

  return (
    <div>
      <h1 class="bg-bayleaf/60 text-slate-600"> Welcome!</h1>
      <h2>Login:</h2>

      <form onSubmit={handleOnSubmit}>
        <label> Username </label>
        <input
          type="text"
          name="username"
          ref={usernameRef}
          placeholder="Username"
        />

        <label> Password </label>
        <input
          type="text"
          name="password"
          ref={passwordRef}
          placeholder="Password"
        />

        <button
          type="submit"
          class="px-5 py-1 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
