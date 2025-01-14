import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Diary, DiaryFormValues, ValidationError } from './types';

import diariesService from './services/diaries';
import DiaryPage from './components/DiaryPage';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [entryError, setEntryError] = useState<string>('');

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiariesList = async () => {
      const diaries = await diariesService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  const addDiaryEntry = async (data: DiaryFormValues) => {
    //console.log('addDiaryEntry', data);
    // const diary = await diariesService.create(data);
    // setDiaries(diaries.concat(diary));

    try {
      const diary = await diariesService.create(data);
      setDiaries(diaries.concat(diary));
      setEntryError('');
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.error(error.response);
        // Do something with this error...
        setEntryError(error.response?.data.toString() ?? '');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <DiaryForm addDiaryEntry={addDiaryEntry} entryError={entryError} />
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Diary List
          </Typography>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<DiaryPage diaries={diaries} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
