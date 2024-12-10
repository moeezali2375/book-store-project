"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";


const ReaderPage = () => {
  const [books, setBooks] = useState<any[]>([]); // All books
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]); // Books that the user has favorited
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  // Fetch all books and favorite books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios("/reader/book");

        const data = await response.data;
        setBooks(data.books);
      } catch (error) {
        setError("Error fetching books");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios("/reader");

        const data = await response.data;
        setFavoriteBooks(data.reader.favoriteBooks);
      } catch (error) {
        setError("Error fetching favorite books");
        console.error(error);
      }
    };

    fetchBooks();
    fetchFavorites();
  }, []);

  const addToFavorites = async (bookId: string) => {
    try {
      const response = await axios.post(
        "/reader/book",
        { bookId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Assuming the response data includes the updated favorite books
      setFavoriteBooks(response.data.reader.favoriteBooks); // Update favorite books
    } catch (error) {
      console.error("Error adding book to favorites:", error);
    }
  };
  
  // Remove book from favorites
  const removeFromFavorites = async (bookId: string) => {
    try {
      const response = await axios.delete(
        "/reader/book",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { bookId }, // For DELETE, send data in the body
        }
      );
  
      // Assuming the response data includes the updated favorite books
      setFavoriteBooks(response.data.reader.favoriteBooks); // Update favorite books
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  };

  if (isLoading) return <p>Loading books...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Favorite Books</h2>
        {favoriteBooks.length === 0 ? (
          <p>No favorite books yet.</p>
        ) : (
          favoriteBooks.map((bookId) => {
            const book = books.find((b) => b._id === bookId);
            return book ? (
              <div key={book._id} className="mb-2 p-2 border rounded">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p>{book.description}</p>
                <button
                  onClick={() => removeFromFavorites(book._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove from Favorites
                </button>
              </div>
            ) : null;
          })
        )}
      </div>
      <h2 className="text-xl font-semibold">All Books</h2>
      {books.map((book) => (
        <div key={book._id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p>{book.description}</p>
          <p>Genre: {book.genreId.name}</p>
          <p>Writer: {book.writerId.biography}</p>
          {favoriteBooks.includes(book._id) ? (
            <button
              onClick={() => removeFromFavorites(book._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              onClick={() => addToFavorites(book._id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add to Favorites
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReaderPage;
