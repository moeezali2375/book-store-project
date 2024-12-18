import Modal from "./Modal";

const UpdateBiographyModal = ({ isOpen, onClose, currentBio }) => {
  const handleUpdate = () => {
    // Add API call for updating biography
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Update Biography</h3>
      <form className="space-y-4">
        <textarea
          defaultValue={currentBio}
          className="w-full border border-gray-300 rounded-lg p-2"
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
