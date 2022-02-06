const axios = require('axios');

const generateEmail = async (notification) => {
  const text = `${notification.subject}\n${notification.message}.\nID: ${notification.id}`;

  const markup = `
    <div>
      <h3>${notification.subject}</h3>
      <p>${notification.message}.</p>
      <p>ID: <strong>${notification.id}</p>
    </div>
  `;
  return { text, markup };
};

const sendNotification = async (userEmail, notification) => {
  const { MAILER_URL } = process.env;

  const { text, markup: html } = await generateEmail(notification);

  const info = await axios.post(
    MAILER_URL,
    JSON.stringify({
      from: 'Social App API',
      reciever: userEmail,
      subject: notification.subject,
      text,
      html
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return info;
};

module.exports = sendNotification;
