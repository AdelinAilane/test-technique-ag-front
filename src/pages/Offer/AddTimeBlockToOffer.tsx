import {FC, useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal, Paper,
    Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField
} from '@mui/material';
import {BoxContainer} from "./CreateOfferStyle";
import {Controller, useForm} from "react-hook-form";
import {addTimeBlockToOffer, createOffer} from "../../core/services/offer.api.service";
import {MarketType} from "../../core/enum/market-type.enum";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {getTimeBlocks} from "../../core/services/time-block.api.service";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Typography from "@mui/material/Typography";
import {OfferListOptions} from "./OfferList";
import {ParkListOptions} from "../Park/ParkList";

interface AddTimeBlockToOfferProps {
    offerId: number,
    setPageListOptions: React.Dispatch<React.SetStateAction<OfferListOptions>>
}

const AddTimeBlockToOffer = ({ offerId, setPageListOptions}: AddTimeBlockToOfferProps) => {

    const [open, setOpen] = useState(false);
    const [timeBlocks, setTimeBlocks] = useState([] as any[]);
    const handleClose = () => {
        console.log('handleClose');
        setOpen(false);
    }

    useEffect(() => {
        if(open) {
            const asyncGetAllTimeBlocks = async () => {
                const everyTimeBlocks = await getTimeBlocks();
                setTimeBlocks(everyTimeBlocks);
            }
            asyncGetAllTimeBlocks();
        }
    }, [open]);

    const handleSubmitAddTimeBlockToOffer = (timeBlockId: number, offerId: number) => {
        console.log('handleSubmitAddTimeBlockToOffer', timeBlockId, offerId);
        const addTimeBlockAsync = async (timeBlockId: number, offerId: number) => {
            const offerCreationResponse = await addTimeBlockToOffer(timeBlockId, offerId);
            handleClose();
            setPageListOptions( (prev) => ({...prev, ...{ page: 0 }}));
            console.log('offerCreationResponse', offerCreationResponse);
        };
        addTimeBlockAsync(timeBlockId, offerId);
    };

    return (<>
        <IconButton aria-label="delete" size="small" onClick={() => setOpen(true)}>
            <MoreTimeIcon fontSize="small" />
        </IconButton>

        {open && (<Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            sx={{}} >
            <BoxContainer>
                <Typography textAlign="center" variant="h3">Ajouter un bloc-temps d'éléctricité</Typography>
                <Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom du parc producteur</TableCell>
                                    <TableCell>type</TableCell>
                                    <TableCell>puissance (MW)</TableCell>
                                    <TableCell>prix plancher (€)</TableCell>
                                    <TableCell align="right">date/heure début</TableCell>
                                    <TableCell align="right">date/heure fin</TableCell>
                                    <TableCell align="right">ajouter bloc-temps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timeBlocks.map((timeBlock) => (
                                    <TableRow key={timeBlock.timeBlockId}>
                                        <TableCell component="th" scope="row">
                                            {timeBlock.park.name}
                                        </TableCell>
                                        <TableCell align="right">{timeBlock.park.electricityOrigin}</TableCell>
                                        <TableCell align="right">{timeBlock.power}</TableCell>
                                        <TableCell align="right">{timeBlock.lowestPrice}</TableCell>
                                        <TableCell align="right">{timeBlock.start}</TableCell>
                                        <TableCell align="right">{timeBlock.end}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="add" size="small" onClick={() => handleSubmitAddTimeBlockToOffer(timeBlock.timeBlockId, offerId)}>
                                                <MoreTimeIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>


            </BoxContainer>
        </Modal>)}
    </>);


    //  return <ModalUnstyled>{/* the modal's content */}</ModalUnstyled>;
};

export default AddTimeBlockToOffer;
