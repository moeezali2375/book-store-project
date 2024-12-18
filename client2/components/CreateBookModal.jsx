import Modal from './Modal';

const CreateBookModal = ({ isOpen, onClose }) => {
  const handleCreate = () => {
    // Add API call for creating a book
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Create New Book</h3>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Book Name"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Genre"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <textarea
          placeholder="Description"
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
