const nodemailer = require('nodemailer');
const db = require('../database/models');
const { Contact } = db;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "navyaganait15@gmail.com",
      pass: "hqdgcvgctkhaicjv",
    },
  });
  
  module.exports={
  subscribe: async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the person is already subscribed
      const existingContact = await Contact.findOne({
        where: { email },
      });
  
      if (existingContact && existingContact.isSubscribed) {
        return res.status(400).json({ error: 'Email is already subscribed' });
      }
  
      // If not subscribed or not found, proceed with the subscription logic
  
      // Save/update the subscription status in the database
      if (existingContact) {
        await existingContact.update({ isSubscribed: true });
      } else {
        await Contact.create({ email, isSubscribed: true });
      }
  
      // Send a confirmation email
      const mailOptions = {
        from: 'navyaganait@gmail.com', 
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing!',
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // For demonstration purposes, just return a response
      return res.status(200).json({ message: 'Subscription successful', email });
    } catch (error) {
      console.error('Error handling subscription:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }};
  
