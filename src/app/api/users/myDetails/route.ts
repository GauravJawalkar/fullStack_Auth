import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(request: NextRequest) {
    try {

        const userId = await getTokenData(request);

        const strUserId = String(userId);
        console.log("user id : ", strUserId);

        const user = await User.findById(strUserId).select("-password");
        // console.log("User is :", user);

        if (!user) {
            return console.log("User not found");
        }

        return NextResponse.json(
            {
                message: "User Found",
                user: user,
                sucess: true
            },
            {
                status: 200
            }
        )



    } catch (error: any) {
        throw NextResponse.json({ error: error.message }, { status: 400 })
    }
}