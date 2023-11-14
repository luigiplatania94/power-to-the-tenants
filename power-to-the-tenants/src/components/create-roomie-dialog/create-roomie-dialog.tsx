import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createRoomieDTO } from "../../DTOs/createRoomieDTO.ts";
import {createRoomie} from "../../services/roomie-service.ts";

interface CreateRoomieDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmCreate: () => void;
}

const CreateRoomieDialog: React.FC<CreateRoomieDialogProps> = ({ isOpen, onClose, onConfirmCreate }) => {
    
    const [form, setForm] = useState<createRoomieDTO>({
        profileImage: '',
        description: '',
        attributes: [],
    });

    const handleCreateRoomie = () => {
        createRoomie(form)
            .then(() => {
                // Notify the parent component that roomie is created
                onConfirmCreate();
                onClose();
            })
            .catch((error) => {
                console.error('Error creating roomie:', error);
            });
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
                />
                <TextField
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <TextField
                    label="Attributes"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={form.attributes.join(', ')}
                    // TODO fix traits
                    // onChange={(e) => setForm({
                    //     ...form,
                    //     traits: e.target.value
                    //         .split(',')
                    //         .map((attribute) => attribute.trim()),
                    // })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreateRoomie} color="success">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRoomieDialog;
