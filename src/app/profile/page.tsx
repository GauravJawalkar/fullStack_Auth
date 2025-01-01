"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

function Profile() {
    const router = useRouter();
    const [data, setData] = useState("NoData");

    const logout = async () => {
        try {
            const logout = await axios("/api/users/logout");
            if (logout) {
                // console.log("Logged out successfully : ", logout);
                toast.success('Logged Out Successfully', {
                    style: {
                        borderRadius: '4px',
                        background: '#333',
                        color: '#fff',
                    }
                })
            }
            router.push("/login");
        } catch (error: any) {
            toast.error('Failed to logout', {
                style: {
                    borderRadius: '4px',
                    background: '#333',
                    color: '#fff',
                }
            })
            console.error("Failed to logout : ", error.message);
        }
    };

    const getMyDetails = async () => {
        try {
            const response = await axios.get("/api/users/myDetails");
            // console.log("Your Details : ", response);
            setData(response.data.user._id);
        } catch (error: any) {
            throw new Error("Error fetching your details : ", error.message);
        }
    };

    useEffect(() => {
        getMyDetails();
    }, [data]);

    return (
        <div className="content-center min-h-screen flex-col gap-5 flex items-center justify-center">
            <h1 className="text-2xl">Profile</h1>
            <h1>
                {data === "NoData" ? (
                    "Getting Your Details Ready..."
                ) : (
                    <Link
                        className="ring-1 ring-white px-4 py-2"
                        href={`/profile/${data}`}
                    >
                        User Profile : {data}
                    </Link>
                )}
            </h1>

            <button
                onClick={logout}
                className="bg-black ring-1 ring-neutral-600 px-6 py-2 rounded hover:bg-[#1a1a1a] transition-all ease-linear duration-200 "
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
