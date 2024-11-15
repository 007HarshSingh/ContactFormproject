import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from '../../Component/ContactForm.jsx';
import ContactsTable from '../../Component/ContactsTable.jsx';

function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);
  
  const [contact, setContact] = useState({
    _id:'',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Track if in editing mode

  const handleAddContact = async (newContact) => {
    if (isEditing) {
      setContacts(contacts.map((c) => (c.email === newContact.email ? newContact : c)));
      setIsEditing(false);
      try {
        const response = await axios.put(`http://localhost:5000/api/contacts/${newContact._id}`, newContact);
        console.log('Updated contact:', response.data);
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/api/contacts/`, newContact);
        console.log('Updated contact:', response.data);
      } catch (error) {
        console.error('Error updating contact:', error);
      }    
      setContacts([...contacts, newContact]);
    }
  };

  const handleEditContact =  (contactToEdit) => {
    setContact(contactToEdit);
    setIsEditing(true); // Set editing mode to true
  };

  const handleDeleteContact = async (contactToDelete) => {
    setContacts(contacts.filter((contact) => contact.email !== contactToDelete.email));
    try {
      const response = await axios.delete(`http://localhost:5000/api/contacts/${contactToDelete._id}`);
      console.log('Updated contact:', response.data);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div>
      <ContactForm 
        onSubmit={handleAddContact} 
        contact={contact} 
        setContact={setContact} 
        isEditing={isEditing} // Pass isEditing as a prop
      />
      <ContactsTable 
        contacts={contacts} 
        onEdit={handleEditContact} 
        onDelete={handleDeleteContact} 
      />
    </div>
  );
}

export default ContactManagement;
