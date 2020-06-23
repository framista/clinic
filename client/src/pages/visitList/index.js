import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import api from '../../api';
import dateFormat from 'dateformat';
import ModalDecision from '../../components/modalDecision';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '800px',
    margin: '10px auto',
    backgroundColor: theme.palette.background.paper,
  },
  h1: {
    margin: '0px',
    padding: '35px 0 10px',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: '400',
  },
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 10,
  },
}));

export default function VisitList() {
  const classes = useStyles();
  const [visits, setVisits] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [selectedIdVisit, setSelectedIdVisit] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getAllVisits('patientForPatient');
      setVisits(result.data);
    };
    fetchData();
  }, []);

  const handleShowSingleVisit = (id) => {
    window.location.replace(
      `https://framista-clinic.herokuapp.com/visit/${id}`
    );
  };

  const handleDeleteVisit = (id) => {
    console.log(id);
    setSelectedIdVisit(id);
    setModal(true);
  };

  const handleModal = async (value) => {
    setModal(false);
    if (value !== 'cancel') {
      const result = await api.deleteVisitById(selectedIdVisit);
      window.location.replace(
        'https://framista-clinic.herokuapp.com/visit/list'
      );
    }
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => window.location.replace('/visit')}
      >
        <AddIcon />
      </Fab>
      <Typography color="textSecondary" variant="h1" className={classes.h1}>
        Twoje wizyty
      </Typography>
      <List className={classes.root}>
        {visits.map((visit) => {
          const { reason, date, _id, doctor } = visit;
          const { firstname, lastname } = doctor;
          const selectedDate = new Date(date);
          return (
            <ListItem key={_id} role={undefined} dense button id={_id}>
              <ListItemText
                primary={`dr ${firstname} ${lastname} `}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >{`${reason} `}</Typography>
                    {dateFormat(date, 'dddd, d mmmm yyyy, h:MM:ss TT')}
                  </React.Fragment>
                }
                onClick={() => handleShowSingleVisit(_id)}
              />
              {selectedDate > new Date() && (
                <ListItemSecondaryAction onClick={() => handleDeleteVisit(_id)}>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    style={{ marginLeft: '20px' }}
                  >
                    <CancelIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
      {modal && (
        <ModalDecision
          openModal={true}
          title="Usuń wizytę"
          body="Czy na pewno chcesz usunąć wizytę?"
          closeModal={handleModal}
        />
      )}
    </div>
  );
}
