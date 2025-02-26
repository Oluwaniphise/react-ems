import { useState } from 'react';
import { useAddTask, useUpdateTask } from '../services/taskApis';
import TasksStore from '../stores/TasksStore';

function AddNEditTask({ employees, task = null, onClose }) {
    const { updateTask } = TasksStore();

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [deadline, setDeadline] = useState(task?.deadline || "");
    const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
    

    const { mutate, isPending: isLoading, isError: error } = useAddTask();
    const { mutate:updateTaskMutation, isPending: isLoadingEdit, isError: isErrorEdit } = useUpdateTask();
    


    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title || !description || !deadline || !assignedTo) return;
        const newTask = { title, description, deadline, assigned_to: assignedTo };

        mutate(newTask, {
            onSuccess: (data) => {
                console.log(data)
                onClose();
            }
        });
    };

    const handleUpdateTask = (taskId, e) => {
        console.log(isErrorEdit)
        e.preventDefault();
        if (!title || !description || !deadline || !assignedTo) return;
        const updates = { title, description, deadline, assigned_to: assignedTo };

        updateTaskMutation({ taskId, updates }, {
            onSuccess: () => {
                updateTask(taskId, updates);
                onClose();
            }
        });
    };


    return (
        <form onSubmit={(e) => task ? handleUpdateTask(task?.id, e) : handleAddTask(e)} className=" p-8 rounded-2xl  w-full mx-auto">

            {error && <p className="text-red-500 text-center">{error.message}</p>}
            <label htmlFor="text">Title</label>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="description">Description</label>

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <label htmlFor="description">Date</label>

            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="employee">Employee</label>
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>Select Employee</option>
                {employees.map((user) => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>

            <button
                type="submit"
                disabled={isLoading || isLoadingEdit}
                className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 disabled:bg-gray-400"
            >

                {!task && (
                    <span>
                        {isLoading ? 'Creating...' : 'Create Task'}
                    </span>
                )}
                {task && (
                    <span>
                        {isLoadingEdit ? 'Editing...' : 'Edit Task'}
                    </span>

                )}

            </button>
        </form>
    );
}

export default AddNEditTask;
