

"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function ForgetPassword() {
    const router = useRouter();
    const [user, setUser] = useState({ newPassword: "", email: "", pin: "" })
    const [disabledBtn, setDisabledBtn] = useState(false)

    useEffect(() => {
        if (user.newPassword.length === 0 && user.pin.length === 0) {
            setDisabledBtn(true);
        } else if (user.newPassword && user.pin.length >= 4) {
            setDisabledBtn(false);
        }


    }, [user.newPassword, user.pin])

    const setNewPass = async () => {
        try {
            await axios.post('/api/users/forgotpassword', user)
            toast.success('Password Reset Successfully', {
                style: {
                    borderRadius: '4px',
                    background: '#333',
                    color: '#fff',
                }
            })
            router.push('/login')
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const forgotpassword = async () => {
        try {
            await axios.post('/api/users/forgotpassemail', user)
            toast.success('Pin sent successfully on your registered email', {
                style: {
                    borderRadius: '4px',
                    background: '#333',
                    color: '#fff',
                }
            })

        } catch (error: any) {
            toast.error('Check you email credentials', {
                style: {
                    borderRadius: '4px',
                    background: '#333',
                    color: '#fff',
                }
            })
            throw new Error(error);
        }
    }

    return (
        <section >
            <div className="flex items-center justify-center flex-col min-h-screen text-2xl ">
                <div className="my-5"> Reset New Password </div>
                <div className="my-3 text-base min-w-[400px] max-sm:min-w-fit ring-1 ring-neutral-600 rounded-md ">
                    <div className="px-8 py-9">
                        <div className="my-4">
                            <label htmlFor="password">Email : </label>
                            <div className="my-1">
                                <input
                                    placeholder="Enter Your Email Here"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    name=""
                                    id=""
                                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                                />
                            </div>
                        </div>

                        <div className="my-4">
                            <label htmlFor="password">New Password : </label>
                            <div className="my-1">
                                <input
                                    placeholder="Enter New Password Here"
                                    type="password"
                                    value={user.newPassword}
                                    onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                                    name=""
                                    id=""
                                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                                />
                            </div>
                        </div>


                        <div className="my-4">
                            <label htmlFor="confirm passsword">Enter Pin : </label>
                            <div className="my-1">
                                <input
                                    placeholder="Enter Pin from email"
                                    type="text"
                                    value={user.pin}
                                    onChange={(e) => setUser({ ...user, pin: e.target.value })}
                                    name=""
                                    id=""
                                    className="w-full py-2 px-3 text-[#1a1a1a] rounded"
                                />
                            </div>
                        </div>

                        <div>
                            {
                                user.email.length <= 5 && user.newPassword.length == 0 ? "Enter a valid email to get validation pin" :
                                    <button onClick={forgotpassword} className="mr-2 ring-1 ring-neutral-600 px-4 py-[3px] rounded">Get Pin On Your Email</button>
                            }
                        </div>
                    </div>
                </div>
                <button
                    onClick={setNewPass}
                    type="button"
                    className={`text-base bg-black text-white ring-1 ring-neutral-600 px-6 py-2 rounded hover:bg-[#1a1a1a] transition-all ease-linear duration-200 my-4 ${disabledBtn ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    Set New Password
                </button>
                <div>
                    <h2 className="text-base">Reset the password ? {" "}
                        <Link className="text-blue-500 hover:text-blue-700" href={'/login'}>Login</Link>
                    </h2>
                </div>
            </div>
        </section >
    )
}

export default ForgetPassword