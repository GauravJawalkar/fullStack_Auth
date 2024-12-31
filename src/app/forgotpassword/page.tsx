"use client"

import Link from 'next/link'
import React from 'react'

function ForgetPassword() {
    return (
        <section >
            <div className="flex items-center justify-center flex-col min-h-screen text-2xl ">
                <div className="my-5">Reset New Password</div>
                <div className="my-3 text-base min-w-[400px] ring-1 ring-neutral-600 rounded-md ">
                    <div className="px-8 py-9">

                        <div className="my-4">
                            <label htmlFor="email">New Password : </label>
                            <div className="my-1">
                                <input
                                    placeholder="Enter Email Here"
                                    type="password"
                                    name=""
                                    id=""
                                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                                />
                            </div>
                        </div>

                        <div className="my-4">
                            <label htmlFor="passsword">Confirm Password : </label>
                            <div className="my-1">
                                <input
                                    placeholder="Enter Email Here"
                                    type="password"
                                    name=""
                                    id=""
                                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className={`text-base bg-black text-white ring-1 ring-neutral-600 px-6 py-2 rounded hover:bg-[#1a1a1a] transition-all ease-linear duration-200 my-4`}
                >
                    Set New Password
                </button>
                <div>
                    <h2 className="text-base">Reset the password ? {" "}
                        <Link className="text-blue-500 hover:text-blue-700" href={'/login'}>Login</Link>
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default ForgetPassword