import {useState} from "react";
import {
    Box,
    Button,
    Grid,
    Modal,
    TextField
} from '@mui/material';
import {createTimeBlockForPark, getTimeBlocks} from "../../../core/services/time-block.api.service";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Typography from "@mui/material/Typography";
import {Controller, useForm} from "react-hook-form";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from 'date-fns/locale/fr';
import {BoxContainer} from "./CreateTimeBlockStyle";

const defaultValues =  {
    power: 0,
    lowestPrice: 0,
    startDate: new Date(),
    endDate: new Date(),
};

const CreateTimeBlock = ({ parkId }: { parkId: number }) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const { handleSubmit,
        control,
        trigger,
    } = useForm(
        {
            defaultValues
        }
    );
    const [data, setData] = useState<any>(defaultValues);

    const handleSubmitTimeBlock = (data: any) => {
        console.log('handleSubmitOffer', data);
        setData(JSON.stringify(data));
        const createTimeBlockAsync = async (power: number, lowestPrice: number, startDate: string, endDate: string) => {
            const offerCreationResponse = await createTimeBlockForPark(power, lowestPrice, startDate, endDate, parkId);
            handleClose();
            console.log('offerCreationResponse', offerCreationResponse);
        };
        createTimeBlockAsync(Number(data.power), Number(data.lowestPrice), data.startDate.toISOString(), data.endDate.toISOString());
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
                <Typography textAlign="center" variant="h3">Créer un bloc-temps d'éléctricité pour ce parc</Typography>

                <Box component="form" onSubmit={handleSubmit(handleSubmitTimeBlock)}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={"power"}
                                control={control}
                                defaultValue={0}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} label={"puissance (MW)"} type="number" defaultValue={0} placeholder="power"
                                               sx={{ padding: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={"lowestPrice"}
                                control={control}
                                defaultValue={0}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} label={"prix plancher"} type="number" defaultValue={0} placeholder="lowestPrice"/>
                                )}
                            />
                        </Grid>


                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DateTimePicker
                                            label={`date`}
                                            defaultValue={new Date()}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e as Date);
                                                trigger('startDate');
                                            }}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DateTimePicker
                                            label={`date`}
                                            defaultValue={new Date()}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e as Date);
                                                trigger('endDate');
                                            }}
                                        />
                                    )}
                                />

                            </Grid>
                        </LocalizationProvider>

                    </Grid>

                    <p>{JSON.stringify(data)}</p>
                    <Button  type="submit"  variant="contained" onClick={() => setOpen(true)}>Ajouter un parc producteur d'électricité</Button>

                </Box>


            </BoxContainer>
        </Modal>)}
    </>);

};

export default CreateTimeBlock;
