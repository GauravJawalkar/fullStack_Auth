
import React from "react"

async function UserProfile({ params }: any) {
    const { id } = await params
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <h1 className="ring-1 w-fit px-4 py-2 ring-neutral-600 rounded">
                UserProfile :{id}
            </h1>
        </div>
    )
}

export default UserProfile