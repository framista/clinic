import { api } from './index';

export const getAllVisits = (option, _id) => {
  try {
    return api.get(`/visits?option=${option}&_id=${_id}`);
  } catch (err) {
    return err;
  }
};

export const insertVisit = (payload) => {
  try {
    const result = api.post('/visits', payload);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getVisitById = (id) => {
  try {
    return api.get(`/visits/${id}`);
  } catch (err) {
    return err;
  }
};

export const deleteVisitById = (id) => {
  try {
    return api.delete(`/visits/${id}`);
  } catch (err) {
    return err;
  }
};
