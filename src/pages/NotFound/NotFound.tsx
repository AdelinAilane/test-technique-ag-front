import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '90vh',
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%,-50%)',
      }}
    >
      <Typography variant="h5">Page introuvable</Typography>
      <Button variant="text" onClick={() => navigate('/')} sx={{ marginTop: '10px' }}>
        Retour à la page d'accueil
      </Button>
    </Stack>
  );
};

export default NotFound;
