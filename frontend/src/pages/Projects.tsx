import React, { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { get } from "../utilFunctions/getData";
//import toast from "react-hot-toast";

import ProjectData from "../components/ProjectData";

const Projects = () => {
  const [projects, setProjects] = React.useState<any[]>([]);

  const fetchProjects = async () => {
    const res = await get("http://localhost:3001/api/project/allProjects");
    const values = await res;

    const formattedProjects = values.map((item) => {
      // Parse createdAt string into Date object
      const createdAtDate = new Date(item.creationDate);
      const deadline = new Date(item.deadLine);
      // Format date to desired format (day-month-year)
      const formattedDate1 = `${createdAtDate.getDate()}-${
        createdAtDate.getMonth() + 1
      }-${createdAtDate.getFullYear()}`;
      const formattedDate2 = `${deadline.getDate()}-${
        deadline.getMonth() + 1
      }-${deadline.getFullYear()}`;

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        deadline: formattedDate2,
        status: item.status,
        createdAt: formattedDate1,
        totalPrice: item.totalPrice,
        isPublished: item.isPublished,
        freelancerId: item.freelancerId,
        clientId: item.clientId,
      };
    });

    setProjects(formattedProjects);
  };

  useEffect(() => {
    // Fetch projects initially
    fetchProjects();

    // Set interval to fetch projects every 3 seconds
    const intervalId = setInterval(fetchProjects, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "name",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-9 rounded-full">
                <img
                  src={params.row.img || "/Portrait_Placeholder.png"}
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none">{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "status",
      type: "string",
      headerName: "Status",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "deadline",
      type: "string",
      headerName: "Deadline",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "totalPrice",
      type: "string",
      headerName: "TotalPrice",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      type: "string",
      flex: 1,
    },
    {
      field: "isPublished",
      headerName: "Is Published",
      minWidth: 100,
      type: "boolean",
      flex: 1,
    },
  ];

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Projects
            </h2>
            {projects && projects.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {projects.length} Projects Found
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(true)} className="btn btn-primary">
            Add New Project +
          </button>
        </div>
        <DataTable
          slug="projects"
          relatedTo="project"
          columns={columns}
          rows={projects}
        />
      </div>
    </div>
  );
};

export default Projects;
