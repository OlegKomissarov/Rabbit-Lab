require('dotenv').config();
const Gateway = require('micromq/gateway');

const app = new Gateway({
    microservices: ['message'],
    rabbit: {
        url: process.env.RABBIT_MQ_HOST
    }
});

app.post('/message', async (req, res) => {
    await res.delegate('message'); // делегируем запрос в микросервис message
});

app.listen(process.env.GATEWAY_PORT);
