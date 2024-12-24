"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import { Header } from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const TeamsPage = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div className="">Loading...</div>;
  if (isError || !teams)
    return <div>An error accured while fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          className={dataGridClassNames}
          pagination
          slots={{ toolbar: CustomToolbar }}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default TeamsPage;
