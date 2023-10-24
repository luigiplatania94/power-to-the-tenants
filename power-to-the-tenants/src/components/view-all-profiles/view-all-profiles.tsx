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
    TableRow
} from "@mui/material";


function ViewAllProfiles() {
    const [roomies, setRoomies] = useState<Roomie[]>([]);

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
                                <TableCell>Links</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        {/*takes the full page*/}
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
                                        {roomie.attributes.map((attribute, index) => (
                                            <Chip key = {index} label = {attribute}></Chip>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <ul>
                                            <Button variant="contained" href={`/view-profile/${roomie.id}`}>View</Button>
                                        </ul>
                                        <ul>
                                            <Button variant="contained" color="error"> Delete </Button>
                                        </ul>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
}

export default ViewAllProfiles;