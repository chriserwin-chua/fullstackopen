import { Diary } from '../types';

interface Props {
  diaries: Diary[];
}

const DiaryPage = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => {
        return (
          <>
            <h3>Date: {diary.date}</h3>
            <span>weather: {diary.weather}</span>
            <br />
            <span>visibility: {diary.visibility}</span>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default DiaryPage;
