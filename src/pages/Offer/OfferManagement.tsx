import {createContext, FC, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import OfferList, {OfferListOptions} from "./OfferList";
import CreateOffer from "./CreateOffer";
import {Box, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {fetchOfferListThunk, offerListSelector} from "../../state/offerSlice";
import {useAppDispatch} from "../../state/store";
import {useSelector} from "react-redux";
import {MarketType} from "../../core/enum/market-type.enum";


const OfferManagement : FC<any> = () => {

    const [pageListOptions, setPageListOptions] = useState<OfferListOptions>({ page: 0, filter: { marketType: MarketType.PRIMARY_RESERVE }});
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchOffersRedux = async () => {
            console.log('fetchOffersRedux', pageListOptions);
            const params = { marketType: pageListOptions.filter.marketType || MarketType.PRIMARY_RESERVE, page: pageListOptions.page, limit: 2};
            await dispatch(fetchOfferListThunk(params));
        };
        fetchOffersRedux();

    }, [pageListOptions]);

    const onChangeMarketTypeFilter = (event: SelectChangeEvent) => {
        const marketTypeOption = event.target.value as MarketType;
        setPageListOptions((prevState) => ({...prevState, ...{ page: 0, filter: { marketType: marketTypeOption }}}));
    }

    return (
        <>
            <Typography variant={"h1"}>Offer Management</Typography>
            <Box sx={{marginBottom: 4}}>
            <Stack direction="row" justifyContent="space-between">
                <Select onChange={onChangeMarketTypeFilter} sx={{ minWidth: 150 }}
                        value={pageListOptions.filter.marketType}
                    defaultValue={MarketType.PRIMARY_RESERVE}
                >
                    <MenuItem value={MarketType.PRIMARY_RESERVE}>Réserve primaire</MenuItem>
                    <MenuItem value={MarketType.SECONDARY_RESERVE}>Réserve secondaire</MenuItem>
                    <MenuItem value={MarketType.FAST_RESERVE}>Réserve rapide</MenuItem>
                </Select>
                <CreateOffer setPageListOptions={setPageListOptions} />
            </Stack>
            </Box>
            <OfferList pageListOptions={pageListOptions} setPageListOptions={setPageListOptions}/>
        </>
    );
};

export default OfferManagement;
