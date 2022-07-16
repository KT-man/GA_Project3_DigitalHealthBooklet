import React, { useRef } from "react";

function Register() {
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const postcodeRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      postcode: postcodeRef.current.value,
    };
    const url = "/users/registration";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const regoData = await res.json();

    if (regoData.status === "error") {
      alert(`Please enter username and password`);
    }
  };

  return (
    <div>
      <h1 class="bg-bayleaf/60 text-slate-600"> Welcome!</h1>
      <h2>Please fill out your details below:</h2>

      <form onSubmit={handleOnSubmit}>
        <label> Name: </label>
        <input type="text" name="name" ref={nameRef} placeholder="Your name" />

        <label>Postcode : </label>
        <input
          type="text"
          name="postcode"
          ref={postcodeRef}
          placeholder="postcode"
        />
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
