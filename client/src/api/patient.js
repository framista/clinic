import {api} from './index';

export const insertPatient = payload => {
    try{
        const result = api.post('/patients', payload);
        return result;
    }catch (err){
        return err;
    }
}

export const getPatientLogged = () => api.get('/patients/me');

export const getAllPatients = () => {
    try{
        return api.get('/patients');
    }catch (err){
        return err;
    }
}
