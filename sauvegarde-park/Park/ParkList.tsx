import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {FC, useEffect, useState} from "react";
import {getParks} from "../../core/services/park.api.service";
import {Park} from "../../core/model/Park";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";

const columns: GridColDef[] = [
    { field: 'parkId', headerName: 'ID', type: 'number', width: 70 },
    { field: 'electricityOrigin', headerName: 'Origine de la production électrique', width: 300 },
    { field: 'name', headerName: 'Nom', minWidth: 130 },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export type  ParkFilters = { electricityOrigin?: ElectricityOrigin }

export type ParkListOptions = {page: number, filter: ParkFilters};

interface ParkListProps {
    pageListOptions: ParkListOptions,
    setPageListOptions: (pageListOptions: ParkListOptions) => void;
}

const ParkList: FC<ParkListProps>= ({pageListOptions, setPageListOptions}) => {
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
    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={parks}
                columns={columns}
                pageSizeOptions={[100]}
                getRowId={park => park.parkId}
                checkboxSelection
            />
        </div>
    );
}


export default ParkList;
