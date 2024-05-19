import React, { useEffect, useState } from 'react';
import { getAllTrainingCenters, deleteTrainingCenter, updateTrainingCenter } from '../services/api';
import CustomSnackbar from './Snackbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditCenterPopup from './EditCenterPopup'; // Import the EditCenterPopup component

const TrainingCentersList = () => {
    const [centers, setCenters] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'error',
        message: ''
    });
    const [openEditPopup, setOpenEditPopup] = useState(false); // State to control the visibility of the edit popup
    const [selectedCenter, setSelectedCenter] = useState(null); // State to store the selected center data

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await getAllTrainingCenters();
                setCenters(response.data);
            } catch (error) {
                setSnackbar({ open: true, severity: 'error', message: 'Error fetching Training Centers: ' + error.message });
            }
        };

        fetchCenters();
    }, []);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDelete = async (id) => {
        try {
            await deleteTrainingCenter(id);
            setCenters(centers.filter(center => center._id !== id));
            setSnackbar({ open: true, severity: 'success', message: 'Training Center deleted successfully' });
        } catch (error) {
            setSnackbar({ open: true, severity: 'error', message: 'Error deleting Training Center: ' + error.message });
        }
    };

    const handleEdit = (center) => {
        setSelectedCenter(center); // Set the selected center
        setOpenEditPopup(true); // Open the edit popup
    };

    const handleCloseEditPopup = () => {
        setOpenEditPopup(false); // Close the edit popup
        setSelectedCenter(null); // Clear the selected center
    };

    const handleUpdate = async (updatedCenterData) => {
        if (typeof updatedCenterData.coursesOffered === 'string') {
            updatedCenterData.coursesOffered = updatedCenterData.coursesOffered.split(',').map(course => course.trim());
        }
        const validationError = validateForm(updatedCenterData);
        if (validationError) {
            setSnackbar({ open: true, severity: 'error', message: validationError });
            return; 
        }
        try {
            await updateTrainingCenter(selectedCenter._id, updatedCenterData); // Update the center data
            setSnackbar({ open: true, severity: 'success', message: 'Training Center updated successfully' });
            handleCloseEditPopup(); // Close the edit popup after successful update   
            window.location.reload(); 
        } catch (error) {
            setSnackbar({ open: true, severity: 'error', message: 'Error updating Training Center: ' + error.message });
        }
    };
    const validateForm = (formData) => {
        const { centerName, centerCode, address, studentCapacity, contactPhone, contactEmail } = formData;
    
        if (!centerName || !centerCode || !address.detailedAddress || !address.city || !address.state || !address.pincode || !studentCapacity || !contactPhone || !contactEmail) {
            return 'All fields are required.';
        }
    
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
    

    return (
        <Box sx={{ maxWidth: 1500, mx: 'auto', mt: 16, mb: 5 }}>
            <Typography variant="h4" gutterBottom>
                Training Centers
            </Typography>
            <Grid container spacing={2}>
            {centers.length === 0 ? (
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', mt: 5 }}>
                            <Typography variant="h6">No training centers found.</Typography>
                        </Box>
                    </Grid>
                ) : (
                centers.map((center) => (
                    <Grid item key={center._id} xs={15} sm={6} md={4} mt={5}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backdropFilter: 'blur(8px)',
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: '12px',
                                boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                                WebkitBackdropFilter: 'blur( 4px )',
                                border: '1px solid rgba( 255, 255, 255, 0.18 )',
                            }}
                        >
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {center.centerName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Code: {center.centerCode}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                      <strong>Address*</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom ml={4}>
                                    ■ Detailed Address: {center.address.detailedAddress}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom  ml={4}>
                                    ■ City: {center.address.city}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom  ml={4}>
                                    ■ State: {center.address.state}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom  ml={4}>
                                    ■ Pincode: {center.address.pincode}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Capacity: {center.studentCapacity}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Courses: {center.coursesOffered.join(', ')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Email: {center.contactEmail}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Phone: {center.contactPhone}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                                <IconButton onClick={() => handleDelete(center._id)} color="error">
                                    <Delete />
                                </IconButton>
                                <IconButton onClick={() => handleEdit(center)} color="primary">
                                    <Edit />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))
            )}
            </Grid>
            <CustomSnackbar open={snackbar.open} handleClose={handleCloseSnackbar} severity={snackbar.severity} message={snackbar.message} />

            {/* Edit Popup */}
            {openEditPopup && (
                <EditCenterPopup centerData={selectedCenter} onSubmit={handleUpdate} onClose={handleCloseEditPopup} />
            )}
        </Box>
    );
};

export default TrainingCentersList;
