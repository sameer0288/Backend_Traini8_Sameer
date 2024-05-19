# Traini8 Frontend

This is the frontend for the Traini8 project, which provides a user interface for managing government-funded training centers. It is built using React.

## Features

- Create a new training center
- View a list of all training centers

## Technologies Used

- React
- Axios

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

A form to create a new training center with fields for center name, code, address, student capacity, courses offered, contact email, and contact phone.

#### TrainingCentersList

Displays a list of all training centers with their details.

### Services

#### api.js

Contains functions to make API calls to the backend:
- `createTrainingCenter(centerData)`
- `getAllTrainingCenters()`

### License

This project is licensed under the MIT License.
