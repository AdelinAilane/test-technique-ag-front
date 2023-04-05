import {FC, useState} from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField} from '@mui/material';
import {BoxContainer} from "./CreateOfferStyle";
import {Controller, useForm} from "react-hook-form";
import {createOffer} from "../../core/services/offer.api.service";
import {MarketType} from "../../core/enum/market-type.enum";

import Typography from "@mui/material/Typography";
import * as React from "react";
import {OfferListOptions} from "./OfferList";

interface CreateOfferProps {
    setPageListOptions:  React.Dispatch<React.SetStateAction<OfferListOptions>>
}

const CreateOffer: FC<CreateOfferProps>= ({setPageListOptions}) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        console.log('handleClose');
        setOpen(false);
    }

    const { register, handleSubmit, control } = useForm();
    const [data, setData] = useState<any>("");

    const handleSubmitOffer = (data: any) => {
        console.log('handleSubmitOffer', data);
        setData(JSON.stringify(data));
        const createOfferAsync = async (name: string, marketType: MarketType) => {
            const offerCreationResponse = await createOffer(name, marketType);
            handleClose();
            setPageListOptions( (prev) => ({...prev, ...{ page: 0 }}));
            console.log('offerCreationResponse', offerCreationResponse);
        };
        createOfferAsync(data.name, data.marketType);
    };

    return (<>
        <Button variant="contained" onClick={() => setOpen(true)}>Ajouter une offre</Button>
        {open && (<Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            sx={{}} >
            <BoxContainer>
                <Typography textAlign="center" variant="h3">Ajouter une offre</Typography>

                <Box component="form" onSubmit={handleSubmit(handleSubmitOffer)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>

                            <Controller
                                name={"name"}
                                control={control}
                                defaultValue={""}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} label={""}  defaultValue={""} placeholder="name"/>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <Controller
                            name={"marketType"}
                            control={control}
                            defaultValue={MarketType.PRIMARY_RESERVE}
                            render={({ field: { onChange, value } }) => (

                                <FormControl fullWidth>
                                    <InputLabel id="select-offer-market-type-label">Sélectionner le type de marché</InputLabel>
                                        <Select
                                            labelId="select-offer-market-type-label"
                                            onChange={onChange}
                                            defaultValue={MarketType.PRIMARY_RESERVE}
                                        >
                                            <MenuItem value={MarketType.PRIMARY_RESERVE}>réserve primaire</MenuItem>
                                            <MenuItem value={MarketType.SECONDARY_RESERVE}>réserve secondaire</MenuItem>
                                            <MenuItem value={MarketType.FAST_RESERVE}>réserve rapide</MenuItem>

                                        </Select>
                                </FormControl>
                            )}
                        />
                        </Grid>
                    </Grid>
                    <p>{data}</p>
                    <Button  type="submit"  variant="contained" onClick={() => setOpen(true)}>Ajouter une offre</Button>

                </Box>


            </BoxContainer>
        </Modal>)}
    </>);


    //  return <ModalUnstyled>{/* the modal's content */}</ModalUnstyled>;
};

export default CreateOffer;
