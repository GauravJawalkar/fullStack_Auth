import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="text-center content-center h-screen text-2xl">
      Signup Page Frontend
      <div className="my-3">
        <Link
          href={"/"}
          className="bg-[#1a1a1a] px-3 py-2 rounded text-[1.2rem]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default page;
