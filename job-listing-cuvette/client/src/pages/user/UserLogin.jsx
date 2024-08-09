import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginApi } from "../../apis/User";

function UserLogin() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const userLogin = async () => {
    const token = await userLoginApi(input);
    if (token) {
      localStorage.setItem('authJwtToken', token);
      navigate('/');
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateForm(e) {
    e.preventDefault()

    let isError = false;
    setError(() => ({ email: "", password: "" }));

    Object.keys(input).forEach(key => {
      const element = input[key];
      if (element.trim().length === 0) {
        isError = true;
        setError(error => ({ ...error, [key]: "This field is required." }));
      } else if (key === 'email' && !validateEmail(element)) {
        isError = true;
        setError(error => ({ ...error, [key]: "This email id is invalid." }));
      }
    });

    if (!isError) userLogin();
  }

  return (
    <div className="h-screen flex flex-col">
      <Link to="/" className="absolute top-5 left-5 bg-gray-50 hover:bg-gray-200 p-2 px-2.5 rounded-lg">
        <img src="/icons/arrow-left.svg" width={15} alt="Go back" />
      </Link>
      <div className="flex flex-row h-full">
        <div className="w-full sm:w-1/2 p-5 flex justify-center items-center">
          <form className="w-full md:w-3/4 flex flex-col gap-4" onSubmit={validateForm}>
            <div className="mb-3">
              <h2 className="font-semibold text-3xl mb-2">Already have an account?</h2>
              <p className="">Your personal job finder is here</p>
            </div>
            <div>
              <input type="email" id="email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} className="w-full border border-gray-400 rounded-lg p-3" placeholder="Email" />
              <label className="text-sm text-red-500 font-medium" htmlFor="email">{error.email}</label>
            </div>
            <div>
              <input type="password" id="password" value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} className="w-full border border-gray-400 rounded-lg p-3" placeholder="Password" />
              <label className="text-sm text-red-500 font-medium" htmlFor="password">{error.password}</label>
            </div>
            <div className="mt-3">
              <button type="submit" className="w-2/5 text-white bg-[#ED5353] font-medium rounded text-xl px-5 py-2 text-center">Sign In</button>
            </div>
            <div>
              <p>Don't have an account?
                <Link className="underline ms-2 font-medium" to="/user/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="relative hidden sm:block w-1/2">
          <img className="w-full h-full object-cover" src="/images/login-hero.webp" alt="" />
          <h1 className="w-full absolute text-5xl text-white text-center font-semibold inline-block left-1/2 transform -translate-x-1/2 top-20 px-20">Your Personal Job Finder</h1>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
