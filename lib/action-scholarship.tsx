'use server';

import nodemailer from 'nodemailer';

export async function sendScholarshipApplication(formData: FormData) {
    // Required fields validation (exclude 'agreement')
    const requiredFields = [
        'name', 'dateOfBirth', 'gender', 'photo', 'email',
        'mobile', 'street', 'city', 'postalCode', 'state',
        'courseName', 'institutionName', 'admissionDate', 'collegeId',
        'bankName', 'bankBranch', 'ifsc', 'accountNumber', 'accountHolder',
        'panNumber', 'studyFurther', 'hobbies', 'contribution',
        'declarationDate', 'declarationPlace'
    ];

    const missingFields = requiredFields.filter(field => !formData.get(field));
    if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        return { success: false };
    }

    // Get all form fields (excluding 'agreement')
    const name = formData.get('name') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const gender = formData.get('gender') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const region = formData.get('region') as string;
    const postalCode = formData.get('postalCode') as string;
    const state = formData.get('state') as string;
    const photo = formData.get('photo') as File;

    // Education Details
    const courseName = formData.get('courseName') as string;
    const institutionName = formData.get('institutionName') as string;
    const admissionDate = formData.get('admissionDate') as string;
    const collegeId = formData.get('collegeId') as string;

    // Bank Details
    const bankName = formData.get('bankName') as string;
    const bankBranch = formData.get('bankBranch') as string;
    const ifsc = formData.get('ifsc') as string;
    const accountNumber = formData.get('accountNumber') as string;
    const accountHolder = formData.get('accountHolder') as string;
    const panNumber = formData.get('panNumber') as string;

    // Additional Information
    const studyFurther = formData.get('studyFurther') as string;
    const hobbies = formData.get('hobbies') as string;
    const contribution = formData.get('contribution') as string;

    // Declaration
    const declarationDate = formData.get('declarationDate') as string;
    const declarationPlace = formData.get('declarationPlace') as string;

    // Convert the file to base64 for email attachment
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Photo = buffer.toString('base64');

    try {
        // Configure the transporter using Hostinger SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.HOSTINGER_EMAIL_USER,
                pass: process.env.HOSTINGER_EMAIL_PASS,
            },
        });

        // Format the email body with all application details, excluding 'agreement'
        const emailBody = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              h1 {
                color: #4CAF50;
              }
              h2 {
                color: #333;
                border-bottom: 2px solid #ddd;
                padding-bottom: 5px;
              }
              .section {
                margin-bottom: 20px;
              }
              .section p {
                margin: 5px 0;
              }
              .section .label {
                font-weight: bold;
                color: #555;
              }
            </style>
          </head>
          <body>
            <h1>New Scholarship Application</h1>
        
            <div class="section">
              <h2>Personal Information:</h2>
              <p><span class="label">Name:</span> ${name}</p>
              <p><span class="label">Date of Birth:</span> ${dateOfBirth}</p>
              <p><span class="label">Gender:</span> ${gender}</p>
            </div>
        
            <div class="section">
              <h2>Contact Information:</h2>
              <p><span class="label">Email:</span> ${email}</p>
              <p><span class="label">Mobile:</span> ${mobile}</p>
              <p><span class="label">WhatsApp:</span> ${whatsapp || 'Not provided'}</p>
            </div>
        
            <div class="section">
              <h2>Address Information:</h2>
              <p><span class="label">Street Address:</span> ${street}</p>
              <p><span class="label">City:</span> ${city}</p>
              <p><span class="label">Region:</span> ${region || 'Not provided'}</p>
              <p><span class="label">Postal Code:</span> ${postalCode}</p>
              <p><span class="label">State:</span> ${state}</p>
            </div>
        
            <div class="section">
              <h2>Education Details:</h2>
              <p><span class="label">Course Name:</span> ${courseName}</p>
              <p><span class="label">Institution Name:</span> ${institutionName}</p>
              <p><span class="label">Date of Admission:</span> ${admissionDate}</p>
              <p><span class="label">College ID:</span> ${collegeId}</p>
            </div>
        
            <div class="section">
              <h2>Bank Details:</h2>
              <p><span class="label">Bank Name:</span> ${bankName}</p>
              <p><span class="label">Bank Branch:</span> ${bankBranch}</p>
              <p><span class="label">Branch IFSC:</span> ${ifsc}</p>
              <p><span class="label">Account Number:</span> ${accountNumber}</p>
              <p><span class="label">Account Holder:</span> ${accountHolder}</p>
              <p><span class="label">PAN Number:</span> ${panNumber}</p>
            </div>
        
            <div class="section">
              <h2>Additional Information:</h2>
              <p><span class="label">You intend to study further:</span> ${studyFurther}</p>
              <p><span class="label">Your Hobbies:</span> ${hobbies}</p>
              <p><span class="label">Your Contribution:</span> ${contribution}</p>
            </div>
        
            <div class="section">
              <h2>Declaration:</h2>
              <p><span class="label">Declaration Date:</span> ${declarationDate}</p>
              <p><span class="label">Place:</span> ${declarationPlace}</p>
            </div>
        
            <p>A photo has been attached to this email.</p>
          </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.HOSTINGER_EMAIL_USER,
            to: process.env.HOSTINGER_EMAIL_USER,
            subject: `New Scholarship Application from ${name}`,
            html: emailBody,
            attachments: [
                {
                    filename: `${name.replace(/\s+/g, '_')}_photo${photo.name.slice(photo.name.lastIndexOf('.'))}`,
                    content: base64Photo,
                    encoding: 'base64',
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Failed to send scholarship application:', error);
        return { success: false };
    }
}
