import {Box, styled} from "@mui/material";

export const BoxContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FAFAFA', // theme.palette.basic.sand,
    paddingTop: 2,
    paddingX: 10,
    paddingBottom: 3,
    minWidth: 500,
    maxWidth: '90%',
    border: `1px solid #FAFAFA`, // `1px solid ${theme.palette.basic.sand}`,
    padding: '1rem 3rem',
    borderRadius: '20px',
}));
