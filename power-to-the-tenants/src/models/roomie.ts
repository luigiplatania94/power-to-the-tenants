import {RoomieAttribute} from "./roomieAttribute.ts";

export interface Roomie {
    id : string;
    profileImage : string;
    description : string;
    attributes: RoomieAttribute[];
}