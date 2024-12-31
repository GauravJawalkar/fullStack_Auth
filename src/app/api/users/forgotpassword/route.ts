import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Connect to the database
connect();


export async function POST(request: NextRequest) {
    const reqBody = await request.json();

    const { newPassword, userId } = reqBody;

    // Code to change the users password

}