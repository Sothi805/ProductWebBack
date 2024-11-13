const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const productRouter = require('./routes/product.route.js');  // Update path as needed
app.use("/api/products", productRouter);

const authRouter = require('./routes/auth.route.js');
app.use('/api/auth', authRouter);

const userRouter = require('./routes/user.route.js');
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("Hello from Node API");
});

// MongoDB and Port Setup
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to Database");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((error) => {
    console.log("Connection Failed: ", error);
});
