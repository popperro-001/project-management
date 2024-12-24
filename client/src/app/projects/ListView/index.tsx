import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";

interface Props {
  id: string;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
}

export const ListView = ({ id, setIsNewTaskModalOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div>An error accured while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};