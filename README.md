# Traini8 Project

The Traini8 project is a MERN stack application for managing government-funded training centers. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend built with React.

## Features

- Create a new training center
- Retrieve a list of all training centers
- Input validation for required fields

## Project Structure

- `Backend_Traini8_Sameer`: Contains the backend code
- `traini8-frontend`: Contains the frontend code

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Follow the setup instructions in the respective `README.md` files for the backend and frontend.

### Running the Project

1. Start the backend server:
    ```bash
    npm start
    ```

2. Start the frontend application:
    ```bash
    cd traini8-frontend
    npm start
    ```




# Traini8 Backend

This is the backend for the Traini8 project, which provides APIs for managing government-funded training centers. It is built using Node.js, Express, and MongoDB.

## Features

- Create a new training center
- Retrieve a list of all training centers
- Update an existing training center
- Delete a training center
- Input validation for required fields

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Prerequisites

- Node.js
- MongoDB

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```env
    MONGO_URI=mongodb://localhost:27017/traini8
    ```

### Running the Server

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Start the Express server:
    ```bash
    npm start
    ```

   The server will run on `http://localhost:5000`.

### API Endpoints

#### Create a New Training Center

- **URL:** `/api/trainingCenters`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "centerName": "Center Name",
        "centerCode": "ABCDEFGHIJKL",
        "address": {
            "detailedAddress": "123 Main St",
            "city": "City",
            "state": "State",
            "pincode": "123456"
        },
        "studentCapacity": 100,
        "coursesOffered": ["Course1", "Course2"],
        "contactEmail": "email@example.com",
        "contactPhone": "1234567890"
    }
    ```

- **Success Response:**
    ```json
    {
        "_id": "60c72b1f9b1e8a1a6c8b4567",
        "centerName": "Center Name",
        "centerCode": "ABCDEFGHIJKL",
        "address": {
            "detailedAddress": "123 Main St",
            "city": "City",
            "state": "State",
            "pincode": "123456"
        },
        "studentCapacity": 100,
        "coursesOffered": ["Course1", "Course2"],
        "createdOn": "2023-05-19T10:00:00.000Z",
        "contactEmail": "email@example.com",
        "contactPhone": "1234567890"
    }
    ```

#### Retrieve All Training Centers

- **URL:** `/api/trainingCenters`
- **Method:** `GET`
- **Success Response:**
    ```json
    [
        {
            "_id": "60c72b1f9b1e8a1a6c8b4567",
            "centerName": "Center Name",
            "centerCode": "ABCDEFGHIJKL",
            "address": {
                "detailedAddress": "123 Main St",
                "city": "City",
                "state": "State",
                "pincode": "123456"
            },
            "studentCapacity": 100,
            "coursesOffered": ["Course1", "Course2"],
            "createdOn": "2023-05-19T10:00:00.000Z",
            "contactEmail": "email@example.com",
            "contactPhone": "1234567890"
        }
    ]
    ```

#### Retrieve a Single Training Center

- **URL:** `/api/trainingCenters/:id`
- **Method:** `GET`
- **Success Response:**
    ```json
    {
        "_id": "60c72b1f9b1e8a1a6c8b4567",
        "centerName": "Center Name",
        "centerCode": "ABCDEFGHIJKL",
        "address": {
            "detailedAddress": "123 Main St",
            "city": "City",
            "state": "State",
            "pincode": "123456"
        },
        "studentCapacity": 100,
        "coursesOffered": ["Course1", "Course2"],
        "createdOn": "2023-05-19T10:00:00.000Z",
        "contactEmail": "email@example.com",
        "contactPhone": "1234567890"
    }
    ```

#### Update an Existing Training Center

- **URL:** `/api/trainingCenters/:id`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
        "centerName": "Updated Center Name",
        "centerCode": "XYZ987654321",
        "address": {
            "detailedAddress": "456 Another St",
            "city": "New City",
            "state": "New State",
            "pincode": "654321"
        },
        "studentCapacity": 150,
        "coursesOffered": ["Course3", "Course4"],
        "contactEmail": "updated@example.com",
        "contactPhone": "0987654321"
    }
    ```

- **Success Response:**
    ```json
    {
        "_id": "60c72b1f9b1e8a1a6c8b4567",
        "centerName": "Updated Center Name",
        "centerCode": "XYZ987654321",
        "address": {
            "detailedAddress": "456 Another St",
            "city": "New City",
            "state": "New State",
            "pincode": "654321"
        },
        "studentCapacity": 150,
        "coursesOffered": ["Course3", "Course4"],
        "createdOn": "2023-05-19T10:00:00.000Z",
        "contactEmail": "updated@example.com",
        "contactPhone": "0987654321"
    }
    ```

#### Delete a Training Center

- **URL:** `/api/trainingCenters/:id`
- **Method:** `DELETE`
- **Success Response:**
    ```json
    {
        "message": "Training Center deleted successfully"
    }
    ```

### Error Handling

The backend includes comprehensive error handling to ensure that meaningful error messages are returned to the client in case of validation errors or other issues. Here are some example error responses:

- **Validation Error Response:**
    ```json
    {
        "error": "TrainingCenter validation failed: studentCapacity: Cast to Number failed for value \"dfdfd\" (type string) at path \"studentCapacity\", contactPhone: Path `contactPhone` is invalid (dsffdf)."
    }
    ```

### License

This project is licensed under the MIT License.
