import {createContext, FC, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import ParkList, {ParkListOptions} from "./ParkList/ParkList";
import CreatePark from "./CreatePark/CreatePark";
import {Box, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {fetchParkListThunk, parkListSelector} from "../../state/parkSlice";
import {useAppDispatch} from "../../state/store";


const ParkManagement : FC<any> = () => {

    const [pageListOptions, setPageListOptions] = useState<ParkListOptions>({ page: 0, filter: { electricityOrigin: ElectricityOrigin.SOLAR }});
    const dispatch = useAppDispatch();

    useEffect(() => {

        const fetchParksAsync = async () => {
            console.log('fetchParksAsync', pageListOptions);

            const params = {electricityOrigin: pageListOptions.filter.electricityOrigin, page: pageListOptions.page, limit: 2};
            await dispatch(fetchParkListThunk(params));
        };

        fetchParksAsync();

    }, [pageListOptions]);


    const onChangeElectricityOriginFilter = (event: SelectChangeEvent) => {
        const elecOriginOption = event.target.value as ElectricityOrigin;
        setPageListOptions((prevState) => ({...prevState, ...{ page: 0, filter: { electricityOrigin: elecOriginOption }}}));
    }

    return (
        <>

            <Typography variant={"h1"}>Park Management</Typography>
            <Box sx={{marginBottom: 4}}>
                <Stack direction="row" justifyContent="space-between">
                    <Select onChange={onChangeElectricityOriginFilter} sx={{ minWidth: 150 }}
                            value={pageListOptions.filter.electricityOrigin}
                            defaultValue={ElectricityOrigin.SOLAR}
                    >
                        <MenuItem value={ElectricityOrigin.SOLAR}>Solar</MenuItem>
                        <MenuItem value={ElectricityOrigin.WIND}>Wind</MenuItem>
                        <MenuItem value={ElectricityOrigin.HYDRAULIC}>Hydraulic</MenuItem>
                    </Select>
                    <CreatePark setPageListOptions={setPageListOptions} />
                </Stack>
            </Box>
            <ParkList pageListOptions={pageListOptions} setPageListOptions={setPageListOptions}/>
        </>
    );
};

export default ParkManagement;
