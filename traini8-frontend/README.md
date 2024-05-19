# Traini8 Frontend

This is the frontend for the Traini8 project, which provides a user interface for managing government-funded training centers. It is built using React.

## Features

- Create a new training center
- View a list of all training centers
- Update and delete training centers
- Form validation with real-time error handling using Snackbars

## Technologies Used

- React
- Axios
- Material-UI

## Prerequisites

- Node.js

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd traini8-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the React application:
    ```bash
    npm start
    ```

   The application will run on `http://localhost:3000`.

### Components

#### CreateCenterForm

A form to create a new training center with fields for center name, code, address, student capacity, courses offered, contact email, and contact phone. The form includes the following validations:

- **Center Name**: Required, less than 40 characters
- **Center Code**: Required, exactly 12 alphanumeric characters
- **Detailed Address**: Required
- **City**: Required
- **State**: Required
- **Pincode**: Required, only numeric values allowed
- **Student Capacity**: Required, only numeric values allowed
- **Courses Offered**: Optional, list of text
- **Contact Email**: Optional, must be a valid email format if present
- **Contact Phone**: Required, must be numeric and not exceed 10 digits

Real-time validation errors are displayed using Material-UI Snackbars.

#### TrainingCentersList

Displays a list of all training centers with their details and options to update or delete a center.

### Services

#### api.js

Contains functions to make API calls to the backend:
- `createTrainingCenter(centerData)`
- `getAllTrainingCenters()`
- `updateTrainingCenter(id, centerData)`
- `deleteTrainingCenter(id)`

### License

This project is licensed under the MIT License.
