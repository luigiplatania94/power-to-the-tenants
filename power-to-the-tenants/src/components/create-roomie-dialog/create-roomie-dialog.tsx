import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createRoomieDTO } from "../../DTOs/createRoomieDTO.ts";
import {createRoomie, fetchAllTraits} from "../../services/roomie-service.ts";
import SelectTraits from "../select-traits/select-traits.tsx";
import {isValidURL} from "../../utilities/components-utils.ts";

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 300;
const MIN_TRAITS_COUNT = 3;
const MAX_TRAITS_COUNT = 8;

interface CreateRoomieDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmCreate: () => void;
}

const CreateRoomieDialog: React.FC<CreateRoomieDialogProps> = ({ isOpen, onClose, onConfirmCreate }) => {
    
    const [form, setForm] = useState<createRoomieDTO>({
        profileImage: '',
        description: '',
        traits: [],
    });

    const [allTraits, setAllTraits] = useState<string[]>([]);

    const [validation, setValidation] = useState({
        profileImage: true,
        description: true,
        traits: true,
    });
    
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
    
    const handleCreateRoomie = () => {
        // Validation checks
        const isProfileImageValid = form.profileImage.trim() !== '' && isValidURL(form.profileImage.trim());
        const isDescriptionValid = form.description.trim().length >= MIN_DESCRIPTION_LENGTH && form.description.trim().length <= MAX_DESCRIPTION_LENGTH;
        

        const isMinTraitsValid = form.traits.length >= MIN_TRAITS_COUNT;
        const isMaxTraitsValid = form.traits.length <= MAX_TRAITS_COUNT;
        const isTraitsValid = isMinTraitsValid && isMaxTraitsValid;

        setValidation({
            profileImage: isProfileImageValid,
            description: isDescriptionValid,
            traits: isTraitsValid,
        });
        
        if (isProfileImageValid && isDescriptionValid && isTraitsValid) {
            createRoomie(form)
                .then(() => {
                    // Notify the parent component that roomie is created
                    onConfirmCreate();
                    onClose();
                    setForm({
                        profileImage: '',
                        description: '',
                        traits: [],
                    });
                })
                .catch((error) => {
                    console.error('Error creating roomie:', error);
                });
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
            <DialogTitle>Create Roomie Profile</DialogTitle>
            <DialogContent>
                <TextField
                    label="Profile Image Link"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={form.profileImage}
                    onChange={(e) => {
                        setForm({ ...form, profileImage: e.target.value });
                        resetValidation('profileImage');
                    }}
                    error={!validation.profileImage}
                    helperText={
                        !validation.profileImage &&
                        ((form.profileImage.trim() === '' && "Profile image is required.") ||
                            (!isValidURL(form.profileImage.trim()) && "Invalid URL. Please enter a valid URL."))
                    }
                />
                <TextField
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={form.description}
                    onChange={(e) => {
                        setForm({ ...form, description: e.target.value });
                        resetValidation('description');
                    }}
                    error={!validation.description}
                    helperText={!validation.description &&                     
                        ((form.description.length <= MIN_DESCRIPTION_LENGTH && `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`) ||
                            (form.description.length >= MAX_DESCRIPTION_LENGTH && `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`))}
                />
                <SelectTraits
                    allTraits={allTraits} 
                    onChange={(selectedTraits) => {
                        setForm({ ...form, traits: selectedTraits });
                        resetValidation('traits')
                    }}
                    error={!validation.traits}
                    helperText={ !validation.traits &&
                        ((form.traits.length < MIN_TRAITS_COUNT && `Select at least ${MIN_TRAITS_COUNT} traits.`) ||
                            (form.traits.length > MAX_TRAITS_COUNT && `You cannot select more than ${MAX_TRAITS_COUNT} traits.`))}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    //TODO should this be moved to a function?
                    onClick={() => { 
                        onClose(); 
                        resetValidation(); 
                        setForm({
                            profileImage: '',
                            description: '',
                            traits: [],
                        }); 
                    }}
                >Cancel</Button>
                <Button onClick={handleCreateRoomie} color="success">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRoomieDialog;
