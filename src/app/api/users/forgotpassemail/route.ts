

import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();

        const { email } = reqBody;

        const user = await User.findOne({ email })

        const userId = user?._id;

        const emailSended = await sendEmail({ email, emailType: "RESET", userId: userId });

        return NextResponse.json({ data: emailSended }, { status: 200 })
    } catch (error: any) {
        throw NextResponse.json({ error: error.message }, { status: 400 })
    }
}