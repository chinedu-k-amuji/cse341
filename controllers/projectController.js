// Correct import of ObjectId
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all projects week 4.
const getAllProject = async (req, res) => {
  //#swagger.tags = ['Project']
  try {
    const result = await mongodb.getDatabase().db().collection('project').find();
    const project = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Fetching projects failed!', error: err.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  //#swagger.tags = ['Project']
  try {
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('project').findOne({ _id: projectId });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
};

// Create a new project
const createProject = async (req, res) => {
  //#swagger.tags = ['Project']
  const project = {
    project_id: req.body.project_id,
    title: req.body.title,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    assigned_employee: req.body.assigned_employee
  };

  const response = await mongodb.getDatabase().db().collection('project').insertOne(project);
  if (response.acknowledged > 0) {
    res.status(201).json(project);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the project.');
  }
};

// Update a project
const updateProject = async (req, res) => {
  //#swagger.tags = ['Project']
  const projectId = new ObjectId(req.params.id);
  const project = {
    project_id: req.body.project_id,
    title: req.body.title,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    assigned_employee: req.body.assigned_employee,
  };

  const response = await mongodb.getDatabase().db().collection('project').replaceOne({ _id: projectId }, project);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the project.');
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  //#swagger.tags = ['Project']
  const projectId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('project').deleteOne({ _id: projectId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the project.');
  }
};

module.exports = {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};