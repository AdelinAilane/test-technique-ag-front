import axiosInstance from "./base.api.service";
import {Park} from "../model/Park";
import {IParkListOptions} from "../../state/parkSlice";
import {PaginatedQueryResult} from "../model/paginatedQueryResult";

const getParks = async (options: IParkListOptions): Promise<PaginatedQueryResult<Park>> => {
    const response = await axiosInstance.get( `park/${options.electricityOrigin}`, { params: { page: options.page, limit: options.limit }} );
    console.log('response', response);
    return response.data;
}

const createPark = async (name: string, origin: string) => {
    console.log('createPark', name, origin);
    const response = await axiosInstance.post('/park',  {
        name,
        electricityOrigin: origin
    });
    return response.data;
}

export {
    getParks, createPark
}
