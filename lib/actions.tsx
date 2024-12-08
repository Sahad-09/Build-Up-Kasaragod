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
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Membership Application`,
            text: data,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}
