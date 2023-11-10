import { Roomie } from "../models/roomie";
import axios, {AxiosInstance} from "axios";
import {createRoomieDTO} from "../DTOs/createRoomieDTO.ts";


const instance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5016',
});

export const fetchRoomie = async (id: string | undefined): Promise<Roomie> => {
    try {
        const { data } = await instance.get(`/Roomie/${id}`);
        return data;
    } 
    catch (error) {
        console.error('Error fetching roomie:', error);
        throw error;
    }
}

export const fetchAllRoomies = async (): Promise<Roomie[]> => {
    try {
        const { data } = await instance.get(`/Roomie/all`);
        return data;
    }
    catch (error) {
        console.error('Error fetching roomies:', error);
        throw error;
    }
}

export async function createRoomie(roomieDTO: createRoomieDTO) {
    try {
        const { data } = await instance.post(`/Roomie`, roomieDTO);
        return data;
    }

    catch (error) {
        console.error('Error creating roomie:', error);
        throw error;
    }
}

export async function updateRoomie(roomie: Roomie) {
    try {
        // TODO attributes do not work. This is a workaround
        if (roomie.attributes == null) roomie.attributes = [];

        const { data }  = await instance.put(`/Roomie/${roomie.id}`, roomie);
        return data;
    }

    catch (error) {
        console.error('Error updating roomie:', error);
        throw error;
    }
}

export async function deleteRoomie(id: string | undefined) {
    try {
        const { data }  = await instance.delete(`/Roomie/${id}`);
        return data;
    }

    catch (error) {
        console.error('Error deleting roomie:', error);
        throw error;
    }
}
