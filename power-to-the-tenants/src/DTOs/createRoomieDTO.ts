import {RoomieAttribute} from "../models/roomieAttribute.ts";

export interface createRoomieDTO {
    profileImage : string;
    description : string;
    attributes: RoomieAttribute[];
}