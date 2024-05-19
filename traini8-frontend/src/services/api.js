import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trainingCenters';

export const createTrainingCenter = async (centerData) => {
    return await axios.post(API_URL, centerData);
};

export const getAllTrainingCenters = async () => {
    return await axios.get(API_URL);
};

export const updateTrainingCenter = async (centerId, updatedCenterData) => {
    const url = `${API_URL}/${centerId}`;
    return await axios.put(url, updatedCenterData);
};

export const deleteTrainingCenter = async (centerId) => {
    const url = `${API_URL}/${centerId}`;
    return await axios.delete(url);
};
