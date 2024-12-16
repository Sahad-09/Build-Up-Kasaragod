'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
    const fields = [
        "name",
        "dob",
        "gender",
        "aadhaar",
        "fatherName",
        "spouse",
        "qualification",
        "occupation",
        "country",
        "mobile",
        "whatsapp",
        "email",
        "address",
        "hobbies",
        "awards",
        "membershipCategory",
    ];

    const data = fields
        .map((field) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${formData.get(field)}`)
        .join("\n");

    try {
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
            subject: `New Membership application`,
            text: data,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}
