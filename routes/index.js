const routes = require('express').Router();

// Swagger documentation route
routes.use('/', require('./swagger'));

// Hello World route
routes.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Hello World');
});

// Week one.
// const week_oneController = require('../controllers/week_one');
// routes.get('/', week_oneController.adaRoute);
// routes.get('/chinedu', week_oneController.chineduRoute);

// Employees API routes
routes.use('/employees', require('./employees'));

module.exports = routes;