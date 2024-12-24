import { format } from "date-fns";

import { Project } from "@/state/api";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded border p-4 shadow">
      <h3 className="font-bold text-lg">{project.name}</h3>
      <p>{project.description}</p>
      <p>
        <strong>Start Date:</strong>{" "}
        {project.startDate && format(new Date(project.startDate), "P")}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {project.endDate && format(new Date(project.endDate), "P")}
      </p>
    </div>
  );
};
