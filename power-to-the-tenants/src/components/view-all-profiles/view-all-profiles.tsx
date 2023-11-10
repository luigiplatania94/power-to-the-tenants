import {useEffect, useState} from 'react';
import {fetchAllRoomies} from '../../services/roomie-service';
import {Roomie} from "../../models/roomie.ts";
import './view-all-profiles.css';
import {
    Button,
    Card,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {useForm} from "react-hook-form";
import CreateRoomieDialog from "../create-roomie-dialog/create-roomie-dialog.tsx";
import DeleteRoomieDialog from "../delete-roomie-dialog/delete-roomie-dialog.tsx";


function ViewAllProfiles() {
    
    const [roomies, setRoomies] = useState<Roomie[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingRoomieId, setDeletingRoomieId] = useState<string | undefined>(undefined);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    
    const { formState: { } } = useForm();

    const fetchAndSetRoomies = () => {
        fetchAllRoomies()
            .then((data) => {
                setRoomies(data);
            })
            .catch((error) => {
                console.error('Error fetching roomies:', error);
            });
    };
    
    useEffect(() => {
        fetchAndSetRoomies();
    }, []);
    

    // Delete roomie logic
    const handleDeleteClick = (id: string | null): void => {
        if (id !== null) {
            setIsDeleteDialogOpen(true);
            setDeletingRoomieId(id);
        }
    };
    const handleConfirmDelete = () => {
        fetchAndSetRoomies();
        setIsDeleteDialogOpen(false);
    };
    
    
    // Creae roomie logic
    const handleConfirmCreate = () => {
        fetchAndSetRoomies();
        setIsCreateDialogOpen(false);
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
                <Button variant="contained" color="success" onClick={() => setIsCreateDialogOpen(true)}>
                    Create
                </Button>
            </div>

            {/*Dialog for creating a new roomie profile*/}
            <CreateRoomieDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onConfirmCreate={handleConfirmCreate}
            />
            
            {/*Dialog for deleting a roomie profile*/}
            <DeleteRoomieDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirmDelete={handleConfirmDelete}
                deletingRoomieId={deletingRoomieId}
            />
        </div>
    );
}

export default ViewAllProfiles;