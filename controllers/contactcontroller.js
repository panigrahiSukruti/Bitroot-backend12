// controllers/contactController.js
const Contact = require('../models/contact');
const { exportContactsToCSV } = require('../utils/exportCSV');

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new contact
const createContact = async (req, res) => {
    try {
        const { name, numbers } = req.body;
        const image = req.file ? req.file.path : null;
        const newContact = new Contact({ name, numbers, image });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Duplicate phone number' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Update contact by ID
const updateContact = async (req, res) => {
    try {
        const { name, numbers } = req.body;
        const image = req.file ? req.file.path : null;
        const contact = await Contact.findByIdAndUpdate(req.params.id, { name, numbers, image }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete contact by ID
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search contacts by name or number
const searchContacts = async (req, res) => {
    try {
        const { query } = req.params;
        const contacts = await Contact.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { numbers: query }
            ]
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export contacts to CSV
const exportContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        const csv = await exportContactsToCSV(contacts);
        res.header('Content-Type', 'text/csv');
        res.attachment('contacts.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    searchContacts,
    exportContacts
};
