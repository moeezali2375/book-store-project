import { useState, useEffect } from "react";
import Modal from "./Modal";
import useAxios from "@/hooks/useAxios";

const CreateBookModal = ({ isOpen, onClose, setBooks }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const { axiosInstance } = useAxios();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get("/genre");
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    if (isOpen) {
      fetchGenres();
    }
  }, [isOpen]);

  const handleCreate = async () => {
    const newBook = {
      title,
      genreId: selectedGenre,
      description,
      content,
    };

    console.log("Book created:", newBook);

    try {
      const res = await axiosInstance.post("/writer/book", { ...newBook });
      setBooks((books) => [...books, res.data.book]);
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setContent("");
    setSelectedGenre("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Create New Book</h3>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          type="button"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 w-full"
          onClick={handleCreate}
        >
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
