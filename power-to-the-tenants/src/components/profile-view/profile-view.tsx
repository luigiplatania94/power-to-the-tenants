import {useEffect, useState} from 'react';
import { fetchRoomie } from '../../services/roomie-service';
import './profile-view.css';
import {Button, Card, Chip, Grid, useMediaQuery} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {useParams} from "react-router-dom";

export function ProfileView() {

    const { id } = useParams();
    
    const [roomie, setRoomie ] = useState<Roomie>();
    const [isEditing, setIsEditing] = useState(false); // Track if editing is active

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    
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
            <Grid container spacing={4}>
                {/* First Row */}
                <Grid item lg={12} xs={12}>
                    <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" onClick={handleEditClick}>
                        {isEditing ? 'Stop' : 'Edit'}
                    </Button>
                    <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="error">Delete</Button>
                </Grid>
                
                {/* Second Row */}
                <Grid item lg={4} xs={12 }>
                    <div className={"image-container"}>
                        <img className={"center-image"} src={roomie && roomie.profileImage} alt="" />
                        {isEditing && (
                            <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className="edit-button-image button-image animation">
                                Update
                            </Button>
                        )}
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <h2>Bio</h2>
                        <Card variant="outlined">
                            <p>{roomie && roomie.description}</p>
                        </Card>
                        {isEditing && (
                            <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className ={"button-image animation"}>Submit</Button>
                        )}
                </Grid>

                {/* Third Row */}
                <Grid item lg={12} xs={12}>
                    <h2>Attributes</h2>
                    <Card variant="outlined">
                        <div>
                            {roomie && roomie.attributes.map((attribute, index) => (
                                <Chip key = {index} label = {attribute}></Chip>
                            ))}
                        </div>
                    </Card>
                    {isEditing && (
                    <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className ={"button-image animation"}>Add</Button>
                        )}
                </Grid>
            </Grid>
    )
}