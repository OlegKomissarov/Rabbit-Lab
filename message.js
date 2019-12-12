require('dotenv').config();
const MicroMQ = require('micromq');
const nodemailer = require('nodemailer');

const app = new MicroMQ({
    name: 'message',
    rabbit: {
        url: process.env.RABBIT_MQ_HOST
    }
});

app.post('/message', (req, res) => {
    sendEmail(req.body.message).catch((e)=>{ console.log(e) });
    res.json({ message: `Rabbit says "${req.body.message}"` });
});

// начинаем слушать очередь запросов
app.start();

async function sendEmail(message) {
    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            // TODO: add password security
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: 'Hello',
        text: message,
        html: `<b>${message}</b>`
    });
}
