import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/reader/book"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Explore Books
      </Link>
    </div>
  );
};

export default Home;
