import {useEffect, useState} from 'react';
import { fetchRoomie } from '../../services/roomie-service';
import './profile-view.css';
import {Button, Chip, Grid} from '@mui/material';
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
            <Grid container spacing={2}>
                {/* First Row (r1) */}
                <Grid item xs={4}>
                    <img className={"circle-container"} src={roomie && roomie.profileImage} alt="" />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary">Edit</Button>
                            <Button variant="contained" color="error">Delete</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p>{roomie && roomie.description}</p>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Row (r2) */}
                <Grid item xs={10}>
                    <div>
                        {roomie && roomie.attributes.map((attribute, index) => (
                            <Chip key = {index} label = {attribute}></Chip>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="success">Add new attribute</Button>
                </Grid>
            </Grid>
    )
}