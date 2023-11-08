import {useEffect, useState} from 'react';
import {createRoomie, deleteRoomie, fetchAllRoomies} from '../../services/roomie-service';
import {Roomie} from "../../models/roomie.ts";
import './view-all-profiles.css';
import {
    Button,
    Card,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {createRoomieDTO} from "../../DTOs/createRoomieDTO.ts";


function ViewAllProfiles() {
    
    const [roomies, setRoomies] = useState<Roomie[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingRoomieId, setDeletingRoomieId] = useState<string | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const [createForm, setCreateForm] = useState<createRoomieDTO>({
        profileImage: '',
        description: '',
        attributes: [],
    });
    
    const { 
        
        formState: { }
    } = useForm();

    useEffect(() => {
        // Fetch roomies data when the component mounts
        fetchAllRoomies()
            .then((data) => {
                setRoomies(data);
            })
            .catch((error) => {
                console.error('Error fetching roomies:', error);
            });
    }, []);
    
    const openDeleteDialog = (roomieId: string | null) => {
        setIsDeleteDialogOpen(true);
        setDeletingRoomieId(roomieId);
    };
    
    const openCreateDialog = () => {
        setIsCreateDialogOpen(true);
    };
    
    const closeCreateDialog = () => {
        setIsCreateDialogOpen(false);
    };
    

    const handleDeleteClick = (id: string | null): void => {
        if (id !== null) {
            openDeleteDialog(id);
        }
    };
    const handleConfirmDelete = (roomieId: string | null) => {
        if (roomieId !== null) {
            deleteRoomie(roomieId).then(() => {
                fetchAllRoomies()
                    .then((data) => {
                        setRoomies(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching roomies:', error);
                    });
            });
        }
    };


    const handleCreateRoomie = () => {
        createRoomie(createForm).then(() => {
            // Refresh the list of roomies
            fetchAllRoomies()
                .then((data) => {
                    setRoomies(data);
                })
                .catch((error) => {
                    console.error('Error fetching roomies:', error);
                });

            // Close the create dialog
            closeCreateDialog();
        });
    };

    
    return (
        <div className={"tableContainer"}>
            <Card variant="outlined">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1600 }} aria-label="simple table" className={"roomie-table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Attributes</TableCell>
                                <TableCell>Buttons</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {roomies.map((roomie) => (
                                <TableRow
                                    key={roomie.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <img src={roomie.profileImage} alt="Roomie" className="roomie-image"/>
                                    </TableCell>
                                    <TableCell>{roomie.description}</TableCell>
                                    <TableCell>
                                        {roomie.attributes && roomie.attributes.map((attribute, index) => (
                                            <Chip className={"attribute"} key = {index} label = {attribute.name}></Chip>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <div className={"edit-delete-buttons"}>
                                            <Button style={{ marginRight: '10px' }}  variant="contained" href={`/view-profile/${roomie.id}`}>View</Button>
                                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(roomie.id)}> Delete </Button>
                                        </div>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '25px' }}>
                <Button variant="contained" color="success" onClick={openCreateDialog}>
                    Create
                </Button>
            </div>

            {/*Dialog for creating a new roomie profile*/}
            <Dialog open={isCreateDialogOpen} onClose={closeCreateDialog} maxWidth="sm">
                <DialogTitle>Create Roomie Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Profile Image Link"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={createForm.profileImage}
                        onChange={(e) =>
                            setCreateForm({ ...createForm, profileImage: e.target.value })
                        }
                    />
                    <TextField
                        label="Description"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={createForm.description}
                        onChange={(e) =>
                            setCreateForm({ ...createForm, description: e.target.value })
                        }
                    />
                    <TextField
                        label="Attributes"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={createForm.attributes.join(', ')}
                        // TODO fix attributes
                        // onChange={(e) =>
                        //     setCreateForm({
                        //         ...createForm,
                        //         attributes: e.target.value
                        //             .split(',')
                        //             .map((attribute) => attribute.trim()),
                        //     })
                        // }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCreateDialog}>Cancel</Button>
                    <Button onClick={handleCreateRoomie} color="success">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/*Dialog for deleting a roomie profile*/}
            <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
                <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this profile?</p>
                    <p>id: {deletingRoomieId}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setIsDeleteDialogOpen(false);
                            handleConfirmDelete(deletingRoomieId);
                        }}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
);
}

export default ViewAllProfiles;