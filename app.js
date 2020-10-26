const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 3010
mongoose.connect('mongodb://localhost:27017/farmsmart_backend',
 {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=> {
    console.log("DB CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// api for authrization
const authRoutes = require("./routes/auth");   
app.use("/api", authRoutes);

// api for category
const categoryRoutes = require("./routes/category");   
app.use("/api", categoryRoutes);

// api for product
const productRoutes = require("./routes/product");   
app.use("/api", productRoutes);
app.use('/uploads', express.static('uploads'));

// api for order
const orderRoutes = require("./routes/order");   
app.use("/api", orderRoutes);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))