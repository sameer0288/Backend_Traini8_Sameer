import React, { useState } from 'react';
import { createTrainingCenter } from '../services/api';
import CustomSnackbar from './Snackbar';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const CreateCenterForm = () => {
    const [formData, setFormData] = useState({
        centerName: '',
        centerCode: '',
        detailedAddress: '',
        city: '',
        state: '',
        pincode: '',
        studentCapacity: '',
        coursesOffered: '',
        contactEmail: '',
        contactPhone: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { centerName, centerCode, contactEmail, contactPhone, studentCapacity } = formData;
        if (centerName.length > 40) {
            return 'Center Name should be less than 40 characters.';
        }
        if (!/^[a-zA-Z0-9]{12}$/.test(centerCode)) {
            return 'Center Code should be exactly 12 alphanumeric characters.';
        }
        if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
            return 'Invalid email format.';
        }
        if (!/^\d{10}$/.test(contactPhone)) {
            return 'Contact Phone should be exactly 10 digits.';
        }
        if (studentCapacity && isNaN(studentCapacity)) {
            return 'Student Capacity should be a number.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setSnackbar({ open: true, severity: 'error', message: validationError });
            return;
        }

        const { centerName, centerCode, detailedAddress, city, state, pincode, studentCapacity, coursesOffered, contactEmail, contactPhone } = formData;

        const address = {
            detailedAddress,
            city,
            state,
            pincode
        };

        const newCenter = {
            centerName,
            centerCode,
            address,
            studentCapacity,
            coursesOffered: coursesOffered.split(',').map(course => course.trim()),
            contactEmail,
            contactPhone,
            createdOn: Math.floor(Date.now() / 1000)
        };

        try {
            await createTrainingCenter(newCenter);
            setSnackbar({ open: true, severity: 'success', message: 'Training Center created successfully' });
            setFormData({
                centerName: '',
                centerCode: '',
                detailedAddress: '',
                city: '',
                state: '',
                pincode: '',
                studentCapacity: '',
                coursesOffered: '',
                contactEmail: '',
                contactPhone: ''
            });
           
        window.location.reload();
        } catch (error) {
            let errorMessage = 'Error creating Training Center';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            setSnackbar({ open: true, severity: 'error', message: errorMessage });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create Training Center
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Center Name"
                            name="centerName"
                            value={formData.centerName}
                            onChange={handleChange}
                            inputProps={{ maxLength: 40 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Center Code"
                            name="centerCode"
                            value={formData.centerCode}
                            onChange={handleChange}
                            inputProps={{ maxLength: 12 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Detailed Address"
                            name="detailedAddress"
                            value={formData.detailedAddress}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Student Capacity(Number)"
                            name="studentCapacity"
                            value={formData.studentCapacity}
                            onChange={handleChange}
                            type="number"
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Courses Offered (comma separated)"
                            name="coursesOffered"
                            value={formData.coursesOffered}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Contact Email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Contact Phone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            inputProps={{ maxLength: 10 }}
                            required
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                    Create Training Center
                </Button>
            </form>
            <CustomSnackbar
                open={snackbar.open}
                handleClose={handleCloseSnackbar}
                severity={snackbar.severity}
                message={snackbar.message}
            />
        </Box>
    );
};

export default CreateCenterForm;
