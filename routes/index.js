const routes = require('express').Router();
const week_oneController = require('../controllers/week_one');

routes.get('/', week_oneController.adaRoute);
routes.get('/chinedu', week_oneController.chineduRoute);

routes.use('/contacts', require('./contacts'));

module.exports = routes;