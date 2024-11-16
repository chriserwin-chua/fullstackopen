import React from 'react';

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts;
  const total = parts.reduce((s, p) => (s += p.exercises), 0);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>Total of {total} exercises</p>
    </>
  );
};

export default Content;
