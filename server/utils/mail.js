import nodemailer from "nodemailer";
import {config} from "dotenv";

config()

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

function sendEmail(emailDetails) {
  transport.sendMail(emailDetails, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export const sendTestMail = (customerEmail, content) => {
  const emailDetails = {
    from:  process.env.EMAIL,
    to: customerEmail,
    subject: 'Test mail',
    text: content
  }
  sendEmail(emailDetails)
}

export const sendCodeRoomMail = (customerEmail, licensePlate, code) => {
  const emailDetails = {
    from: process.env.EMAIL,
    to: customerEmail,
    subject: `Auction room join code for license plate: ${licensePlate}`,
    text: `Please keep this for yourself. The code is ${code} for license plate.`
  }
  sendEmail(emailDetails);
}




