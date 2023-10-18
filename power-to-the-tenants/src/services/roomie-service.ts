import { Roomie } from "../models/roomie";
import axios from "axios";


// async means? 
export const fetchRoomie = async (id: string): Promise<Roomie> => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5016/Roomie/${id}`, //knock at this door
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching roomie:', error);
        throw error;
    }
}
