'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
    const fields = [
        "name",
        "email",
        "message"
    ];

    const data = fields
        .map((field) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${formData.get(field)}`)
        .join("\n");

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
            text: data,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}