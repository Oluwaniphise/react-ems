import React, { useEffect } from 'react';
import { useFetchIndividualTasks, useUpdateTask } from '../services/taskApis';
import TasksStore from '../stores/TasksStore';
import { Navbar } from '../components/Navbar';
import useUserStore from '../stores/userStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        const task = tasks.find(task => task.id === draggableId);
        if (task.status !== destination.droppableId) {
            const updatedTask = { ...task, status: destination.droppableId };
            updateTaskStatus.mutate(updatedTask);
            setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        }
    };

    const renderTasks = (taskList) => (
        taskList.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative border px-5 py-10 rounded-xl bg-white shadow-sm"
                    >
                        <h2 className="text-2xl">{task.title}</h2>
                        <p className='text-base py-3'>{task.description}</p>
                        <p className='text-base text-gray-500'>Due by: {task.deadline}</p>
                    </div>
                )}
            </Draggable>
        ))
    );

    return (
        <>
            <Navbar />

            <div>
                {isLoading && <p>Loading tasks...</p>}
                {error && <p>{error.message}</p>}
                {tasks.length === 0 && <p>No tasks assigned</p>}
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full container mx-auto p-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                    <h3 className='text-xl font-bold mb-4'>Your Tasks</h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {['todo', 'in_progress', 'completed'].map(status => (
                            <Droppable key={status} droppableId={status}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='flex flex-col gap-4 w-full min-h-[200px] border rounded-xl p-4 bg-gray-100 shadow-md'
                                    >
                                        <h1 className='text-xl font-semibold mb-4'>{status}</h1>
                                        {renderTasks(getTasksByCategory(status))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </>
    );
}

export default UserTasks;
