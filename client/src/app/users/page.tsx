"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";

import { useGetUsersQuery } from "@/state/api";
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
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div className="">Loading...</div>;
  if (isError || !users)
    return <div>An error accured while fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          className={dataGridClassNames}
          getRowId={(row) => row.userId}
          pagination
          slots={{ toolbar: CustomToolbar }}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default UsersPage;
