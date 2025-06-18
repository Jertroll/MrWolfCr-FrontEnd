import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmarAccionModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Acción</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          sx={{
            backgroundColor: '#e53e3e',
            color: '#000',
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          sx={{
            backgroundColor: '#b38b00',
            color: '#000',
            '&:hover': {
              backgroundColor: '#8a6f00',
            },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarAccionModal;