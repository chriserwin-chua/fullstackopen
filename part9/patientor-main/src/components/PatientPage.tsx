import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Diagnosis,
  EntryFormValues,
  EntryType,
  Gender,
  Patient,
} from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { EntryDetail } from './EntryDetail';
import NewEntryModal from './NewEntryModal';
import { Button } from '@mui/material';
import axios from 'axios';
const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [entryType, setEntryType] = useState<EntryType>(EntryType.Hospital);

  useEffect(() => {
    if (id) {
      const fetchPatientList = async () => {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      };
      void fetchPatientList();
      const fetchDiagnosis = async () => {
        const diagnosis = await diagnosisService.getAll();
        setDiagnosis(diagnosis);
      };
      void fetchDiagnosis();
    }
  }, [id]);

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return <MaleIcon />;
    }
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (entryType: EntryType): void => {
    setModalOpen(true);
    setEntryType(entryType);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (id) {
      //validate form
      let errorMessages = '';
      if (values.description == '') {
        errorMessages += 'Description, ';
      }
      if (values.date == '') errorMessages += 'Date, ';
      if (values.specialist == '') errorMessages += 'Specialist, ';
      if (values.diagnosisCodes?.length == 0) errorMessages += 'Diagnosis, ';

      if (values.type === EntryType.OccupationalHealthcare) {
        if (values.employerName == '') errorMessages += 'Employer name, ';
        if (values.sickLeave?.startDate == '')
          errorMessages += 'Sick leave start date, ';
        if (values.sickLeave?.endDate == '')
          errorMessages += 'Sick leave end date, ';
      } else if (values.type === EntryType.Hospital) {
        if (values.discharge?.date == '') errorMessages += 'Discharge date,';
        if (values.discharge?.criteria == '')
          errorMessages += 'Discharge criteria, ';
      }
      if (errorMessages == '') {
        try {
          const updatedEntries = await patientService.createNewEntry(
            id,
            values
          );
          //const updatedPatientDetials = patient?.entries.concat(entry) ?? [];
          patient!.entries = updatedEntries;
          setPatient(patient);
          setModalOpen(false);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === 'string') {
              const message = e.response.data.replace(
                'Something went wrong. Error: ',
                ''
              );
              console.error(message);
              setError(message);
            } else {
              setError('Unrecognized axios error');
            }
          } else {
            console.error('Unknown error', e);
            setError('Unknown error');
          }
        }
      } else {
        console.log(errorMessages);
        setError(`Missing fields: ${errorMessages.replace(/,\s*$/, '')}`);
      }
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>Patient Page</h2>
      <h3>
        {patient.name} {renderGenderIcon(patient.gender)}
      </h3>
      <h4>
        <span>ssn: {patient.ssn}</span>
      </h4>
      <h4>
        <span>occupation: {patient.occupation}</span>
      </h4>
      <h4>entries</h4>
      <div style={{ display: 'flex', gap: '5px' }}>
        <Button
          variant="contained"
          onClick={() => openModal(EntryType.Hospital)}
        >
          Add New Hospital Entry
        </Button>
        <Button
          variant="contained"
          onClick={() => openModal(EntryType.OccupationalHealthcare)}
        >
          Add New Occupational Entry
        </Button>
        <Button
          variant="contained"
          onClick={() => openModal(EntryType.HealthCheck)}
        >
          Add New Health Check Entry
        </Button>
      </div>
      {patient.entries.map((entry) => {
        return (
          <div
            style={{
              border: 1,
              borderColor: 'black',
              borderRadius: '5px',
              borderStyle: 'solid',
              marginBottom: '5px',
              justifyContent: 'start',
            }}
            key={entry.id}
          >
            <EntryDetail entry={entry} diagnosis={diagnosis} />
          </div>
        );
        //   <>
        //     <h5>
        //       {entry.date} - {entry.description}
        //     </h5>
        //     <ul>
        //       {entry.diagnosisCodes?.map((code) => {
        //         return (
        //           <li>
        //             {code} -{' '}
        //             {
        //               diagnosis.find(
        //                 (diagnosisCode) => diagnosisCode.code === code
        //               )?.name
        //             }
        //           </li>
        //         );
        //       })}
        //     </ul>
        //   </>
        // );
      })}
      <NewEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        entryType={entryType}
        diagnosis={diagnosis}
      />
    </div>
  );
};

export default PatientPage;
