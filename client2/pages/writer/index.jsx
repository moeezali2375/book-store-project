import useAxios from "@/hooks/useAxios";
import React, { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import CreateBookModal from "@/components/CreateBookModal";
import UpdateBiographyModal from "@/components/UpdateBiographyModal";

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
  }, [axiosInstance]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Writer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Book Cards */}
        <BookCard
          bookName="My First Book"
          genre="Fiction"
          description="This is a brief description of the book."
        />
        <BookCard
          bookName="Another Book"
          genre="Adventure"
          description="Another brief description."
        />
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
