import {SetStateAction, useEffect, useState} from 'react';
import {fetchAllTraits, fetchRoomie, updateRoomie, updateRoomieTraits} from '../../services/roomie-service';
import './profile-view.css';
import {
    Alert,
    AlertColor, Box,
    Button,
    Chip, FormControl,
    Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent,
    Snackbar,
    TextField,
    useMediaQuery
} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {Link, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import DeleteRoomieDialog from "../delete-roomie-dialog/delete-roomie-dialog.tsx";

export function ProfileView() {

    const {id} = useParams();
    const [roomie, setRoomie] = useState<Roomie>();
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
    const [allTraits, setAllTraits] = useState<string[]>([]);
    
    const { register,
            handleSubmit,
            control,
            formState: { }
    } = useForm();

    useEffect(() => {
        const fetchTraits = async () => {
            try {
                const traits = await fetchAllTraits();
                setAllTraits(traits.map((trait) => trait.name));
            } catch (error) {
                console.error('Error fetching traits:', error);
            }
        };

        fetchTraits();
    }, []);

    // fetch roomie data when the page loads for the first time
    useEffect(() => {
        fetchRoomie(id).then(response => {
            // Assuming the API returns an object with a 'newValue' property
            setRoomie(response);
            setSelectedTraits(response?.traits?.map((trait) => trait.name) || []);
        })
            .catch(error => {
                console.error("Error fetching roomie:", error);
            });
    }, []);
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const openSnackbar = (message: SetStateAction<string>, severity: AlertColor) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setIsSnackbarOpen(true);
    };
    
    const handleConfirmDelete = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleChange = (event: SelectChangeEvent<typeof selectedTraits>) => {
        setSelectedTraits(event.target.value as string[]);
    };
    
    return (
            <Grid container rowSpacing={{ xs: 2, sm: 3, md: 3, lg: 7 }}>
                
                {/* Profile Image */}
                <Grid item lg={12} xs={12 }>
                        <img className={"profile-image"} src={roomie && roomie.profileImage} alt="" />
                        {isEditing && (
                            <form onSubmit={handleSubmit(async (data ) => {
                                if (roomie) {
                                    const updatedRoomieDTO = {
                                        profileImage: data.imageLink,
                                        description: roomie?.description || '',
                                    };

                                    updateRoomie(roomie.id, updatedRoomieDTO)
                                        .then((updatedRoomie) => {
                                            setRoomie(updatedRoomie);
                                            openSnackbar("Profile image updated successfully", "success");
                                        })
                                        .catch((error) => {
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
                        <form onSubmit={handleSubmit(async (data ) => {
                            if (roomie) {
                                const updatedRoomieDTO = {
                                    profileImage: roomie?.profileImage || '',
                                    description: data.editedDescription,
                                };

                                updateRoomie(roomie.id, updatedRoomieDTO)
                                    .then((updatedRoomie) => {
                                        setRoomie(updatedRoomie);
                                        openSnackbar("Description updated successfully", "success");
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
                                Update
                            </Button>
                        </form>
                    ) : (
                        <p className={'description'}>{roomie?.description}</p>
                    )}
                </Grid>
                
                {/* Traits */}
                <Grid item lg={12} xs={12}>
                    {!isEditing && (
                        <div>
                            {roomie?.traits && roomie.traits.map((attribute, index) => (
                                <Chip className={"attribute"}  key = {index} label = {attribute.name} size={isSmallScreen ? "small" : "medium"}></Chip>
                            ))}
                        </div>
                    )}

                    {isEditing && (
                        <div>
                        <form onSubmit={handleSubmit((data ) => {
                            // todo if you don't need the data maybe you don't need the form.
                            console.log(data);
                            updateRoomieTraits(selectedTraits, roomie?.id)                                    
                                .then((r) => {
                                setRoomie(r);
                                openSnackbar("Traits updated succesfully", "success");
                            })
                                .catch((error) => {
                                    console.error("Error updating roomie's traits:", error);
                                    openSnackbar("Traits failed to update", "error");
                                });
                        })}>
                        
                            <FormControl fullWidth variant="outlined" size={isSmallScreen ? 'small' : 'medium'}>
                                <InputLabel id="traits-label">Traits</InputLabel>
                                <Select
                                    defaultValue={roomie?.traits?.map((trait) => trait.name) || []}
                                    labelId="traits-label"
                                    id="traits-select"
                                    multiple
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Traits" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {allTraits.map((trait) => (
                                        <MenuItem key={trait} value={trait}>
                                            {trait}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                size={isSmallScreen ? 'small' : 'large'}
                                variant="contained"
                                color="success"
                                className={'button-attribute button-update animation'}
                            >
                                Update
                            </Button>
                        </form>
                        </div>
                    )}

                </Grid>

                {/* Edit, Delete and Back Buttons */}
                <Grid item lg={12} xs={12}>
                        <Button style={{ marginRight: '10px' }} size={isSmallScreen ? "small" : "large"} variant="contained" color="success" onClick={handleEditClick}>
                            {isEditing ? 'Stop' : 'Edit'}
                        </Button>
                        <Button style={{ marginRight: '10px' }} size={isSmallScreen ? "small" : "large"} variant="contained" color="error" onClick={() => setIsDeleteDialogOpen(true)}>
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
                <DeleteRoomieDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirmDelete={handleConfirmDelete}
                    deletingRoomieId={id}
                />
                
            </Grid>
    )
}
