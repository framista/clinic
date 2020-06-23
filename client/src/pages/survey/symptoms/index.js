import React from 'react';
import './symptoms.css';
import { FormGroup, FormControl, InputLabel, TextareaAutosize } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSymptoms,
    setSymptom,
} from '../slice';

const Symptoms = () => {

    const { place, frequency, factor, grade, symptoms } = useSelector(selectSymptoms);
    const dispatch = useDispatch();

    const handleText = (e) => {
        dispatch(setSymptom({"key": e.target.id, "value": e.target.value}))
    }

    return (
        <FormGroup className="symptomscontainer">
            <FormControl >
                <label class="symptoms__label" htmlFor="place">Umiejscowienie</label>
                <textarea
                    className="symptoms__textarea"
                    rows={3}
                    id="place"
                    placeholder="Opisz miejsce bólu"
                    onChange={handleText}
                >
                    {place}
                </textarea>
            </FormControl>
            <FormControl >
                <label class="symptoms__label" htmlFor="frequency">Częstość występowania</label>
                <textarea
                    className="symptoms__textarea"
                    rows={3}
                    id="frequency"
                    placeholder="Jak często wystepują dolegliwości?"
                    onChange={handleText}
                >
                    {frequency}
                </textarea>
            </FormControl>
            <FormControl >
                <label class="symptoms__label" htmlFor="factor">Czynniki zaostrzające ból</label>
                <textarea
                    className="symptoms__textarea"
                    rows={3}
                    id="factor"
                    placeholder="Jakie czynniki zaostarzają ból?"
                    onChange={handleText}
                >
                    {factor}
                </textarea>
            </FormControl>
            <FormControl >
                <label class="symptoms__label" htmlFor="grade">Stopień nasilenia</label>
                <textarea
                    className="symptoms__textarea"
                    rows={3}
                    id="grade"
                    placeholder="Jaki jest stopień nasilenia bólu?"
                    onChange={handleText}
                >
                    {grade}
                </textarea>
            </FormControl>
            <FormControl >
                <label class="symptoms__label" htmlFor="symptoms">Objawy towarzyszące</label>
                <textarea
                    className="symptoms__textarea"
                    rows={3}
                    id="symptoms"
                    placeholder="Czy występują objawy towarzyszące?"
                    onChange={handleText}
                >
                    {symptoms}
                </textarea>
            </FormControl>
        </FormGroup>
    )

}

export default Symptoms;