import {
  Button,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { DiaryFormValues, Visibility, Weather } from '../types';
interface Props {
  addDiaryEntry: (values: DiaryFormValues) => void;
  entryError: string;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}
interface WeatherOption {
  value: Weather;
  label: string;
}
const visibilityOption: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const weatherOption: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));
const DiaryForm = ({ addDiaryEntry, entryError }: Props) => {
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.GREAT);
  const [weather, setWeather] = useState<Weather>(Weather.CLOUDY);

  const handleAddDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    //console.log({ date, comment, visibility, weather });
    addDiaryEntry({ date, comment, visibility, weather });
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {entryError && <span style={{ color: 'red' }}>{entryError}</span>}
      <form onSubmit={handleAddDiaryEntry}>
        <InputLabel htmlFor="date">Date</InputLabel>
        <Input
          id="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
        />
        <br />
        <FormLabel id="visibility">Visibility</FormLabel>
        <RadioGroup
          row
          aria-labelledby="visibility"
          name="visibility-group"
          value={visibility as Visibility}
          onChange={({ target }) => setVisibility(target.value as Visibility)}
        >
          {visibilityOption.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <br />
        <FormLabel id="weather">Weather</FormLabel>
        <RadioGroup
          row
          aria-labelledby="weather"
          name="weather-group"
          value={weather}
          onChange={({ target }) => setWeather(target.value as Weather)}
        >
          {weatherOption.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <InputLabel htmlFor="comment">Comment</InputLabel>
        <Input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default DiaryForm;
