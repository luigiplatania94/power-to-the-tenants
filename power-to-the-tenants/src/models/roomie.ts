import {Trait} from "./trait.ts";

export interface Roomie {
    id : string;
    profileImage : string;
    description : string;
    traits: Trait[];
}