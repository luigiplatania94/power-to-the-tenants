import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createRoomieDTO } from "../../DTOs/createRoomieDTO.ts";
import {createRoomie, fetchAllTraits} from "../../services/roomie-service.ts";
import SelectTraits from "../select-traits/select-traits.tsx";

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

    const resetValidation = () => {
        setValidation({
            profileImage: true,
            description: true,
            traits: true,
        });
    };
    
    const handleCreateRoomie = () => {
        // Validation checks
        const isProfileImageValid = form.profileImage.trim() !== '';
        const isDescriptionValid = form.description.trim() !== '';
        const isTraitsValid = form.traits.length > 0;

        setValidation({
            profileImage: isProfileImageValid,
            description: isDescriptionValid,
            traits: isTraitsValid,
        });

        // If all validations pass, proceed with creating the roomie
        if (isProfileImageValid && isDescriptionValid && isTraitsValid) {
            createRoomie(form)
                .then(() => {
                    // Notify the parent component that roomie is created
                    onConfirmCreate();
                    onClose();
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
                    onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                    error={!validation.profileImage}
                    helperText={!validation.profileImage && "Profile image is required."}
                />
                <TextField
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    error={!validation.description}
                    helperText={!validation.description && "Description is required."}
                />
                <SelectTraits
                    allTraits={allTraits} 
                    handleChange={(selectedTraits) => setForm({ ...form, traits: selectedTraits })}
                    error={!validation.traits}
                    helperText={!validation.traits && "At least one trait is required."}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); resetValidation();}}>Cancel</Button>
                <Button onClick={handleCreateRoomie} color="success">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRoomieDialog;
