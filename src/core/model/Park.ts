import {ElectricityOrigin} from "../enum/electricity-origin.enum";

export type Park = {
    parkId: number;
    name: string;
    electricityOrigin: ElectricityOrigin;
    createdAt: string;
    updatedAt: string;
}
