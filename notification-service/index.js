const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:29092']
})

const consumer = kafka.consumer({ groupId: 'notification-group' })

const sendNotification = (status) => {
    console.log(`Notification ${status}`)
}

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'shipping-status' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const shippingStatus = JSON.parse(message.value.toString())

            if(shippingStatus.status === 'success') {
                sendNotification(`Order ${shippingStatus.orderId}: Shipping Successful.`)
            } else {
                sendNotification(`Order ${shippingStatus.orderId}: Shipping Failed.`)
            }
        }
    })
}

run().catch(console.error)