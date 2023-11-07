import { Roomie } from "../models/roomie";
import axios from "axios";
import {createRoomieDTO} from "../DTOs/createRoomieDTO.ts";



export const fetchRoomie = async (id: string | undefined): Promise<Roomie> => {
    try {
        const response = await axios.get(`http://localhost:5016/Roomie/${id}`);
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

export async function createRoomie(data: createRoomieDTO) {
    try {
        const response = await axios.post(`http://localhost:5016/Roomie`, data);
        return response.data;
    }

    catch (error) {
        console.error('Error creating roomie:', error);
        throw error;
    }
}

export async function updateRoomieData(data: Roomie) {
    try {
        if (data.attributes == null) data.attributes = [];
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
