import React from 'react';
import CreateCenterForm from './components/CreateCenterForm';
import TrainingCentersList from './components/TrainingCentersList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Traini8 Training Centers Registry
            </Typography>
            <CreateCenterForm />
            <TrainingCentersList />
        </Container>
    );
}

export default App;
