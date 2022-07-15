import React from "react";

function Signup() {
  return (
    <div>
      <h1> Welcome!</h1>
      <h2>Please fill out your details below:</h2>

      <form action="/register" method="post">
        <label> Username </label>
        <input type="text" name="username" placeholder="Username" />

        <label> Name: </label>
        <input type="text" name="name" placeholder="Parent or Guardian" />

        <label>Phone : </label>
        <input type="text" name="phone" placeholder="phone no." />

        <button
          type="submit"
          class="px-5 py-1 text-md text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
