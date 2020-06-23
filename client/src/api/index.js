import axios from 'axios';
import { insertPatient, getPatientLogged, getAllPatients } from './patient';
import { getAllDoctors } from './doctor';
import { getAllMedicines } from './medicine';
import { getAllAllergies } from './allergie';
import { getAllDiseases } from './disease';
import { insertSurvey, getAllSurveys } from './survey';
import {
  insertVisit,
  getAllVisits,
  getVisitById,
  deleteVisitById,
} from './visit';

export const api = axios.create({
  baseURL: 'https://framista-clinic.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('key-jwt'),
  },
});

const apis = {
  insertPatient,
  getPatientLogged,
  getAllPatients,
  getAllDoctors,
  getAllMedicines,
  getAllAllergies,
  getAllDiseases,
  insertSurvey,
  getAllSurveys,
  insertVisit,
  getAllVisits,
  getVisitById,
  deleteVisitById,
};

export default apis;
