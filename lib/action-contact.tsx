'use server';

import nodemailer from 'nodemailer';

// Define the function to send an email
export async function sendEmail(formData: FormData) {
    // Define the fields to extract from the form data
    const fields = [
        "name",
        "email",
        "message"
    ];

    // Create a formatted string of the form data
    const data = fields
        .map((field) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${formData.get(field)}`)
        .join("\n");

    try {
        // Configure the transporter using Gmail as the email service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send email to yourself
            subject: `New Message from Contact Form`,
            text: data,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}
