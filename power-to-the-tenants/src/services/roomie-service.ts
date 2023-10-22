import { Roomie } from "../models/roomie";
import axios from "axios";



export const fetchRoomie = async (id: string | undefined): Promise<Roomie> => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5016/Roomie/${id}`,
        });
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching roomie:', error);
        throw error;
    }
}


export const fetchAllRoomies = async (): Promise<Roomie[]> => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5016/Roomie/all`,
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching roomies:', error);
        throw error;
    }
}
