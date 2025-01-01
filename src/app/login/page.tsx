"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [logging, setLogging] = useState(false)

  useEffect(() => {
    if (user.email.length > 2 && user.password.length > 2) {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [user])



  const onLogin = async () => {
    try {
      setLogging(true)
      const response = await axios.post('/api/users/login', user)
      console.log("Logged In : ", response)
      if (!response) {
        toast.error("Check Your Credentials.", {
          style: {
            borderRadius: '4px',
            background: '#333',
            color: '#fff',
          }
        })
      } else {
        toast.success('Logged In', {
          style: {
            borderRadius: '4px',
            background: '#333',
            color: '#fff',
          }
        })
      }
      router.push(`/profile`)
    } catch (error: any) {
      toast.error("Check Your Credentials.", {
        style: {
          borderRadius: '4px',
          background: '#333',
          color: '#fff',
        }
      })
      console.log("Failed to log you in", error.message)
    } finally {
      setLogging(false)
    }
  };

  return (
    <>
      <section >
        <div className="flex items-center justify-center flex-col min-h-screen text-2xl ">
          <div className="my-5">Login Your Account</div>
          <div className="my-3 text-base min-w-[400px] ring-1 ring-neutral-600 rounded-md ">
            <div className="px-8 py-9">

              <div className="my-4">
                <label htmlFor="email">Email : </label>
                <div className="my-1">
                  <input
                    placeholder="Enter Email Here"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    type="text"
                    name=""
                    id=""
                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="passsword">Password : </label>
                <div className="my-1">
                  <input
                    placeholder="Enter Email Here"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    name=""
                    id=""
                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                  />
                </div>
              </div>
              <div>
                <Link href={'/forgotpassword'}
                  className="ring-1 ring-neutral-600 px-4 py-[6px] rounded transition-all ease-in-out duration-200 hover:bg-[#1a1a1a]"
                >Forgot Password?</Link>
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`text-base bg-black text-white ring-1 ring-neutral-600 px-6 py-2 rounded hover:bg-[#1a1a1a] transition-all ease-linear duration-200 my-4 ${disabledBtn ? "cursor-not-allowed" : "cursor-pointer"} `}
            onClick={onLogin}
          >
            {logging ? "Loggin In...." : "Login"}
          </button>
          <div>
            <h2 className="text-base">Register An Account ? {" "}<Link className="text-blue-500 hover:text-blue-700" href={'/signup'}>Sign Up</Link> </h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
