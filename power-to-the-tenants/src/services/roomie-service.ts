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

export async function updateRoomieData(data: Roomie) {
    try {
        const response = await axios.put(`http://localhost:5016/Roomie/${data.id}`, data);
        return response.data;
    }

    catch (error) {
        console.error('Error updating roomie:', error);
        throw error;
    }
}

export async function deleteRoomie(id: string | undefined) {
    try {
        const response = await axios.delete(`http://localhost:5016/Roomie/${id}`);
        return response.data;
    }

    catch (error) {
        console.error('Error deleting roomie:', error);
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
