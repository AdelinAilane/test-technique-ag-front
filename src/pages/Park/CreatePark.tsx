import {FC, useState} from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField} from '@mui/material';
import {BoxContainer} from "./CreatParkStyle";
import {Controller, useForm} from "react-hook-form";
import {ElectricityOrigin} from "../../core/enum/electricity-origin.enum";
import {createPark} from "../../core/services/park.api.service";
import * as React from "react";
import {ParkListOptions} from "./ParkList";
import Typography from "@mui/material/Typography";

interface CreateParkProps {
    setPageListOptions: React.Dispatch<React.SetStateAction<ParkListOptions>>
}

const CreatePark: FC<CreateParkProps>= ({setPageListOptions}) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const { handleSubmit, control } = useForm();
    const [data, setData] = useState<any>("");


    const handleSubmitPark = (data: any) => {
        console.log('handleSubmitPark', data);
        setData(JSON.stringify(data));
        const createParkAsync = async (name: string, origin: string) => {
            const parkCreationResponse = await createPark(name, origin);
            handleClose();
            setPageListOptions( (prev) => ({...prev, ...{ page: 0 }}));
        };
        createParkAsync(data.name, data.origin);
    };

    return (<>
        <Button variant="contained" onClick={() => setOpen(true)}>Ajouter un parc producteur d'électricité</Button>
        {open && (<Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            sx={{}} >
            <BoxContainer>
                <Typography textAlign="center" variant="h3">Ajouter une parc producteur d'electricité</Typography>

                <Box component="form" onSubmit={handleSubmit(handleSubmitPark)}>
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
                            name={"origin"}
                            control={control}
                            defaultValue={ElectricityOrigin.SOLAR}
                            render={({ field: { onChange, value } }) => (

                                <FormControl fullWidth>
                                    <InputLabel id="select-park-origin-label">Sélectionner origin électrique du parc</InputLabel>
                                        <Select
                                            labelId="select-park-origin-label"
                                            onChange={onChange}
                                            defaultValue={ElectricityOrigin.SOLAR}
                                        >
                                            <MenuItem value={ElectricityOrigin.SOLAR}>Solar</MenuItem>
                                            <MenuItem value={ElectricityOrigin.WIND}>Wind</MenuItem>
                                            <MenuItem value={ElectricityOrigin.HYDRAULIC}>Hydraulic</MenuItem>

                                        </Select>
                                </FormControl>
                            )}
                        />
                        </Grid>
                    </Grid>

                    <p>{data}</p>
                    <Button  type="submit"  variant="contained" onClick={() => setOpen(true)}>Ajouter un parc producteur d'électricité</Button>

                </Box>


            </BoxContainer>
        </Modal>)}
    </>);

};

export default CreatePark;
