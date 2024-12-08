"use client";

import React, { useState, useEffect, Suspense } from "react";
import Book, { BookI } from "@/components/Book";
import { useSearchParams } from "next/navigation";

const BookList2 = ({ books }: { books: BookI[] }) => {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Fiction", value: "fiction" },
    { label: "Dystopian", value: "dystopian" },
    { label: "Romance", value: "romance" },
    { label: "Adventure", value: "adventure" },
  ];
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [selectedFilter, setSelectedFilter] = useState(filter ? filter : "all");

  const [filteredBooks, setFilteredBooks] = useState<BookI[]>(books);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [debouncedStorageTerm, setDebouncedStorageTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from local storage when the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Debounce search term updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedStorageTerm(searchTerm);
    }, 300); // 300ms delay for both search and storage debouncing

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Update filtered books whenever selected filter or debounced search term changes
  useEffect(() => {
    let filtered = books;

    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (book) => book.genreId.name.toLowerCase() === selectedFilter
      );
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedFilter, debouncedSearchTerm, books]);

  // Update local storage search history when debouncedStorageTerm changes
  useEffect(() => {
    if (debouncedStorageTerm) {
      const updatedHistory = [
        debouncedStorageTerm,
        ...searchHistory.filter((term) => term !== debouncedStorageTerm),
      ].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, [debouncedStorageTerm]);

  // Handle search term input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold">All Books</h1>

      {/* Filter Buttons */}
      <div className="mb-4">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`px-4 py-2 m-1 ${
              selectedFilter === option.value
                ? "bg-zinc-900 text-white" // Selected state: Dark background with white text
                : "bg-zinc-200 text-black" // Default state: Light background with black text
            } transition duration-300 ease-in-out hover:bg-zinc-300 dark:hover:bg-zinc-800`}
            onClick={() => setSelectedFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-md text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
        />
        {/* Search History Dropdown */}
        {searchHistory.length > 0 && (
          <div className="mt-2 p-2 border rounded-md bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white">
            <h3 className="text-sm font-bold mb-1">Search History:</h3>
            <ul>
              {searchHistory.map((term, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:underline"
                  onClick={() => setSearchTerm(term)}
                >
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Book List */}
      {filteredBooks.map((b: BookI) => (
        <Book key={b._id} b={b} />
      ))}
    </div>
  );
};

const BookList = ({ books }: { books: BookI[] }) => {
  return (
    <Suspense>
      <BookList2 books={books} />
    </Suspense>
  );
};

export default BookList;
