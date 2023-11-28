import {SetStateAction, useEffect, useState} from 'react';
import {fetchAllTraits, fetchRoomie, updateRoomie, updateRoomieTraits} from '../../services/roomie-service';
import './profile-view.css';
import {
    Alert,
    AlertColor,
    Button,
    Chip,
    Grid,
    Snackbar,
    TextField,
    useMediaQuery
} from '@mui/material';
import {Roomie} from "../../models/roomie.ts";
import {Link, useParams} from "react-router-dom";
import DeleteRoomieDialog from "../delete-roomie-dialog/delete-roomie-dialog.tsx";
import SelectTraits from "../select-traits/select-traits.tsx";


const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 300;
const MIN_TRAITS_COUNT = 3;
const MAX_TRAITS_COUNT = 8;

export function ProfileView() {

    const {id} = useParams();
    const [roomie, setRoomie] = useState<Roomie>();
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [roomieTraits, setRoomieTraits] = useState<string[]>([]);
    // TODO is this redundant?
    const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
    const [allTraits, setAllTraits] = useState<string[]>([]);
    
    const isValidUrl = (url: string) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };
    
    // TODO shall this have traits?
    const [form, setForm] = useState({
        profileImage: '',
        description: '',
    });

    const [validation, setValidation] = useState({
        profileImage: true,
        description: true,
        traits: true,
    });

    const resetValidation = (field: string | undefined = undefined) => {
        setValidation((prevValidation) => {
            // If a specific field is provided, reset only that field; otherwise, reset all fields
            if (field) {
                return { ...prevValidation, [field]: true };
            }
            else {
                return {
                    profileImage: true,
                    description: true,
                    traits: true,
                };
            }
        });
    };
    
    const handleProfileImageChange = (e: { target: { value: any; }; }) => {
        setForm({
            ...form,
            profileImage: e.target.value,
        });
        resetValidation('profileImage');
    };
    

    const handleDescriptionChange = (e: { target: { value: any; }; }) => {
        setForm({
            ...form,
            description: e.target.value,
        });
        resetValidation('description');
    };

    //TODO this should be consistent with the other handleThingsChange
    const handleTraitsChange = (selectedTraits: string[]) => {
        setSelectedTraits(selectedTraits);
        resetValidation('traits')
    };

    const handleProfileImageSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (roomie) {
            const updatedRoomieDTO = {
                profileImage: form.profileImage,
                description: roomie?.description || '',
            };

            const isProfileImageValid = form.profileImage.trim() !== '' && isValidUrl(form.profileImage.trim());

            setValidation({
                ...validation,
                profileImage: isProfileImageValid,
            });
            
            // TODO this can be a function
            if(isProfileImageValid) {
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
        }
    };

    const handleDescriptionSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (roomie) {
            const updatedRoomieDTO = {
                profileImage: roomie?.profileImage || '',
                description: form.description,
            };

            const isDescriptionValid = updatedRoomieDTO.description.trim().length >= MIN_DESCRIPTION_LENGTH && updatedRoomieDTO.description.trim().length <= MAX_DESCRIPTION_LENGTH;
            
            setValidation({
                ...validation,
                description: isDescriptionValid,
            });

            // TODO this can be a function
            if(isDescriptionValid) {
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
            else {
                openSnackbar("Description failed to update", "error");
            }
        }
    };

    const handleTraitsSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (roomie) {
            const isMinTraitsValid = selectedTraits.length >= MIN_TRAITS_COUNT;
            const isMaxTraitsValid = selectedTraits.length <= MAX_TRAITS_COUNT;
            const isTraitsValid = isMinTraitsValid && isMaxTraitsValid;

            setValidation({
                ...validation,
                traits: isTraitsValid,
            });
            
            if(isTraitsValid) {
                updateRoomieTraits(selectedTraits, roomie?.id)
                    .then((r) => {
                        setRoomie(r);
                        openSnackbar("Traits updated succesfully", "success");
                    })
                    .catch((error) => {
                        console.error("Error updating roomie's traits:", error);
                        openSnackbar("Traits failed to update", "error");
                    });
            }
        }
    };



    // fetch roomie data when the page loads for the first time
    useEffect(() => {
        fetchRoomie(id).then(response => {
            setRoomie(response);
            setRoomieTraits(response?.traits?.map((trait) => trait.name) || []);
        })
            .catch(error => {
                console.error("Error fetching roomie:", error);
            });
    }, []);
    
    
    // fetch traits data when the page loads for the first time
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
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if(!isEditing){
            resetValidation();
        }
    };
    const openSnackbar = (message: SetStateAction<string>, severity: AlertColor) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setIsSnackbarOpen(true);
    };
    
    
    return (
        <div className ={"profile-view"}>
            <Grid container rowSpacing={{ xs: 2, sm: 3, md: 3, lg: 7 }}>
                
                {/* Profile Image */}
                <Grid item lg={12} xs={12 }>
                        <img className={"profile-image"} src={roomie && roomie.profileImage} alt="" />
                        {isEditing && (
                            <form onSubmit={handleProfileImageSubmit}>
                                <div>
                                    <TextField
                                        size={isSmallScreen ? "small" : "medium"}
                                        variant="outlined"
                                        label = "Image link"
                                        margin ="normal"
                                        onChange={handleProfileImageChange}
                                        error={!validation.profileImage}
                                        helperText={
                                            !validation.profileImage &&
                                            ((form.profileImage.trim() === '' && "Profile image is required.") ||
                                                (!isValidUrl(form.profileImage.trim()) && "Invalid URL. Please enter a valid URL."))
                                        }
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
                        <form onSubmit={handleDescriptionSubmit}>
                            <div>
                                <TextField
                                    defaultValue={roomie?.description || ''}
                                    multiline
                                    id="standard-multiline-static"
                                    label="Multiline"
                                    minRows={3}
                                    maxRows={5}
                                    size={isSmallScreen ? 'small' : 'medium'}
                                    variant="outlined"
                                    margin="normal"
                                    className={"input-description"}
                                    style={{ width: '50%' }}
                                    onChange={handleDescriptionChange}
                                    error={!validation.description}
                                    helperText={!validation.description &&
                                        ((form.description.length <= MIN_DESCRIPTION_LENGTH && `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`) ||
                                            (form.description.length >= MAX_DESCRIPTION_LENGTH && `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`))}
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
                            <form onSubmit={handleTraitsSubmit}>
                                <SelectTraits
                                    defaultTraits={roomieTraits}
                                    allTraits={allTraits}
                                    handleChange={handleTraitsChange}
                                    isSmallScreen={isSmallScreen}
                                    error={!validation.traits}
                                    helperText={ !validation.traits &&
                                        ((selectedTraits.length < MIN_TRAITS_COUNT && `Select at least ${MIN_TRAITS_COUNT} traits.`) ||
                                            (selectedTraits.length > MAX_TRAITS_COUNT && `You cannot select more than ${MAX_TRAITS_COUNT} traits.`))}
                                />
                                <div>
                                    <Button
                                        type="submit"
                                        size={isSmallScreen ? 'small' : 'large'}
                                        variant="contained"
                                        color="success"
                                        className={'button-attribute button-update animation'}
                                    >
                                        Update
                                    </Button>
                                </div>
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
                    onConfirmDelete={()=> setIsDeleteDialogOpen(false)}
                    deletingRoomieId={id}
                />
                
            </Grid>
        </div>
    )
}
