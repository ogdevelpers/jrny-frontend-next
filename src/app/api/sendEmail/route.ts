export const runtime = 'edge'; // Keep this line

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Construct the HTML string directly
    const emailHtml = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>New Contact Form Submission</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style type="text/css">
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
            h2 { color: #0056b3; }
            p { margin-bottom: 10px; }
            strong { color: #555; }
          </style>
        </head>
        <body style="margin: 0; padding: 0;">
          <div class="container">
            <h2>New Message from Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <br>
            <p>This message was sent from your website's contact form.</p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['developers506@gmail.com'],
      subject: `New Contact Form Submission from ${name}`, // More descriptive subject
      html: emailHtml, // Pass the directly constructed HTML string
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Optional: Plain text version
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Caught error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}