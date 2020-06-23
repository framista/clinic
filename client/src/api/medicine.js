import {api} from './index';

export const getAllMedicines = () => {
    try{
        return api.get('/medicines');
    }catch (err){
        return err;
    }
}
