import axiosInstance from "./base.api.service";
import {Park} from "../model/Park";


const getParks = async (): Promise<Park[]> => {
    const response = await axiosInstance.get('/park/SOLAR');
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
