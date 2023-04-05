import {Park} from "../core/model/Park";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ElectricityOrigin} from "../core/enum/electricity-origin.enum";
import {RequestStatusEnum} from "../core/enum/state-enum";
import { RootState } from './rootReducer';
import {getParks} from "../core/services/park.api.service";
import {PaginatedQueryResult} from "../core/model/paginatedQueryResult";

interface IparkListState {
    parkList: Park[];
    loading: RequestStatusEnum;
    currentPage: number;
    total: number;
}

const initialState: IparkListState = {
    parkList: [] as Park[],
    loading: RequestStatusEnum.IDLE,
    currentPage: 0,
    total: 0,
};

export type IParkListOptions = {
    electricityOrigin: ElectricityOrigin;
    page: number;
    limit: number;
};

export const fetchParkListThunk = createAsyncThunk(
    'park/fetchParkListThunk',
    async (options: IParkListOptions,
           { rejectWithValue, dispatch }) => {
        const parkPaginatedList: PaginatedQueryResult<Park> = await getParks(options);
        return parkPaginatedList ;
    });


const parkSlice = createSlice({
    name: 'park',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParkListThunk.pending, (state) => {
            state.loading = RequestStatusEnum.PENDING;
        });
        builder.addCase(fetchParkListThunk.fulfilled, (state, action) => {
            state.loading = RequestStatusEnum.FULFILLED;
            state.total = action.payload.total;
            state.currentPage = action.payload.currentPage;
            if (state.currentPage === 0) {
                state.parkList = action.payload.items;
            } else {
                state.parkList = [...state.parkList, ...action.payload.items];
            }
        });
        builder.addCase(fetchParkListThunk.rejected, (state, error) => {
            state.loading = RequestStatusEnum.REJECTED;
        });
    },
});

export const parkListSelector = (state: RootState) => state.parkListReducer;

export default parkSlice.reducer;

