require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Auth0

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
   secret: process.env.SECERT,
   baseURL: process.env.BASE_URL,
   clientID: process.env.CLIENT_ID,
   issuerBaseURL:process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// Auth0 End

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .use('/', require('./routes'));


// Auth0 Middleware
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
    
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