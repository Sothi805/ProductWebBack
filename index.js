const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//routes

const productRouter = require('../ProductWebBack/routes/product.route.js')
app.use("/api/products", productRouter)


app.get('/', (req, res) => {
    res.send("Hello from Node API")
})

//dotenv
const dotenv = require('dotenv').config();

const URL = process.env.MONGODB_URL;  // Use the URL from .env file

const port = process.env.PORT || 3000;  // Fallback to 3000 if the PORT is not defined

mongoose.connect(URL)
.then(() =>{
    console.log("Connected to Database")
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((error) => {
    console.log("Connection Failed: ", error);
});
