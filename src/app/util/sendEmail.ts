import nodemailer from "nodemailer";

export const sendEmail = async (html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mdmoniruzzamanbillal2@gmail.com",
      pass: "ilmf eeqw agtp mibf",
    },
  });

  await transporter.sendMail({
    from: "mdmoniruzzamanbillal2@gmail.com", // sender address
    to: "mdmoniruzzamanbillal@gmail.com", // list of receivers
    subject: "Reset your password within ten mins!",
    text: "", // plain text body
    html,
  });
};
