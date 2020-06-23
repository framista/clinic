import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import './medicalHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectChronicDiseases,
    selectMedicines,
    selectAllergies,
    setArrayData,
} from '../slice';
import api from '../../../api';

const MedicalHistory = () => {

    const dispatch = useDispatch();
    const chronicDiseases = useSelector(selectChronicDiseases);
    const medicines = useSelector(selectMedicines);
    const allergies = useSelector(selectAllergies);
    const [diseasesTab, setDiseasesTab] = useState([]);
    const [medicinesTab, setMedicinesTab] = useState([]);
    const [allergiesTab, setAllergiesTab] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = await api.getAllMedicines();
            const medicines = result.data.map( e => e.name);
            setMedicinesTab(medicines);
            result = await api.getAllAllergies();
            const allergies = result.data.map( e => e.name);
            setAllergiesTab(allergies);
            result = await api.getAllDiseases();
            const diseases = result.data.map( e => e.name);
            setDiseasesTab(diseases);
        }
        fetchData();
    }, []);

    return (
        <FormGroup className="medicalHistorycontainer">
            <FormControl style={{ marginTop: '20px' }}>
                <Autocomplete
                    multiple
                    options={diseasesTab}
                    defaultValue={[...chronicDiseases]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Choroby przewlekłe"
                            placeholder="Wybierz choroby"
                        />
                    )}
                    onChange={(event, values) => {
                        dispatch(setArrayData({ type: 'chronicDiseases', values }))
                    }}
                />
            </FormControl>
            <FormControl style={{ marginTop: '20px' }}>
                <Autocomplete
                    multiple
                    options={medicinesTab}
                    defaultValue={[...medicines]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Stosowane leki"
                            placeholder="Wybierz leki"
                        />
                    )}
                    onChange={(event, values) => {
                        dispatch(setArrayData({ type: 'medicines', values }))
                    }}
                />
            </FormControl>
            <FormControl style={{ marginTop: '20px' }}>
                <Autocomplete
                    multiple
                    options={allergiesTab}
                    defaultValue={[...allergies]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Alergie"
                            placeholder="Wybierz alergie"
                        />
                    )}
                    onChange={(event, values) => {
                        dispatch(setArrayData({ type: 'allergies', values }))
                    }}
                />
            </FormControl>
        </FormGroup>
    )

}


export default MedicalHistory;