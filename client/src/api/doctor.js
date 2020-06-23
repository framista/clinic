import {api} from './index';

export const getAllDoctors = () => {
    try{
        return api.get('/doctors');
    }catch (err){
        return err;
    }
}
