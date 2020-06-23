import { api } from './index';

export const insertSurvey = (payload) => {
  try {
    const result = api.post('/surveys', payload);
    return result;
  } catch (err) {
    return err;
  }
};

export const getAllSurveys = (_id) => {
  try {
    return api.get(`/surveys?id=${_id}`);
  } catch (err) {
    return err;
  }
};
