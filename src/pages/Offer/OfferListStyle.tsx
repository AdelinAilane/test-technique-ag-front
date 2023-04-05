import {Box, Button, ButtonProps, styled, TableHead, TableHeadProps} from "@mui/material";

export const SeeMoreButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto'
}));


export const Header = styled(TableHead)<TableHeadProps>(({ theme }) => ({
    backgroundColor: 'lightgrey'
}));

