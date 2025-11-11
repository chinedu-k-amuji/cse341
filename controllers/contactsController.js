// Correct import of ObjectId
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Fetching contacts failed!', error: err.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact', error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById
};