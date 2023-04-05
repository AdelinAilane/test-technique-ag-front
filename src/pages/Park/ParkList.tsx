import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {FC, useContext, useEffect, useState} from "react";
import {getParks} from "../../core/services/park.api.service";
import {Park} from "../../core/model/Park";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {ParkListContext} from "./ParkListContext";
import {useSelector} from "react-redux";
import {parkListSelector} from "../../state/parkSlice";
import {SeeMoreButton} from "./ParkListStyle";
import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddTimeBlockToOffer from "../Offer/AddTimeBlockToOffer";
import CreateTimeBlock from "./CreateTimeBlock";

const columns: GridColDef[] = [
    { field: 'parkId', headerName: 'ID', type: 'number', width: 70 },
    { field: 'electricityOrigin', headerName: 'Origine de la production électrique', width: 300 },
    { field: 'name', headerName: 'Nom', minWidth: 130 },
];

export type ParkFilters = { electricityOrigin: ElectricityOrigin }

export type ParkListOptions = {page: number, filter: ParkFilters};

interface ParkListProps {
    pageListOptions: ParkListOptions,
    setPageListOptions: (pageListOptions: ParkListOptions) => void;
}
const ParkList: FC<ParkListProps>= ({pageListOptions, setPageListOptions}) => {
    const { loading, parkList, total } = useSelector(parkListSelector);
    /*
    const fetchParks = async () => {
        const parkList = await getParks();
        console.log('parkList', parkList);
        setParks( parkList);
    };

    const [parks, setParks] = useState([] as Park[]);

    useEffect(() => {
        console.log('useEffect fetchParks');

        fetchParks();
    }, [pageListOptions]);
    */

    const seeMore = () => {
        setPageListOptions({
            ...pageListOptions,
            page: (pageListOptions?.page as number) + 1,
        });
    }

    return (
        <div style={{ height: 800, width: '100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>nom</TableCell>
                            <TableCell align="right">electricity origin</TableCell>
                            <TableCell align="right">créer un bloc temps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parkList.map((row) => (
                            <TableRow
                                key={row.parkId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.electricityOrigin}</TableCell>
                                <TableCell align="right"><CreateTimeBlock parkId={row.parkId}></CreateTimeBlock></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            { parkList?.length < total  && (
                <Stack sx={{marginTop: 2}}>
                    <SeeMoreButton variant="contained" onClick={seeMore}>Voir plus</SeeMoreButton>
                </Stack>
            )}
        </div>
    );
}


export default ParkList;
