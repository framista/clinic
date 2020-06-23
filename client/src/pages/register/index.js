import React from 'react';
import api from '../../api';
import './register.css';
import { useForm } from 'react-hook-form';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AlertDialog from '../../components/modal';

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [errorModal, setErrorModal] = React.useState('');

  const [successModal, setSuccessModal] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleError = () => {
    setErrorModal(false);
  };

  const handleSuccess = () => {
    window.location.replace('https://framista-clinic.herokuapp.com/login');
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await api.insertPatient(data);
      setSuccessModal(true);
    } catch (err) {
      setErrorModal(err);
    }
  };

  return (
    <div className="registercontainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.firstname}>
              Imię
            </InputLabel>
            <Input
              aria-describedby="my-helper-text"
              name="firstname"
              value={values.firstname}
              onChange={handleChange('firstname')}
              error={!!errors.firstname}
              inputRef={register({
                required: true,
              })}
            />
            {errors.firstname && errors.firstname.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.lastname}>
              Nazwisko
            </InputLabel>
            <Input
              aria-describedby="my-helper-text"
              name="lastname"
              value={values.lastname}
              onChange={handleChange('lastname')}
              error={!!errors.lastname}
              inputRef={register({
                required: true,
              })}
            />
            {errors.lastname && errors.lastname.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.phone}>
              Telefon
            </InputLabel>
            <Input
              aria-describedby="my-helper-text"
              name="phone"
              value={values.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: 'Niepoprawny numer',
                },
              })}
            />
            {errors.phone && errors.phone.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
            {errors.phone && errors.phone.type === 'pattern' && (
              <FormHelperText error>{errors.phone.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.email}>
              Email
            </InputLabel>
            <Input
              error={!!errors.email}
              name="email"
              aria-describedby="my-helper-text"
              value={values.email}
              onChange={handleChange('email')}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Niepoprawny email',
                },
              })}
            />
            {errors.email && errors.email.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <FormHelperText error size="small">
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl margin="dense">
            <InputLabel
              htmlFor="standard-adornment-password"
              error={!!errors.password}
            >
              Hasło
            </InputLabel>
            <Input
              id="standard-adornment-password"
              aria-describedby="my-helper-text"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onChange={handleChange('password')}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputRef={register({
                required: true,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <FormHelperText error>Pole wymagane</FormHelperText>
            )}
          </FormControl>
          <Button href="/login" size="small">
            Zaloguj
          </Button>
          <FormControl margin="dense">
            <Button
              onClick={handleSubmit(onSubmit)}
              size="large"
              color="primary"
              variant="contained"
            >
              Zarejestruj
            </Button>
          </FormControl>
        </FormGroup>
      </form>
      {errorModal && (
        <AlertDialog
          openModal={true}
          title="Błąd rejestracji"
          body="Nie można utworzyć użytkownika"
          closeModal={handleError}
        ></AlertDialog>
      )}
      {successModal && (
        <AlertDialog
          openModal={true}
          title="Dodano użytkownika"
          body="Pacjent został prawidłowo zarejestrowany"
          closeModal={handleSuccess}
        ></AlertDialog>
      )}
    </div>
  );
};

export default Register;
