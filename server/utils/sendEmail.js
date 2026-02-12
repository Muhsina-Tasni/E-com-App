// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, html }) => {

//   try{
//      console.log("📌 Email function called"); // ✅ HERE
  
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"PAGETURNER" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
  
//    console.log("✅ Email sent successfully");
// };
// }{

// }

// module.exports = sendEmail;
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📌 Email function called"); // ✅ HERE

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"PAGETURNER" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
