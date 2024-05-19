import React, { useState } from 'react';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const EditCenterPopup = ({ centerData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(centerData);
  
    
    const handleChange = (e) => {
        if (e.target.name.startsWith('address.')) {
            // If the field belongs to the address object
            const addressField = e.target.name.split('.')[1]; // Get the specific address field name
            setFormData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: e.target.value // Update the specific address field
                }
            }));
        } else {
            // If the field is not within the address object
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
     

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit Training Center</DialogTitle>
            <DialogContent>
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
                            name="address.detailedAddress"
                            value={formData.address.detailedAddress}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="City"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="State"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Pincode"
                            name="address.pincode"
                            value={formData.address.pincode}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCenterPopup;
