const express = require('express');
const { Kafka } = require('kafkajs')

const app = express()
const port = 3000

app.use(express.json())

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:29092']
})

const producer = kafka.producer()

app.post('/order', async (req, res) => {
    const orderData = req.body;

    await producer.send({
        topic: 'order-events',
        messages: [{
            value: JSON.stringify(orderData)
        }]
    })

    res.status(201).send('Order created successfully!')
})

const run = async () => {
    await producer.connect()

    app.listen(port, () => {
        console.log(`Order service running at http://localhost:${port}`)
    })
}
run().catch(console.error)