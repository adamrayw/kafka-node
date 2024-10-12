
# Kafka Node

A simple example of kafka implementation in node js, running in docker.



## Installation

Install project in every service
```bash
  cd order-service
  npm install
```
Run docker
```bash
  docker compose up --build
``` 
Run all service, example
```bash
  cd order-service
  node index.js
```
POST to /order with JSON 
```bash
 {
  "orderId": "123",
  "item": "Book"
}
```
