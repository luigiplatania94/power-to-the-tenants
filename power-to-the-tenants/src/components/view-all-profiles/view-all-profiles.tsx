import {useEffect, useState} from 'react';
import {createRoomie, deleteRoomie, fetchAllRoomies} from '../../services/roomie-service';
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
    TableRow, TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {createRoomieDTO} from "../../DTOs/createRoomieDTO.ts";


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

    const { register,
        handleSubmit,
        formState: { }
    } = useForm();
    
    const handleDeleteClick = (id : string) : void => {
        deleteRoomie(id).then(() : void => {
            fetchAllRoomies()
                .then((data) => {
                    setRoomies(data);
                })
                .catch((error) => {
                    console.error('Error fetching roomies:', error);
                });
            // TODO: prompt the user a dialog to confirm whether they really want to delete the profile.
            //       redirect user to homepage
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
                                <TableCell>Links</TableCell>
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
                                        <ul>
                                            <Button variant="contained" href={`/view-profile/${roomie.id}`}>View</Button>
                                        </ul>
                                        <ul>
                                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(roomie.id)}> Delete </Button>
                                        </ul>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <form onSubmit={handleSubmit((data ) => {
                
                const createdRoomie: createRoomieDTO = {
                    profileImage : data.profileLink,
                    description : data.description,
                    // TODO pass actual data.attributes
                    attributes : [],
                };

                createRoomie(createdRoomie).then(() : void => {
                    fetchAllRoomies()
                        .then((data) => {
                            setRoomies(data);
                        })
                        .catch((error) => {
                            console.error('Error fetching roomies:', error);
                        });
                });
            })}>
                <div>
                    <TextField
                        label="Profile link"
                        margin ="normal"
                        variant="outlined"
                        {...register("profileLink")}
                    />
                </div>
                <div>
                    <TextField
                        label="Description"
                        margin ="normal"
                        variant="outlined"
                        {...register("description")}
                    />
                </div>
                <div>
                    <TextField
                        label="Attributes"
                        margin ="normal"
                        variant="outlined"
                        {...register("attributes")}
                    />
                </div>
                <Button type="submit" variant="contained" color="success"> Create </Button>
            </form>
        </div>
    );
}

export default ViewAllProfiles;