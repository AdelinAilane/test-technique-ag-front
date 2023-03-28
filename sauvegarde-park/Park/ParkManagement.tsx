import {FC, useState} from "react";
import Typography from "@mui/material/Typography";
import ParkList, {ParkListOptions} from "./ParkList";
import CreatePark from "./CreatePark";
import {Box, MenuItem, Select, Stack} from "@mui/material";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";


const ParkManagement : FC<any> = () => {

    const [pageListOptions, setPageListOptions] = useState<ParkListOptions>({ page: 0, filter: { electricityOrigin: ElectricityOrigin.SOLAR }});
    console.log('render ParkManagement', pageListOptions);
    return (
        <>
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
        </>
    );
};

export default ParkManagement;
