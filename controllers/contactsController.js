// Correct import of ObjectId
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all contacts
const getAllContacts = async (req, res) => {
  //#swagger.tags = ['Contacts']
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
  //#swagger.tags = ['Contacts']
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

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occured while updating the contact');
    }
  };
  
  const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor : req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id:contactId}, contact);
if (response.modifiedCount > 0) {
  res.status(204).send();
}else {
  res.status(500).json(response.error || 'Some error occured while updating the contact.');
}
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while deleting the user.');
}
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};