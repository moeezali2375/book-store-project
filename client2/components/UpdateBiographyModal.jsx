import { useState } from "react";
import Modal from "./Modal";
import useAxios from "@/hooks/useAxios";
import useSWR from "swr";

const getBio = async (url, axiosInstance) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateBiographyModal = ({ isOpen, onClose }) => {
  const [bio, setBio] = useState("");
  const { axiosInstance } = useAxios();

  const { data } = useSWR("/writer", (url) => getBio(url, axiosInstance), {
    onSuccess: (data) => {
      setBio(data.writer.biography);
    },
  });

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put("/writer", { biography: bio });
    } catch (error) {}
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Update Biography</h3>
      <form className="space-y-4">
        <textarea
          defaultValue={bio}
          className="w-full border border-gray-300 rounded-lg p-2"
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          type="button"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 w-full"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default UpdateBiographyModal;
