// pages/index.js
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import cookieParser from 'cookie-parser';
let cookies;
export async function getServerSideProps(context) {
  const { req } = context;
  cookies = cookieParser.JSONCookies(req.headers.cookie);
  if (!cookies)
    return {
      redirect: {
        destination: '/auth',
      }
    }

  const response = await axios.get('http://localhost:4000/api/reader/book', {
    headers: {
      Cookie: cookies
    },
    withCredentials: true,
  }
  );
  const books = response.data.books; // Access the books array
  console.log(books)
  return {
    props: {
      books,
    },
  };
}

export default function Home({ books }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = async (bookId) => {
    try {
      if (favorites.includes(bookId)) {
        // Remove from favorites
        await fetch(`http://localhost:4000/api/reader/book`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
          },
          withCredentials: true,
          body: JSON.stringify({ bookId }),
        });
        console.log("removed")
        setFavorites(favorites.filter((id) => id !== bookId));
      } else {
        // Add to favorites
        await fetch(`http://localhost:4000/api/reader/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
          },
          withCredentials: true,
          body: JSON.stringify({ bookId }),
        });
        
        console.log("added")
        setFavorites([...favorites, bookId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reader</h1>

      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">{book.description}</p>
            <p className="text-gray-500 mb-4">Genre: {book.genreId.name}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleFavorite(book._id)}
                className={`px-4 py-2 rounded-md ${favorites.includes(book._id)
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
                  }`}
              >
                {favorites.includes(book._id) ? 'Remove from Fav' : 'Add to Fav'}
              </button>
              <Link className="text-blue-500 underline" href={`/reader/book/${book._id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
