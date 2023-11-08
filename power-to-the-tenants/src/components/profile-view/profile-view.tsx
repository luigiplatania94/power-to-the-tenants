import {SetStateAction, useEffect, useState} from 'react';
import {deleteRoomie, fetchRoomie, updateRoomieData} from '../../services/roomie-service';
import './profile-view.css';
import {
    Alert,
    AlertColor,
    Button,
    Chip,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Grid,
    Snackbar,
    TextField,
    useMediaQuery
} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {Link, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";

export function ProfileView() {

    const {id} = useParams();
    const [roomie, setRoomie] = useState<Roomie>();
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    
    const { register, 
            handleSubmit,
            control,
            formState: { }
    } = useForm();
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const openSnackbar = (message: SetStateAction<string>, severity: AlertColor) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setIsSnackbarOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };
    
    // fetch roomie data when the page loads for the first time
    useEffect(() => {
        fetchRoomie(id).then(response => {
            // Assuming the API returns an object with a 'newValue' property
            setRoomie(response);
        })
            .catch(error => {
                console.error("Error fetching roomie:", error);
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
                                      openSnackbar("Profile image updated succesfully", "success");
                                    })
                                    .catch(error => {
                                        console.error("Error updating roomie's profile link:", error);
                                        openSnackbar("Profile image failed to update", "error");
                                    });
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
                                        openSnackbar("Description updated succesfully", "success");
                                    })
                                    .catch((error) => {
                                        console.error("Error updating roomie's description:", error);
                                        openSnackbar("Description failed to update", "error");
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
                                    openSnackbar("Attributes updated succesfully", "success");
                                })
                                .catch(error => {
                                    console.error("Error adding new roomie's attribute name:", error);
                                    openSnackbar("Attributes failed to update", "error");
                                });
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

                {/* Edit, Delete and Back Buttons */}
                <Grid item lg={12} xs={12}>
                        <Button style={{ marginRight: '10px' }} size={isSmallScreen ? "small" : "large"} variant="contained" color="success" onClick={handleEditClick}>
                            {isEditing ? 'Stop' : 'Edit'}
                        </Button>
                        <Button style={{ marginRight: '10px' }} size={isSmallScreen ? "small" : "large"} variant="contained" color="error" onClick={handleDeleteClick}>
                            Delete
                        </Button>
                        <Link to="/">
                            <Button size={isSmallScreen ? "small" : "large"} variant="contained">
                                Back
                            </Button>
                        </Link>
                </Grid>
                
                {/*Snackbar component*/}
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={4000} 
                    onClose={() => setIsSnackbarOpen(false)}
                >
                    <Alert
                        elevation={6}
                        variant="filled"
                        onClose={() => setIsSnackbarOpen(false)}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>

                {/*Dialog for deleting profile*/}
                <Dialog open = {isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
                    <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <p>Are you sure you want to delete your profile?</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Link to="/">
                            <Button
                                onClick={() => {
                                    setIsDeleteDialogOpen(false);
                                    deleteRoomie(id).then(() => {
                                    });
                                }}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
                
            </Grid>
    )
}
