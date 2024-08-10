import { Backdrop, CircularProgress, Typography } from '@mui/material';

const LoaderComponent = ({ visible, loaderText }) => {
  return (
    <Backdrop
      sx={{ color: 'primary', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={visible}
      className="display-flex flex-direction-column"
    >
      <CircularProgress color="inherit" />
      <Typography>{loaderText}</Typography>
    </Backdrop>
  );
};

export default LoaderComponent;
