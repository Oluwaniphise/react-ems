import React, {useState} from 'react';
import Modal from '../components/Modal';

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <div>

            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Open Modal
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="My Modal Title">
                <p>This is the content of the modal.</p>
                <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    Close Modal
                </button>
            </Modal>

        </div>
    )
}

export default Tasks