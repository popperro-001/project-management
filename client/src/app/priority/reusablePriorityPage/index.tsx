"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

import { Priority, useGetTasksByUserQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { NewTaskModal } from "@/components/NewTaskModal";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-900">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    renderCell: (params) => format(new Date(params.value), "P"),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: (params) => format(new Date(params.value), "P"),
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

interface Props {
  priority: Priority;
}

export const ReusablePriorityPage = ({ priority }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [view, setView] = useState("list");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const filteredTasks = tasks?.filter((task) => task.priority === priority);

  if (isError || !tasks)
    return <div className="">An error occurred while fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-primary px-4 py-2 font-bold text-white hover:bg-blue-600"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Add Task
          </button>
        }
      />

      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>

        <button
          className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} rounded-l`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      ) : (
        <div className="w-full">
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.id}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
          />
        </div>
      )}
    </div>
  );
};
