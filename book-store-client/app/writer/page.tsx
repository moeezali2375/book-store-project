"use client"
import useAxios from "@/hooks/useAxios";
import React, { useEffect, useState } from "react";

const WriterPage: React.FC = () => {
  // State for Writer's Profile
  const [biography, setBiography] = useState<string>("");
  const [newBiography, setNewBiography] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState();
  const [genres, setGenres] = useState([]);
  console.log(genres);
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  // State for Books
  const [books, setBooks] = useState<any[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    content: "",
    genreId: "",
  });

  // Fetch Writer's Profile and Books on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Writer's Profile
        const writerResponse = await axios.get("/writer");
        setBiography(writerResponse.data.writer.biography);

        // Fetch Books
        const booksResponse = await axios.get("/writer/book");
        setBooks(booksResponse.data.books);

        const response = await axios("/genre");
        
        setGenres(response.data.genres); // Assuming the API returns the genres as an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Update Biography
  const updateBiography = async () => {
    try {
      const response = await axios.put(
        "/writer",
        { biography: newBiography },
      );
      setBiography(response.data.biography);
      setNewBiography("");
    } catch (error) {
      console.error("Error updating biography:", error);
    }
  };



  // Add New Book
  const addBook = async () => {
    try {
      const response = await axios.post(
        "/writer/book",
        newBook
      );
      setBooks((prev) => [...prev, response.data.book]);
      setNewBook({ title: "", description: "", content: "", genreId: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update Book Content
  const updateBook = async (id: string, updatedContent: string) => {
    try {
      const response = await axios.put(
        `/writer/book/${id}`,
        { content: updatedContent }
      );
      setBooks((prev) =>
        prev.map((book) => (book._id === id ? response.data.book : book))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete Book
  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`/writer/book/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-8">
      {/* Writer Profile */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold">Writer Profile</h1>
        <p className="mt-2">Biography: {biography}</p>
        <textarea
          className="w-full mt-2 p-2 border rounded"
          value={newBiography}
          onChange={(e) => setNewBiography(e.target.value)}
          placeholder="Update your biography"
        />
        <button
          onClick={updateBiography}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Biography
        </button>
      </section>

      {/* Books */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Books</h1>
        {

          books.map((book) => (
            <div key={book._id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>{book.description}</p>
              <p>{book.content}</p>
              <div className="flex flex-col mb-2">
                <input
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Edit Content"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                />
                <button
                  onClick={() => updateBook(book._id, updatedContent)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Update
                </button>
              </div>
              <button
                onClick={() => deleteBook(book._id)}
                className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete Book
              </button>
            </div>
          ))}

        {/* Add New Book */}
        <h2 className="text-xl font-bold mt-8">Add New Book</h2>
        <div className="mt-4">
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Description"
            value={newBook.description}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Content"
            value={newBook.content}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <div className="mb-4">
            {isLoading ? (
              <p>Loading genres...</p>
            ) : (
              <select className="p-2 border rounded">
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={addBook}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Book
          </button>
        </div>
      </section>
    </div>
  );
};

export default WriterPage;
