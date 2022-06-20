import * as nodemailer from "nodemailer";
import * as hbs from 'nodemailer-express-handlebars'

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public template?: string,
        public context?: {
            name: string
        }) { }


    sendMail() {

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: this.to,
            subject: this.subject,
            template: this.template,
            context: this.context
        };

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: { rejectUnauthorized: false },
            debug: true
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extName: '.hbs',
                partialsDir: './services/mail/views',
                layoutsDir: './services/mail/views',
                defaultLayout: '',
            },
            viewPath: 'services/mail/views/',
            extName: '.hbs'
        }));

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return "Sent";
            }
        });
    }

}

export default new Mail;