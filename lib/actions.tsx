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

    // Construct the email data with labels and values
    const emailContent = fields
        .map((field) => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const value = formData.get(field) || 'Not Provided';
            return `<p><strong>${label}:</strong> ${value}</p>`;
        })
        .join("");

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
                    margin-bottom: 20px;
                }
                .content {
                    margin-top: 20px;
                }
                .label {
                    font-weight: bold;
                    color: #333;
                }
                p {
                    line-height: 1.5;
                    margin: 8px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Membership Application</h1>
                <div class="content">
                    ${emailContent}
                </div>
            </div>
        </body>
    </html>
    `;

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
            html: emailBody,  // Use `html` property to send HTML email
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false };
    }
}
