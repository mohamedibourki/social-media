import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { readFile } from "fs/promises";
import Handlebars from "handlebars";

dotenv.config();

export const sendEmail = async (
  username?: any,
  email?: any,
  subject?: any,
  message?: any
) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "email.hbs");
    const source = await readFile(templatePath, "utf-8");

    const template = Handlebars.compile(source);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        student: process.env.GMAIL_student,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const context = {
      name: username,
      message: message,
    };

    const html = template(context);

    const mailOptions = {
      from: process.env.GMAIL_student,
      to: email,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error);
  }
};

// const verifyEmail = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.params
//     const student = await prisma.student.findUnique({ verifyToken: token })

//     if (!student) {
//       return res.status(400).json({ message: `Invalid verification token` })
//     }

//     student.isVerified = true;
//     student.verifyToken = undefined;

//     res.status(200).json(`Email verified successfully. You can now login`)
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json(error.message)
//   }
// }
