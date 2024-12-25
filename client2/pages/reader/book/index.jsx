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
      },
    };

  const response = await axios.get('http://localhost:4000/api/reader/book', {
    headers: {
      Cookie: cookies,
    },
    withCredentials: true,
  });

  const res = await axios.get('http://localhost:4000/api/genre', {
    headers: {
      Cookie: cookies,
    },
    withCredentials: true,
  });

  const genres = res.data.genres;
  const books = response.data.books;
  return {
    props: {
      books,
      genres,
    },
  };
}

export default function Home({ books, genres }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre

  const toggleFavorite = async (bookId) => {
    try {
      if (favorites.includes(bookId)) {
        await fetch(`http://localhost:4000/api/reader/book`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
          },
          withCredentials: true,
          body: JSON.stringify({ bookId }),
        });
        setFavorites(favorites.filter((id) => id !== bookId));
      } else {
        await fetch(`http://localhost:4000/api/reader/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
          },
          withCredentials: true,
          body: JSON.stringify({ bookId }),
        });
        setFavorites([...favorites, bookId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genreId._id === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reader</h1>

      <div className="mb-4">
        <Link href="/reader/favorites">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">
            View Favorite Books
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
      />

      {/* Genre Dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>

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
                className={`px-4 py-2 rounded-md ${favorites.includes(book._id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
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
