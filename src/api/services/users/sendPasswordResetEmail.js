const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');

const generateEmail = async (userEmail) => {
  const token = await jwt.sign({ email: userEmail }, process.env.JWT_SECRET, {
    expiresIn: 3600
  });
  const text = `Password Reset\nTo reset your password, attach the following token (without quotations) in request body as "token".\n
  token: "${token}"`;

  const markup = `
    <div>
      <h3>Password Reset</h3>
      <p>To reset your password, attach the following token (without quotations) in request body as "token".</p>
      <p>token: "<strong>${token}</strong>"</p>
    </div>
  `;
  return { text, markup };
};

const sendPasswordResetEmail = async (from, subject, userEmail) => {
  const { MAILER_URL } = process.env;

  const user = await User.findOne({ email: userEmail }).exec();
  if (!user) throw new APIError(404, 'No user was found with given email');

  const { text, markup: html } = await generateEmail(userEmail);

  const info = await axios.post(
    MAILER_URL,
    JSON.stringify({ from, reciever: userEmail, subject, text, html }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return info;
};

module.exports = sendPasswordResetEmail;
