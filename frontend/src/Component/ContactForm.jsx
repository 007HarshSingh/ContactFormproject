import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import './ContactManagement.css';

function ContactForm({ onSubmit, contact, setContact, isEditing }) { // Receive isEditing as a prop
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contact);
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
          <h1> Contact Form</h1> 
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" type="email" value={contact.email} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone Number" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Company" name="company" value={contact.company} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Job Title" name="jobTitle" value={contact.jobTitle} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEditing ? 'Update Contact' : 'Add Contact'} {/* Use isEditing to set button text */}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ContactForm;
