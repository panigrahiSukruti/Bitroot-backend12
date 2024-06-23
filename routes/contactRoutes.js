// routes/contactRoutes.js
const express = require('express');
const { getContacts, getContactById, createContact, updateContact, deleteContact, searchContacts, exportContacts } = require('../controllers/contactcontroller');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactById);
router.post('/contacts', upload.single('image'), createContact);
router.put('/contacts/:id', upload.single('image'), updateContact);
router.delete('/contacts/:id', deleteContact);
router.get('/search/:query', searchContacts);
router.get('/export', exportContacts);

module.exports = router;
