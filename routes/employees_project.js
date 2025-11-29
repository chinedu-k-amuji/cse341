const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employeesController');
const projectController = require('../controllers/projectController');

// Employee routes
router.get('/employees', employeesController.getAllEmployees);
router.get('/employees/:id', employeesController.getEmployeeById);
router.post('/employees', employeesController.createEmployee);
router.put('/employees/:id', employeesController.updateEmployee);
router.delete('/employees/:id', employeesController.deleteEmployee);

// Project routes
router.get('/project', projectController.getAllProject);
router.get('/project/:id', projectController.getProjectById);
router.post('/project', projectController.createProject);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);

module.exports = router;