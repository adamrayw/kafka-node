const express = require('express');
const { Kafka } = require('kafkajs')

const app = express()
const port = 3001

app.use(express.json())

const kafka = new Kafka({
    clientId: "shipping-events",
    brokers: ["localhost:29092"]
})

/* This line of code is creating a Kafka consumer instance with a specified group ID of
'shipping-group'. The consumer will be used to subscribe to topics within the Kafka cluster and
consume messages from those topics. The group ID is used to identify the consumer group to which
this consumer belongs. Multiple consumers with the same group ID will form a consumer group and
share the message consumption workload for the subscribed topics. */

const consumer = kafka.consumer({ groupId: 'shipping-group' })
const producer = kafka.producer()

const run = async () => {
    await consumer.connect()
    await producer.connect()
    await consumer.subscribe({ topic: 'order-events' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {
            const orderData = JSON.parse(message.value.toString())

            console.log(`Order received! : ${message.value.toString()}`)


            // Mengirim status ke kafka
            await producer.send({
                topic: 'shipping-status',
                messages: [{ value: JSON.stringify({ orderId: orderData.orderId, status: 'success' }) }]
            })
        }
    })
    
    app.listen(port, () => {
        console.log(`Shipping Service running at http://localhost:${port}`)
    })
}

run().catch(console.error)