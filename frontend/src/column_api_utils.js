import axios from "axios";

export const fetchColumns = async () => {
    const res = await axios.get("/api/columns");
    return res.data;
}

export const updateColumn = async (columnData) => {
    const res = await axios.patch(`/api/columns/${columnData._id}`, columnData);
    return res.data;
}