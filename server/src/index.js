const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);


const mongoURI = process.env.MONGO_DB; // Lấy URI từ biến môi trường

// Kết nối tới MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

app.listen(port, () =>{
    console.log('server is running in port: ' , +port)
})