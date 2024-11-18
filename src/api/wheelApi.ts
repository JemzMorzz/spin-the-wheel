import axios from "axios";

const API_URL = "http://localhost:5000/api/wheel";
interface Wheel {
    id: string,
    name: string
}
export const getWheel = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createWheel = async (wheel: Wheel) => {
    const response = await axios.post(API_URL, wheel);
    return response.data;
}