import { CoursePart } from '../../data/courseParts';
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const renderAdditionalParts = (part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <h5>{part.description}</h5>
          </>
        );
      case 'background':
        return (
          <>
            <h5>{part.description}</h5>
            <h5>{part.backgroundMaterial}</h5>
          </>
        );
      case 'group':
        return (
          <>
            <h5>Group Project Count: {part.groupProjectCount}</h5>
          </>
        );
      case 'special':
        return (
          <>
            <h5>
              required skill: <span>{part.requirements.join(', ')}</span>
            </h5>
          </>
        );
      default:
        return assertNever(part);
    }
  };
  return (
    <>
      <h2>
        {part.name} {part.exerciseCount}
      </h2>
      {renderAdditionalParts(part)}
    </>
  );
};

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} key={part.name} />;
      })}
    </>
  );
};

export default Content;
