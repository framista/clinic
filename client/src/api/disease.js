import {api} from './index';

export const getAllDiseases = () => {
    try{
        return api.get('/diseases');
    }catch (err){
        return err;
    }
}
