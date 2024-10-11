require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .use('/', require('./routes'));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB })
    .then(() => {
        console.log('Successfully connected to MongoDB '+ (process.env.MONGO_DB));
   })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(port, '0.0.0.0', () => {
console.log('Server listening at port ' + (port));
});