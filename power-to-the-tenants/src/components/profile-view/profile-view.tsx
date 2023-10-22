import {useEffect, useState} from 'react';
import { fetchRoomie } from '../../services/roomie-service';
import './profile-view.css';
import { Chip } from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {useParams} from "react-router-dom";

export function ProfileView() {
    // const id = "dda26589-e479-4864-b19e-70b7de9f750c";
    const { id } = useParams();
    
    const [roomie, setRoomie ] = useState<Roomie>();

    // The useEffect hook is used to execute side effects when the component renders. 
    // In this case, it fetches roomie data from the server and sets it in the roomie state.
    // The effect is triggered when the component initially mounts ([] is an empty dependency array), 
    // meaning it fetches data once when the component is first displayed.
    useEffect(() => {
        fetchRoomie(id).then(response => {
            // Assuming the API returns an object with a 'newValue' property
            setRoomie(response);
        })
            .catch(error => {
                console.error("Error fetching counter value:", error);
            });
    }, []);
    
    
    return (
        <div className="flex-container">
            <img className='pictureBox' src={roomie && roomie.profileImage} alt="" />
            <div className="box Primary-Teal">
            <p>
                {roomie && roomie.description}
            </p>
            </div>
            <div className="box Secondary-Orange">
                {roomie && roomie.attributes.map((attribute, index) => (
                    <Chip key = {index} label = {attribute}></Chip>        
                ))}
            </div>
        </div>
    )
}