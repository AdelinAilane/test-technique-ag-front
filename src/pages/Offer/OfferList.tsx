import * as React from 'react';
import {FC} from "react";

import {useSelector} from "react-redux";
import {offerListSelector} from "../../state/offerSlice";
import {Header, SeeMoreButton} from "./OfferListStyle";
import {
    Box,
    Collapse,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AddTimeBlockToOffer from "./AddTimeBlockToOffer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MarketType} from "../../core/enum/market-type.enum";

export type OfferFilters = { marketType?: MarketType }

export type OfferListOptions = {page: number, filter: OfferFilters};
interface OfferListProps {
    pageListOptions: OfferListOptions,
    setPageListOptions:  React.Dispatch<React.SetStateAction<OfferListOptions>>
}

function Row(props: { row: any, setPageListOptions:  React.Dispatch<React.SetStateAction<OfferListOptions>>}) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return ( <>
            <TableRow
                key={row.offerId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right"><AddTimeBlockToOffer offerId={row.offerId} setPageListOptions={props.setPageListOptions}></AddTimeBlockToOffer></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                blocs de temps
                            </Typography>
                            <Table size="small" aria-label="time-blocks">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>nom du parc producteur</TableCell>
                                        <TableCell>type</TableCell>
                                        <TableCell>puissance (MW)</TableCell>
                                        <TableCell>prix plancher (€)</TableCell>
                                        <TableCell align="right">date/heure début</TableCell>
                                        <TableCell align="right">date/heure fin</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.timeBlocks?.map((timeBlock: any) => (
                                        <TableRow key={timeBlock.timeBlockId}>
                                            <TableCell component="th" scope="row">
                                                {timeBlock.park.name}
                                            </TableCell>
                                            <TableCell align="right">{timeBlock.park.electricityOrigin}</TableCell>
                                            <TableCell align="right">{timeBlock.power}</TableCell>
                                            <TableCell align="right">{timeBlock.lowestPrice}</TableCell>
                                            <TableCell align="right">{timeBlock.start}</TableCell>
                                            <TableCell align="right">{timeBlock.end}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const OfferList: FC<OfferListProps>= ({pageListOptions, setPageListOptions}) => {
    const { loading, offerList, total } = useSelector(offerListSelector);

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
                    <Header>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>nom</TableCell>
                            <TableCell align="right">createdAt</TableCell>
                            <TableCell align="right">updatedAt</TableCell>
                            <TableCell align="right">Ajout de bloc temps</TableCell>
                        </TableRow>
                    </Header>
                    <TableBody>
                        {offerList.map((row) => (
                            <Row key={row.name} row={row} setPageListOptions={setPageListOptions} />
                ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {(offerList?.length < total) && (
                <Stack sx={{marginTop: 2}}>
                    <SeeMoreButton variant="contained" onClick={seeMore}>Voir plus</SeeMoreButton>
                </Stack>
            )}
        </div>
    );
}


export default OfferList;
