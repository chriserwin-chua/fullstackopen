import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import EditAuthor from './EditAuthor';

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return 'loading authors...';
  }
  const authors = result.data.allAuthors;
  if (!authors) {
    return null;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Edit birthyear</h2>
      <div style={{ width: 300 }}>
        <EditAuthor authors={authors} />
      </div>
    </div>
  );
};

export default Authors;
