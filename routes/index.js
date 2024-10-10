const routes = require('express').Router();

routes.get('/', require('../controllers/homePage'));
routes.use('/workouts', require('./workouts'))
routes.use('/nutrition', require('./nutrition'))
// routes.use('/login', require('./login'))
// routes.use('/sleep', require('./sleep'))

module.exports = routes;