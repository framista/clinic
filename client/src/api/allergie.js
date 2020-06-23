import {api} from './index';

export const getAllAllergies = () => {
    try{
        return api.get('/allergies');
    }catch (err){
        return err;
    }
}
