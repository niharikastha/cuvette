const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

const corsOptions = {
    origin: 'https://cuvette-lqxg.vercel.app',
    credentials: true, 
};

app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions));
app.use(express.json());
app.use('/auth', require('./routes/authRoutes'));
app.use('/job', require('./routes/jobRoutes'));
app.use('/email', require('./routes/emailRoutes'));

app.get('/', (req, res) => {
    res.json({
      message: 'Hello',
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
