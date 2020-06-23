import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dateFormat from 'dateformat';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '400px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DialogList(props) {
  const { title, data, closeDialog } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    closeDialog();
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <List component="nav" aria-label="main mailbox folders">
            {data.map(({ _id, date }) => {
              return (
                <ListItem button key={_id}>
                  <ListItemText
                    primary={dateFormat(date, 'dddd, d mmmm yyyy, h:MM:ss TT')}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
