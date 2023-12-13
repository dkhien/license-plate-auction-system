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
    from: `Đấu Giá Biển Số <${process.env.EMAIL}>`,
    to: customerEmail,
    subject: `Mã phòng đấu giá biển số xe ${licensePlate}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
      <h2 style="text-align: center; color: #333;">HỆ THỐNG ĐẤU GIÁ BIỂN SỐ</h2>
      <p>Kính gửi quý khách,</p>
      <p>Mã truy cập phòng đấu giá của quý khách là:</p>
      <p style="text-align: center; font-size: 20px; color: #ff0000;"><strong>${code}</strong></p>
      <p>Quý khách vui lòng không đưa mã này cho bất kỳ ai.</p>
      <p>Chân thành cảm ơn quý khách!</p>
      </div>
      </div>
    `
  }
  sendEmail(emailDetails);
}




