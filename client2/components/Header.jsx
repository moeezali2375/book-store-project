import useAxios from "@/hooks/useAxios";
import useUser from "@/hooks/useUser";
import React from "react";

const Header = () => {
  const { user, setUser } = useUser();
  const { axiosInstance } = useAxios();

  const onLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser();
    } catch (error) {}
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Book Store</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">P</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
