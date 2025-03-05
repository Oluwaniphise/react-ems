import React, { useEffect } from 'react';
import { useFetchIndividualTasks, useUpdateTask, } from '../services/taskApis';

import TasksStore from '../stores/TasksStore';
import { Navbar } from '../components/Navbar';
import useUserStore from '../stores/userStore';

const UserTasks = () => {
    const { tasks, setTasks } = TasksStore();
    const { user } = useUserStore();
    const { data: fetchedTasks, isLoading, error } = useFetchIndividualTasks(user.id);
    const updateTaskStatus = useUpdateTask();

    useEffect(() => {
        if (fetchedTasks) {
            setTasks(fetchedTasks);
        }
    }, [fetchedTasks, setTasks]);

    function getTasksByCategory(status) {
        return tasks.filter((task) => task.status === status);
    }

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId');
        const task = tasks.find(task => task.id === taskId);
        if (task && task.status !== newStatus) {
            const updatedTask = { ...task, status: newStatus };
            updateTaskStatus.mutate(updatedTask);
            setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        }
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    const renderTasks = (taskList) => (
        taskList.map((task) => (
            <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="relative border px-5 py-10 rounded-xl bg-white shadow-sm"
            >
                <h2 className="text-2xl">{task.title}</h2>
                <p className='text-base py-3'>{task.description}</p>
                <p className='text-base text-gray-500'>Due by: {task.deadline}</p>
            </div>
        ))
    );

    return (
        <>
            <Navbar />

            <div>
                {isLoading && <p>Loading tasks...</p>}
                {error && <p>{error.message}</p>}
            </div>

            <div className="w-full container mx-auto p-4 py-8">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <h3 className='text-xl font-bold mb-4'>Your Tasks</h3>

                { tasks.length > 0 ? ( <div className='w-full flex flex-row justify-between gap-10'>
                    {['todo', 'in_progress', 'completed'].map(status => (
                        <div
                            key={status}
                            onDrop={(e) => handleDrop(e, status)}
                            onDragOver={allowDrop}
                            className='w-[400px] min-h-[200px] p-4 bg-gray-100 rounded-xl shadow-md flex flex-col gap-4'
                        >
                            <h1 className='text-xl font-semibold mb-4'>{status.toUpperCase()}</h1>
                            {getTasksByCategory(status).length > 0 ? renderTasks(getTasksByCategory(status)) : <p>No tasks</p>}
                        </div>
                    ))}
                </div>) : (<div className='flex flex-col justify-center items-center mt-20'>No assigned tasks. Kindly contact admin</div>) }
            </div>

            {/* <div className='flex flex-col justify-center items-center'>
                {tasks.length === 0 && }
            </div> */}


        </>
    );
};

export default UserTasks;
