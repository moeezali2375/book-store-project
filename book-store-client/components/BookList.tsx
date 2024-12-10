import React, { useEffect, useState } from "react";
import axios from "axios";

interface BookProps {
  b: {
    _id: string;
    title: string;
    description: string;
    content: string;
    genreId: { _id: string; name: string };
  };
  onUpdate: (id: string, updatedContent: string) => void;
}

const Book: React.FC<BookProps> = ({ b, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(b.content);

  const handleUpdate = () => {
    onUpdate(b._id, updatedContent);
    setEditing(false);
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold">{b.title}</h2>
      <p className="text-gray-700">{b.description}</p>
      {!editing ? (
        <p className="mt-2">{b.content}</p>
      ) : (
        <textarea
          className="w-full mt-2 p-2 border rounded"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      )}
      <p className="text-sm text-gray-500">Genre: {b.genreId.name}</p>
      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit Content
        </button>
      ) : (
        <button
          onClick={handleUpdate}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      )}
    </div>
  );
};

const WriterPage: React.FC = () => {
  const [biography, setBiography] = useState<string>("");
  const [newBiography, setNewBiography] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const writerResponse = await axios.get("/api/writer", {
          headers: { Cookie: "token=writerToken" },
        });
        setBiography(writerResponse.data.writer.biography);

        const booksResponse = await axios.get("/api/writer/book", {
          headers: { Cookie: "token=writerToken" },
        });
        setBooks(booksResponse.data.books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const updateBiography = async () => {
    try {
      const response = await axios.put(
        "/api/writer",
        { biography: newBiography },
        { headers: { Cookie: "token=writerToken" } }
      );
      setBiography(response.data.biography);
      setNewBiography("");
    } catch (error) {
      console.error("Error updating biography:", error);
    }
  };

  const updateBookContent = async (id: string, updatedContent: string) => {
    try {
      const response = await axios.put(
        `/api/writer/book/${id}`,
        { content: updatedContent },
        { headers: { Cookie: "token=writerToken" } }
      );
      setBooks((prev) =>
        prev.map((book) => (book._id === id ? response.data.book : book))
      );
    } catch (error) {
      console.error("Error updating book content:", error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Book key={book._id} b={book} onUpdate={updateBookContent} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WriterPage;
