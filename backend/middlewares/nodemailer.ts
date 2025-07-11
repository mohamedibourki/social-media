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
    const templatePath = path.join(__dirname, "../views", "email.hbs");
    const source = await readFile(templatePath, "utf-8");

    const template = Handlebars.compile(source);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const context = {
      name: username,
      message: message,
    };

    const html = template(context);

    const mailOptions = {
      from: process.env.GMAIL_USER,
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