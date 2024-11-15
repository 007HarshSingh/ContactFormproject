const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error:', err));

// Contact schema and model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// Add a new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: 'Error adding contact' });
  }
});

// Update a contact
app.put('/api/contacts/:id', async (req, res) => {
  console.log('Update contact')
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ error: 'Error updating contact' });
  }
});

// Delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting contact' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
