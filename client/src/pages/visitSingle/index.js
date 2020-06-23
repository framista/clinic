import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import AlertDialog from '../../components/modal';
import dateFormat from 'dateformat';
import api from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '40px',
  },
  container: {
    border: '2px solid grey',
    width: '90%',
    maxWidth: '1000px',
    height: '80%',
    padding: '10px',
    marginTop: '20px',
  },
  item: {
    padding: '20px',
    borderBottom: '1px solid grey',
  },
  h1: {
    paddingTop: '70px',
    fontSize: '24px',
    marginBottom: '1em',
    textAlign: 'center',
    margin: '10px',
  },
  h2: {
    fontSize: '20px',
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingBottom: '10px',
  },
  textarea: {
    outline: 'none',
    borderRadius: '3px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '3px',
    width: '95%',
    marginBottom: '15px',
  },
}));

const SingleVisit = (props) => {
  const classes = useStyles();
  const { id } = props.match.params;
  const [visit, setVisit] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getVisitById(id);
      setVisit(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {visit && (
        <div className={classes.root}>
          <Typography color="textSecondary" variant="h1" className={classes.h1}>
            Wizyta pacjenta -&nbsp;
            <b>
              {visit.patient.firstname} {visit.patient.lastname}
            </b>
            &nbsp; - {dateFormat(visit.date, 'dddd, d mmmm yyyy, h:MM:ss TT')}
          </Typography>
          <Typography color="textSecondary" variant="h2" className={classes.h2}>
            U doktora -&nbsp;
            <b>
              {visit.doctor.firstname} {visit.doctor.lastname}
            </b>
          </Typography>
          <div className={classes.container}>
            <div className={classes.item}>
              <Typography
                color="textSecondary"
                variant="h2"
                className={classes.h2}
              >
                Powód wizyty
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {visit.reason}
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography
                color="textSecondary"
                variant="h2"
                className={classes.h2}
              >
                Opis wizyty - leki, zalecenia
              </Typography>
              {new Date(visit.date) > new Date() ? (
                <>
                  <Typography color="textSecondary" variant="body1">
                    Wizyta jeszcze się nie odbyła
                  </Typography>{' '}
                </>
              ) : (
                <>
                  <Typography color="textSecondary" variant="body1">
                    {visit.description}
                  </Typography>{' '}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleVisit;
