import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

// connecting to the database
connect();


export async function POST(request: NextRequest) {
    try {
        // In NextJS take the data from frontend through the requset.json()
        const reqBody = await request.json();

        // Destructure the values from the reqBody
        const { username, email, password } = reqBody;

        // Check if the fields got from the reqBody arent empty
        if ([username, email, password].some((field) => field.trim() === "")) {
            throw Error("Please check if all the required fields are provided")
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ error: "User Already Exist in the database" }, { status: 400 })
        }

        // Before Creating/Registering the user in the database hash or encrypt the password
        const salt = await bcryptjs.genSalt(10)  // It defines the number of rounds to encrypt the password
        const hashedPassword = await bcryptjs.hash(password, salt);

        // If there is no user found in the database register a new user in the database
        const registeredUser = await User.create(
            {
                username,
                email,
                password: hashedPassword
            }
        )


        // Check if the user gets created in the database
        if (!registeredUser) {
            return NextResponse.json({ error: "Failed to register the user" }, { status: 500 })
        }

        return NextResponse.json(
            {
                message: "User Created Successfully",
                success: true,
                user: registeredUser
            }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
