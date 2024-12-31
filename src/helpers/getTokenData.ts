import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getTokenData = (request: NextRequest) => {
    try {
        // get the encoded token from the cookies -->[*request of NextRequest has access to the cookies]
        const enCodedToken = request.cookies.get('token')?.value || ''

        // decode the encoded token with the help of the token secret
        const deCodedToken: any = jwt.verify(enCodedToken, process.env.TOKEN_SECRET as string);

        return deCodedToken.id;

    } catch (error: any) {
        throw new Error("Error occured getting token data : ", error.message)
    }
}