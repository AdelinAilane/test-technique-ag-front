import axiosInstance from "./base.api.service";
import {Park} from "../model/Park";
import {IParkListOptions} from "../../state/parkSlice";
import {PaginatedQueryResult} from "../model/paginatedQueryResult";
import {MarketType} from "../enum/market-type.enum";

const getTimeBlocks = async (): Promise<any[]> => {
    const response = await axiosInstance.get( `time-block`);
    console.log('response', response);
    return response.data;
}

const createTimeBlockForPark = async (power: number, lowestPrice: number, startDate: string, endDate: string, parkId: number) => {
    console.log('createTimeBlockForPark', power, lowestPrice, startDate, endDate, parkId);
    const response = await axiosInstance.post('/time-block',  {
        power, lowestPrice, startDate, endDate, parkId
    });
    return response.data;
}

export {
    getTimeBlocks, createTimeBlockForPark
}



