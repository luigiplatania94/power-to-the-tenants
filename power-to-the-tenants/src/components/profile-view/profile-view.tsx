import {useEffect, useState} from 'react';
import {deleteRoomie, fetchRoomie, updateRoomieData} from '../../services/roomie-service';
import './profile-view.css';
import {Button, Chip, Grid, TextField, useMediaQuery} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";

export function ProfileView() {

    const { id } = useParams();
    const [roomie, setRoomie ] = useState<Roomie>();
    const [isEditing, setIsEditing] = useState(false); 

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    
    const { register, 
            handleSubmit,
            control,
            formState: { }
    } = useForm();
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = () => {
        deleteRoomie(id).then(() => {
            // TODO: prompt the user a dialog to confirm whether they really want to delete the profile.
            //       redirect user to homepage
        });
    };
    
    // fetch roomie data when the page loads for the first time
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
            if (updatedRoomie.attributes != null)
            {
                updatedRoomie.attributes.splice(index, 1);
                updateRoomieData(updatedRoomie).then(() => {
                    setRoomie(updatedRoomie);
                })
            }
        }
    }
    
    
    return (
            <Grid container rowSpacing={{ xs: 2, sm: 3, md: 3, lg: 7 }}>
                
                {/* Profile Image */}
                <Grid item lg={12} xs={12 }>
                        <img className={"profile-image"} src={roomie && roomie.profileImage} alt="" />
                        {isEditing && (
                            <form onSubmit={handleSubmit((data ) => {
                                if (roomie) {
                                    const updatedRoomie: Roomie = {
                                        ...roomie,
                                        profileImage: data.imageLink,
                                    };
                                    updateRoomieData(updatedRoomie).then(() => {
                                      setRoomie(updatedRoomie);  
                                    })
                                }
                            })}>
                                <div>
                                    <TextField
                                        size={isSmallScreen ? "small" : "medium"}
                                        variant="outlined"
                                        label = "Image link"
                                        margin ="normal"
                                        {...register("imageLink")}
                                    />
                                </div>
                                <div>
                                    <Button type="submit" size={isSmallScreen ? "small" : "large"} variant="contained" color="success" className="button-update animation">
                                        Update
                                    </Button>
                                </div>
                            </form>
                        )}
                </Grid>
                
                {/* Description */}
                <Grid item lg={12} xs={12}>
                    {isEditing ? (
                        <form onSubmit={handleSubmit((data ) => {
                            if (roomie) {
                                const updatedRoomie: Roomie = {
                                    ...roomie,
                                    description: data.editedDescription,
                                };
                                updateRoomieData(updatedRoomie)
                                    .then(() => {
                                        setRoomie(updatedRoomie);
                                    })
                                    .catch((error) => {
                                        console.error('Error updating description:', error);
                                    });
                            }
                        })}>
                            <div>
                                {/* Use Controller to integrate RHF with the description field */}
                                <Controller
                                    name="editedDescription"
                                    control={control}
                                    defaultValue={roomie?.description || ''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            multiline
                                            fullWidth
                                            id="standard-multiline-static"
                                            label="Multiline"
                                            minRows={3}
                                            maxRows={10}
                                            size={isSmallScreen ? 'small' : 'medium'}
                                            variant="outlined"
                                            margin="normal"
                                            className={'input-description'}
                                        />
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                size={isSmallScreen ? 'small' : 'large'}
                                variant="contained"
                                color="success"
                                className={'button-update animation'}
                            >
                                Save
                            </Button>
                        </form>
                    ) : (
                        <p className={'description'}>{roomie?.description}</p>
                    )}
                </Grid>
                
                {/* Attributes */}
                <Grid item lg={12} xs={12}>
                        <div>
                            {roomie?.attributes && roomie.attributes.map((attribute, index) => (
                                <Chip className={"attribute"}  key = {index} label = {attribute.name} onDelete={isEditing ? () => handleDeleteAttribute(index) : undefined} size={isSmallScreen ? "small" : "medium"}></Chip>
                            ))}
                        </div>
                        
                        {isEditing && (
                        <form onSubmit={handleSubmit((data ) => {
                            if (roomie && roomie.attributes != null) {
                                const updatedRoomie: Roomie = {
                                    ...roomie, 
                                    attributes: [...roomie.attributes, data.attributeName],
                                };
                                updateRoomieData(updatedRoomie).then(() => {
                                    setRoomie(updatedRoomie);
                                })
                            }
                        })}>
                            <div>
                                <TextField
                                    size={isSmallScreen ? "small" : "medium"}
                                    label="Attribute Name"
                                    margin ="normal"
                                    variant="outlined"
                                    className={"input-attribute"}
                                    {...register("attributeName")}
                                />
                            </div>
                            <div>
                                <Button type="submit" size={isSmallScreen ? "small" : "large"} variant="contained" color="success" className ={"button-attribute button-update animation"}>Add</Button>
                            </div>
                        </form>
                        )}

                </Grid>

                {/* Edit and Delete Buttons */}
                <Grid item lg={12} xs={12}>
                        <Button className={"edit-and-delete"} size={isSmallScreen ? "small" : "large"} variant="contained" color="success" onClick={handleEditClick}>
                            {isEditing ? 'Stop' : 'Edit'}
                        </Button>
                        <Button className={"edit-and-delete"} size={isSmallScreen ? "small" : "large"} variant="contained" color="error" onClick={handleDeleteClick}>Delete</Button>
                </Grid>
            </Grid>
    )
}
