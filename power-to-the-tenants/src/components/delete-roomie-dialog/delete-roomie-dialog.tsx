// DeleteRoomieDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import {Link} from "react-router-dom";
import {deleteRoomie} from "../../services/roomie-service.ts";

interface DeleteRoomieDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
    deletingRoomieId: string | undefined; 
}

const DeleteRoomieDialog: React.FC<DeleteRoomieDialogProps> = ({ isOpen, onClose, onConfirmDelete, deletingRoomieId }) => {
    const handleDeleteRoomie = () => {
        if (deletingRoomieId !== null) {
            deleteRoomie(deletingRoomieId).then(() => {
                onConfirmDelete();
                onClose();
            })
            .catch((error) => {
                console.error('Error deleting roomie:', error);
            });
        }
    };
    
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this profile?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Link to="/">
                    <Button onClick={handleDeleteRoomie} color="error">
                        Delete
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteRoomieDialog;
