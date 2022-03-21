import axios from 'axios';

export const createTask = async (taskData) => {
    const res = await axios.post('/api/tasks', taskData);
    return res.data;
};

export const fetchTasks = async (category) => {
    const res = await axios.get(`/api/tasks/${category}`);
    return res.data;
};
