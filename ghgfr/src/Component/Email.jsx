import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export const Email = () => {
  const [message, setMessage] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [status, setStatus] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://backend.climescore.com/allusers')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Find user data matching the entered email
    const user = userData.find(user => user.emailid === replyTo);

    if (!user) {
      setStatus('Failed to send email. Email is not registered.');
      return;
    }

    // Include userId and password in the email template
    const templateParams = {
      from_name: "NettZero",
      to_name: "User",
      message: `${message}\n\nUserId: ${user.userId}\nPassword: ${user.password}`,
      reply_to: "dopiti4541@jadsys.com",
    };

    emailjs.send(
      'service_2yahvd4',     // Your Service ID
      'template_knh8u7c',    // Your Template ID
      templateParams,
      '4_SUObyufQCf-gtms'    // Replace with your User ID
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus('Email sent successfully! Please Check Your email.');
    }).catch((err) => {
      console.error('FAILED...', err);
      setStatus('Failed to send email.');
    });

    setMessage('');
    setReplyTo('');
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={sendEmail}>
        <div>
          <label>Enter Your Registered Email Id</label>
          <input
            type="email"
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Apply For User Id and Password</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};
