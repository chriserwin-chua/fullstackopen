import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import {
  Diagnosis,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
} from '../../types';

interface Props {
  entryType: EntryType;
  diagnosis: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

type HealthRatingType = keyof typeof HealthCheckRating;
interface HealthRatingOption {
  value: HealthRatingType;
  label: string;
}

const healthRatingOptions: HealthRatingOption[] = Object.keys(HealthCheckRating)
  .filter((key) => isNaN(Number(key)))
  .map((v) => ({
    value: v as HealthRatingType,
    label: v.toString(),
  }));

interface DiagnosisOption {
  value: string;
  label: string;
}
const NewEntryForm = ({ entryType, onCancel, onSubmit, diagnosis }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickStartDate, setSickStartDate] = useState('');
  const [sickEndDate, setSickEndDate] = useState('');

  const [healthRating, setHealthRating] = useState<HealthRatingType>('Healthy');

  const diagnosisOptions: DiagnosisOption[] = diagnosis.map((code) => ({
    value: code.code,
    label: `${code.code} ${code.name} `,
  }));

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryType === EntryType.HealthCheck) {
      onSubmit({
        description,
        date,
        specialist,
        type: EntryType.HealthCheck,
        diagnosisCodes: diagnosisCodes,
        healthCheckRating: HealthCheckRating[healthRating],
      });
    } else if (entryType === EntryType.OccupationalHealthcare) {
      onSubmit({
        description,
        date,
        specialist,
        type: EntryType.OccupationalHealthcare,
        diagnosisCodes: diagnosisCodes,
        employerName: employerName,
        sickLeave: {
          startDate: sickStartDate,
          endDate: sickEndDate,
        },
      });
    } else if (entryType === EntryType.Hospital) {
      onSubmit({
        description,
        date,
        specialist,
        type: EntryType.Hospital,
        diagnosisCodes: diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: criteria,
        },
      });
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const rating = Object.keys(HealthCheckRating).find(
        (g) => g.toString() === value
      ) as HealthRatingType;
      if (rating) {
        setHealthRating(rating);
      }
    }
  };

  const onDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const renderAdditionalFields = (entryType: EntryType) => {
    if (entryType === EntryType.Hospital) {
      return (
        <>
          <Stack>
            <InputLabel htmlFor="discharge-date">Discharge Date</InputLabel>
            <Input
              id="discharge-date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              type="date"
            />
          </Stack>
          <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </>
      );
    } else if (entryType === EntryType.OccupationalHealthcare) {
      return (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
          <InputLabel htmlFor="start-date">Start Date</InputLabel>
          <Stack>
            <Input
              id="start-date"
              value={sickStartDate}
              onChange={({ target }) => setSickStartDate(target.value)}
              type="date"
            />
            <InputLabel htmlFor="end-date">End Date</InputLabel>
            <Input
              id="end-date"
              value={sickEndDate}
              onChange={({ target }) => setSickEndDate(target.value)}
              type="date"
            />
          </Stack>
        </>
      );
    } else if (entryType === EntryType.HealthCheck) {
      return (
        <>
          <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
          <Select
            label="Health Rating"
            fullWidth
            value={healthRating}
            onChange={onHealthCheckRatingChange}
          >
            {healthRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={addEntry}
        style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}
      >
        <h2>{entryType}</h2>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Stack>
          <InputLabel htmlFor="date">Date</InputLabel>
          <Input
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="date"
          />
        </Stack>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {/* <TextField
          label="Diagnosis Code"
          fullWidth
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
        /> */}
        <InputLabel style={{ marginTop: 20 }}>Diagnosis</InputLabel>
        <Select
          label="Diagnosis"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodeChange}
          multiple
        >
          {diagnosisOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {renderAdditionalFields(entryType)}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewEntryForm;
