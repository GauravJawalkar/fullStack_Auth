

import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password, forgotPass } = reqBody;


        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }

        if (forgotPass) {
            console.log("yo eamil send")
            await sendEmail({ email, emailType: "RESET", userId: existingUser._id });
            console.log("Email send sucess")
        }

        // Checking if the password id correct
        const validatePassword = await bcryptjs.compare(password, existingUser?.password)

        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }

        // Create a token data to get the user logged in 
        const tokenData = {
            id: existingUser?._id,
            username: existingUser?.username,
            email: existingUser?.email
        }

        // Creating a token with the help of jwt and tokenData above
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET as string, { expiresIn: "1d" })

        // creating a response to send to cookies
        const response = NextResponse.json({
            message: "Login Successfull",
            success: true
        })

        // Setting the created response in the cookies
        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }



}