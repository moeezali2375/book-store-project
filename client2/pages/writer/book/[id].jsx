import React, { useState } from "react";
import { useRouter } from "next/router";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import cookieParser from "cookie-parser";

const EditBookPage = ({ book, genres, review }) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  const [bookDetails, setBookDetails] = useState({
    title: book.title,
    genreId: book.genreId._id,
    description: book.description,
    content: book.content,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/writer/book/${book._id}`, bookDetails);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

      {/* Display review */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Reviews:{" "}
          {review === 0 ? (
            <span>No reviews have been given</span>
          ) : (
            <span>{review} out of 5</span>
          )}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookDetails.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="genreId"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genreId"
            name="genreId"
            value={bookDetails.genreId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="" disabled>
              Select a genre
            </option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={bookDetails.description}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={bookDetails.content}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Book
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

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
    const bookRes = await axios.get(
      `http://localhost:4000/api/writer/book/${id}`,
      {
        headers: {
          Cookie: cookies,
        },
        withCredentials: true,
      },
    );

    const genresRes = await axios.get("http://localhost:4000/api/genre", {
      headers: {
        Cookie: cookies,
      },
      withCredentials: true,
    });

    return {
      props: {
        book: bookRes.data.book,
        genres: genresRes.data.genres,
        review: bookRes.data.review,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default EditBookPage;
