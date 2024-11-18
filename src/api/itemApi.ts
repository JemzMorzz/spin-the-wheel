import axios from "axios";

const API_URL = "http://localhost:5000/api/items";
interface Item{
    name: string,
    description: string
}
export const getItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getItemsById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}
export const createItem = async (item: Item) => {
    console.log(item);
    const response = await axios.post(API_URL, item);
    return response.data;
};
