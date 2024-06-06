const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const { Booking} = require('../models/Booking'); 
const {Users} = require("../models/Users")
const secretKey = process.env.SECRET_KEY;

// Get all bookings
const selectAll = async (req, res) => {
  try {
    const items = await Booking.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user's bookings
const getUsersBooking = async (req, res) => {
  try {
    const userId = req.params.iduser;
    const favs = await Booking.findAll({
      where: { users_id: userId },
      include: [{ model: Item }], 
    });
    res.status(200).json(favs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a favorite
const addFav = async (req, res) => {
  try {
    const { iduser: userId, iditem: itemId } = req.params;
    const result = await Favourite.create({
      users_id: userId,
      item_iditem: itemId,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User signup
const signUp = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASSMAIL,
    },
  });

  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    const result = await Users.create({
      email,
      password: hashedPassword,
      username,
      verification_token: verificationToken,
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Email Verification',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation Email</title>
        </head>
        <body>
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
            <h1 style="color: #333; margin-bottom: 20px;">Verification Email</h1>
            <p style="margin-bottom: 20px; color: #555;">Dear ${username},</p>
            <p style="margin-bottom: 20px; color: #555;">Verify your email by clicking the button below:</p>
            <a href="http://localhost:3000/verify/${verificationToken}" style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 10px; cursor: pointer; text-decoration: none;">Verify</a>
            <p style="margin-top: 20px; color: #777;">Best regards,<br>ABStore</p>
          </div>
        </body>
        </html>`,
    };

    res.status(200).json({
      message: 'Registration successful. Please check your email to verify your account.',
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, secretKey);
    const { email } = decoded;

    const result = await Users.update(
      { is_verified: true },
      { where: { email, verification_token: token } }
    );

    if (!result[0]) {
      return res.status(500).json({ error: 'Email verification failed' });
    }

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid or expired token' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get a specific booking by ID
const selectOne = async (req, res) => {
  try {
    const item = await Booking.findByPk(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new booking
const add = async (req, res) => {
  try {
    const result = await Booking.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing booking by ID
const update = async (req, res) => {
  try {
    const result = await Booking.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a booking by ID
const remove = async (req, res) => {
  try {
    const result = await Booking.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  selectAll,
  add,
  remove,
  update,
  selectOne,
  signUp,
  login,
  addFav,
  getUsersBooking,
  verifyEmail,
};
