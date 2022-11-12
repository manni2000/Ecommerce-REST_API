require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const swStats = require('swagger-stats');
const apiSpec = require('swagger.json');
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));


mongoose.connect('mongodb://localhost:27017/Ecomm')
.then(()=> console.log("DBConnection sucessfull!"))
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is connected!")
})