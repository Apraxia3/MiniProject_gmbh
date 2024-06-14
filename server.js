const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/database');

dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userReportUserRoutes = require('./routes/userReportUserRoutes');
const userReportProductRoutes = require('./routes/userReportProductRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user-report-user', userReportUserRoutes);
app.use('/user-report-product', userReportProductRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
