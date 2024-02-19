import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, html: any): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'sharathbrocamp@gmail.com',
                pass: 'jzsivroojqnpcbzc',
            },
        });

        await transporter.sendMail({
            from: 'Xsocail support<support@xsocial.com>',
            to: email,
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error(error, 'Email not sent');
    }
};

export default sendEmail;
