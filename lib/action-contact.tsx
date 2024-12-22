'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
    const fields = [
        "name",
        "email",
        "message"
    ];

    // Get form data and format it nicely
    const data = fields
        .map((field) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${formData.get(field)}`)
        .join("<br>");

    // HTML email body with inline CSS for styling
    const emailBody = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #4CAF50;
                }
                .content {
                    margin-top: 20px;
                }
                .label {
                    font-weight: bold;
                    color: #333;
                }
                .message {
                    background-color: #f1f1f1;
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Message from Contact Form</h1>
                <div class="content">
                    <p><span class="label">Name:</span> ${formData.get('name')}</p>
                    <p><span class="label">Email:</span> ${formData.get('email')}</p>
                    <p><span class="label">Message:</span></p>
                    <div class="message">${formData.get('message')}</div>
                </div>
            </div>
        </body>
    </html>
    `;

    try {
        // Configure the transporter using Hostinger SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com', // Hostinger SMTP host
            port: 465, // SSL port
            secure: true, // Use SSL
            auth: {
                user: process.env.HOSTINGER_EMAIL_USER, // Your Hostinger email
                pass: process.env.HOSTINGER_EMAIL_PASS, // Your Hostinger email password or app password
            },
        });

        const mailOptions = {
            from: process.env.HOSTINGER_EMAIL_USER,
            to: process.env.HOSTINGER_EMAIL_USER,
            subject: `New Message from Contact Form`,
            html: emailBody,  // Use `html` property to send HTML email
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}
