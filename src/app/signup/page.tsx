"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (user.username.length > 2 && user.email.length > 2 && user.password.length > 2) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  const clearFields = (e: any) => {
    e.preventDefault();
    setUser({ ...user, username: "", password: "", email: "" })
  }

  const onSignup = async () => {

    try {
      setLoading(true);
      // posting the data through the api by axios sending the user object from useState
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      router.push('/login');
    } catch (error: any) {
      console.log("Error signign up : ", error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center flex-col min-h-screen text-2xl ">
        <div className="my-5">Signup With Your Account</div>
        <div className="my-3 text-base min-w-[400px] ring-1 ring-neutral-600 rounded-md ">
          <div className="px-8 py-9">
            <div className="my-4">
              <label htmlFor="username">Username : </label>
              <div className="my-1">
                <input
                  placeholder="Enter Name Here"
                  required
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  type="text"
                  className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                />
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="email">Email : </label>
              <div className="my-1">
                <input
                  placeholder="Enter Email Here"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  className="w-full py-2 px-3 text-[#1a1a1a] rounded text-"
                />
              </div>
            </div>

            <div className="my-4">
              <label htmlFor="passsword">Password : </label>
              <div className="my-1">
                <input
                  placeholder="Enter Email Here"
                  required
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type="password"
                  className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                />
              </div>
            </div>

            <div>
              <button
                onClick={clearFields}
                className="ring-1 ring-neutral-600 px-4 py-1 rounded transition-all ease-in-out duration-200 hover:bg-[#1a1a1a]"
              >Clear All Fields</button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`text-base bg-black text-white ring-1 ring-neutral-600 px-6 py-2 rounded hover:bg-[#1a1a1a] transition-all ease-linear duration-200 my-4  ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={onSignup}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        <div>
          <h2 className="text-base">Already Have An Account ? {" "}<Link className="text-blue-500 hover:text-blue-700" href={'/login'}>Login</Link> </h2>
        </div>
      </div>
    </section >
  );
}

export default Signup;
