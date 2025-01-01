

import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'

// Connect to the database
connect();


export async function POST(request: NextRequest) {

    const reqBody = await request.json();

    const { newPassword, email, pin } = reqBody;

    const user = await User.findOne({ email })

    const userId = user?._id

    const salt = await bcryptjs.genSalt(10)  // It defines the number of rounds to encrypt the password
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    let updatedPassword;
    if (user?.forgotPasswordToken === pin) {
        updatedPassword = await User.findByIdAndUpdate(userId,
            {
                $set: {
                    password: hashedPassword
                }
            },
            {
                new: true
            }
        )
    }

    return NextResponse.json({ updatedPas: updatedPassword }, { status: 200 })


}