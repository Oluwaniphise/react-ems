import React, { useEffect, useState } from 'react';
import TasksStore from '../stores/TasksStore';
import { useFetchAllTasksForAdmin, useDeleteTask } from '../services/taskApis';
import useUserStore from '../stores/userStore';
import { Navbar } from '../components/Navbar';
import { Trash, Edit, MoreVertical } from 'lucide-react';
import Modal from '../components/Modal';
import AddNEditTask from '../components/AddNEditTask';
import { usefetchAllProfiles } from '../services/profileApi';

export const AdminTasks = () => {
    const { user } = useUserStore();
    const { tasks, setTasks, deleteTask } = TasksStore();
    const { data: fetchedTasks, isLoading, error } = useFetchAllTasksForAdmin();
    const { data: allProfiles } = usefetchAllProfiles();

    const [openTaskId, setOpenTaskId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editTask, setEditTask] = useState({});

    const toggleMenu = (taskId) => {
        setOpenTaskId(openTaskId === taskId ? null : taskId);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const deleteTaskMutation = useDeleteTask();

    useEffect(() => {
        if (fetchedTasks) {
            setTasks(fetchedTasks);
        }
    }, [fetchedTasks, setTasks]);



    function getUserName(userId) {

        if (!allProfiles) return;
        const profile = allProfiles?.find((user) => user.id === userId);
        return profile.username
    }


    const handleDeleteTask = (taskId) => {
        deleteTaskMutation.mutate(taskId, {
            onSuccess: () => deleteTask(taskId)
        });
    };
    return (
        <>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editTask ? "Edit Task" : "Add Task"}>
                <AddNEditTask task={editTask} onClose={closeModal} employees={allProfiles} />
            </Modal>
            <Navbar />
            <div>
                {isLoading && <p>Loading tasks...</p>}
                {error && <p>{error.message}</p>}
            </div>
            <div className="w-full container mx-auto p-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <div className="flex justify-end">
                    <button onClick={() => setEditTask(null) || openModal() } className="text-blue-600 underline px-4 py-2 rounded">Add Task</button>

                </div>
                <div className='w-full grid grid-cols-1 xl:grid-cols-3 my-8 gap-10'>
                    {tasks.map((task) => (
                        <div key={task.id} className="relative border px-5 py-10  rounded-xl">
                            <h2 className="text-2xl">{task.title}</h2>
                            <p className='text-base py-3'>{task.description}</p>
                            <p className='text-base text-gray-500'>Due by: {task.deadline}</p>
                            <p className='text-base text-gray-500'>Status: {task.status}</p>



                            <small>Assigned to: {getUserName(task.assigned_to)}</small>
                            <div className="absolute right-4 top-2 flex gap-1">
                                <button onClick={() => toggleMenu(task.id)} className="p-2 rounded-full hover:bg-gray-200">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            {openTaskId === task.id && (
                                <div className="absolute right-0 top-12 mt-2 w-28 bg-white border rounded-lg shadow-lg">
                                    <button
                                        onClick={() => setEditTask(task) || openModal()}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-blue-500 hover:bg-gray-100"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                                    >
                                        <Trash size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
