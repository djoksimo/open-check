import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import withRoot from './modules/withRoot';
import IdentityStepper from "./IdentityStepper"
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function IdentityModal() {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
 
        <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        >
        Upload Documents
        </Button>

        <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        >
            <IdentityStepper/>
        </Modal>
    </div>
  );
}

export default withRoot(IdentityModal);