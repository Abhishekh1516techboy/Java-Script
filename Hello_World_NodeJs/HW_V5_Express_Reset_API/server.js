// ---------NodeJs backend Server---------
import express from 'express';

const app = express();
const port = 3000; // running PORT 3000

app.get('/', (req, res) => {
  res.send('Welcome to my Hotel Baba Ka Dhaba.');
});

// Non-veg Order
app.get('/order/non-veg/chicken', (req, res) => {

  const chickenOrder = {
    itemName: "Chicken Curry",
    quantity: "full",
    price: 180,
    customerName: "Prince Kumar",
    customerPhone: "620-460-9187",
    deliveryAddress: "New Atwarpur Sirpra P-18, Patna, Bharat",
    orderStatus: "pending",
    paymentMethod: "card",
    specialInstructions: "Make it quick",
    category: "chicken",
    orderDate: new Date().toString(),
  };

  res.send(chickenOrder);
})

// Veg Order
app.get('/order/veg/paneer', (req, res) => {

  const paneerOrder = {
    itemName: "Sahi Paneer",
    quantity: "half",
    price: 80,
    customerName: "Prince Kumar",
    customerPhone: "620-460-9187",
    deliveryAddress: "New Atwarpur Sirpra P-18, Patna, Bharat",
    orderStatus: "pending",
    paymentMethod: "cash",
    specialInstructions: "Make it spicy",
    category: "paneer",
    orderDate: new Date().toString(),
  };

  res.send(paneerOrder);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

