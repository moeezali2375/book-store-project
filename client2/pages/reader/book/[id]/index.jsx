import { useState } from 'react';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import Link from 'next/link';

export default function BookPage({ book }) {
  // Dummy data for ratings and comments
  const [reviews, setReviews] = useState([
    { _id: 'r1', stars: 5, text: 'Amazing book!', user: 'John Doe', createdAt: '2024-12-01' },
    { _id: 'r2', stars: 4, text: 'A great read for anyone who loves fiction.', user: 'Jane Doe', createdAt: '2024-12-02' },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  // Add new review (rating + comment)
  const handleAddReview = () => {
    if (newRating > 0 && newComment.trim() !== '') {
      const newReview = {
        _id: `r${reviews.length + 1}`,
        stars: newRating,
        text: newComment,
        user: 'Guest User',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setReviews([...reviews, newReview]);
      setNewRating(0); // Reset the rating selection
      setNewComment(''); // Reset the comment field
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

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div>
          {reviews.map((review) => (
            <div key={review._id} className="border-b py-2">
              <p className="text-yellow-500">Rating: {'★'.repeat(review.stars)}</p>
              <p className="text-gray-800">{review.text}</p>
              <p className="text-sm text-gray-500">
                By {review.user} on {review.createdAt}
              </p>
            </div>
          ))}
        </div>

        {/* Add Review */}
        <div className="mt-4">
          <p className="text-md font-semibold mb-2">Add Your Review:</p>
          {/* Star Rating */}
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className={`text-xl ${newRating >= star ? 'text-yellow-500' : 'text-gray-400'
                  } hover:text-yellow-500`}
              >
                ★
              </button>
            ))}
          </div>
          {/* Comment Input */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="w-full p-2 border rounded mb-2"
          ></textarea>
          <button
            onClick={handleAddReview}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Review
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
      },
    };

  try {
    // Fetch the book details from the API
    const response = await axios.get(`http://localhost:4000/api/reader/book/${id}`, {
      headers: {
        Cookie: cookies,
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
