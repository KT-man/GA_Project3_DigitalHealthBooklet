import React from "react";
import SplashText from "./SplashText";

function SplashPage() {
  return (
    <div>
      <header class="px-5 py-5 p-relative bg-bayleaf/50">
        <h1 class="text-slate-600 p-static">digi Health Book SG</h1>
        <div class="max-w-sm">
          <form>
            <a
              href="/login"
              class="px-5 py-1 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
            >
              Login
            </a>
            <a
              href="/register"
              class="px-5 py-1 text-md text-plumish font-semibold rounded-full border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent focus:outline-none focus:ring-2 focus:ring-plumish focus:ring-offset-2"
              aria-hidden="true"
            >
              Register
            </a>
          </form>
        </div>
      </header>
      <div class="w-full h-4 bg-rum/75 "></div>
      <div className="image">
        <img
          class=" flex h-150 "
          src="https://img.freepik.com/free-vector/pediatrician-doctor-woman-examining-baby-boy_3446-535.jpg?t=st=1657858868~exp=1657859468~hmac=f2f9e8770eb5abb6673c6cbcaa4d0025b31785423b3b3275804257fbd824428e&w=900"
          alt="pediatrician and baby"
        ></img>
      </div>
      <div className="nav">
        <ul>
          <li class="px-5 py-1 text-md text-plumish font-semibold border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent">
            <a href="#what" class="text-slate-500-2xl ">
              What is it?
            </a>
          </li>

          <li class="px-5 py-1 text-md text-plumish font-semibold border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent">
            <a href="#why" class="text-slate-500-2xl">
              Why go digital
            </a>
          </li>

          <li class="px-5 py-1 text-md text-plumish font-semibold border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent">
            <a href="#how">How to use</a>
          </li>

          <li class="px-5 py-1 text-md text-plumish font-semibold border border-plumish/75 hover:text-white hover:bg-plumish hover:border-transparent">
            <a href="#contact">Who are we?</a>
          </li>
        </ul>
      </div>
      <SplashText />
    </div>
  );
}

export default SplashPage;
