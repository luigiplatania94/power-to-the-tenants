import { Roomie } from "../models/roomie";
import {Trait} from "../models/trait.ts";
import {createRoomieDTO} from "../DTOs/createRoomieDTO.ts";
import axios, {AxiosInstance} from "axios";


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

export const fetchAllTraits = async (): Promise<Trait[]> => {
    try {
        const { data } = await instance.get(`/Trait/all`);
        return data;
    }
    catch (error) {
        console.error('Error fetching roomies:', error);
        throw error;
    }
}

export async function updateRoomieTraits(traits : string[], id: string | undefined) {
    try {
        const { data }  = await instance.put(`/Trait/${id}`, traits);
        return data;
    }

    catch (error) {
        console.error('Error updating roomie traits:', error);
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
        if (roomie.traits == null) roomie.traits = [];

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
