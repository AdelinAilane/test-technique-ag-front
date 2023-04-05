import axiosInstance from "./base.api.service";
import {Offer} from "../model/Offer";
import {IOfferListOptions} from "../../state/offerSlice";
import {PaginatedQueryResult} from "../model/paginatedQueryResult";
import {MarketType} from "../enum/market-type.enum";

const getOffers = async (options: IOfferListOptions): Promise<PaginatedQueryResult<Offer>> => {
    const response = await axiosInstance.get( `offer/${options.marketType}`, { params: { page: options.page, limit: options.limit }} );
    console.log('response', response);
    return response.data;
}

const createOffer = async (name: string, marketType: MarketType) => {
    console.log('createOffer', name, origin);
    const response = await axiosInstance.post('/offer',  {
        name,
        marketType
    });
    return response.data;
}

const addTimeBlockToOffer = async (timeBlockId: number, offerId: number) => {
    console.log('addTimeBlockToOffer', timeBlockId, offerId);
    const response = await axiosInstance.patch('/offer/add-time-block',  {
        timeBlockId,
        offerId
    });
    return response.data;
}

export {
    getOffers, createOffer, addTimeBlockToOffer
}
