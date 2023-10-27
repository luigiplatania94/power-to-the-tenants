import {useEffect, useState} from 'react';
import {fetchRoomie, updateRoomieData} from '../../services/roomie-service';
import './profile-view.css';
import {Button, Chip, Grid, TextField, useMediaQuery} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

export function ProfileView() {

    const { id } = useParams();
    
    const [roomie, setRoomie ] = useState<Roomie>();
    const [isEditing, setIsEditing] = useState(false); // Track if editing is active

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const { register, 
            handleSubmit,
            formState: { }
    } = useForm();

    
    
    useEffect(() => {
        fetchRoomie(id).then(response => {
            // Assuming the API returns an object with a 'newValue' property
            setRoomie(response);
        })
            .catch(error => {
                console.error("Error fetching counter value:", error);
            });
    }, []);


    function handleDeleteAttribute(index : number) {
        if (roomie) {
            const updatedRoomie: Roomie = {
                ...roomie,
            };
            updatedRoomie.attributes.splice(index, 1);
            updateRoomieData(updatedRoomie);
            setRoomie(updatedRoomie);
        }
    }
    
    return (
            <Grid container spacing={4}>
                {/* Edit and Delete Buttons */}
                <Grid item lg={12} xs={12}>
                        <Button className={"edit-and-delete"} size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" onClick={handleEditClick}>
                            {isEditing ? 'Stop' : 'Edit'}
                        </Button>
                        <Button className={"edit-and-delete"} size={isSmallScreen ? "small" : "large"} variant="contained" color="error">Delete</Button>
                </Grid>
                
                {/* Profile Image */}
                <Grid item lg={4} xs={12 }>
                    <div className={"image-container"}>
                        <img className={"center-image"} src={roomie && roomie.profileImage} alt="" />
                        {isEditing && (
                            <form onSubmit={handleSubmit((data ) => {
                                if (roomie) {
                                    const updatedRoomie: Roomie = {
                                        ...roomie,
                                        profileImage: data.imageLink,
                                    };
                                    updateRoomieData(updatedRoomie);
                                    setRoomie(updatedRoomie);
                                }
                            })}>
                                <TextField
                                    size={isSmallScreen ? "small" : "medium"}
                                    variant="outlined"
                                    label = "Image link"
                                    margin ="normal"
                                    className={"button-update animation"}
                                    {...register("imageLink")}
                                />
                                <Button type="submit" size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className="button-update animation">
                                    Update
                                </Button>
                            </form>
                        )}
                    </div>
                </Grid>
                
                {/* Description */}
                <Grid item lg={6} xs={12}>
                    <p className={"description"}>{roomie && roomie.description}</p>
                    {isEditing && (
                        <Button size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className ={"button-update animation"}>Submit</Button>
                    )}
                </Grid>
                
                {/* Attributes */}
                <Grid item lg={12} xs={12}>
                        <div>
                            {roomie && roomie.attributes.map((attribute, index) => (
                                <Chip className={"attribute"}  key = {index} label = {attribute} onDelete={isEditing ? () => handleDeleteAttribute(index) : undefined} size={isSmallScreen ? "small" : "medium"}></Chip>
                            ))}
                        </div>
                        
                        {isEditing && (
                        <form onSubmit={handleSubmit((data ) => {
                            if (roomie) {
                                const updatedRoomie: Roomie = {
                                    ...roomie, 
                                    attributes: [...roomie.attributes, data.attributeName],
                                };
                                updateRoomieData(updatedRoomie);
                                setRoomie(updatedRoomie);
                            }
                        })}>
                            <div>
                                <TextField
                                    size={isSmallScreen ? "small" : "medium"}
                                    label="Attribute Name"
                                    margin ="normal"
                                    variant="outlined"
                                    className={"input-attribute button-update animation"}
                                    {...register("attributeName")}
                                />
                            </div>
                            <div>
                                <Button type="submit" size={isSmallScreen ? "small" : "large"} variant="contained" color="secondary" className ={"button-attribute button-update animation"}>Add</Button>
                            </div>
                        </form>
                        )}

                </Grid>
            </Grid>
    )
}