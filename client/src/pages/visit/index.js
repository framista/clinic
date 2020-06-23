import React from 'react';
import './visit.css';
import {
  FormGroup,
  FormControl,
  Button,
  TextField,
  Chip,
  Avatar,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { setDateForDays, setDateForYears, validDate } from '../../helper';
import api from '../../api';
import AlertDialog from '../../components/modal';

const Visit = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [doctors, setDoctors] = React.useState([]);
  const times = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
  ];
  const minDate = setDateForDays(1);
  const maxDate = setDateForYears(15);
  const [selectedDate, setSelectedDate] = React.useState(setDateForDays(1));
  const [selectedDateError, setSelectedDateError] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState('');
  const [selectedDoctorError, setSelectedDoctorError] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedTimeError, setSelectedTimeError] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState('');
  const [successModal, setSuccessModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getAllDoctors();
      setDoctors(result.data);
    };
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    const isDateInvalid = !validDate(date);
    setSelectedDateError(isDateInvalid);
    setSelectedDate(date);
  };

  const handleError = () => {
    setErrorModal(false);
  };

  const handleSuccess = () => {
    window.location.replace('https://framista-clinic.herokuapp.com/visit/list');
  };

  const onSubmit = async (data) => {
    const isDoctorSelected = selectedDoctor.length > 0 ? true : false;
    setSelectedDoctorError(!isDoctorSelected);
    const isTimeSelected = selectedTime.length > 0 ? true : false;
    setSelectedTimeError(!isTimeSelected);
    if (!selectedDoctorError && !selectedDateError && !selectedTimeError) {
      const visitData = {
        reason: selectedReason,
        date: data.date,
        time: selectedTime,
        doctor: selectedDoctor,
      };
      try {
        const result = await api.insertVisit(visitData);
        console.log(result);
        setSuccessModal(true);
      } catch (err) {
        setErrorModal(err);
      }
    }
  };

  return (
    <div className="visitcontainer">
      <form className="visit__form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.reason}>
              Powód wizyty
            </InputLabel>
            <Input
              id="my-input"
              error={!!errors.reason}
              name="reason"
              aria-describedby="my-helper-text"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              inputRef={register({
                required: true,
              })}
            />
            {errors.reason && errors.reason.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <FormControl style={{ marginTop: '10px' }}>
            <InputLabel error={selectedDoctorError}>Lekarz</InputLabel>
            <Select
              onChange={(e) => setSelectedDoctor(e.target.value)}
              renderValue={(value) => {
                const doctorIndex = doctors.findIndex((d) => d._id === value);
                const { firstname, lastname, picture } = doctors[doctorIndex];
                setSelectedDoctorError(false);
                return (
                  <Chip
                    avatar={<Avatar alt="image" src={picture} />}
                    variant="outlined"
                    style={{ fontSize: '16px', padding: '5px' }}
                    label={`${firstname} ${lastname}`}
                  />
                );
              }}
            >
              {doctors.map((d) => (
                <MenuItem key={d._id} value={d._id}>
                  {' '}
                  <Avatar
                    alt="image"
                    src={d.picture}
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '10px',
                    }}
                  />
                  {d.firstname} {d.lastname}
                </MenuItem>
              ))}
            </Select>
            {selectedDoctorError && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Data wizyty"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                name="date"
                inputRef={register}
                disablePast="true"
                minDate={minDate}
                maxDate={maxDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl style={{ marginTop: '10px' }}>
            <InputLabel error={selectedTimeError}>Godzina wizyty</InputLabel>
            <Select
              onChange={(e) => setSelectedTime(e.target.value)}
              renderValue={(value) => {
                setSelectedTimeError(false);
                return value;
              }}
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            {selectedTimeError && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <FormControl style={{ margin: '15px 0px' }}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              {' '}
              Umów wizytę
            </Button>
          </FormControl>
        </FormGroup>
      </form>
      {errorModal && (
        <AlertDialog
          openModal={true}
          title="Błąd rejestracji wizyty"
          body="Nie można utworzyć wizyty. Proszę wybrać inny termin albo zmień lekarza."
          closeModal={handleError}
        ></AlertDialog>
      )}
      {successModal && (
        <AlertDialog
          openModal={true}
          title="Dodano wizytę"
          body="Twoja wizyta została prawidłowo zarejestrowana"
          closeModal={handleSuccess}
        ></AlertDialog>
      )}
    </div>
  );
};

export default Visit;
