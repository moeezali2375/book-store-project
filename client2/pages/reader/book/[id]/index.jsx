import { useState } from 'react';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import Link from 'next/link';

export default function BookPage({ book }) {
  // Dummy comments data
  const [comments, setComments] = useState([
    { _id: 'c1', text: 'Amazing book!', user: 'John Doe', createdAt: '2024-12-01' },
    { _id: 'c2', text: 'A great read for anyone who loves fiction.', user: 'Jane Doe', createdAt: '2024-12-02' },
  ]);

  const [newComment, setNewComment] = useState('');

  // Add new comment (dummy behavior)
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentData = {
        _id: `c${comments.length + 1}`,
        text: newComment,
        user: 'Guest User',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Book Details */}
      <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
      <p className="text-lg mb-4">{book.description}</p>
      <p className="text-md text-gray-600">Genre: {book.genreId.name}</p>
      <p className="text-md text-gray-600">Author Bio: {book.writerId.biography}</p>
      <Link className="text-blue-500 underline" href={`/reader/author/${book.writerId._id}`}>
        View Details
      </Link>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div>
          {comments.map((comment) => (
            <div key={comment._id} className="border-b py-2">
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-sm text-gray-500">
                By {comment.user} on {comment.createdAt}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

// Server-Side Rendering (SSR) to fetch book details
export async function getServerSideProps(context) {
  const { id } = context.params;
  let book;

  const { req } = context;
  const cookies = cookieParser.JSONCookies(req.headers.cookie);
  if (!cookies)
    return {
      redirect: {
        destination: '/auth',
      }
    }

  try {
    // Fetch the book details from the API
    const response = await axios.get(`http://localhost:4000/api/reader/book/${id}`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true,
    });
    book = response.data.book;
  } catch (error) {
    console.error('Error fetching book details:', error);
    // Fallback dummy book details if API fails
    book = {
      _id: '1',
      title: 'Dummy Book',
      description: 'This is a fallback description for the book.',
      genreId: { name: 'Fallback Genre' },
      writerId: { biography: 'Fallback biography for the author.' },
    };
  }

  return {
    props: {
      book,
    },
  };
}
