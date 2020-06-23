import React from 'react';
import './survey.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import MedicalHistory from './medicalHistory';
import Symptoms from './symptoms';
import Systems from './systems';
import ModalDecision from '../../components/modalDecision';
import { useSelector } from 'react-redux';
import {
  selectChronicDiseases,
  selectMedicines,
  selectAllergies,
  selectSymptoms,
  selectSystems,
} from './slice';
import api from '../../api';

function getSteps() {
  return ['Historia chorób', 'Obecne dolegliwości', 'Inne układy'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <MedicalHistory />;
    case 1:
      return <Symptoms />;
    case 2:
      return <Systems />;
    default:
      return 'Unknown stepIndex';
  }
}

const Survey = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [modal, setModal] = React.useState('');
  const steps = getSteps();

  const chronicDiseases = useSelector(selectChronicDiseases);
  const medicines = useSelector(selectMedicines);
  const allergies = useSelector(selectAllergies);
  const symptoms = useSelector(selectSymptoms);
  const systems = useSelector(selectSystems);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleModal = async (value) => {
    setModal(false);
    if (value === 'cancel') {
      handleBack();
    } else {
      const data = { chronicDiseases, medicines, allergies, symptoms, systems };
      const result = await api.insertSurvey(data);
      window.location.replace('https://framista-clinic.herokuapp.com/');
    }
  };

  return (
    <div className="surveycontainer">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="survey__stepper"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <ModalDecision
              openModal={true}
              title="Koniec ankiety"
              body="Czy na pewno chcesz przesłać ankietę"
              closeModal={handleModal}
            />
          </div>
        ) : (
          <div>
            <div className="stepcontent">{getStepContent(activeStep)}</div>
            <div className="survey__buttons">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                WSTECZ
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Koniec' : 'Dalej'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
