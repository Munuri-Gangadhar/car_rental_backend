const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/authRoutes');
const carRoutes=require('./routes/carRoutes');
const morgan=require('morgan');
require('dotenv').config();

const app=express();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

mongoose.connect("mongodb://localhost:27017/Car",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/cars',carRoutes);

const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server is started at port:${PORT}`);
})