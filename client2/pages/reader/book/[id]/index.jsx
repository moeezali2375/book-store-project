import { useState } from "react";
import cookieParser from "cookie-parser";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import axios from "axios";

export default function BookPage({ book }) {
  const [reviews, setReviews] = useState(book.reviews);
  const { axiosInstance } = useAxios();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleAddReview = async () => {
    try {
      if (newRating > 0 && newComment.trim() !== "") {
        const newReview = {
          star: newRating,
          description: newComment,
        };
        const res = await axiosInstance.post(
          `/reader/${book._id}/review`,
          newReview,
        );
        setReviews([...res.data.book.reviews]);
        setNewRating(0);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Book Details */}
      <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
      <p className="text-lg mb-4">{book.description}</p>
      <p className="text-md text-gray-600">Genre: {book.genreId.name}</p>
      <p className="text-md text-gray-600">
        Author Bio: {book.writerId.biography}
      </p>
      <Link
        className="text-blue-500 underline"
        href={`/reader/author/${book.writerId._id}`}
      >
        View Details
      </Link>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div>
          {reviews &&
            reviews.map((review) => (
              <div key={review._id} className="border-b py-2">
                <p className="text-yellow-500">
                  Rating: {"★".repeat(review.star)}
                </p>
                <p className="text-gray-800">{review.description}</p>
                <p className="text-sm text-gray-500">
                  By {review.postedBy.userId.name}
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
                className={`text-xl ${
                  newRating >= star ? "text-yellow-500" : "text-gray-400"
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
        destination: "/auth",
      },
    };

  try {
    // Fetch the book details from the API
    const response = await axios.get(
      `http://localhost:4000/api/reader/book/${id}`,
      {
        headers: {
          Cookie: cookies,
        },
        withCredentials: true,
      },
    );
    book = response.data.book;
    console.log(book);
  } catch (error) {
    console.error("Error fetching book details:", error);
    // Fallback dummy book details if API fails
    book = {
      _id: "1",
      title: "Dummy Book",
      description: "This is a fallback description for the book.",
      genreId: { name: "Fallback Genre" },
      writerId: { biography: "Fallback biography for the author." },
    };
  }

  return {
    props: {
      book,
    },
  };
}
