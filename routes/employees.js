const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employeesController');

router.get('/', employeesController.getAllEmployees);

router.get('/:id', employeesController.getEmployeeById);

// Week 3 and 4 assignment starts here
router.post('/', employeesController.createEmployee);

router.put('/:id', employeesController.updateEmployee);

router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;