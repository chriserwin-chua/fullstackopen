import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const avgFeedback = totalFeedback ? (good - bad) / totalFeedback : 0;
  const positiveFeedback = totalFeedback ? (good / totalFeedback) * 100 : 0;
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={totalFeedback} />
          <StatisticLine text="Average" value={avgFeedback} />
          <StatisticLine text="Positive" value={`${positiveFeedback}%`} />
        </tbody>
      </table>
    </>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = 0;
  const average = 0;
  const positive = 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
