import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { createRoomieDTO } from "../../DTOs/createRoomieDTO.ts";

interface CreateRoomieDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateRoomie: (form: createRoomieDTO) => void;
}

const CreateRoomieDialog: React.FC<CreateRoomieDialogProps> = ({ isOpen, onClose, onCreateRoomie }) => {
    
    const [form, setForm] = useState<createRoomieDTO>({
        profileImage: '',
        description: '',
        attributes: [],
    });

    const handleCreateRoomie = () => {
        onCreateRoomie(form);
        onClose();
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
                    // TODO fix attributes
                    // onChange={(e) => setForm({
                    //     ...form,
                    //     attributes: e.target.value
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
