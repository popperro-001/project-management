"use client";

import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

import { useSearchQuery } from "@/state/api";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { ProjectCard } from "@/components/ProjectCard";
import { UserCard } from "@/components/UserCard";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 500);

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
        />
      </div>

      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching search results</p>}
        {!isLoading && !isError && searchResults && (
          <div className="">
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <h2 className="my-2 text-2xl font-bold">Tasks</h2>
            )}
            {searchResults.tasks &&
              searchResults.tasks.length > 0 &&
              searchResults.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2 className="my-2 text-2xl font-bold">Projects</h2>
            )}
            <div className="flex flex-col gap-2">
              {searchResults.projects &&
                searchResults.projects.length > 0 &&
                searchResults.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {searchResults.users && searchResults.users.length > 0 && (
              <h2 className="my-2 text-2xl font-bold">Users</h2>
            )}
            {searchResults.users &&
              searchResults.users.length > 0 &&
              searchResults.users.map((user) => (
                <UserCard key={user.userId} user={user} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
