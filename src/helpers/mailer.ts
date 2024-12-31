import bcryptjs from 'bcryptjs'
import { User } from '@/models/userModel'
import nodemailer from 'nodemailer'

export async function sendEmail({ email, emailType, userId }: any) {
    try {
        // Create a hashed Token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                },
                {
                    new: true
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                },
                {
                    new: true
                }
            )
        }



        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a5625350a02fec",
                pass: "95e75d07a738fb"
            }
        });

        const mailOptions = {
            from: 'gauravjawalkar8@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
            html: `<p> Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error("Error sending the email : ", error.message)
    }
}