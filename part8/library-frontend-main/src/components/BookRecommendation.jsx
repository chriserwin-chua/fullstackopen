import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
const BookRecommendation = (props) => {
  if (!props.show) {
    return null;
  }

  const { genre } = props;
  //const result = useQuery(ALL_BOOKS);
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  if (loading) {
    return 'loading books...';
  }
  const books = data.allBooks;

  if (!books) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(genre))
            .map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookRecommendation;
