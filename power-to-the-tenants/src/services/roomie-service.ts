import { Roomie } from "../models/roomie";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {createRoomieDTO} from "../DTOs/createRoomieDTO.ts";


const instance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5016',
});

export const fetchRoomie = async (id: string | undefined): Promise<Roomie> => {
    try {
        const response: AxiosResponse<any,any> = await instance.get(`/Roomie/${id}`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching roomie:', error);
        throw error;
    }
}

export const fetchAllRoomies = async (): Promise<Roomie[]> => {
    try {
        const response: AxiosResponse<any,any> = await instance.get(`/Roomie/all`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching roomies:', error);
        throw error;
    }
}

export async function createRoomie(data: createRoomieDTO) {
    try {
        const response: AxiosResponse<any,any> = await instance.post(`/Roomie`, data);
        return response.data;
    }

    catch (error) {
        console.error('Error creating roomie:', error);
        throw error;
    }
}

export async function updateRoomieData(data: Roomie) {
    try {
        // TODO attributes do not work. This is a workaround
        if (data.attributes == null) data.attributes = [];
        
        const response: AxiosResponse<any,any> = await instance.put(`/Roomie/${data.id}`, data);
        return response.data;
    }

    catch (error) {
        console.error('Error updating roomie:', error);
        throw error;
    }
}

export async function deleteRoomie(id: string | undefined) {
    try {
        const response: AxiosResponse<any,any> = await instance.delete(`/Roomie/${id}`);
        return response.data;
    }

    catch (error) {
        console.error('Error deleting roomie:', error);
        throw error;
    }
}
