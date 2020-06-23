import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDecision(props) {

    const { title, body, openModal, closeModal } = props;
    const [open, setOpen] = React.useState(openModal);

    const handleCancel = () => {
        setOpen(false);
        closeModal("cancel");
    };
    const handleClose = () => {
        setOpen(false);
        closeModal("close");
    };

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">Anuluj</Button>
                    <Button onClick={handleClose} color="primary" autoFocus>Potwierdź</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
