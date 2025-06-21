import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email : string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, message
}) => (
  <div>
    <h1>Hello from {name}!</h1>
    <h2>Email: {email}</h2>
    <div>Message:</div>
    <p>{message}</p>
  </div>
);