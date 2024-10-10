require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000

// TODO: move to own dirs
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Set EJS as the view engine
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', require('./routes'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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