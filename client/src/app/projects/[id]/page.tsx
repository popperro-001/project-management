"use client";

import React, { useState } from "react";

import { ProjectHeader } from "../ProjectHeader";
import { BoardView } from "../BoardView";
import { ListView } from "../ListView";
import { TimelineView } from "../TimelineView";
import { TableView } from "../TableView";
import { NewTaskModal } from "../../../components/NewTaskModal";

interface Props {
  params: { id: string };
}

const ProjectIdPage = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div>
      {/* Modal New Task */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        projectId={id}
      />

      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <BoardView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "List" && (
        <ListView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Table" && (
        <TableView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
};

export default ProjectIdPage;
