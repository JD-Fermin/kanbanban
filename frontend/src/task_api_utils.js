import axios from 'axios';

export const createTask = async (taskData) => {
    const res = await axios.post('/api/tasks', taskData);
    return res.data;
};

export const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    return res.data;
};

export const updateTask = async (taskData) => {
    const res = await axios.patch(`/api/tasks/${taskData._id}`, taskData);
    return res.data;
}
