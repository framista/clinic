import { combineReducers } from 'redux';
import surveySliceReducer from '../pages/survey/slice';

export default combineReducers({
    survey: surveySliceReducer,
})