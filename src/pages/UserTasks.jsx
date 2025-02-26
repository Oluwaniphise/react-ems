import React, { useEffect } from 'react';
import { useFetchIndividualTasks } from '../services/taskApis';
import TasksStore from '../stores/TasksStore';
import { Navbar } from '../components/Navbar';
import useUserStore from '../stores/userStore';
const UserTasks = () => {
    const { tasks, setTasks } = TasksStore();
    const { user } = useUserStore();
    const { data: fetchedTasks, isLoading, error } = useFetchIndividualTasks(user.id);

    useEffect(() => {
        if (fetchedTasks) {
            setTasks(fetchedTasks);
        }
    }, [fetchedTasks, setTasks]);

    function getTasksyCategory(status) {
        return tasks.filter((task) => task.status === status)
    }

    const todoTasks = getTasksyCategory('todo');
    const inProgressTasks = getTasksyCategory('in_progress');
    const completedTasks = getTasksyCategory('completed');

    const renderTasks = (taskList) => (
        taskList.map((task) => (
            <div key={task.id} className="relative border px-5 py-10 rounded-xl">
                <h2 className="text-2xl">{task.title}</h2>
                <p className='text-base py-3'>{task.description}</p>
                <p className='text-base text-gray-500'>Due by: {task.deadline}</p>
                <p className='text-base text-gray-500'>Status: {task.status}</p>
            </div>
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




            <div className="w-full container mx-auto p-4 py-8">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <h3 className='text-xl font-bold mb-4'>Your Tasks</h3>

                <div className='w-full flex flex-row justify-between  gap-10'>

                    {/* TODO TASKS */}
                    <div>
                        <h1>TODO</h1>
                        <div className='w-[400px] flex flex-col gap-5'>
                            {todoTasks.length > 0 ? renderTasks(todoTasks) : <p>No TODO tasks</p>}
                        </div>

                    </div>

                    {/* In Progress */}
                    <div>
                        <h1>In Progess</h1>
                        <div className='w-[400px] flex flex-col gap-5'>
                            {inProgressTasks.length > 0 ? renderTasks(inProgressTasks) : <p>No tasks in progress</p>}

                        </div>
                    </div>

                    {/* Done */}

                    <div>
                        <h1>Done</h1>
                        <div className='w-[400px] flex flex-col gap-5'>
                            {completedTasks.length > 0 ? renderTasks(completedTasks) : <p>No done tasks</p>}

                        </div>
                    </div>

                </div>


            </div>

        </>
    )
}

export default UserTasks