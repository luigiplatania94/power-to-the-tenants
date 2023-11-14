import {Trait} from "../models/trait.ts";

export interface createRoomieDTO {
    profileImage : string;
    description : string;
    attributes: Trait[];
}