import {Offer} from "../core/model/Offer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RequestStatusEnum} from "../core/enum/state-enum";
import { RootState } from './rootReducer';
import {getOffers} from "../core/services/offer.api.service";
import {PaginatedQueryResult} from "../core/model/paginatedQueryResult";
import {MarketType} from "../core/enum/market-type.enum";

interface IofferListState {
    offerList: Offer[];
    loading: RequestStatusEnum;
    currentPage: number;
    total: number;
}

const initialState: IofferListState = {
    offerList: [] as Offer[],
    loading: RequestStatusEnum.IDLE,
    currentPage: 0,
    total: 0,
};

export type IOfferListOptions = {
    marketType: MarketType;
    page: number;
    limit: number;
};

export const fetchOfferListThunk = createAsyncThunk(
    'offer/fetchOfferListThunk',
    async (options: IOfferListOptions,
           { rejectWithValue, dispatch }) => {

        const offerPaginatedList: PaginatedQueryResult<Offer> = await getOffers(options);
        return offerPaginatedList ;
    });


const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOfferListThunk.pending, (state) => {
            state.loading = RequestStatusEnum.PENDING;
        });
        builder.addCase(fetchOfferListThunk.fulfilled, (state, action) => {
            state.loading = RequestStatusEnum.FULFILLED;
            state.total = action.payload.total;
            state.currentPage = action.payload.currentPage;
            if (state.currentPage === 0) {
                state.offerList = action.payload.items;
            } else {
                state.offerList = [...state.offerList, ...action.payload.items];
            }
        });
        builder.addCase(fetchOfferListThunk.rejected, (state, error) => {
            state.loading = RequestStatusEnum.REJECTED;
        });
    },
});

export const offerListSelector = (state: RootState) => state.offerListReducer;

export default offerSlice.reducer;

