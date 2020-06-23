import React from 'react';
import axios from 'axios';
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
import './login.css';

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [errorModal, setErrorModal] = React.useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      const token = await axios.post(
        'https://framista-clinic.herokuapp.com/api/auth',
        data
      );
      localStorage.setItem('key-jwt', token.data);
      const urlSelected =
        localStorage.getItem('selectedSite') ||
        'https://framista-clinic.herokuapp.com/';
      window.location.replace(urlSelected);
    } catch (err) {
      console.log(err);
      setErrorModal(err);
    }
  };

  const handleError = () => {
    setErrorModal(false);
  };

  return (
    <div className="logincontainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl margin="dense">
            <InputLabel htmlFor="my-input" error={!!errors.email}>
              Email
            </InputLabel>
            <Input
              id="my-input"
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
              name="password"
              error={!!errors.password}
              aria-describedby="my-helper-text"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              inputRef={register({ required: true })}
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
            />
            {errors.password && errors.password.type === 'required' && (
              <FormHelperText error size="small">
                Pole wymagane
              </FormHelperText>
            )}
          </FormControl>
          <Button href="/register" size="small">
            Zarejestruj
          </Button>
          <FormControl margin="dense">
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Zaloguj
            </Button>
          </FormControl>
        </FormGroup>
      </form>
      {errorModal && (
        <AlertDialog
          openModal={true}
          title="Błąd logowania"
          body="Podano nieprawidłowe email lub hasło"
          closeModal={handleError}
        ></AlertDialog>
      )}
    </div>
  );
};

export default Login;
