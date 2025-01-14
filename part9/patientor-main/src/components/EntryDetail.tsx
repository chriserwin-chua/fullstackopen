import React, { useEffect, useState } from 'react';
import {
  Diagnosis,
  Entry,
  EntryType,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import diagnosisService from '../services/diagnosis';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntryComponent = ({
  entry,
}: {
  entry: HospitalEntry;
  diagnosis: Diagnosis[];
}) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosis();
  }, []);
  return (
    <>
      <h5>
        {entry.date} - {entry.description} <LocalHospitalIcon />
      </h5>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li>
              {code} -{' '}
              {
                diagnosis.find((diagnosisCode) => diagnosisCode.code === code)
                  ?.name
              }
            </li>
          );
        })}
      </ul>
      Discharge Details
      <br />
      Criteria: {entry.discharge.criteria}
      <br />
      Date: {entry.discharge.date}
    </>
  );
};
const HealthCheckComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <h5>
        {entry.date} <MedicalInformationIcon />
      </h5>
      {entry.description}
      <br />
      Health Rating: {entry.healthCheckRating}
      <br />
      Diagnosed by: {entry.specialist}
    </>
  );
};
const OccupationalHealthcareComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <h5>
        {entry.date} <WorkIcon /> - {entry.employerName}
      </h5>
      {entry.description}
      <br />
      Diagnosed by: {entry.specialist}
    </>
  );
};

export const EntryDetail: React.FC<{
  entry: Entry;
  diagnosis: Diagnosis[];
}> = ({ entry, diagnosis }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryComponent entry={entry} diagnosis={diagnosis} />;
    case EntryType.HealthCheck:
      return <HealthCheckComponent entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

//9.26: Patientor, step 6
