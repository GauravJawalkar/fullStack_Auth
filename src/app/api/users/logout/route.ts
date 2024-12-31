import { NextResponse } from "next/server";



export function GET() {

    try {

        // Creating a response to give while logging out the user
        const response = NextResponse.json(
            {
                message: "Logout Successful",
                success: true
            }
        )

        // removing the token stored in cookies while logging in the user
        response.cookies.set('token', "", {
            httpOnly: true,
            expires: new Date(0)
        });

        // returning the response
        return response;

    } catch (error: any) {
        throw NextResponse.json({ error: error.message }, { status: 500 })
    }

}