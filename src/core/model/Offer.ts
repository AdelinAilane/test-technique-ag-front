import {ElectricityOrigin} from "../enum/electricity-origin.enum";
import {MarketType} from "../enum/market-type.enum";

export type Offer = {
    offerId: number;
    marketType: MarketType;
    name: string;
    createdAt: string;
    updatedAt: string;
    timeBlocks: any[]
}

