import bcryptjs from 'bcryptjs'
import { User } from '@/models/userModel'
import nodemailer from 'nodemailer'

export async function sendEmail({ email, emailType, userId }: any) {

    const confPassNumber = Math.floor(Math.random() * 9000 + 1000);

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
                        forgotPasswordToken: confPassNumber,
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
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'gauravjawalkar8@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
            html: `<p> 
            Click 
            <a href="${process.env.domain}/verifyemail?token=${hashedToken}">
            here
            </a>
            to 
            ${emailType === "VERIFY" ? "verify your email" : "Nothing"}
            ${emailType === "RESET" ? `Your 4 digit code to reset the password ${confPassNumber}` : "Nothing"}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error("Error sending the email : ", error.message)
    }
}