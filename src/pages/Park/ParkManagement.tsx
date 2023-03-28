import {createContext, FC, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import ParkList, {ParkListOptions} from "./ParkList";
import CreatePark from "./CreatePark";
import {Box, MenuItem, Select, Stack} from "@mui/material";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {ParkListContext} from "./ParkListContext";
import {getParks} from "../../core/services/park.api.service";
import {Park} from "../../core/model/Park";


const ParkManagement : FC<any> = () => {

    const [pageListOptions, setPageListOptions] = useState<ParkListOptions>({ page: 0, filter: { electricityOrigin: ElectricityOrigin.SOLAR }});
    console.log('render ParkManagement', pageListOptions);
    const [parks, setParks] = useState([] as Park[]);

    const fetchParks = async () => {
        const parkList = await getParks();
        console.log('parkList in parkManagement', parkList);
        setParks( parkList);
    };


    useEffect(() => {
        console.log('useEffect fetchParks');

        fetchParks();
    }, [pageListOptions]);


    return (
        <>
            <ParkListContext.Provider value={{parkList: () => parks}}>

            <Typography variant={"h1"}>Park Management</Typography>
            <Box>Filters
            <Stack>
                <Select
                    defaultValue={ElectricityOrigin.SOLAR}
                >
                    <MenuItem value={ElectricityOrigin.SOLAR}>Solar</MenuItem>
                    <MenuItem value={ElectricityOrigin.WIND}>Wind</MenuItem>
                    <MenuItem value={ElectricityOrigin.HYDRAULIC}>Hydraulic</MenuItem>
                </Select>
            </Stack>
            </Box>
            <CreatePark setPageListOptions={setPageListOptions} />
            <ParkList pageListOptions={pageListOptions} setPageListOptions={setPageListOptions}/>
            </ParkListContext.Provider>
        </>
    );
};

export default ParkManagement;
