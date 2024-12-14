import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className="p-2 border-2 border-gray-400 my-4">
      <Link to={`/blogs/${blog.id}`} className="hover:underline hover:text-blue-500">
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};
export default Blog;
