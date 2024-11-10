const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect'); //importing the requiresAuth used for authentication before going to a route

routes.get('/', require('../controllers/homePage'));
routes.use('/workouts', require('./workouts'))
routes.use('/nutrition', require('./nutrition'))
// routes.use('/login', require('./login'))
// routes.use('/sleep', require('./sleep'))

module.exports = routes;