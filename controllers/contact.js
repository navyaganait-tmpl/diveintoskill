const Sequelize = require('sequelize');
const db = require('../database/models');

module.exports={
    submitForm: async (req, res) => {
    try {
    const { name, email, headline, details } = req.body;

    const submission = await db.Contact.create({
      name,
      email,
      headline,
      details,
    });

    return res.status(201).json({ message: 'Form submission successful', submission });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}};

