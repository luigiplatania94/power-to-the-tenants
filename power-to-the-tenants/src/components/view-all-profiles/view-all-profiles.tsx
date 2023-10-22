import {useEffect, useState} from 'react';
import {fetchAllRoomies} from '../../services/roomie-service';
import {Roomie} from "../../models/roomie.ts";
import './view-all-profiles.css';
import {Link} from "react-router-dom";


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
        <div>
            <h2>All Roomie Profiles</h2>
            <table className="roomie-table">
                <thead>
                <tr>
                    <th>Profile Image</th>
                    <th>Description</th>
                    <th>Attributes</th>
                </tr>
                </thead>
                <tbody>
                {roomies.map((roomie) => (
                    <tr key={roomie.id}>
                        <td>
                            <img src={roomie.profileImage} alt="Roomie" className="roomie-image"  />
                        </td>
                        <td className="Primary-Teal">{roomie.description}</td>
                        <td className="Secondary-Orange">
                            <ul>
                                {roomie.attributes.map((attribute, index) => (
                                    <li key={index}>{attribute}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <Link to={`/view-profile/${roomie.id}`}>View Profile</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllProfiles;