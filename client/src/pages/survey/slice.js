import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chronicDiseases: [],
    medicines: [],
    allergies: [],
    symptoms: {
        "place": "",
        "frequency": "",
        "factor": "",
        "grade": "",
        "symptoms": "", 
    },
    systems: [
        {
            content: "Objawy ogólne", options: [
                { content: "gorączka", value: false },
                { content: "osłabienie", value: false },
                { content: "zmiana masy ciała", value: false },
                { content: "zaburzenia apetytu", value: false },
            ]
        },
        {
            content: "Układ oddechowy", options: [
                { content: "kaszel", value: false },
                { content: "katar", value: false },
                { content: "chrypka", value: false },
                { content: "ból przy oddychaniu", value: false },
            ]
        },
        {
            content: "Układ krążeniowo – naczyniowy", options: [
                { content: "duszność spoczynkowa", value: false },
                { content: "bóle w klatce piersiowej", value: false },
                { content: "chromanie przestankowe", value: false },
                { content: "kołatanie serc", value: false },
            ]
        },
        {
            content: "Układ trawienny", options: [
                { content: "zaburzenia połykania", value: false },
                { content: "wymioty", value: false },
                { content: "zaparcia", value: false },
                { content: "biegunki", value: false },
            ]
        },
        {
            content: "Układ moczowo – płciowy", options: [
                { content: "częstomocz", value: false },
                { content: "krwiomocz", value: false },
                { content: "ból podbrzusza", value: false },
                { content: "pieczenie", value: false },
            ]
        },
        {
            content: "Układ ruchu", options: [
                { content: "bóle i obrzęki stawów", value: false },
                { content: "sztywność stawów", value: false },
                { content: "zaczerwienienie", value: false },
            ]
        },
        {
            content: "Układ nerwowy", options: [
                { content: "zaburzenia równowagi", value: false },
                { content: "zaburzenia widzenia", value: false },
                { content: "zaburzenia chodu", value: false },
                { content: "bóle głowy", value: false },
            ]
        },
        {
            content: "Zmiany skórne", options: [
                { content: "grudki", value: false },
                { content: "guzy", value: false },
                { content: "owrzodzenia", value: false },
                { content: "wysypki", value: false },
            ]
        },
    ]
};

const slice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setArrayData: (state, action) => {
            const { type, values } = action.payload;
            switch (type) {
                case 'chronicDiseases':
                    state.chronicDiseases = values;
                    break
                case 'medicines':
                    state.medicines = values;
                    break
                case 'allergies':
                    state.allergies = values;
                    break
            }
        },
        toogleOptionInSystem: (state, action) => {
            const { systemIndex, optionIndex} = action.payload;
            state.systems[systemIndex].options[optionIndex].value = !state.systems[systemIndex].options[optionIndex].value;
        },
        setSymptom: (state, action) => {
            const {key, value} = action.payload;
            state.symptoms[key] = value;
        }
    }
});

export const { setArrayData, toogleOptionInSystem, setSymptom } = slice.actions;

export const selectChronicDiseases = state => state.survey.chronicDiseases;
export const selectMedicines = state => state.survey.medicines;
export const selectAllergies = state => state.survey.allergies;
export const selectSymptoms = state => state.survey.symptoms;
export const selectSystems = state => state.survey.systems;

export default slice.reducer;