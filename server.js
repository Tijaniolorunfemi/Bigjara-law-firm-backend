const express = require ('express')
const cors = require('cors');
const mongoose = require('mongoose')

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5100 ; 

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri , { 
//     useNewUrlParser: true, useCreateIndex: true 
// });

mongoose.connect(`mongodb://localhost:27017/bigjara`)

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection sucessful")})

const infoRouter = require('./routes/info');
const userRouter = require('./routes/users');

app.use('/info' , infoRouter);
app.use('/users' , userRouter);

app.listen(port, () => { console.log(`server is running on port: ${5100}`)})