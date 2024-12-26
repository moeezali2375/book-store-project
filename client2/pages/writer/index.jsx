import useAxios from "@/hooks/useAxios";
import React, { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import CreateBookModal from "@/components/CreateBookModal";
import UpdateBiographyModal from "@/components/UpdateBiographyModal";
import Link from "next/link";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { axiosInstance } = useAxios();
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
  const [isUpdateBioOpen, setIsUpdateBioOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/writer/book");
        setBooks(res.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Writer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link href={`/writer/book/${book._id}`}>
            <BookCard
              key={book._id}
              bookName={book.title}
              genre={book.genreId.name}
              description={book.description}
            />
          </Link>
        ))}
        {/* Create New Book Card */}
        <div
          className="bg-gray-200 text-gray-600 text-center flex items-center justify-center rounded-lg p-4 cursor-pointer hover:bg-gray-300"
          onClick={() => setIsCreateBookOpen(true)}
        >
          <span>Create New Book</span>
        </div>
        {/* Update Biography Card */}
        <div
          className="bg-gray-200 text-gray-600 text-center flex items-center justify-center rounded-lg p-4 cursor-pointer hover:bg-gray-300"
          onClick={() => setIsUpdateBioOpen(true)}
        >
          <span>Update Biography</span>
        </div>
      </div>

      {/* Modals */}
      <CreateBookModal
        isOpen={isCreateBookOpen}
        onClose={() => setIsCreateBookOpen(false)}
        setBooks={setBooks}
      />
      <UpdateBiographyModal
        isOpen={isUpdateBioOpen}
        onClose={() => setIsUpdateBioOpen(false)}
        currentBio="This is your current biography..."
      />
    </div>
  );
};

export default Home;
