 // Correct import of ObjectId
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all employees
const getAllEmployees = async (req, res) => {
  //#swagger.tags = ['Employees']
  try {
    const result = await mongodb.getDatabase().db().collection('employees').find();
    const employees = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Fetching employees failed!', error: err.message });
  }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
  //#swagger.tags = ['Employees']
  try {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').findOne({ _id: employeeId });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee', error: error.message });
  }
};

const createEmployee = async (req, res) => {
  //#swagger.tags = ['Employees']
  const employee = {
    Name: req.body.Name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    department: req.body.department,
    age: req.body.age,
    religion: req.body.religion,
    maritalStatus: req.body.maritalStatus
  };
  const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
  if (response.acknowledged > 0) {
    res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occured while updating the employee.');
    }
  };
  
  const updateEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employeeId = new ObjectId(req.params.id);
    const employee = {
      Name: req.body.Name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address : req.body.address,
      department: req.body.department,
      age: req.body.age,
      religion: req.body.religion,
      maritalStatus: req.body.maritalStatus
    };
    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({_id:employeeId}, employee);
if (response.modifiedCount > 0) {
  res.status(204).send();
}else {
  res.status(500).json(response.error || 'Some error occured while updating the employee.');
}
};

const deleteEmployee = async (req, res) => {
  //#swagger.tags = ['Employees']
  const employeeId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('employees').deleteOne({_id: employeeId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while deleting the employee.');
}
};


module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};