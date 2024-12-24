import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

import { useAppSelector } from "@/app/redux";
import { Header } from "@/components/Header";
import { useGetTasksQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

interface Props {
  id: string;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;
}

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

export const TableView = ({ id, setIsNewTaskModalOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div>An error accured while fetching tasks</div>;

  return (
    <div className="h-[440px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
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

      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};
